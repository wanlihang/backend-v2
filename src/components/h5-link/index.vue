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
                class="func-link-item"
                v-for="(item, index) in funcLinks"
                :key="index"
              >
                <el-radio v-model="link" :label="item.url">
                  {{ item.name }}
                </el-radio>
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
import { mapState } from "vuex";

export default {
  components: {
    CourseCategory,
    Courses,
  },
  props: ["show"],
  data() {
    return {
      link: null,
      tabActive: "func",
    };
  },
  computed: {
    ...mapState(["enabledAddons", "enabledAddonsCount"]),
    tabs() {
      let tabs = [
        {
          name: "功能",
          key: "func",
        },
        {
          name: "课程",
          key: "course",
        },
      ];

      return tabs;
    },
    funcLinks() {
      let links = [
        {
          name: "录播课程",
          url: "/packageA/vod/index",
        },
      ];

      if (this.enabledAddons["Zhibo"]) {
        links.push({
          name: "直播课程",
          url: "/packageA/live/index",
        });
      }

      if (this.enabledAddons["MeeduBooks"]) {
        links.push({
          name: "电子书",
          url: "/packageA/book/index",
        });
      }

      if (this.enabledAddons["LearningPaths"]) {
        links.push({
          name: "学习路径",
          url: "/packageA/learnPath/index",
        });
      }

      if (this.enabledAddons["MeeduTopics"]) {
        links.push({
          name: "图文",
          url: "/packageA/topic/index",
        });
      }

      // if (this.enabledAddons["TuanGou"]) {
      //   links.push({
      //     name: "团购列表",
      //     url: "/packageA/tg/index",
      //   });
      // }

      // if (this.enabledAddons["MiaoSha"]) {
      //   links.push({
      //     name: "秒杀",
      //     url: "/packageA/ms/index",
      //   });
      // }

      if (this.enabledAddons["Wenda"]) {
        links.push({
          name: "问答",
          url: "/packageA/qa/index",
        });
      }

      if (this.enabledAddons["Paper"]) {
        links.push({
          name: "在线考试",
          url: "/packageA/exam/paper/index",
        });
        links.push({
          name: "模拟考试",
          url: "/packageA/exam/mock/index",
        });
        links.push({
          name: "练习",
          url: "/packageA/exam/practice/index",
        });
      }
      if (this.enabledAddons["Credit1Mall"]) {
        links.push({
          name: "积分商城",
          url: "/packageA/member/credit1",
          active: null,
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

      let link = this.link;

      if (link === "/packageA/vod/index" && this.enabledAddonsCount === 0) {
        link = "/courses";
      }

      this.$emit("change", link);
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

.func-link-item {
  width: 100%;
  height: auto;
  float: left;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}

.meedu-dialog-box {
  width: 900px !important;
  margin-left: -450px !important;
}
</style>
