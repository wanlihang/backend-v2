<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="电子书学员"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="删除学员"
          type="danger"
          p="addons.meedu_books.book.user.del"
          @click="delUser"
        ></p-button>
        <p-button
          type="primary"
          text="添加学员"
          p="addons.meedu_books.book.user.add"
          @click="showUserAddWin = true"
        ></p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            v-model="filter.user_id"
            class="w-150px"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="list"
        @selection-change="handleSelectionChange"
        class="float-left"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="user_id" label="学员ID" width="150">
        </el-table-column>
        <el-table-column label="学员">
          <template slot-scope="scope">
            <div class="user-item d-flex" v-if="scope.row.user">
              <div class="avatar">
                <img :src="scope.row.user.avatar" width="40" height="40" />
              </div>
              <div class="ml-10">{{ scope.row.user.nick_name }}</div>
            </div>
            <span class="c-red" v-else>学员不存在</span>
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
      pageName: "bookUsers-list",
      showUserAddWin: false,
      pagination: {
        id: this.$route.query.bid,
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
    "$route.query.bid"() {
      this.pagination.page = 1;
      this.filter.user_id = null;
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
      this.pagination.id = this.$route.query.bid;
      Object.assign(params, this.filter, this.pagination);
      this.$api.Meedubook.Book.Users.List(this.pagination.id, params).then(
        (res) => {
          this.loading = false;
          this.list = res.data.data;
          this.total = res.data.total;
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

          this.$api.Meedubook.Book.Users.Del(this.pagination.id, {
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

      this.$api.Meedubook.Book.Users.Add(this.pagination.id, {
        user_ids: ids.join(","),
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
