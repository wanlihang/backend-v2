<template>
  <div class="float-left">
    <el-table
      :header-cell-style="{ background: '#f1f2f9' }"
      v-loading="loading"
      :data="list"
      class="float-left"
    >
      <el-table-column prop="id" label="记录ID" width="120"></el-table-column>
      <el-table-column prop="sum" label="变动" width="200"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="时间" width="200">
        <template slot-scope="scope">{{
          scope.row.created_at | dateFormat
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
        size: 10,
      },
      total: 0,
      list: [],
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
      this.$api.Member.UserCredit1(this.id, this.pagination).then((res) => {
        this.loading = false;

        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>
