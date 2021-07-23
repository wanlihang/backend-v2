<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="练习进度"></back-bar>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="chapter_name" label="章节" >
          </el-table-column>
           <el-table-column label="题目数" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.question_count}}题</span>
            </template>
          </el-table-column>
          <el-table-column label="已练习" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.submit_count }}题</span>
            </template>
          </el-table-column>
          <el-table-column label="进度" width="150">
            <template slot-scope="scope">
              <span
                >{{
                  ((scope.row.submit_count * 100) / scope.row.question_count).toFixed(2)
                }}%</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      pid: this.$route.query.pid,
      total: 0,
      loading: false,
      results: [],
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Exam.Practice.Progress(this.id, this.pid).then((res) => {
        this.loading = false;
        this.results = res.data.data;
      });
    },
  },
};
</script>
