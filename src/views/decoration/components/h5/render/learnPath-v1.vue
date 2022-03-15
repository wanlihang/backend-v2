<template>
  <div class="block-box-comp">
    <div class="title">
      <div class="text">
        {{ config.title }}
      </div>
      <div class="more">更多</div>
    </div>
    <div class="body">
      <div class="path-item" v-for="(item, index) in config.items" :key="index">
        <div class="path-body">
          <div class="path-title">{{ item.name }}</div>
          <div class="path-desc">{{ item.desc }}</div>
          <div class="path-info">
            <span>{{ item.steps_count || 0 }}个步骤</span>
            <span>&dot;</span>
            <span>{{ item.courses_count || 0 }}个课程</span>
          </div>
        </div>
        <div class="path-thumb">
          <img v-if="item.thumb" :src="item.thumb" width="120" height="80" />
          <img
            v-else
            src="@/assets/images/decoration/h5/course-back.png"
            width="120"
            height="80"
          />
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

    .path-item {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      display: flex;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .path-body {
        flex: 1;
        width: calc(100% - 130px);
        .path-title {
          width: 100%;
          height: 20px;
          float: left;
          line-height: 20px;
          font-size: 15px;
          font-weight: 600;
          color: #171923;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .path-desc {
          width: 100%;
          height: 17px;
          line-height: 17px;
          float: left;
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 27px;
        }

        .path-info {
          width: 100%;
          height: auto;
          float: left;
          font-size: 11px;
          line-height: 11px;
          font-weight: 400;
        }
      }

      .path-thumb {
        margin-left: 10px;
        img {
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
