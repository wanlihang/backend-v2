<template>
  <div class="float-left">
    <div class="title">{{ config.title }}</div>
    <div class="learn-path-box">
      <div class="path-item" v-for="(item, index) in config.items" :key="index">
        <div class="path-thumb">
          <thumb-bar
            v-if="item.thumb"
            :value="item.thumb"
            :width="173"
            :height="130"
          ></thumb-bar>
          <img
            v-else
            src="@/assets/images/decoration/h5/course-back.png"
            width="173"
            height="130"
          />
        </div>
        <div class="path-body">
          <div class="path-title">{{ item.name }}</div>
          <div class="path-charge">
            <div class="charge">
              <span class="unit">￥</span>{{ item.charge }}
            </div>
            <div class="count">
              <span>{{ item.steps_count }}个步骤</span>
              <span class="ml-10">{{ item.courses_count }}个课程</span>
            </div>
          </div>
          <div class="path-desc">{{ item.desc }}</div>
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

.learn-path-box {
  width: 100%;
  height: auto;
  float: left;
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 50px;

  .path-item {
    box-sizing: border-box;
    padding: 15px;
    background-color: white;
    display: flex;
    align-items: center;

    .path-thumb {
      margin-right: 20px;
      border-radius: 8px;
      overflow: hidden;

      img {
        border-radius: 8px;
      }
    }

    .path-body {
      flex: 1;
      padding-top: 5px;

      .path-title {
        width: 100%;
        height: auto;
        float: left;
        font-size: 20px;
        font-weight: 500;
        color: #333333;
        line-height: 20px;
        margin-bottom: 20px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .path-charge {
        width: 100%;
        height: auto;
        float: left;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .charge {
          font-size: 14px;
          font-weight: 600;
          color: #ef4444;
          line-height: 20px;

          .unit {
            font-size: 14px;
          }
        }
        .count {
          margin-left: 30px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 14px;
        }
      }

      .path-desc {
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
