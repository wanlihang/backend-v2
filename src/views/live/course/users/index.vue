<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="直播课程订阅用户"></back-bar>

    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <div class="float-left d-flex">
          <div>
            <el-button @click="delUser">删除用户</el-button>
          </div>
          <div class="ml-10">
            <el-button @click="showUserAddWin = true">添加用户</el-button>
          </div>
          <div class="ml-10">
            <el-input
              v-model="filter.user_id"
              class="w-200px"
              placeholder="用户ID"
            ></el-input>
          </div>
          <div class="ml-10">
            <el-button @click="firstPageLoad()" type="primary" plain
              >筛选</el-button
            >
            <el-button @click="paginationReset">清空</el-button>
          </div>
        </div>
      </div>

      <el-table
        :data="list"
        @selection-change="handleSelectionChange"
        class="float-left mt-30"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="150">
        </el-table-column>
        <el-table-column label="用户">
          <template slot-scope="scope">
            <div class="d-flex" v-if="scope.row.user">
              <div>
                <img :src="scope.row.user.avatar" width="40" height="40" />
              </div>
              <div class="ml-10">{{ scope.row.user.nick_name }}</div>
            </div>
            <span class="c-red" v-else>用户不存在</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="200">
          <template slot-scope="scope">
            <span>￥{{ scope.row.charge }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订阅时间" width="200">
          <template slot-scope="scope">{{
            scope.row.created_at | dateFormat
          }}</template>
        </el-table-column>
      </el-table>

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

    <user-add-comp
      :show="showUserAddWin"
      @close="showUserAddWin = false"
      @confirm="userAddChange"
    ></user-add-comp>
  </div>
</template>

<script>
import UserAddComp from "@/components/user-add";

export default {
  components: {
    UserAddComp,
  },
  data() {
    return {
      pageName: "liveUsers-list",
      showUserAddWin: false,
      pagination: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
      },
      total: 0,
      loading: false,
      list: [],
      selectedRows: null,
    };
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.user_id = null;
    },
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.user_id = null;
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
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.id = this.$route.query.id;
      Object.assign(params, this.pagination);
      this.$api.Course.Live.Course.Users.List(this.pagination.id, params).then(
        (res) => {
          this.loading = false;
          this.list = res.data.data.data;
          this.total = res.data.data.total;
        }
      );
    },
    delUser() {
      if (this.selectedRows === null) {
        this.$message.warning("请选择需要操作的数据");
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = [];
          this.selectedRows.forEach((item) => {
            ids.push(item.id);
          });

          this.$api.Course.Live.Course.Users.Del(this.pagination.id, {
            ids: ids.join(","),
          })
            .then(() => {
              this.$message.success(this.$t("common.success"));
              this.firstPageLoad();
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        })
        .catch(() => {});
    },
    userAddChange(rows) {
      let ids = [];
      rows.forEach((item) => {
        ids.push(item.id);
      });

      this.$api.Course.Live.Course.Users.Add(this.pagination.id, {
        ids: ids,
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.firstPageLoad();
          this.showUserAddWin = false;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
  },
};
</script>

