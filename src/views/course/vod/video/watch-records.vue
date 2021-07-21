<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="视频观看记录"></back-bar>

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
          <el-button @click="getWatchRecords" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>

    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="list" stripe class="float-left">
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
          <el-table-column label="视频时长" width="140">
            <template slot-scope="scope">
              <duration-text
                v-if="videos[scope.row.video_id]"
                :duration="videos[scope.row.video_id].duration"
              ></duration-text>
              <span class="c-red" v-else>已删除</span>
            </template>
          </el-table-column>
          <el-table-column label="已观看" width="140">
            <template slot-scope="scope">
              <duration-text
                :duration="scope.row.watch_seconds"
              ></duration-text>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" label="开始时间" width="200">
          </el-table-column>
          <el-table-column prop="watched_at" label="看完时间" width="200">
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
  },
  mounted() {
    this.getWatchRecords();
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
    getWatchRecords() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
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