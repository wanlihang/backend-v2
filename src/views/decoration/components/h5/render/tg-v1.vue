<template>
  <div class="block-box-comp">
    <div class="title">
      <div class="text">
        {{ config.title }}
      </div>
      <div class="more">更多</div>
    </div>
    <div class="body">
      <div class="tg-box">
        <div class="tg-item" v-for="(item, index) in config.items" :key="index">
          <div class="tg-thumb">
            <img v-if="item.goods_thumb" :src="item.goods_thumb" width="150" height="113" />
            <img
              v-else
              src="@/assets/images/decoration/h5/default-tg.png"
              width="150"
              height="113"
            />
          </div>
          <div class="tg-info">
            <div class="label">拼团价</div>
            <div class="price">
              <span class="unit">￥</span>{{ item.charge || "XX" }}
            </div>
          </div>
          <div class="tg-title">
            {{ item.goods_title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// config.title 块标题
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.block-box-comp {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 25px 15px;
  background-color: white;

  .title {
    width: 100%;
    height: auto;
    float: left;
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    .text {
      flex: 1;
      font-size: 19px;
      font-weight: 600;
      color: #333333;
      line-height: 19px;
    }

    .more {
      font-size: 13px;
      font-weight: 400;
      color: #999999;
      line-height: 13px;
    }
  }

  .body {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;

    .tg-box {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      overflow-x: auto;
      white-space: nowrap;

      .tg-item {
        display: inline-block;
        width: 150px;
        height: auto;
        margin-right: 15px;

        &:last-child {
          margin-right: 0;
        }

        .tg-thumb {
          width: 150px;
          height: 113px;
          float: left;

          img {
            border-radius: 8px 8px 0px 0px;
          }
        }

        .tg-info {
          width: 100%;
          height: 30px;
          float: left;
          box-sizing: border-box;
          background: linear-gradient(90deg, #ff6033 0%, #fba55b 100%);
          border-radius: 0px 0px 8px 8px;
          display: flex;
          align-items: center;
          padding-left: 10px;
          padding-right: 10px;

          .label {
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 30px;
          }

          .price {
            flex: 1;
            text-align: right;
            font-size: 28rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 30px;

            .unit {
              font-size: 24rpx;
            }
          }
        }

        .tg-title {
          width: 100%;
          height: auto;
          float: left;
          box-sizing: border-box;
          padding-top: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          font-weight: 500;
          color: #171923;
          line-height: 18px;
        }
      }
    }
  }
}
</style>