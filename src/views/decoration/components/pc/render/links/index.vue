<template>
  <div class="link-box">
    <div class="float-left" @click="showListWin = true">
      <div class="title">友情链接</div>
      <div class="links">
        <div class="link-item" v-for="(item, index) in list" :key="index">
          {{ item.name }}
        </div>
      </div>
    </div>

    <list-comp :show="showListWin" @close="close"></list-comp>
  </div>
</template>

<script>
import ListComp from "./list.vue";

export default {
  props: ["reload"],
  components: {
    ListComp,
  },
  data() {
    return {
      showListWin: false,
      list: [],
    };
  },
  watch: {
    reload() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.System.Links.List({
        page: 1,
        size: 1000,
      }).then((res) => {
        this.list = res.data.data;
      });
    },
    close() {
      this.showListWin = false;
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.link-box {
  width: 100%;
  height: auto;
  float: left;
  background-color: #0f0a1e;
  box-sizing: border-box;
  padding: 30px 30px 0 30px;
  cursor: pointer;

  .title {
    width: 100%;
    height: auto;
    float: left;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    line-height: 20px;
  }

  .links {
    width: 100%;
    height: auto;
    float: left;

    .link-item {
      display: inline-block;
      margin-right: 30px;
      margin-bottom: 30px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(white, 0.5);
      line-height: 16px;
    }
  }
}
</style>
