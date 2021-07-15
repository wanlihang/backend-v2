<template>
  <div class="live-block-box">
    <div class="title">
      <div class="text">
        {{ config.title }}
      </div>
      <div class="more">更多</div>
    </div>
    <div class="body">
      <div class="courses-box">
        <div
          class="course-item"
          v-for="(item, index) in config.items"
          :key="index"
        >
          <div class="course-thumb">
            <img
              v-if="item.thumb"
              :src="item.thumb"
              width="100%"
              height="124"
            />
            <img
              src="@/assets/images/decoration/h5/default-live.png"
              width="100%"
              height="124"
            />
          </div>
          <div class="course-title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// config.title = 块标题
// config.items 课程集
// config.items[].id = 课程id
// config.items[].thumb = 课程封面
// config.items[].title = 课程标题
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.live-block-box {
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

    .courses-box {
      width: 100%;
      height: auto;
      float: left;
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(2, minmax(0, 1fr));

      .course-thumb {
        img {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
      }

      .course-title {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 8px;
        background: #f6f6f6;
        border-radius: 0px 0px 8px 8px;
        float: left;
        font-size: 13px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>