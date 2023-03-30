<template>
  <div class="float-left">
    <div
      class="course-type-item"
      v-for="(item, index) in courseTypes"
      :key="index"
    >
      <div class="title" @click="typeActive = item.key">
        <span>{{ item.name }}</span>
        <span class="ml-15">
          <i class="el-icon-arrow-up" v-if="typeActive === item.key"></i>
          <i class="el-icon-arrow-down" v-else></i>
        </span>
      </div>
      <div class="course-type-links" v-if="typeActive === item.key">
        <div
          class="category-link-item"
          v-for="(item, index) in links"
          :key="index"
        >
          <el-radio v-model="link" :label="item.url">{{ item.name }}</el-radio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["value"],
  data() {
    return {
      typeActive: "vod",
      links: [],
      link: null,
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
    courseTypes() {
      let types = [
        {
          name: "实验课程分类",
          key: "vod",
        },
      ];

      if (this.enabledAddons["Zhibo"]) {
        types.push({
          name: "直播课程分类",
          key: "live",
        });
      }

      if (this.enabledAddons["MeeduBooks"]) {
        types.push({
          name: "电子书分类",
          key: "book",
        });
      }

      if (this.enabledAddons["MeeduTopics"]) {
        types.push({
          name: "图文分类",
          key: "topic",
        });
      }

      if (this.enabledAddons["Paper"]) {
        types.push({
          name: "试卷分类",
          key: "paper",
        });
        types.push({
          name: "模拟试卷分类",
          key: "mock_paper",
        });
        types.push({
          name: "练习分类",
          key: "practice",
        });
      }

      return types;
    },
  },
  watch: {
    typeActive() {
      this.getData();
    },
    link(newVal) {
      if (newVal) {
        this.$emit("input", newVal);
      }
    },
  },
  mounted() {
    this.link = this.value;

    this.getData();
  },
  methods: {
    getData() {
      this.link = null;
      this.links = [];
      if (this.typeActive === "vod") {
        this.getVodCategory();
      } else if (this.typeActive === "live") {
        this.getLiveCategory();
      } else if (this.typeActive === "book") {
        this.getBookCategory();
      } else if (this.typeActive === "topic") {
        this.getTopicCategory();
      } else if (this.typeActive === "paper") {
        this.getPaperCategory();
      } else if (this.typeActive === "mock_paper") {
        this.getMockPaperCategory();
      } else if (this.typeActive === "practice") {
        this.getPracticeCategory();
      }
    },
    getVodCategory() {
      this.$api.Course.Vod.Create().then((res) => {
        let data = res.data.categories;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/packageA/vod/index?category_id=" + item.id,
          });
        });
      });
    },
    getLiveCategory() {
      this.$api.Course.Live.Course.Create().then((res) => {
        let data = res.data.categories;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/packageA/live/index?category_id=" + item.id,
          });
        });
      });
    },
    getBookCategory() {
      this.$api.Meedubook.Book.Create().then((res) => {
        let data = res.data.categories;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/packageA/book/index?category_id=" + item.id,
          });
        });
      });
    },
    getTopicCategory() {
      this.$api.Course.Topic.Topic.Create().then((res) => {
        let data = res.data;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/packageA/topic/index?category_id=" + item.id,
          });
        });
      });
    },
    getPaperCategory() {
      this.$api.Exam.Paper.Create().then((res) => {
        let data = res.data.categories;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/packageA/exam/paper/index?category_id=" + item.id,
          });
        });
      });
    },
    getMockPaperCategory() {
      this.$api.Exam.Paper.Create().then((res) => {
        let data = res.data.categories;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/packageA/exam/mock/index?category_id=" + item.id,
          });
        });
      });
    },
    getPracticeCategory() {
      this.$api.Exam.Practice.Create().then((res) => {
        let data = res.data.categories;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/packageA/exam/practice/index?category_id=" + item.id,
          });
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.course-type-item {
  width: 100%;
  height: auto;
  float: left;
  margin-bottom: 30px;

  .title {
    width: 100%;
    height: auto;
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #303133;
    line-height: 14px;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }
  }

  .course-type-links {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding: 15px;
  }
}

.category-link-item {
  width: 100%;
  height: auto;
  float: left;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
