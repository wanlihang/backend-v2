<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="秒杀订单"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <div>
          <el-input
            placeholder="学员ID"
            class="w-150px"
            v-model="filter.user_id"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="float-left">
      <el-tabs v-model="filter.status">
        <el-tab-pane
          :label="item.name"
          :name="item.key"
          v-for="item in filterData.status"
          :key="item.id"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>

          <el-table-column label="商品ID">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">{{ scope.row.goods.goods_id }}</span>
              <span class="c-red" v-else>已删除</span>
            </template>
          </el-table-column>

          <el-table-column prop="user_id" label="学员ID" width="120">
          </el-table-column>

          <el-table-column label="商品" width="400">
            <template slot-scope="scope">
              <template v-if="scope.row.goods">
                <thumb-bar
                  :value="scope.row.goods.goods_thumb"
                  :width="120"
                  :height="90"
                  :title="scope.row.goods.goods_title"
                ></thumb-bar>
              </template>
              <span class="c-red" v-else>商品已删除</span>
            </template>
          </el-table-column>

          <el-table-column label="学员" :width="300">
            <template slot-scope="scope">
              <template v-if="scope.row.user">
                <div class="user-item d-flex" v-if="scope.row.user">
                  <div class="avatar">
                    <img :src="scope.row.user.avatar" width="40" height="40" />
                  </div>
                  <div class="ml-10">
                    {{ scope.row.user.nick_name }}
                  </div>
                </div>
              </template>
              <span class="c-red" v-else>学员不存在</span>
            </template>
          </el-table-column>

          <el-table-column label="秒杀价" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.charge }}元</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status !== 1" type="info">未支付</el-tag>
              <el-tag type="success" v-else>已支付</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
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
      pageName: "msOrders-list",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        type: null,
        gid: this.$route.query.id,
        status: "1",
        created_at: null,
        user_id: null,
      },
      total: 0,
      loading: false,
      results: [],
      filterData: {
        courses: [],
        goods: [],
        status: [
          {
            key: "1",
            name: "已支付",
          },
          {
            key: "0",
            name: "未支付",
          },
          {
            key: "3",
            name: "已取消",
          },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  watch: {
    "filter.status"() {
      this.getData();
    },
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.type = null;
      this.filter.gid = this.$route.query.id;
      this.filter.status = "1";
      this.filter.created_at = null;
      this.filter.user_id = null;
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
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.filter.gid = this.$route.query.id;
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Miaosha.Orders.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.courses = res.data.types;
        this.filterData.goods = res.data.goods;
      });
    },
  },
};
</script>
