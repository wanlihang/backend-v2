<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="订单详情"></back-bar>

    <div class="float-left mb-30" v-if="order && order.status !== 9">
      <p-button
        text="改为已支付"
        p="order.finish"
        type="danger"
        @click="setPaid"
      ></p-button>
    </div>

    <div class="float-left" v-if="order && user">
      <div class="panel-box p-0 mb-30">
        <div class="panel-header">订单基础信息</div>
        <div class="panel-body">
          <div class="float-left">
            <div class="float-left d-flex mb-30">
              <div class="flex-1">UID：{{ user.id }}</div>
              <div class="flex-1">学员：{{ user.nick_name }}</div>
              <div class="flex-1">订单ID：{{ order.id }}</div>
              <div class="flex-1">订单编号：{{ order.order_id }}</div>
              <div class="flex-1">总额：￥{{ order.charge }}</div>
            </div>
            <div class="float-left d-flex">
              <div class="flex-1">状态：{{ order.status_text }}</div>
              <div class="flex-1">支付渠道：{{ order.payment_text }}</div>
              <!--<div class="flex-1">支付方法：{{ order.payment_method }}</div>-->
              <div class="flex-1">
                时间：{{ order.created_at | dateFormat }}
              </div>
              <div class="flex-1"></div>
              <div class="flex-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-box p-0 mt-30 mb-30">
        <div class="panel-header">订单商品</div>
        <div class="panel-body">
          <el-table
            :header-cell-style="{ background: '#f1f2f9' }"
            :data="order.goods"
          >
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column
              prop="goods_id"
              label="商品ID"
              width="120"
            ></el-table-column>
            <el-table-column prop="goods_name" label="商品"></el-table-column>
            <el-table-column label="价格" width="200">
              <template slot-scope="scope">
                {{ scope.row.goods_charge }}元
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="panel-box p-0 mt-30">
        <div class="panel-header">支付记录</div>
        <div class="panel-body">
          <el-table
            :header-cell-style="{ background: '#f1f2f9' }"
            :data="order.paid_records"
          >
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column
              prop="paid_type_text"
              label="支付渠道"
              width="300"
            ></el-table-column>
            <el-table-column label="支付金额">
              <template slot-scope="scope">
                {{ scope.row.paid_total }}元
              </template>
            </el-table-column>
            <el-table-column
              prop="paid_type_id"
              label="渠道ID"
              width="120"
            ></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="panel-box p-0 mt-30">
        <div class="panel-header">退款记录</div>
        <div class="panel-body">
          <el-table
            :header-cell-style="{ background: '#f1f2f9' }"
            :data="order.refund"
          >
            <el-table-column
              prop="id"
              label="ID"
              :width="120"
            ></el-table-column>
            <el-table-column
              prop="refund_no"
              label="退款单号"
              :width="300"
            ></el-table-column>
            <el-table-column label="支付渠道">
              <template slot-scope="scope">
                <span v-if="scope.row.payment === 'alipay'">
                  <img
                    src="../../assets/img/ali-pay.png"
                    width="30"
                    height="30"
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
            <el-table-column label="退款类型" :width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.is_local === 1"
                  >线下退款</span
                >
                <span v-else>原渠道退回</span>
              </template>
            </el-table-column>
            <el-table-column label="退款金额" :width="150">
              <template slot-scope="scope">
                ¥{{ scope.row.amount / 100 }}
              </template>
            </el-table-column>
            <el-table-column label="状态" :width="220">
              <template slot-scope="scope">
                <span class="c-yellow" v-if="scope.row.status === 1"
                  >· 待处理</span
                >
                <template v-else-if="scope.row.status === 5">
                  <span class="c-green mb-10">· 退款成功</span>
                  <br />
                  <span class="c-gray">{{
                    scope.row.success_at | dateFormat
                  }}</span>
                </template>
                <span v-else-if="scope.row.status === 9">· 退款异常</span>
                <span class="c-red" v-else-if="scope.row.status === 13"
                  >· 退款已关闭</span
                >
              </template>
            </el-table-column>
            <el-table-column label="提交时间" :width="220">
              <template slot-scope="scope">{{
                scope.row.created_at | dateFormat
              }}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="60">
              <template slot-scope="scope">
                <p-link
                  text="删除"
                  p="order.refund.delete"
                  type="danger"
                  @click="destory(scope.row.id)"
                ></p-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      order: null,
      user: null,
      loading: false,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.Order.Detail(this.id).then((res) => {
        this.order = res.data.order;
        this.user = res.data.user;
      });
    },
    setPaid() {
      if (this.loading) {
        return;
      }

      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.$api.Order.SetPaid(this.id)
            .then(() => {
              this.$message.success(this.$t("common.success"));
              this.getDetail();
              this.loading = false;
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch((e) => {});
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
          this.$api.Order.RefundDestory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getDetail();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.warning(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
