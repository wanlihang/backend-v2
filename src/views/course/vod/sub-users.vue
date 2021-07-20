<template>
  <div class="float-left">
    <div class="float-left">
      <el-button type="primary" @click="showUserAddWin = true">
        添加用户
      </el-button>
    </div>
    <el-table :data="list" stripe class="float-left">
      <el-table-column label="用户">
        <template slot-scope="scope">
          <div v-if="users[scope.row.user_id]" class="d-flex">
            <div>
              <img
                :src="users[scope.row.user_id].avatar"
                width="40"
                height="40"
              />
            </div>
            <div class="ml-10">
              {{ users[scope.row.user_id].nick_name }}
            </div>
          </div>
          <span v-else class="c-red">用户已删除</span>
        </template>
      </el-table-column>
      <el-table-column label="订阅价格" prop="charge" width="200">
      </el-table-column>
      <el-table-column label="订阅时间" prop="created_at" width="200">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-link type="danger" @click="delItem(scope.row)"> 删除 </el-link>
        </template>
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
  props: ["id"],
  data() {
    return {
      loading: false,
      pagination: {
        page: 1,
        size: 10,
      },
      list: [],
      total: 0,
      users: [],
      showUserAddWin: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
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
      this.$api.Course.Vod.SubUsers(this.id, this.pagination).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
        this.users = res.data.users;
      });
    },
    delItem(item) {
      if (this.loading) {
        return;
      }

      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.$api.Course.Vod.SubUsersDel(this.id, {
            user_id: item.user_id,
          })
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
        .catch(() => {});
    },
    userAddChange(rows) {
      let ids = [];
      rows.forEach((item) => {
        ids.push(item.id);
      });

      if (this.loading) {
        return;
      }

      this.loading = true;
      this.$api.Course.Vod.SubUsersAdd(this.id, {
        user_id: ids,
      })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.getData();
          this.showUserAddWin = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>