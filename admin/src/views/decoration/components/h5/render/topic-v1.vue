<template>
  <div class="block-box-comp">
    <div class="title">
      <div class="text">
        {{ config.title }}
      </div>
      <div class="more">更多</div>
    </div>
    <div class="body">
      <div
        class="topic-item"
        v-for="(item, index) in config.items"
        :key="index"
      >
        <div class="topic-body">
          <div class="topic-title">{{ item.title }}</div>
          <div class="topic-info">
            <span>{{ item.view_times || 0 }}阅读</span>
            <span class="ml-15">{{ item.comment_times || 0 }}评论</span>
          </div>
        </div>
        <div class="topic-thumb">
          <img v-if="item.thumb" :src="item.thumb" width="120" height="90" />
          <img
            v-else
            src="@/assets/images/decoration/h5/course-back.png"
            width="120"
            height="90"
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

    .topic-item {
      width: 100%;
      height: auto;
      float: left;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .topic-body {
        flex: 1;
        width: calc(100% - 130px);
        .topic-title {
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
          margin-bottom: 40px;
        }

        .topic-info {
          width: 100%;
          height: 12px;
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          line-height: 12px;
          float: left;
        }
      }

      .topic-thumb {
        width: auto;

        img {
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
