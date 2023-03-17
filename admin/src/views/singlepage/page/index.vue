<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'SinglePageCreate' })"
        type="primary"
        >添加</el-button
      >
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="s_pages" class="float-left">
          <el-table-column prop="sign" label="唯一标识" width="150">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="280">
          </el-table-column>
          <el-table-column prop="url" label="地址"> </el-table-column>
          <el-table-column label="浏览次数" width="150"
            ><template slot-scope="scope">
              <span>{{ scope.row.view_times }}次</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-link
                style="margin-right: 10px"
                type="primary"
                @click="
                  $router.push({
                    name: 'SinglePageUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
              >
              <el-link type="danger" @click="destory(scope.row.id)"
                >删除</el-link
              >
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
      pageName: "singlepage-list",
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      s_pages: [],
    };
  },
  activated() {
    this.getList();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getList();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getList();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getList();
    },
    getList() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Singlepage.Page.List(params).then((res) => {
        this.loading = false;
        this.s_pages = res.data.data;
        this.total = res.data.total;
      });
    },
    importUser() {},
    //删除管理员
    destory(id) {
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
          this.$api.Singlepage.Page.Destory(id)
            .then(() => {
              this.loading = false;
              this.$message.success("删除成功");
              this.getList();
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

