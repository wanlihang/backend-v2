<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="退款订单"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex"></div>
      <div class="d-flex">
        <div>
          <el-select
            placeholder="请选择支付渠道"
            class="w-300px"
            multiple
            v-model="filter.payment"
          >
            <el-option
              v-for="(item, index) in filterData.payments"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-input
            type="text"
            placeholder="请输入手机号"
            class="w-150px"
            v-model="filter.mobile"
          >
          </el-input>
        </div>
        <div class="ml-10">
          <el-input
            type="text"
            placeholder="请输入退款单号"
            class="w-150px"
            v-model="filter.refund_no"
          >
          </el-input>
        </div>
        <div class="ml-10">
          <el-select
            placeholder="请选择退款类型"
            class="w-150px"
            v-model="filter.is_local"
          >
            <el-option
              v-for="(item, index) in filterData.types"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-select
            placeholder="请选择退款状态"
            class="w-150px"
            v-model="filter.status"
          >
            <el-option
              v-for="(item, index) in filterData.status"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
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
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
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
          <el-table-column
            prop="refund_no"
            label="退款单号"
            width="300"
          ></el-table-column>
          <el-table-column label="退款类型" :width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.is_local === 1">本地(仅记录)</span>
              <span v-else>原渠道退回</span>
            </template>
          </el-table-column>
          <el-table-column label="支付渠道" :width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.payment === 'alipay'">支付宝支付</span>
              <span v-else-if="scope.row.payment === 'wechat'"
                >微信扫码支付</span
              >
              <span v-else-if="scope.row.payment === 'wechat-jsapi'"
                >微信JSAPI支付</span
              >
              <span v-else-if="scope.row.payment === 'wechat_h5'"
                >微信H5支付</span
              >
              <span v-else-if="scope.row.payment === 'wechatApp'"
                >微信APP支付</span
              >
              <span v-else-if="scope.row.payment === 'handPay'">线下打款</span>
            </template>
          </el-table-column>
          <el-table-column label="退款金额">
            <template slot-scope="scope">
              {{ scope.row.amount / 100 }}元
            </template>
          </el-table-column>

          <el-table-column label="状态" :width="220">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status === 1">待处理</el-tag>
              <template v-else-if="scope.row.status === 5">
                <el-tag type="success" class="mb-10">退款成功</el-tag>
                <br />
                <span>{{ scope.row.success_at | dateFormat }}</span>
              </template>
              <el-tag v-else-if="scope.row.status === 9">退款异常</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status === 13"
                >退款已关闭</el-tag
              >
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
        is_local: -1,
        payment: null,
        status: 0,
        created_at: null,
        mobile: null,
        refund_no: null,
      },
      total: 0,
      loading: false,
      results: [],
      filterData: {
        payments: [
          {
            key: "alipay",
            name: "支付宝支付",
          },
          {
            key: "wechat",
            name: "微信扫码支付",
          },
          {
            key: "wechat-jsapi",
            name: "微信JSAPI支付",
          },
          {
            key: "wechat_h5",
            name: "微信H5支付",
          },
          {
            key: "wechatApp",
            name: "微信APP支付",
          },
          {
            key: "handPay",
            name: "线下打款",
          },
        ],
        types: [
          {
            key: -1,
            name: "全部",
          },
          {
            key: 0,
            name: "原渠道退回",
          },
          {
            key: 1,
            name: "本地(仅记录)",
          },
        ],
        status: [
          {
            key: 0,
            name: "全部",
          },
          {
            key: 1,
            name: "待处理",
          },
          {
            key: 5,
            name: "退款成功",
          },
          {
            key: 9,
            name: "退款异常",
          },
          {
            key: 13,
            name: "退款已关闭",
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
  watch: {},
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
      this.filter.is_local = -1;
      this.filter.payment = null;
      this.filter.status = 0;
      this.filter.created_at = null;
      this.filter.mobile = null;
      this.filter.refund_no = null;
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
      this.$api.Order.RefundList(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>
