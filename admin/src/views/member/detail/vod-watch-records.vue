<template>
  <div class="float-left">
    <el-table
      :header-cell-style="{ background: '#f1f2f9' }"
      v-loading="loading"
      :data="list"
      class="float-left"
    >
      <el-table-column label="课程">
        <template slot-scope="scope">
          <div class="d-flex" v-if="courses[scope.row.course_id]">
            <div>
              <img
                :src="courses[scope.row.course_id].thumb"
                width="100"
                height="80"
              />
            </div>
            <div class="flex-1 ml-15">
              {{ courses[scope.row.course_id].title }}
            </div>
          </div>
          <span v-else class="c-red">课程不存在</span>
        </template>
      </el-table-column>
      <el-table-column label="进度" :width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.progress }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="看完" :width="80">
        <template slot-scope="scope">
          <span class="c-red" v-if="scope.row.is_watched === 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" :width="200">
        <template slot-scope="scope">{{
          scope.row.created_at | dateFormat
        }}</template></el-table-column
      >
      <el-table-column label="看完时间" :width="200">
        <template slot-scope="scope">{{
          scope.row.watched_at | dateFormat
        }}</template></el-table-column
      >
    </el-table>

    <div class="float-left mt-15">
      <el-pagination
        background
        :page-size="pagination.size"
        :current-page="pagination.page"
        layout="prev, pager, next, total"
        @current-change="pageChange"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      pagination: {
        page: 1,
        size: 8,
      },
      total: 0,
      list: [],
      courses: [],
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    pageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Member.UserVodWatchRecords(this.id, this.pagination).then(
        (res) => {
          this.loading = false;

          this.courses = res.data.courses;
          this.list = res.data.data.data;
          this.total = res.data.data.total;
        }
      );
    },
  },
};
</script>
