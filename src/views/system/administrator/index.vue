<template>
  <div class="float-left">
    <div class="float-left mb-15">
      <el-button
        @click="$router.push({ name: 'AdministratorCreate' })"
        type="primary"
        >添加</el-button
      >
    </div>
    <div class="table-body" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="users"
          stripe
          class="float-left"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column prop="id"  label="ID" width="120">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="230">
          </el-table-column>
          <el-table-column
            sortable=""
            label="登录日志"
            
            ><template slot-scope="scope">
              <span
                >{{ scope.row.last_login_date }} /
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

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-link
                style="margin-right: 10px"
                type="danger"
                @click="destory(scope.row.id)"
                >删除</el-link
              >
              <el-link
                type="primary"
                @click="
                  $router.push({
                    name: 'AdministratorUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="float-left mt-15">
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
  mounted() {
    this.getAdministrator();
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
          this.$api.System.administrator.Destory(id).then((res) => {
            if (res.status == 0) {
              this.loading = false;
              this.$message("删除成功");
              this.paginationReset();
            } else {
              this.loading = false;
              this.$message(res.message);
            }
          });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>

<style lang="less" scoped>
.user-item {
  width: auto;
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 10px;
  }
  .nickname {
    font-size: 15px;
    font-weight: normal;
  }
}

.filter-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 15px;
  background-color: white;

  .filter-label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>