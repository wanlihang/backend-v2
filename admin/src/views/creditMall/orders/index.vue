<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="积分订单"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.key"
            placeholder="关键字"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-select
            placeholder="商品分类"
            class="w-150px"
            v-model="filter.goods_type"
          >
            <el-option
              v-for="(item, index) in filterData.goodsTypes"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="60"> </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.goods_is_v === 1">虚拟</span>
              <span v-else-if="scope.row.goods_is_v === 0">实物</span>
            </template>
          </el-table-column>
          <el-table-column prop="goods_title" width="300" label="商品">
          </el-table-column>
          <el-table-column label="用户" width="300">
            <template slot-scope="scope">
              <div class="d-flex" v-if="scope.row.user">
                <div>
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">
                  {{ scope.row.user.nick_name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="200">
            <template slot-scope="scope">
              {{ scope.row.total_charge }}积分
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.is_send === 1">已发放成功</span>
              <span v-else-if="scope.row.is_send === 0">发货中</span>
            </template>
          </el-table-column>
          <el-table-column prop="express_number" label="运单号" width="200">
          </el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.credit1Mall.orders.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'CreditMallOrdersUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                v-if="scope.row.is_send !== 1"
                text="发货"
                class="ml-5"
                p="addons.credit1Mall.orders.send"
                type="primary"
                @click="
                  $router.push({
                    name: 'CreditMallOrdersSend',
                    query: {
                      id: scope.row.id,
                      goods_is_v: scope.row.goods_is_v,
                    },
                  })
                "
              ></p-link>
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
      pageName: "creditMallGoods-list",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        goods_type: null,
        key: null,
      },
      total: 0,
      loading: false,
      results: [],
      filterData: {
        goodsTypes: [],
      },
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.goods_type = null;
      this.filter.key = null;
      this.getData();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getData();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.CreditMall.Order.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.filterData.goodsTypes = res.data.types;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.original-charge {
  text-decoration: line-through;
}
</style>
