<template>
  <div class="book-block-box">
    <div class="vod-block-box">
      <div class="title">
        <div class="text">
          {{ config.title }}
        </div>
        <div class="more">更多</div>
      </div>
      <div class="body">
        <div
          class="book-item"
          v-for="(item, index) in config.items"
          :key="index"
        >
          <div class="book-thumb">
            <img v-if="item.thumb" :src="item.thumb" width="90" height="120" />
            <img
              v-else
              src="@/assets/images/decoration/h5/book-back.png"
              width="90"
              height="120"
            />
          </div>
          <div class="book-body">
            <div class="book-name">{{ item.name }}</div>
            <div class="book-desc">
              {{ item.short_desc }}
            </div>
            <div class="book-info">
              <div class="sub">
                <span>{{ item.user_count || 0 }}人已订阅</span>
              </div>
              <div class="price">
                <small class="unit">￥</small>
                <span>{{ item.charge || "XX" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// config.title 块标题
// config.items 电子书集
// config.items[].id id
// config.items[].name 电子书名
// config.items[].thumb 电子书封面
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.book-block-box {
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

    .book-item {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .book-thumb {
        margin-right: 15px;

        img {
          border-radius: 4px;
        }
      }

      .book-body {
        flex: 1;
        width: calc(100% - 105px);
        .book-name {
          width: 100%;
          float: left;
          height: 20px;
          font-size: 15px;
          font-weight: 500;
          color: #171923;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 10px;
        }

        .book-desc {
          width: 100%;
          height: 51px;
          float: left;
          margin-bottom: 19px;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          line-height: 17px;
        }

        .book-info {
          width: 100%;
          height: 20px;
          float: left;
          display: flex;
          align-items: center;

          .sub {
            flex: 1;
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            line-height: 12px;
          }

          .price {
            flex: 1;
            text-align: right;
            font-size: 14px;
            font-weight: 600;
            color: #ff5858;
            line-height: 20px;

            .unit {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
