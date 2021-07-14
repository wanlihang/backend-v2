<template>
  <div class="float-left">
    <el-table v-loading="loading" :data="list" class="float-left">
      <el-table-column label="视频">
        <template slot-scope="scope">
          <span v-if="videos[scope.row.video_id]">
            {{ videos[scope.row.video_id].title }}
          </span>
          <span v-else class="c-red">视频不存在</span>
        </template>
      </el-table-column>
      <el-table-column label="购买时间" prop="created_at" :width="200"></el-table-column>
    </el-table>

    <div class="float-left mt-15">
      <el-pagination
        background
        :page-size="pagination.size"
        :current-page="pagination.page"
        layout="prev, pager, next"
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
      videos: [],
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
      this.$api.Member.UserVideos(this.id, this.pagination).then((res) => {
        this.loading = false;

        this.videos = res.data.videos;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>