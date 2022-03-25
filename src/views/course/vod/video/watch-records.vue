<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="视频观看记录"></back-bar>

    <div class="float-left">
      <div class="float-left d-flex">
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
            v-model="watched_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="看完时间-开始"
            end-placeholder="看完时间-结束"
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
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          class="float-left"
        >
          <el-table-column prop="user_id" label="学员ID" width="120">
          </el-table-column>
          <el-table-column label="学员">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="users[scope.row.user_id]">
                <div class="avatar">
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
              <span class="c-red" v-else>学员不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="视频时长" width="140">
            <template slot-scope="scope">
              <duration-text
                v-if="!loading && videos[scope.row.video_id]"
                :duration="videos[scope.row.video_id].duration"
              ></duration-text>
              <span class="c-red" v-else>已删除</span>
            </template>
          </el-table-column>
          <el-table-column label="已观看" width="140">
            <template slot-scope="scope">
              <duration-text
                v-if="!loading"
                :duration="scope.row.watch_seconds"
              ></duration-text>
            </template>
          </el-table-column>

          <el-table-column label="开始时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column label="看完时间" width="200">
            <template slot-scope="scope">{{
              scope.row.watched_at | dateFormat
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
import DurationText from "@/components/duration-text";

export default {
  components: {
    DurationText,
  },
  data() {
    return {
      pageName: "videoRecords-list",
      video_id: this.$route.query.id,
      pagination: {
        course_id: this.$route.query.course_id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        watched_start_at: null,
        watched_end_at: null,
      },
      watched_at: null,
      total: 0,
      loading: false,
      list: [],
      users: [],
      videos: [],
      courses: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  watch: {
    watched_at(newVal) {
      if (newVal) {
        this.filter.watched_start_at = newVal[0];
        this.filter.watched_end_at = newVal[1];
      } else {
        this.filter.watched_start_at = null;
        this.filter.watched_end_at = null;
      }
    },
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.watched_at = null;
      this.filter.watched_start_at = null;
      this.filter.watched_end_at = null;
    },
  },
  activated() {
    this.getWatchRecords();
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
      this.watched_at = null;
      this.filter.watched_start_at = null;
      this.filter.watched_end_at = null;
      this.getWatchRecords();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getWatchRecords();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getWatchRecords();
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getWatchRecords();
    },
    getWatchRecords() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.video_id = this.$route.query.id;
      this.pagination.course_id = this.$route.query.course_id;
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Course.Vod.Videos.WatchRecords(this.video_id, params).then(
        (res) => {
          this.loading = false;
          this.list = res.data.data.data;
          this.total = res.data.data.total;

          this.users = res.data.users;
          this.videos = res.data.videos;
          this.courses = res.data.courses;
        }
      );
    },
  },
};
</script>
