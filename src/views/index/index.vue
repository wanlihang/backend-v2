<template>
  <div class="el_content">
    <div class="el_top_row1">
      <div class="el_row_item">
        <span class="item_title">{{ $t("index.day_income") }}</span>
        <p>{{ dayincome }}</p>
        <div class="item_info">
          <span>{{ $t("index.yes_income") }}：{{ yesincome }}</span>
          <span
            >{{ $t("index.compared_yesterday") }}：<strong
              >+{{ dayincomerate }}</strong
            ></span
          >
        </div>
      </div>
      <div class="el_row_item">
        <span class="item_title">{{ $t("index.day_paid") }}</span>
        <p>{{ daypaynum }}</p>
        <div class="item_info">
          <span>{{ $t("index.yes_paid") }}：{{ yespaynum }}</span>
          <span
            >{{ $t("index.compared_yesterday") }}：<strong
              >+{{ daypayrate }}</strong
            ></span
          >
        </div>
      </div>
      <div class="el_row_item2">
        <div class="el_item">
          <span>{{ $t("index.allnum") }}</span>
          <span class="el_item_num">{{ allnum }}</span>
          <span style="margin-left: auto"
            >{{ $t("index.day_increase") }}：<strong
              >+{{ allrate }}</strong
            ></span
          >
        </div>
        <div class="el_item">
          <span>{{ $t("index.month_income") }}</span>
          <span class="el_item_num">{{ allincome }}</span>
          <span style="margin-left: auto"
            >{{ $t("index.month_increase") }}：<strong
              >+{{ allincomerate }}</strong
            ></span
          >
        </div>
      </div>
    </div>
    <div class="el_top_row2">
      <div class="tit">{{ $t("index.quick_acsess") }}</div>
      <a href="" class="el_row2_item">
        <img src="../../assets/home/demand.png" />
        <span>{{ $t("index.demand_course") }}</span>
      </a>
      <a href="" class="el_row2_item">
        <img src="../../assets/home/live.png" />
        <span>{{ $t("index.live_course") }}</span>
      </a>
      <a href="" class="el_row2_item">
        <img src="../../assets/home/tuwen.png" />
        <span>{{ $t("index.graphic_course") }}</span>
      </a>
      <a href="" class="el_row2_item">
        <img src="../../assets/home/ebook.png" />
        <span>{{ $t("index.ebook") }}</span>
      </a>
      <a href="" class="el_row2_item">
        <img src="../../assets/home/course.png" />
        <span>{{ $t("index.curriculum_path") }}</span>
      </a>
      <a href="" class="el_row2_item">
        <img src="../../assets/home/testpaper.png" />
        <span>{{ $t("index.testpaper") }}</span>
      </a>
    </div>
    <div class="el_top_row3">
      <div class="tit">{{ $t("index.statistical_analysis") }}</div>
      <div class="selchartbox">
        <el-button
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
        <el-button @click="getchartsdata()">{{ $t("index.query") }}</el-button>
      </div>
      <el-col class="formbox">
        <div
          id="chartLine"
          style="width: 100%; height: 252px; margin-left: -30px"
        ></div>
      </el-col>
    </div>
    <div class="bottomcopyright">Powered By MeEdu</div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      logining: false,
      name: "AllSearch",
      dayincome: 0,
      yesincome: 0,
      dayincomerate: 0 + "%",
      daypaynum: 0,
      yespaynum: 0,
      daypayrate: 0 + "%",
      allnum: 0,
      allrate: 0 + "%",
      allincome: 0,
      allincomerate: 0 + "%",
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
  mounted() {
    this.fun_date(-7);
    this.getZXTdata();
  },
  methods: {
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
          font-size: 36px;

          font-weight: 600;
          color: #333333;
          line-height: 36px;
          text-align: center;
          flex: 1;
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
    padding: 96px 100px 0px 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
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
      .el-button {
        padding: 13px 15px;
        box-sizing: border-box;
        height: 40px;
        background: #f1f2f9;
        border-radius: 4px;
        border: none;
        margin-right: 50px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
      }
      .el-button:hover {
        color: #fff;
        background: #3ca7fa;
      }
      .el-button--primary {
        color: #fff;
        background: #3ca7fa;
      }
    }
    .selcharttimebox {
      margin-top: 50px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      .el-button {
        box-sizing: border-box;
        width: 96px;
        height: 40px;
        background: #f1f2f9;
        border-radius: 4px;
        border: none;
        margin-left: 30px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
      }
      .el-button:hover {
        color: #fff;
        background: #3ca7fa;
      }
      .el-date-editor {
        width: 224px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
      }
    }
  }
  .bottomcopyright {
    width: 100%;
    text-align: center;
    margin-top: 50px;
    height: 16px;
    font-size: 16px;
    font-weight: 600;
    color: #999999;
    line-height: 16px;
  }
}
</style>