<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="图文订阅用户"></back-bar>

    <div class="float-left">
      <div class="float-left">
        <div class="float-left d-flex">
          <div>
            <p-button
              text="删除用户"
              @click="delUser"
              p="addons.meedu_topics.orders.user.del"
            ></p-button>
          </div>
          <div class="ml-10">
            <p-button
              text="添加用户"
              p="addons.meedu_topics.orders.user.add"
              @click="showUserAddWin = true"
            ></p-button>
          </div>
          <div class="ml-10">
            <el-input
              v-model="filter.user_id"
              class="w-200px"
              placeholder="用户ID"
            ></el-input>
          </div>
          <div class="ml-10">
            <el-button @click="getData" type="primary" plain>筛选</el-button>
            <el-button @click="paginationReset">清空</el-button>
          </div>
        </div>
      </div>

      <div class="float-left mt-30" v-loading="loading">
        <div class="float-left">
          <el-table
            :data="list"
            @selection-change="handleSelectionChange"
            class="float-left"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="user_id" label="用户ID" width="120">
            </el-table-column>
            <el-table-column label="用户" width="300">
              <template slot-scope="scope">
                <div class="d-flex" v-if="scope.row.user">
                  <div>
                    <img :src="scope.row.user.avatar" width="40" height="40" />
                  </div>
                  <div class="ml-10">
                    {{ scope.row.user.nick_name }}
                  </div>
                </div>
                <span v-else class="c-red">用户不存在</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.charge }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="时间">
              <template slot-scope="scope">{{
                scope.row.updated_at | dateFormat
              }}</template>
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
      pageName: "topicOrder-list",
      showUserAddWin: false,
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        topic_id: this.$route.query.id,
        user_id: "",
      },
      total: 0,
      loading: false,
      list: [],
      selectedRows: null,
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
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
      this.filter.topic_id = this.$route.query.id;
      Object.assign(params, this.filter, this.pagination);
      this.$api.Course.Topic.Topic.Order(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
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

          this.$api.Course.Topic.Topic.DelUser({
            topic_id: this.filter.topic_id,
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

      this.$api.Course.Topic.Topic.AddUser({
        topic_id: this.filter.topic_id,
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

<style lang="less" scoped>
</style>