<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="退款订单"
          p="order.refund.list"
          @click="$router.push({ name: 'OrderRefund' })"
          type="primary"
        >
        </p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            v-model="filter.order_id"
            class="w-150px"
            placeholder="订单编号"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            v-model="filter.goods_name"
            placeholder="商品关键字"
            class="w-150px"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select
            placeholder="请选择支付渠道"
            class="w-150px"
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
          <el-button class="reset" @click="paginationReset()">清空</el-button>
          <el-button type="primary" class="search" @click="filterAct()">
            筛选
          </el-button>
        </div>
        <div class="drawerMore d-flex ml-10" @click="drawer = true">
          <template v-if="showStatus">
            <img src="../../assets/img/icon-filter-h.png" />
            <span class="act">已选</span>
          </template>
          <template v-else>
            <img src="../../assets/img/icon-filter.png" />
            <span>更多</span>
          </template>
        </div>
      </div>
    </div>

    <div class="float-left" v-if="countMap">
      <el-tabs v-model="filter.status">
        <el-tab-pane
          :label="
            item.name +
            '(' +
            (item.key === null ? orderTotal : countMap[item.key]) +
            ')'
          "
          :name="item.key"
          v-for="(item, index) in filterData.statusRows"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="dataList"
        class="float-left"
        @sort-change="sortChange"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column prop="id" sortable label="ID" :width="100">
        </el-table-column>
        <!-- <el-table-column prop="user_id" sortable label="学员ID" :width="120">
        </el-table-column> -->
        <el-table-column label="学员" :width="210">
          <template slot-scope="scope">
            <div class="user-item d-flex" v-if="users[scope.row.user_id]">
              <div class="avatar">
                <img
                  :src="users[scope.row.user_id].avatar"
                  width="40"
                  height="40"
                />
              </div>
              <div class="ml-10">{{ users[scope.row.user_id].nick_name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" :width="300">
          <template slot-scope="scope">
            <span v-for="item in scope.row.goods" :key="item.id">
              {{ item.goods_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column sortable label="支付金额" :width="150">
          <template slot-scope="scope">¥{{ scope.row.charge }}</template>
        </el-table-column>
        <el-table-column label="支付渠道" :width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.payment === 'alipay'">
              <img src="../../assets/img/ali-pay.png" width="30" height="30"
            /></span>
            <span v-else-if="scope.row.payment === 'wechat'"
              ><img src="../../assets/img/wepay.png" width="30" height="30"
            /></span>
            <span v-else-if="scope.row.payment === 'wechat_h5'"
              ><img src="../../assets/img/wepay.png" width="30" height="30"
            /></span>
            <span v-else-if="scope.row.payment === 'wechat-jsapi'"
              ><img src="../../assets/img/wepay.png" width="30" height="30"
            /></span>
            <span v-else-if="scope.row.payment === 'wechatApp'"
              ><img src="../../assets/img/wepay.png" width="30" height="30"
            /></span>
            <span v-else-if="scope.row.payment === 'handPay'"
              ><img src="../../assets/img/card.png" width="30" height="30"
            /></span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="status_text" label="支付状态" :width="150">
          <template slot-scope="scope">
            <span
              :class="{
                'c-green': scope.row.status_text === '已支付',
                'c-red': scope.row.status_text === '未支付',
                'c-yellow': scope.row.status_text === '支付中',
              }"
            >
              · {{ scope.row.status_text }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="退款">
          <template slot-scope="scope">
            <span v-if="scope.row.is_refund === 0">-</span>
            <span v-else-if="scope.row.refund">{{
              showRefund(scope.row.refund)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="订单创建时间" :width="220">
          <template slot-scope="scope">{{
            scope.row.updated_at | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" :width="100">
          <template slot-scope="scope">
            <p-link
              text="查看"
              p="order.detail"
              @click="
                $router.push({
                  name: 'OrderDetail',
                  query: { id: scope.row.id },
                })
              "
              type="primary"
            ></p-link>
            <el-dropdown>
              <el-link type="primary" class="el-dropdown-link ml-5">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-link>
              <el-dropdown-menu slot="dropdown">
                <p-dropdown-item
                  text="退款"
                  :disabled="scope.row.status !== 9"
                  p="order.refund"
                  type="primary"
                  @click="refund(scope.row)"
                >
                </p-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <div class="float-left mt-30 text-center">
        <el-pagination
          style="margin-top: 20px"
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
    <el-dialog title="退款" :visible.sync="visible" width="420px">
      <div class="j-flex flex-column">
        <div class="d-flex">
          <label class="mr-20"><span class="c-red mr-5">*</span>退款方式</label>
          <el-select class="el-item" v-model="form.is_local">
            <el-option
              v-for="(item, index) in types"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="d-flex mt-20">
          <label class="mr-20"><span class="c-red mr-5">*</span>退款金额</label>
          <el-input
            class="el-item"
            placeholder="请输入退款金额"
            v-model="form.amount"
            type="number"
          >
            <template slot="append">元</template>
          </el-input>
        </div>
        <div class="flex mt-20">
          <label class="mr-20"><span class="c-red mr-5">*</span>退款理由</label>
          <el-input
            class="el-item"
            type="textarea"
            maxlength="64"
            resize="none"
            show-word-limit
            v-model="form.reason"
            placeholder="请输入退款理由"
            rows="4"
          ></el-input>
        </div>
      </div>

      <div class="j-r-flex mt-30">
        <el-button
          :loading="dialogLoading"
          @click="refundConfirm"
          type="primary"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <el-drawer :size="360" :visible.sync="drawer" :with-header="false">
      <div class="n-padding-box">
        <div class="tit flex">更多筛选</div>
        <div class="j-flex">
          <el-input
            v-model="filter.order_id"
            class="w-300px"
            placeholder="订单编号"
          ></el-input>
        </div>
        <div class="j-flex mt-20">
          <el-input
            v-model="filter.goods_name"
            placeholder="商品关键字"
            class="w-300px"
          ></el-input>
        </div>
        <div class="j-flex mt-20">
          <el-select
            placeholder="请选择支付渠道"
            class="w-300px"
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
        <div class="j-flex mt-20">
          <el-select class="w-300px" v-model="filter.is_refund">
            <el-option
              v-for="(item, index) in filterData.status"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="j-flex mt-20">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="订单添加开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </div>
        <div class="j-b-flex mt-30">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="filterAct" type="primary">筛选</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "order-list",
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      total: 0,
      loading: false,
      filter: {
        is_refund: -1,
        goods_name: null,
        status: null,
        order_id: null,
        created_at: null,
        payment: null,
      },
      filterData: {
        payments: [
          {
            key: "alipay",
            name: "支付宝支付",
          },
          {
            key: "wechat",
            name: "微信支付",
          },

          {
            key: "handPay",
            name: "线下打款",
          },
        ],
        statusRows: [
          {
            name: "全部",
            key: null,
          },
          {
            name: "已支付",
            key: "9",
          },
          {
            name: "支付中",
            key: "5",
          },
          {
            name: "未支付",
            key: "1",
          },
          {
            name: "已取消",
            key: "7",
          },
        ],
        status: [
          {
            name: "是否有退款",
            key: -1,
          },
          {
            name: "有退款",
            key: 1,
          },
          {
            name: "无退款",
            key: 0,
          },
        ],
      },
      dataList: [],
      countMap: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogLoading: false,
      visible: false,
      oid: null,
      form: {
        is_local: null,
        reason: null,
        amount: null,
      },
      types: [
        {
          name: "原渠道退回",
          key: 0,
        },
        {
          name: "线下退款（线上记录）",
          key: 1,
        },
      ],
      drawer: false,
    };
  },
  computed: {
    orderTotal() {
      if (this.countMap === null) {
        return 0;
      }
      let total = 0;
      for (let i = 1; i < this.filterData.statusRows.length; i++) {
        total += this.countMap[this.filterData.statusRows[i].key];
      }
      return total;
    },
    showStatus() {
      if (
        this.filter.is_refund !== -1 ||
        this.filter.payment ||
        this.filter.created_at ||
        this.filter.order_id ||
        this.filter.goods_name
      ) {
        return true;
      }
      return false;
    },
  },
  watch: {
    "filter.status"() {
      this.getList();
    },
    visible(val) {
      if (!val) {
        this.form.is_local = null;
        this.form.amount = null;
        this.form.reason = null;
        this.oid = null;
      }
    },
  },
  activated() {
    this.getList();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    showRefund(item) {
      let amount = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i].status === 1 || item[i].status === 5) {
          amount += item[i].amount / 100;
        }
      }
      return "¥" + amount.toFixed(2);
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getList();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getList();
    },
    paginationReset() {
      this.filter.is_refund = -1;
      this.pagination.page = 1;
      this.filter.payment = null;
      this.filter.order_id = null;
      this.filter.created_at = null;
      this.filter.goods_name = null;
      this.getList();
      this.drawer = false;
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getList();
    },
    filterAct() {
      this.pagination.page = 1;
      this.getList();
      this.drawer = false;
    },
    getList() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let data = {};
      Object.assign(data, this.pagination);
      Object.assign(data, this.filter);
      this.$api.Order.OrderList.List(data).then((resp) => {
        this.users = resp.data.users;
        this.total = resp.data.orders.total;
        this.dataList = resp.data.orders.data;
        this.countMap = resp.data.countMap;

        this.loading = false;
      });
    },
    refund(item) {
      this.visible = true;
      this.oid = item.id;
    },
    refundConfirm() {
      if (this.dialogLoading) {
        return;
      }
      if (this.form.is_local === null) {
        this.$message.error("请选择退款方式");
        return;
      }
      if (!this.form.amount) {
        this.$message.error("请输入退款金额");
        return;
      }
      if (!this.form.reason) {
        this.$message.error("请输入退款理由");
        return;
      }
      this.dialogLoading = true;
      this.$api.Order.OrderList.Refund(this.oid, {
        is_local: this.form.is_local,
        amount: this.form.amount * 100,
        reason: this.form.reason,
      })
        .then((res) => {
          this.dialogLoading = false;
          this.$message.success(this.$t("common.success"));
          this.form.is_local = null;
          this.form.amount = null;
          this.form.reason = null;
          this.oid = null;
          this.visible = false;
          this.getList();
        })
        .catch((e) => {
          this.dialogLoading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
<style lang="less" scoped>
label {
  width: 70px;
  text-align: right;
}
.el-item {
  flex: 1;
}
</style>
