<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="观看用户"></back-bar>
    <div class="float-left mb-30">
      <el-button @click="getResults()" type="primary"> 刷新数据 </el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
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
          <el-table-column label="观看时长" width="200">
            <template slot-scope="scope">
              <span>{{ getHMS(scope.row.duration) }}</span>
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
      pagination: {
        video_id: this.$route.query.id,
        course_id: this.$route.query.course_id,
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      results: [],
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getResults();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getResults();
    },
    getHMS(time) {
      const hour =
        parseInt(time / 3600) < 10
          ? "0" + parseInt(time / 3600)
          : parseInt(time / 3600);
      const min =
        parseInt((time % 3600) / 60) < 10
          ? "0" + parseInt((time % 3600) / 60)
          : parseInt((time % 3600) / 60);
      const sec =
        parseInt((time % 3600) % 60) < 10
          ? "0" + parseInt((time % 3600) % 60)
          : parseInt((time % 3600) % 60);
      return hour + ":" + min + ":" + sec;
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Course.Live.Course.Video.Watch(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>

