<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="讲师管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        @click="$router.push({ name: 'LiveTeacherCreate' })"
        type="primary"
        p="addons.Zhibo.teacher.store"
      >
      </p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="讲师ID" width="120">
          </el-table-column>
          <el-table-column label="讲师" width="300">
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
          <el-table-column label="课程" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.courses_count }}个</span>
            </template>
          </el-table-column>
          <el-table-column label="账号">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column label="密码">
            <template slot-scope="scope">
              <div class="d-flex">
                <div v-if="scope.row.id === currentId">
                  <span>{{ scope.row.password }}</span>
                </div>
                <div v-else>
                  <span>∗∗∗∗∗∗</span>
                </div>
                <div class="ml-10">
                  <el-link :underline="false" @click="setCurrent(scope.row.id)">
                    <i class="el-icon-view"></i>
                  </el-link>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                type="primary"
                @click="
                  $router.push({
                    name: 'LiveTeacherUpdate',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.Zhibo.teacher.update"
              ></p-link>
              <p-link
                text="删除"
                class="ml-5"
                type="danger"
                @click="destory(scope.row.id)"
                p="addons.Zhibo.teacher.delete"
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
      pageName: "liveTeacher-list",
      loading: false,
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      currentId: null,
      results: [],
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
    setCurrent(id) {
      if (this.currentId === id) {
        this.currentId = null;
      } else {
        this.currentId = id;
      }
    },
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
      this.$api.Course.Live.Teacher.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
        this.total = res.data.total;
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
          this.$api.Course.Live.Teacher.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.warning(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
