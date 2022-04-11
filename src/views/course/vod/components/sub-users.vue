<template>
  <div class="float-left">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <el-button type="primary" @click="showUserAddWin = true">
          添加学员
        </el-button>
        <p-button
          text="批量导入"
          p="course.subscribe.import"
          type="primary"
          @click="
            $router.push({
              name: 'VodUserImport',
              query: {
                id: id,
              },
            })
          "
        >
        </p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="subscribed_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="订阅时间-开始"
            end-placeholder="订阅时间-结束"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>

    <el-table
      :header-cell-style="{ background: '#f1f2f9' }"
      :data="list"
      class="float-left"
    >
      <el-table-column label="学员ID" prop="user_id" width="120">
      </el-table-column>
      <el-table-column label="学员">
        <template slot-scope="scope">
          <div v-if="users[scope.row.user_id]" class="user-item d-flex">
            <div class="avatar">
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
          <span v-else class="c-red">学员已删除</span>
        </template>
      </el-table-column>
      <el-table-column label="订阅价格" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.charge }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="订阅时间" width="200">
        <template slot-scope="scope">{{
          scope.row.created_at | dateFormat
        }}</template>
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
      filter: {
        user_id: null,
        subscribe_start_at: null,
        subscribe_end_at: null,
      },
      subscribed_at: null,
      list: [],
      total: 0,
      users: [],
      showUserAddWin: false,
      //禁用选择未来日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  watch: {
    subscribed_at(newVal) {
      if (newVal) {
        this.filter.subscribe_start_at = newVal[0];
        this.filter.subscribe_end_at = newVal[1];
      } else {
        this.filter.subscribe_start_at = null;
        this.filter.subscribe_end_at = null;
      }
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.subscribed_at = null;
      this.filter.subscribe_start_at = null;
      this.filter.subscribe_end_at = null;
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
      Object.assign(params, this.pagination, this.filter);
      this.$api.Course.Vod.SubUsers(this.id, params).then((res) => {
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
