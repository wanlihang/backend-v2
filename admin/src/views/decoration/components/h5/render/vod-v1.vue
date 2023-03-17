<template>
  <div class="vod-block-box">
    <div class="title">
      <div class="text">
        {{ config.title }}
      </div>
      <div class="more">更多</div>
    </div>
    <div class="body">
      <div
        class="course-item"
        v-for="(item, index) in config.items"
        :key="index"
      >
        <div class="course-thumb">
          <img v-if="item.thumb" :src="item.thumb" width="120" height="90" />
          <img
            v-else
            src="@/assets/images/decoration/h5/course-back.png"
            width="120"
            height="90"
          />
        </div>
        <div class="course-body">
          <div class="course-title">{{ item.title }}</div>
          <div class="course-info">
            <div class="sub">
              <span>{{ item.user_count || 0 }}人已订阅</span>
            </div>
            <div class="price"><small>￥</small>{{ item.charge || "XX" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// config.title = 块标题
// config.items = 课程列表
// config.items[].id = 课程id
// config.items[].thumb = 课程封面
// config.items[].title = 课程标题
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.vod-block-box {
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

    .course-item {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      display: flex;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .course-thumb {
        width: 120px;
        height: 90px;
        margin-right: 10px;

        img {
          border-radius: 4px;
        }
      }

      .course-body {
        flex: 1;
        padding-top: 5px;

        .course-title {
          width: 100%;
          height: 60px;
          float: left;
          font-size: 15px;
          font-weight: 500;
          color: #171923;
          line-height: 20px;
          margin-bottom: 5px;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .course-info {
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
            line-height: 20px;
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

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
