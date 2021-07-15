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
          <div class="path-title">{{ item.title }}</div>
          <div class="path-desc">{{ item.desc }}</div>
          <div class="path-info">
            <span>{{ item.courses_count }}</span>
            <span>&dot;</span>
            <span>{{ item.steps_count }}</span>
          </div>
        </div>
        <div class="path-thumb">
          <img v-if="item.thumb" :src="item.thumb" width="120" height="80" />
          <img
            src="@/assets/images/decoration/h5/default-learnPath.png"
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
      align-items: center;

      .path-body {
        flex: 1;

        .path-title {
          width: 100%;
          height: 20px;
          font-size: 15px;
          font-weight: 600;
          color: #171923;
          line-height: 20px;
          float: left;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .path-desc {
          width: 100%;
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          line-height: 17px;
          float: left;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 27px;
        }

        .path-info {
          width: 100%;
          height: 11px;
          font-size: 11px;
          font-weight: 400;
          color: #999999;
          line-height: 11px;
          float: left;
          box-sizing: border-box;
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