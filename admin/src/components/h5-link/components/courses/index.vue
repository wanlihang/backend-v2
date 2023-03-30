<template>
  <div class="float-left">
    <div class="float-left mb-15 d-flex">
      <div class="form-label">请选择课程类型</div>
      <div class="ml-15">
        <el-select v-model="typeActive">
          <el-option
            v-for="(item, index) in courseTypes"
            :key="index"
            :label="item.name"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="float-left">
      <vod-comp v-model="link" v-if="typeActive === 'vod'"></vod-comp>
      <live-comp v-model="link" v-else-if="typeActive === 'live'"></live-comp>
      <book-comp v-model="link" v-else-if="typeActive === 'book'"></book-comp>
      <topic-comp
        v-model="link"
        v-else-if="typeActive === 'topic'"
      ></topic-comp>
      <ms-comp v-model="link" v-else-if="typeActive === 'ms'"></ms-comp>
      <tg-comp v-model="link" v-else-if="typeActive === 'tg'"></tg-comp>
      <learn-path-comp
        v-model="link"
        v-else-if="typeActive === 'learnPath'"
      ></learn-path-comp>
      <paper-comp
        v-model="link"
        v-else-if="typeActive === 'paper'"
      ></paper-comp>
      <mock-paper-comp
        v-model="link"
        v-else-if="typeActive === 'mock-paper'"
      ></mock-paper-comp>
      <practice-comp
        v-model="link"
        v-else-if="typeActive === 'practice'"
      ></practice-comp>
    </div>
  </div>
</template>
<script>
import VodComp from "./components/vod.vue";
import LiveComp from "./components/live.vue";
import BookComp from "./components/book.vue";
import TopicComp from "./components/topic.vue";
import MsComp from "./components/ms.vue";
import TgComp from "./components/tg.vue";
import LearnPathComp from "./components/learn-path.vue";
import PaperComp from "./components/paper.vue";
import MockPaperComp from "./components/mock-paper.vue";
import PracticeComp from "./components/practice.vue";
import { mapState } from "vuex";

export default {
  components: {
    VodComp,
    LiveComp,
    BookComp,
    TopicComp,
    MsComp,
    TgComp,
    LearnPathComp,
    PaperComp,
    MockPaperComp,
    PracticeComp,
  },
  props: ["value"],
  data() {
    return {
      typeActive: "vod",
      link: null,
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
    courseTypes() {
      let types = [
        {
          name: "实验课程",
          key: "vod",
        },
      ];

      if (this.enabledAddons["Zhibo"]) {
        types.push({
          name: "直播课程",
          key: "live",
        });
      }

      if (this.enabledAddons["MeeduBooks"]) {
        types.push({
          name: "电子书",
          key: "book",
        });
      }

      if (this.enabledAddons["MeeduTopics"]) {
        types.push({
          name: "图文",
          key: "topic",
        });
      }

      if (this.enabledAddons["Paper"]) {
        types.push({
          name: "试卷",
          key: "paper",
        });

        types.push({
          name: "模拟试卷",
          key: "mock-paper",
        });

        types.push({
          name: "练习",
          key: "practice",
        });
      }

      // if (this.enabledAddons["MiaoSha"]) {
      //   types.push({
      //     name: "秒杀",
      //     key: "ms",
      //   });
      // }

      // if (this.enabledAddons["TuanGou"]) {
      //   types.push({
      //     name: "团购",
      //     key: "tg",
      //   });
      // }

      if (this.enabledAddons["LearningPaths"]) {
        types.push({
          name: "学习路径",
          key: "learnPath",
        });
      }

      return types;
    },
  },
  watch: {
    link(newVal) {
      this.$emit("input", newVal);
    },
  },
  mounted() {
    this.link = this.value;
  },
};
</script>

<style lang="less" scoped>
.form-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
}
</style>
