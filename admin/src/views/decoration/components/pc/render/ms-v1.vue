<template>
  <div class="float-left">
    <div class="title">{{ config.title }}</div>
    <div class="ms-box">
      <div class="ms-item" v-for="(item, index) in config.items" :key="index">
        <div class="ms-thumb">
          <template v-if="item.goods_thumb">
            <thumb-bar
              v-if="item.goods_type === 'book'"
              :value="item.goods_thumb"
              :border="8"
              :width="148.5"
              :height="198"
            ></thumb-bar>
            <thumb-bar
              v-else
              :value="item.goods_thumb"
              :width="264"
              :height="198"
            ></thumb-bar>
          </template>
          <img
            v-else
            src="@/assets/images/decoration/h5/course-back.png"
            width="100%"
          />
        </div>
        <div class="ms-title">{{ item.goods_title }}</div>
        <div class="ms-charge">
          <div class="charge">
            <div class="now-charge">
              <span class="unit">￥</span>{{ item.charge }}
            </div>
            <div class="ori-charge">
              <span class="unit">￥</span>{{ item.original_charge }}
            </div>
          </div>
          <div class="options">
            <div class="btn-go">立即抢购</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["config"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: auto;
  float: left;
  font-size: 30px;
  font-weight: 600;
  color: #333333;
  line-height: 30px;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
}

.ms-box {
  width: 100%;
  height: auto;
  float: left;
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 50px;

  .ms-item {
    box-sizing: border-box;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;

    .ms-thumb {
      width: 100%;
      height: auto;
      float: left;

      img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }

    .ms-title {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      padding: 15px 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
    }

    .ms-charge {
      width: 100%;
      height: auto;
      float: left;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 8px 15px 8px;

      .charge {
        flex: 1;
        margin-right: 15px;

        .now-charge {
          width: 100%;
          height: auto;
          float: left;
          font-size: 14px;
          font-weight: 600;
          color: #ef4444;
          line-height: 20px;
          margin-bottom: 10px;

          .unit {
            font-size: 14px;
          }
        }

        .ori-charge {
          width: 100%;
          height: auto;
          float: left;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 14px;
          text-decoration: line-through;
        }
      }

      .options {
        flex: 1;

        .btn-go {
          width: 100%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(90deg, #fa1b1b 0%, #ff7946 100%);
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
