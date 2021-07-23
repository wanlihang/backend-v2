<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="分数统计"></back-bar>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="list" stripe class="float-left">
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
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
              <span v-else class="c-red">用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="最高得分">
            <template slot-scope="scope">
              <span>{{ scope.row.get_score }}分</span>
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
        id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      list: [],
      users: [],
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
    },
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

    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Exam.Mockpaper.Stat(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.users = res.data.users;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>
