<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="讲师管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="addons.XiaoBanKe.teacher.store"
        @click="$router.push({ name: 'K12TeacherCreate' })"
        type="primary"
      >
      </p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column label="讲师">
            <template slot-scope="scope">
              <div class="user-item d-flex">
                <div class="avatar">
                  <img :src="scope.row.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">
                  {{ scope.row.name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="登录邮箱" width="240">
          </el-table-column>
          <el-table-column prop="password" label="登录密码" width="240">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.XiaoBanKe.teacher.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'K12TeacherUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                class="ml-5"
                text="删除"
                p="addons.XiaoBanKe.teacher.delete"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="float-left mt-30 text-center">
        <el-pagination
          @size-change="paginationSizeChange"
          @current-change="paginationPageChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "k12Teacher-list",
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      list: [],
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getData();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.xiaoBanKe.Teacher.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    destory(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.$api.xiaoBanKe.Teacher.Destroy(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
