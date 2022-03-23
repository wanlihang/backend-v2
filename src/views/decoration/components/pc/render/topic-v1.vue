<template>
  <div class="float-left">
    <div class="title">{{ config.title }}</div>
    <div class="topics-box">
      <div
        class="topic-item"
        v-for="(item, index) in config.items"
        :key="index"
      >
        <div class="topic-thumb">
          <thumb-bar
            v-if="item.thumb"
            :value="item.thumb"
            :width="133"
            :height="100"
          ></thumb-bar>
          <img
            v-else
            src="@/assets/images/decoration/h5/course-back.png"
            width="133"
            height="100"
          />
        </div>
        <div class="topic-body">
          <div class="topic-title">{{ item.title }}</div>
          <div class="topic-info">
            <div class="topic-category">
              <span class="category" v-if="item.category">{{
                item.category.name
              }}</span>
            </div>
            <div class="view-times">{{ item.view_times }}次阅读</div>
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

.topics-box {
  width: 100%;
  height: auto;
  float: left;
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 50px;

  .topic-item {
    display: flex;
    box-sizing: border-box;
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    overflow: hidden;

    .topic-thumb {
      margin-right: 20px;
      border-radius: 8px;
      overflow: hidden;

      img {
        border-radius: 8px;
      }
    }

    .topic-body {
      flex: 1;
      padding-top: 15px;

      .topic-title {
        width: 100%;
        height: auto;
        float: left;
        font-size: 18px;
        line-height: 24px;
        font-weight: 600;
        color: #333333;
        line-height: 18px;
        word-break: break-all;
        margin-bottom: 30px;
      }

      .topic-info {
        width: 100%;
        height: auto;
        float: left;
        display: flex;
        align-items: center;

        .topic-category {
          margin-right: 15px;

          .category {
            border-radius: 12px;
            padding: 5px 8px;
            font-size: 14px;
            font-weight: 400;
            color: #ef4444;
            line-height: 14px;
            background-color: rgba(#ef4444, 0.1);
          }
        }

        .view-times {
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
