<template>
  <div class="block-box-comp">
    <div class="title">
      <div class="text">
        {{ config.title }}
      </div>
      <div class="more">更多</div>
    </div>
    <div class="body">
      <div class="ms-item" v-for="(item, index) in config.items" :key="index">
        <div class="ms-thumb">
          <img
            v-if="item.goods_thumb"
            :src="item.goods_thumb"
            width="150"
            height="113"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/default-ms.png"
            width="150"
            height="113"
          />
        </div>

        <div class="ms-body">
          <div class="ms-title">{{ item.goods_title }}</div>
          <div class="ms-info">
            <span class="charge">
              <span class="unit">￥</span>{{ item.charge }}
            </span>
            <span class="ori-charge"> ￥{{ item.original_charge }} </span>
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

    .ms-item {
      width: 100%;
      height: auto;
      float: left;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .ms-thumb {
        margin-right: 15px;
        img {
          border-radius: 4px;
        }
      }

      .ms-body {
        flex: 1;
        padding-top: 5px;

        .ms-title {
          width: 100%;
          height: 45px;
          font-size: 15px;
          font-weight: 500;
          color: #171923;
          line-height: 20px;
          float: left;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 19px;
        }

        .ms-info {
          width: 100%;
          height: auto;
          float: left;

          .charge {
            font-size: 14px;
            font-weight: 600;
            color: #ff5858;
            line-height: 24px;
          }

          .ori-charge {
            text-decoration: line-through;
            font-size: 10px;
            font-weight: 400;
            color: #999999;
            line-height: 10px;
          }
        }
      }
    }
  }
}
</style>