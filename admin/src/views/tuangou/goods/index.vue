<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="添加"
          p="addons.TuanGou.goods.store"
          @click="$router.push({ name: 'TuangouGoodsCreate' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="团购订单"
          p="addons.TuanGou.orders"
          @click="$router.push({ name: 'TuangouGoodsOrder' })"
          type="primary"
        >
        </p-button>
        <!--<p-button
          text="退款订单"
          p="addons.TuanGou.refund"
          @click="$router.push({ name: 'TuangouGoodsRefund' })"
          type="primary"
        >
        </p-button>-->
        <option-bar text="团购配置" value="团购"></option-bar>
      </div>

      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.keywords"
            placeholder="关键字搜索"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="list"
        class="float-left"
      >
        <el-table-column prop="id" label="ID" width="100"> </el-table-column>
        <el-table-column prop="goods_type_text" label="类型"> </el-table-column>
        <el-table-column label="商品" width="400">
          <template slot-scope="scope">
            <template v-if="scope.row.goods_type === 'book'">
              <thumb-bar
                :value="scope.row.goods_thumb"
                :width="90"
                :height="120"
                :title="scope.row.goods_title"
              ></thumb-bar>
            </template>
            <template v-else>
              <thumb-bar
                :value="scope.row.goods_thumb"
                :width="120"
                :height="90"
                :title="scope.row.goods_title"
              ></thumb-bar>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="150">
          <template slot-scope="scope">
            <div>团购价：{{ scope.row.charge }}元</div>
            <div class="ori-charge">
              原价：{{ scope.row.original_charge }}元
            </div>
          </template>
        </el-table-column>

        <el-table-column label="成团人数" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.people_num }}人</span>
          </template>
        </el-table-column>

        <el-table-column label="时间" width="200">
          <template slot-scope="scope">
            <div>开始:{{ scope.row.started_at | dateFormat }}</div>
            <div>结束:{{ scope.row.ended_at | dateFormat }}</div>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <p-link
              text="编辑"
              p="addons.TuanGou.goods.update"
              type="primary"
              @click="
                $router.push({
                  name: 'TuangouGoodsUpdate',
                  query: { id: scope.row.id },
                })
              "
            ></p-link>
            <p-link
              text="团列表"
              p="addons.TuanGou.goods.items"
              type="primary"
              class="ml-5"
              @click="
                $router.push({
                  name: 'TuangouGoodsTuanorder',
                  query: { id: scope.row.id },
                })
              "
            ></p-link>
            <p-link
              text="删除"
              class="ml-5"
              p="addons.TuanGou.goods.delete"
              type="danger"
              @click="destory(scope.row.id)"
            ></p-link>
          </template>
        </el-table-column>
      </el-table>

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
      pageName: "tg-list",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        type: null,
        keywords: null,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        courses: [],
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
      this.filter.type = null;
      this.filter.keywords = null;
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
      this.$api.TuanGou.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.courses = res.data.types;
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
          this.$api.TuanGou.Destroy(item)
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
.ori-charge {
  color: #999;
  text-decoration: line-through;
}
</style>
