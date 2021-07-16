<template>
  <div class="float-left">
    <div class="float-left mb-15 d-flex">
      <div>请选择课程类型</div>
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
      <vod-comp
        v-model="link"
        v-if="typeActive === 'vod'"
      ></vod-comp>
    </div>
  </div>
</template>
<script>
import VodComp from "./components/vod.vue";
import { mapState } from "vuex";

export default {
  components: {
    VodComp,
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
          name: "录播课程",
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
          key: "live",
        });
      }

      if (this.enabledAddons["Paper"]) {
        types.push({
          name: "试卷",
          key: "paper",
        });

        types.push({
          name: "模拟试卷",
          key: "mock_paper",
        });

        types.push({
          name: "练习",
          key: "practice",
        });
      }

      if (this.enabledAddons["MiaoSha"]) {
        types.push({
          name: "秒杀",
          key: "ms",
        });
      }

      if (this.enabledAddons["TuanGou"]) {
        types.push({
          name: "团购",
          key: "tg",
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
  }
};
</script>