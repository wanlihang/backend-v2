<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">选择链接</div>
      <div class="meedu-dialog-body">
        <div class="link-box">
          <div class="tabs">
            <div
              class="tab-item"
              :class="{ active: item.key === tabActive }"
              v-for="(item, index) in tabs"
              :key="index"
              @click="tabActive = item.key"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="link-body">
            <template v-if="tabActive === 'func'">
              <div
                class="float-left mb-15"
                v-for="(item, index) in funcLinks"
                :key="index"
              >
                <el-radio v-model="link" :label="item.url">{{
                  item.name
                }}</el-radio>
              </div>
            </template>

            <course-category
              v-else-if="tabActive === 'category'"
              v-model="link"
            ></course-category>

            <courses
              v-model="link"
              v-else-if="tabActive === 'course'"
            ></courses>

            <single-page
              v-model="link"
              v-else-if="tabActive === 'single-page'"
            ></single-page>
          </div>
        </div>
      </div>
      <div class="meedu-dialog-footer">
        <el-button type="primary" @click="confirm"> 确定 </el-button>
        <el-button @click="close" class="ml-30">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCategory from "./components/course-category.vue";
import Courses from "./components/courses/index";
import SinglePage from "./components/single-page.vue";
import { mapState } from "vuex";

export default {
  components: {
    CourseCategory,
    Courses,
    SinglePage,
  },
  props: ["show"],
  data() {
    return {
      link: null,
      tabActive: "func",
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
    tabs() {
      let tabs = [
        {
          name: "功能",
          key: "func",
        },
        {
          name: "课程分类",
          key: "category",
        },
        {
          name: "课程",
          key: "course",
        },
      ];

      if (this.enabledAddons["SinglePage"]) {
        tabs.push({
          name: "单页",
          key: "single-page",
        });
      }

      return tabs;
    },
    funcLinks() {
      let links = [
        {
          name: "录播课程列表",
          url: "/packageA/vod/index",
        },
      ];

      if (this.enabledAddons["Zhibo"]) {
        links.push({
          name: "直播课程列表",
          url: "/packageA/live/index",
        });
      }

      if (this.enabledAddons["MeeduBooks"]) {
        links.push({
          name: "电子书列表",
          url: "/packageA/book/index",
        });
      }

      if (this.enabledAddons["LearningPaths"]) {
        links.push({
          name: "学习路径列表",
          url: "/packageA/learnPath/index",
        });
      }

      if (this.enabledAddons["MeeduTopics"]) {
        links.push({
          name: "图文列表",
          url: "/packageA/topic/index",
        });
      }

      if (this.enabledAddons["TuanGou"]) {
        links.push({
          name: "团购列表",
          url: "/packageA/tg/index",
        });
      }

      if (this.enabledAddons["MiaoSha"]) {
        links.push({
          name: "秒杀列表",
          url: "/packageA/ms/index",
        });
      }

      if (this.enabledAddons["Wenda"]) {
        links.push({
          name: "问答列表",
          url: "/packageA/qa/index",
        });
      }

      if (this.enabledAddons["Paper"]) {
        links.push({
          name: "考试首页",
          url: "/packageA/exam/paper/index",
        });
        links.push({
          name: "模拟考试首页",
          url: "/packageA/exam/mock/index",
        });
        links.push({
          name: "在线练习首页",
          url: "/packageA/exam/practice/index",
        });
        links.push({
          name: "错题本",
          url: "/packageA/exam/wrongbook/index",
        });
      }

      return links;
    },
  },
  watch: {
    tabActive() {
      this.link = null;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      if (this.link === null) {
        this.$message.warning("请选择链接");
        return;
      }
      this.$emit("change", this.link);
    },
  },
};
</script>

<style lang="less" scoped>
.link-box {
  width: 100%;
  height: auto;
  float: left;

  .tabs {
    width: 100%;
    height: auto;
    float: left;

    .tab-item {
      width: 96px;
      height: 36px;
      float: left;
      border-top: 1px solid #dcdfe6;
      border-left: 1px solid #dcdfe6;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      font-weight: 400;
      color: #303133;
      cursor: pointer;

      &:first-child {
        border-top-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-right: 1px solid #dcdfe6;
      }

      &.active {
        color: @primary-color;
      }
    }
  }

  .link-body {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding: 30px;
    border: 1px solid #dcdfe6;
    overflow-y: auto;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.meedu-dialog-box {
  width: 900px !important;
  margin-left: -450px !important;
}
</style>