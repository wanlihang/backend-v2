<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="administrator.store"
        @click="$router.push({ name: 'AdministratorCreate' })"
        type="primary"
      ></p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="users"
          class="float-left"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="200">
          </el-table-column>
          <el-table-column prop="email" label="登录邮箱" width="220">
          </el-table-column>
          <el-table-column sortable="" label="登录日志"
            ><template slot-scope="scope">
              <span
                >{{ scope.row.last_login_date | dateFormat }} /
                {{ scope.row.last_login_ip }}</span
              >
            </template>
          </el-table-column>

          <el-table-column label="禁止登录" width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.is_ban_login == 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="administrator.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'AdministratorUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="删除"
                p="administrator.destroy"
                class="ml-5"
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
      pageName: "administrator-list",
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      total: 0,
      loading: false,
      users: [],
      userRemark: [],
      filterData: {
        tags: [],
        roles: [],
      },
    };
  },
  activated() {
    this.getAdministrator();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getAdministrator();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getAdministrator();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getAdministrator();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getAdministrator();
    },
    getAdministrator() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.System.administrator.List(params).then((res) => {
        this.loading = false;
        this.users = res.data.data;
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
          this.$api.System.administrator
            .Destory(id)
            .then((res) => {
              this.loading = false;
              this.$message.success("删除成功");
              this.paginationReset();
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
