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
      <div class="course-type-links">
        <div
          class="float-left mb-15"
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
          name: "录播课程分类",
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
          key: "live",
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
    typeActice() {
      this.getData();
    },
    link(newVal) {
      this.$emit("input", newVal);
    },
  },
  mounted() {
    this.link = this.value;

    this.getData();
  },
  methods: {
    getData() {
      this.links = [];
      if (this.typeActive === "vod") {
        this.getVodCategory();
      }
    },
    getVodCategory() {
      this.$api.Course.Vod.Create().then((res) => {
        let data = res.data.categories;
        data.forEach((item) => {
          this.links.push({
            name: item.name,
            url: "/pages/course/show?id=" + item.id,
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
</style>