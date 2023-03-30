<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">选择链接</div>
      <div class="meedu-dialog-body">
        <div
          class="func-link-item"
          v-for="(item, index) in funcLinks"
          :key="index"
        >
          <el-radio v-model="link" :label="index">
            {{ item.name }}
          </el-radio>
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
import { mapState } from "vuex";

export default {
  props: ["show"],
  data() {
    return {
      link: null,
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
    funcLinks() {
      let links = [
        {
          name: "首页",
          url: "/",
          active: "index",
        },
        {
          name: "实验课程",
          url: "/courses",
          active: "courses,course.show,video.show",
        },
      ];

      if (this.enabledAddons["Zhibo"]) {
        links.push({
          name: "直播课程",
          url: "/live",
          active: "zhibo.course.index,zhibo.course.show,zhibo.course.play",
        });
      }

      if (this.enabledAddons["MeeduBooks"]) {
        links.push({
          name: "电子书",
          url: "/book",
          active: "books,book.show,book.read",
        });
      }

      if (this.enabledAddons["LearningPaths"]) {
        links.push({
          name: "学习路径",
          url: "/learnPath",
          active: "learning_path.index,learning_path.show",
        });
      }

      if (this.enabledAddons["MeeduTopics"]) {
        links.push({
          name: "图文",
          url: "/topic",
          active: "topic,topic.show",
        });
      }

      if (this.enabledAddons["Wenda"]) {
        links.push({
          name: "问答",
          url: "/wenda",
          active:
            "wenda.question.index,wenda.question.show,wenda.question.create,wenda.question.edit",
        });
      }

      if (this.enabledAddons["CodeExchanger"]) {
        links.push({
          name: "兑换码",
          url: "/member/codeexchanger",
          active: "exchanger",
        });
      }

      if (this.enabledAddons["Paper"]) {
        links.push({
          name: "考试练习首页",
          url: "/exam",
          active: "papers,paper.show",
        });
        links.push({
          name: "在线考试",
          url: "/exam/papers",
          active: "papers,paper.show",
        });
        links.push({
          name: "模拟考试",
          url: "/exam/mockpaper",
          active: "exam.mock_paper,exam.mock_paper.show",
        });
        links.push({
          name: "练习",
          url: "/exam/practice",
          active: "practices,practice.show",
        });
      }

      return links;
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
      this.$emit("change", this.funcLinks[this.link]);
    },
  },
};
</script>

<style lang="less" scoped>
.func-link-item {
  width: 100%;
  height: auto;
  float: left;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
