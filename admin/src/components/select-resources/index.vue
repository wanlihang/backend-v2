<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">选择</div>
      <div class="meedu-dialog-body">
        <div class="float-left">
          <el-tabs v-model="resourceActive">
            <el-tab-pane
              :label="item.name"
              :name="item.key"
              v-for="(item, index) in avaliableResources"
              :key="index"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="float-left">
          <vod-comp v-if="resourceActive === 'vod'" @change="change"></vod-comp>
          <live-comp
            v-else-if="resourceActive === 'live'"
            @change="change"
          ></live-comp>
          <book-comp
            v-else-if="resourceActive === 'book'"
            @change="change"
          ></book-comp>
          <topic-comp
            v-else-if="resourceActive === 'topic'"
            @change="change"
          ></topic-comp>
          <paper-comp
            v-else-if="resourceActive === 'paper'"
            @change="change"
          ></paper-comp>
          <mock-paper-comp
            v-else-if="resourceActive === 'mock-paper'"
            @change="change"
          ></mock-paper-comp>
          <practice-comp
            v-else-if="resourceActive === 'practice'"
            @change="change"
          ></practice-comp>
          <learn-path-comp
            v-else-if="resourceActive === 'learn-path'"
            @change="change"
          ></learn-path-comp>
          <vip-comp
            v-else-if="resourceActive === 'vip'"
            @change="change"
          ></vip-comp>
          <video-comp
            v-else-if="resourceActive === 'video'"
            @change="change"
          ></video-comp>
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
import VodComp from "./components/vod.vue";
import LiveComp from "./components/live.vue";
import BookComp from "./components/book.vue";
import TopicComp from "./components/topic.vue";
import PaperComp from "./components/paper.vue";
import PracticeComp from "./components/practice.vue";
import MockPaperComp from "./components/mock-paper.vue";
import LearnPathComp from "./components/learn-path.vue";
import VipComp from "./components/vip.vue";
import VideoComp from "./components/video.vue";

export default {
  components: {
    VodComp,
    LiveComp,
    BookComp,
    TopicComp,
    PaperComp,
    MockPaperComp,
    PracticeComp,
    LearnPathComp,
    VipComp,
    VideoComp,
  },
  props: ["show", "selectedIds", "enabledResource"],
  data() {
    return {
      selectedResult: null,
      resourceActive: "vod",
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
    avaliableResources() {
      let resources = [];

      if (this.enabledResourceMap["vod"]) {
        resources.push({
          name: "实验课程",
          key: "vod",
        });
      }

      if (this.enabledResourceMap["vip"]) {
        resources.push({
          name: "VIP会员",
          key: "vip",
        });
      }

      if (this.enabledResourceMap["video"]) {
        resources.push({
          name: "视频",
          key: "video",
        });
      }

      if (this.enabledResourceMap["live"] && this.enabledAddons["Zhibo"]) {
        resources.push({
          name: "直播",
          key: "live",
        });
      }

      if (this.enabledResourceMap["book"] && this.enabledAddons["MeeduBooks"]) {
        resources.push({
          name: "电子书",
          key: "book",
        });
      }

      if (
        this.enabledResourceMap["learnPath"] &&
        this.enabledAddons["LearningPaths"]
      ) {
        resources.push({
          name: "学习路径",
          key: "learn-path",
        });
      }

      if (
        this.enabledResourceMap["topic"] &&
        this.enabledAddons["MeeduTopics"]
      ) {
        resources.push({
          name: "图文",
          key: "topic",
        });
      }

      if (this.enabledAddons["Paper"]) {
        if (this.enabledResourceMap["paper"]) {
          resources.push({
            name: "试卷",
            key: "paper",
          });
        }
        if (this.enabledResourceMap["mock-paper"]) {
          resources.push({
            name: "模拟卷",
            key: "mock-paper",
          });
        }
        if (this.enabledResourceMap["practice"]) {
          resources.push({
            name: "练习",
            key: "practice",
          });
        }
      }

      return resources;
    },
    enabledResourceMap() {
      if (!this.enabledResource) {
        return {};
      }
      let items = this.enabledResource.split(",");
      let r = {};
      items.forEach((item) => {
        r[item] = 1;
      });

      return r;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      if (this.selectedResult === null) {
        this.$message.warning("请先选择内容");
        return;
      }
      this.$emit("change", this.selectedResult);
    },
    change(result) {
      this.selectedResult = result;
    },
  },
};
</script>

<style lang="less" scoped>
.meedu-dialog-box {
  width: 900px !important;
  margin-left: -450px !important;
}
</style>
