<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="团列表"></back-bar>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column label="团长">
            <template slot-scope="scope">
              <span>{{ scope.row.create_user_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="成员" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.over_people_num }}人</span>
            </template>
          </el-table-column>
          <el-table-column prop="status_text" label="状态" width="120">
          </el-table-column>
          <el-table-column label="人数" width="120">
            <template slot-scope="scope">
              <span
                >{{ scope.row.people_num - scope.row.over_people_num }}/{{
                  scope.row.people_num
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="过期" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.expired_at }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                v-if="scope.row.status != 1"
                type="danger"
                @click="handle(scope.row.id)"
                >改为已完成</el-link
              >
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
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.TuanGou.Tuan.List(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    handle(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }
          this.loading = true;
          var data = {
            id: item,
          };
          this.$api.TuanGou.Tuan.Complete(data)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
            })
            .catch((e) => {
              this.loading = false;
              this.$message(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>

