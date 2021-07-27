<template>
  <div class="el_content">
    <div class="el_top_row1">
      <div class="el_row_item">
        <span class="item_title">{{ $t("index.day_income") }}</span>
        <p>{{ list.today_paid_sum || 0 }}</p>
        <div class="item_info">
          <span
            >{{ $t("index.yes_income") }}：{{ list.yesterday_paid_sum }}</span
          >
          <span
            >{{ $t("index.compared_yesterday") }}：<strong
              >+{{
                sumrate(list.today_paid_sum, list.yesterday_paid_sum)
              }}%</strong
            ></span
          >
        </div>
      </div>
      <div class="el_row_item">
        <span class="item_title">{{ $t("index.day_paid") }}</span>
        <p>{{ list.today_paid_user_num || 0 }}</p>
        <div class="item_info">
          <span
            >{{ $t("index.yes_paid") }}：{{
              list.yesterday_paid_user_num
            }}</span
          >
          <span
            >{{ $t("index.compared_yesterday") }}：<strong
              >+{{
                sumrate(list.today_paid_user_num, list.yesterday_paid_user_num)
              }}%</strong
            ></span
          >
        </div>
      </div>
      <div class="el_row_item2">
        <div class="el_item">
          <span>{{ $t("index.allnum") }}</span>
          <span class="el_item_num flex-1">{{ list.user_count }}</span>
          <span class="el_item_increase"
            >{{ $t("index.day_increase") }}：<strong
              >+{{
                sumrate(
                  list.today_register_user_count,
                  list.user_count - list.today_register_user_count
                )
              }}%</strong
            ></span
          >
        </div>
        <div class="el_item">
          <span>{{ $t("index.month_income") }}</span>
          <span class="el_item_num flex-1">{{
            list.this_month_paid_sum || 0
          }}</span>
          <span class="el_item_increase"
            >{{ $t("index.month_increase") }}：<strong
              >+{{
                sumrate(list.this_month_paid_sum, list.last_month_paid_sum)
              }}%</strong
            ></span
          >
        </div>
      </div>
    </div>
    <div style="display: none">
      <img src="https://addons.meedu.vip/api/v1/stat?v=v4.4" />
    </div>
    <div class="el_top_row2">
      <div class="tit">{{ $t("index.quick_acsess") }}</div>
      <a
        @click="
          $router.push({
            name: 'Vod',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/demand.png" />
        <span>{{ $t("index.demand_course") }}</span>
      </a>
      <a
        v-if="enabledAddons['Zhibo']"
        @click="
          $router.push({
            name: 'LiveCourse',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/live.png" />
        <span>{{ $t("index.live_course") }}</span>
      </a>
      <a
        v-if="enabledAddons['MeeduTopics']"
        @click="
          $router.push({
            name: 'Topic',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/tuwen.png" />
        <span>{{ $t("index.graphic_course") }}</span>
      </a>
      <a
        v-if="enabledAddons['MeeduBooks']"
        @click="
          $router.push({
            name: 'Meedubook',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/ebook.png" />
        <span>{{ $t("index.ebook") }}</span>
      </a>
      <a
        v-if="enabledAddons['LearningPaths']"
        @click="
          $router.push({
            name: 'LearningPath',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/course.png" />
        <span>学习路径</span>
      </a>
      <a
        v-if="enabledAddons['Paper']"
        @click="
          $router.push({
            name: 'ExamPaper',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/testpaper.png" />
        <span>{{ $t("index.testpaper") }}</span>
      </a>
    </div>
    <div class="el_top_row3">
      <div class="tit">{{ $t("index.statistical_analysis") }}</div>
      <div class="selchartbox">
        <el-button
          style="margin-right: 30px"
          :type="flagE === index + 1 ? 'primary' : ''"
          v-for="(item, index) in navList"
          :key="item.id"
          @click="handleClickBtnE(index)"
          >{{ item.name }}</el-button
        >
      </div>
      <div class="selcharttimebox">
        <el-date-picker
          v-model="time"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          :start-placeholder="$t('index.start_time')"
          :end-placeholder="$t('index.end_time')"
          :picker-options="pickerOptions"
        />
        <el-button class="ml-10" @click="getchartsdata()" type="primary" plain>
          筛选
        </el-button>
      </div>
      <el-col class="formbox">
        <div
          id="chartLine"
          style="
            width: 100%;
            height: 252px;
            margin-left: -30px;
            margin-bottom: 20px;
          "
        ></div>
      </el-col>
    </div>
    <div class="bottomcopyright">Powered By MeEdu</div>
  </div>
</template>
    
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      logining: false,
      name: "AllSearch",
      list: [],
      navList: [
        { name: this.$t("index.new_registered_users") },
        { name: this.$t("index.daily_order_creation") },
        { name: this.$t("index.daily_order_payment") },
        { name: this.$t("index.total_dailypayment_orders") },
      ],
      flagE: 1,
      time: "",
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        },
      },
      start_at: 0,
      end_at:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
  },
  mounted() {
    this.getResults();
    this.fun_date(-7);
    this.getZXTdata();
  },
  methods: {
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Stat.List().then((res) => {
        this.loading = false;
        this.list = res.data;
      });
    },
    sumrate(num1, num2) {
      if (num2 === 0 && num1 != 0) {
        return 100;
      }
      if (num2 === 0 && num1 === 0) {
        return 0;
      }
      if (!num1 || !num2) {
        return 0;
      }
      let result = (num1 / num2).toFixed(2);
      return result;
    },
    fun_date(aa) {
      let date1 = new Date(),
        time1 =
          date1.getFullYear() +
          "-" +
          (date1.getMonth() + 1) +
          "-" +
          date1.getDate(); //time1表示当前时间
      let date2 = new Date(date1);
      date2.setDate(date1.getDate() + aa);
      let time2 =
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate();
      this.start_at = time2;
    },
    getchartsdata() {
      if (this.time != "") {
        let timedata = this.time.slice(",");
        this.start_at = timedata[0];
        this.end_at = timedata[1];
      }
      this.getZXTdata();
    },
    handleClickBtnE(index) {
      this.flagE = index + 1;
      this.getZXTdata();
    },
    getZXTdata() {
      this.loading = true;
      var uid = "userRegister";
      if (this.flagE == 2) {
        uid = "orderCreated";
      } else if (this.flagE == 3) {
        uid = "orderPaidCount";
      } else if (this.flagE == 4) {
        uid = "orderPaidSum";
      } else {
        uid = "userRegister";
      }
      let databox = {
        start_at: this.start_at,
        end_at: this.end_at,
      };
      this.$api.Stat.Statistic(uid, databox).then((resp) => {
        if (resp.status == 0) {
          this.drawLineChart(resp.data.dataset, resp.data.labels);
        } else if (resp.status == 401) {
          this.$router.push({ path: "/" }); //跳到登录
        }
        this.loading = false;
      });
    },
    drawLineChart(val, xset) {
      const echarts = require("echarts");
      let myChart = echarts.init(document.getElementById("chartLine"));
      var yset = this.$t("index.new_registered_users");
      if (this.flagE == 2) {
        yset = this.$t("index.daily_order_creation");
      } else if (this.flagE == 3) {
        yset = this.$t("index.daily_order_payment");
      } else if (this.flagE == 4) {
        yset = this.$t("index.total_dailypayment_orders");
      } else {
        yset = this.$t("index.new_registered_users");
      }
      myChart.setOption({
        // title: {
        //   text: "销量趋势图",
        //   x: "center",
        // },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [yset],
          x: "right",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xset,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: yset,
            type: "line",
            // 设置折线图颜色
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#4876FF",
                },
              },
            },
            stack: "总量",
            data: val,
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el_content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .el_top_row1 {
    width: 100%;
    height: 204px !important;
    display: flex;
    flex-direction: row;
    position: relative;
    .el_row_item {
      width: 32.5%;
      height: 204px !important;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
      border-radius: 8px;
      margin-right: 20px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      .item_title {
        width: 100%;
        padding-left: 10px;
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        margin-bottom: 40px;
        line-height: 16px;
      }
      p {
        width: 100%;
        padding-left: 10px;
        height: 36px;
        font-size: 36px;

        font-weight: 600;
        color: #333333;
        line-height: 36px;
      }
      .item_info {
        margin-top: 30px;
        width: 100%;
        min-height: 42px;
        background: #f1f2f9;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        span {
          width: 50%;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 22px;
          strong {
            color: #3ca7fa;
          }
        }
      }
    }
    .el_row_item2 {
      width: 32.6%;
      height: 204px !important;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      .el_item {
        width: 100%;
        height: 92px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
        border-radius: 8px;
        padding-left: 30px;
        padding-right: 30px;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
        span {
          width: 110px;
          display: block;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 16px;
          strong {
            color: #3ca7fa;
          }
        }
        .el_item_num {
          width: auto;
          font-size: 36px;
          font-weight: 600;
          color: #333333;
          line-height: 36px;
          text-align: left;
        }
        .el_item_increase {
          width: 42%;
          margin-left: auto;
        }
      }
      .el_item:last-of-type {
        margin-bottom: 0px;
      }
    }
  }
  .el_top_row2 {
    width: 100%;
    height: 262px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
    border-radius: 8px;
    margin-top: 20px;
    padding: 66px 100px 30px 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    a {
      cursor: pointer;
    }
    .tit {
      position: absolute;
      height: 16px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
      top: 30px;
      left: 30px;
    }

    .el_row2_item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 80px;
      height: 116px;
      img {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
      }
      span {
        width: 80px;
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 16px;
        text-align: center;
      }
    }
  }
  .el_top_row3 {
    width: 100%;
    height: 558px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
    border-radius: 8px;
    margin-top: 20px;
    padding: 76px 30px 0px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    .tit {
      position: absolute;
      height: 16px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
      top: 30px;
      left: 30px;
    }
    .selchartbox {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }
    .selcharttimebox {
      margin-top: 50px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }
  }
  .bottomcopyright {
    width: 100%;
    text-align: center;
    margin-top: 50px;
    height: 16px;
    font-size: 16px;
    font-weight: 300;
    color: #999999;
    padding-bottom: 30px;
    line-height: 16px;
  }
}
</style>