<template>
  <div class="float-left">
    <div class="vod-title">{{ config.title }}</div>
    <div class="vod-courses-box">
      <div class="vod-item" v-for="(item, index) in config.items" :key="index">
        <div class="course-thumb">
          <div
            v-if="item.thumb"
            style="display: inline-block; width: 120px; height: 160px"
          >
            <thumb-bar
              :border="8"
              :value="item.thumb"
              :width="120"
              :height="160"
            ></thumb-bar>
          </div>
          <img
            v-else
            src="@/assets/images/decoration/h5/book-back.png"
            width="120"
            height="160"
          />
        </div>
        <div class="course-title">
          {{ item.name }}
        </div>
        <div class="book-charge">
          <span class="unit">￥</span>{{ item.charge }}
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
.vod-title {
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

.vod-courses-box {
  width: 100%;
  height: auto;
  float: left;
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 50px;

  .vod-item {
    background-color: white;
    border-radius: 8px;
    padding-top: 37px;
    padding-bottom: 15px;
    overflow: hidden;

    .course-thumb {
      width: 100%;
      height: auto;
      float: left;
      text-align: center;

      img {
        display: inline-block;
        border-radius: 8px;
      }
    }

    .course-title {
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
      text-align: center;
    }

    .book-charge {
      width: 100%;
      height: auto;
      float: left;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      color: #ef4444;
      line-height: 20px;

      .unit {
        font-size: 14px;
      }
    }
  }
}
</style>
