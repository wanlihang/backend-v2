<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="标签管理"></back-bar>

    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'MemberTagCreate' })"
        type="primary"
      >
        添加标签
      </el-button>
    </div>

    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="list"
        class="float-left"
      >
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="name" label="标签名"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="
                $router.push({
                  name: 'MemberTagEdit',
                  params: { id: scope.row.id },
                })
              "
            >
              编辑
            </el-link>
            <el-link class="ml-15" type="danger" @click="destroy(scope.row)">
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="float-left mt-30 text-center">
        <el-pagination
          @current-change="paginationPageChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.size"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="$router.back()"> 取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
      },
      loading: false,
      total: 0,
      list: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Member.Tag.List(this.pagination).then((res) => {
        this.loading = false;
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    destroy(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.DestroyHandle(item);
        })
        .catch(() => {});
    },
    DestroyHandle(item) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Member.Tag.Destroy(item.id)
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.getData();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
