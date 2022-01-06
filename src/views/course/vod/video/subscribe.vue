<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="视频销售记录"></back-bar>

    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="用户ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-date-picker
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
        <div class="ml-15">
          <el-button @click="firstPageLoad" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="subscribes" class="float-left">
          <el-table-column prop="user_id" label="用户ID" width="120">
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div class="d-flex" v-if="users[scope.row.user_id]">
                <div>
                  <img
                    :src="users[scope.row.user_id].avatar"
                    height="40"
                    width="40"
                  />
                </div>
                <div class="ml-10">
                  {{ users[scope.row.user_id].nick_name }}
                </div>
              </div>
              <span class="c-red" v-else>用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column prop="charge" label="价格" width="200">
          </el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
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
</template>
<script>
export default {
  data() {
    return {
      pageName: "videoSubscribe-list",
      cid: this.$route.query.course_id,
      pagination: {
        video_id: this.$route.query.video_id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        subscribe_start_at: null,
        subscribe_end_at: null,
      },
      subscribed_at: null,
      total: 0,
      loading: false,
      subscribes: [],
      users: [],
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
    "$route.query.video_id"() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.subscribed_at = null;
      this.filter.subscribe_start_at = null;
      this.filter.subscribe_end_at = null;
    },
  },
  activated() {
    this.getSubscribes();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.subscribed_at = null;
      this.filter.subscribe_start_at = null;
      this.filter.subscribe_end_at = null;
      this.getSubscribes();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getSubscribes();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getSubscribes();
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getSubscribes();
    },
    getSubscribes() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.cid = this.$route.query.course_id;
      this.pagination.video_id = this.$route.query.video_id;
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Course.Vod.Videos.Subscribe(
        this.pagination.video_id,
        params
      ).then((res) => {
        this.loading = false;
        this.subscribes = res.data.data.data;
        this.total = res.data.data.total;

        this.users = res.data.users;
      });
    },
  },
};
</script>
