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
          name: "录播课程列表",
          url: "/courses",
          active: "courses,course.show,video.show",
        },
      ];

      if (this.enabledAddons["Zhibo"]) {
        links.push({
          name: "直播课程列表",
          url: "/live",
          active: "zhibo.course.index,zhibo.course.show,zhibo.course.play",
        });
      }

      if (this.enabledAddons["MeeduBooks"]) {
        links.push({
          name: "电子书列表",
          url: "/books",
          active: "books,book.show,book.read",
        });
      }

      if (this.enabledAddons["LearningPaths"]) {
        links.push({
          name: "学习路径列表",
          url: "/learn/path",
          active: "learning_path.index,learning_path.show",
        });
      }

      if (this.enabledAddons["MeeduTopics"]) {
        links.push({
          name: "图文列表",
          url: "/topics",
          active: "topic,topic.show",
        });
      }

      if (this.enabledAddons["TuanGou"]) {
        links.push({
          name: "团购列表",
          url: "/tg",
          active: "tuangou,tuangou.show",
        });
      }

      if (this.enabledAddons["MiaoSha"]) {
        links.push({
          name: "秒杀列表",
          url: "/ms",
          active: "miaosha,miaosha.show",
        });
      }

      if (this.enabledAddons["Wenda"]) {
        links.push({
          name: "问答列表",
          url: "/wenda",
          active:
            "wenda.question.index,wenda.question.show,wenda.question.create,wenda.question.edit",
        });
      }

      if (this.enabledAddons["CodeExchanger"]) {
        links.push({
          name: "兑换码",
          url: "/exchanger",
          active: "exchanger",
        });
      }

      if (this.enabledAddons["Paper"]) {
        links.push({
          name: "考试首页",
          url: "/papers",
          active: "papers,paper.show",
        });
        links.push({
          name: "模拟考试首页",
          url: "/mock_papers",
          active: "exam.mock_paper,exam.mock_paper.show",
        });
        links.push({
          name: "在线练习首页",
          url: "/practices",
          active: "practices,practice.show",
        });
        links.push({
          name: "错题本",
          url: "/exam/wrongbook",
          active: null,
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