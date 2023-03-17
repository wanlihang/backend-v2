<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="添加"
          p="addons.credit1Mall.goods.store"
          @click="$router.push({ name: 'CreditMallCreate' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="订单"
          p="addons.credit1Mall.orders.list"
          @click="$router.push({ name: 'CreditMallOrders' })"
          type="primary"
        >
        </p-button>
        <option-bar text="积分配置" value="积分"></option-bar>
      </div>

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
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column label="商品" width="400">
            <template slot-scope="scope">
              <div class="d-flex">
                <div
                  :style="{
                    'background-image': 'url(' + scope.row.thumb + ')',
                    width: '120px',
                    height: '120px',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'background-position': 'center center',
                  }"
                ></div>
                <div class="ml-10" style="width: 250px">
                  {{ scope.row.title }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="charge" label="价格">
            <template slot-scope="scope"> {{ scope.row.charge }}积分 </template>
          </el-table-column>
          <el-table-column label="库存" width="250">
            <template slot-scope="scope">
              兑换：{{ scope.row.sales_count }}<br />
              库存：{{ scope.row.stock_count }}
            </template>
          </el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.credit1Mall.goods.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'CreditMallUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="删除"
                class="ml-5"
                p="addons.credit1Mall.goods.delete"
                type="danger"
                @click="destory(scope.row.id)"
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
      this.$api.CreditMall.Goods.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.filterData.goodsTypes = res.data.goods_type;
        this.total = res.data.data.total;
      });
    },
    destory(item) {
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
          this.$api.CreditMall.Goods.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
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
