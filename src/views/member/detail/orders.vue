<template>
  <div class="float-left">
    <el-table
      :header-cell-style="{ background: '#f1f2f9' }"
      v-loading="loading"
      :data="list"
      class="float-left"
    >
      <el-table-column prop="order_id" label="订单编号" width="300">
      </el-table-column>
      <el-table-column label="商品">
        <template slot-scope="scope">
          <div class="d-flex" v-for="item in scope.row.goods" :key="item.id">
            <div>
              <img :src="item.goods_thumb" width="100" height="80" />
            </div>
            <div class="flex-1 ml-15">
              {{ item.goods_name }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="charge" label="总价" width="200">
      </el-table-column>
      <el-table-column prop="status_text" label="状态" width="100">
      </el-table-column>
      <el-table-column label="时间" width="200">
        <template slot-scope="scope">{{
          scope.row.created_at | dateFormat
        }}</template>
      </el-table-column>
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
      this.$api.Member.UserOrders(this.id, this.pagination).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>
