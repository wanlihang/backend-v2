<template>
  <div class="el_content">
    <div class="el_top_row1">
      <div class="el_row_item">
        <span class="item_title">今日收入</span>
        <p>0</p>
        <div class="item_info">
          <span>昨天收入：0</span>
          <span>较昨日：<strong>+23%</strong></span>
        </div>
      </div>
      <div class="el_row_item">
        <span class="item_title">今日付费用户(人)</span>
        <p>8</p>
        <div class="item_info">
          <span>昨天付费用户：0</span>
          <span>较昨日：<strong>+23%</strong></span>
        </div>
      </div>
      <div class="el_row_item2">
        <div class="el_item">
          <span>总用户(人)</span>
          <span class="el_item_num">81</span>
          <span style="margin-left: auto">今日新增：<strong>+23%</strong></span>
        </div>
        <div class="el_item">
          <span>本月总收益</span>
          <span class="el_item_num">9723</span>
          <span style="margin-left: auto">较上月：<strong>+23%</strong></span>
        </div>
      </div>
    </div>
    <div class="el_top_row2"></div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      name: "AllSearch",
      dayincome: 0,
      yesincome: 0,
      dayincomerate: 0 + "%",
      daypaynum: 0,
      yespaynum: 0,
      daypayrate: 0 + "%",
      allnum:0,
      allrate:0 + "%",
      allincome: 0,
      allincomerate: 0 + "%",
    };
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
      width: 31.7%;
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
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 36px;
      }
      .item_info {
        margin-top: 30px;
        width: 100%;
        height: 42px;
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
      width: 31.7%;
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
          font-family: PingFangSC-Semibold, PingFang SC;
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
}
</style>