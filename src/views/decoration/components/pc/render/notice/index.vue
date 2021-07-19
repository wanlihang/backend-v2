<template>
  <div class="float-left">
    <div class="notice-box" @click="showListWin = true">{{ title || '未配置公告' }}</div>
    <list-comp :show="showListWin" @close="close"></list-comp>
  </div>
</template>

<script>
import ListComp from "./list.vue";
export default {
  components: {
    ListComp,
  },
  data() {
    return {
      showListWin: false,
      title: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.System.Announcement.List({ page: 1, size: 1 }).then((res) => {
        if (res.data.data.length > 0) {
          this.title = res.data.data[0].title;
        }
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
.notice-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  background-color: #fff9d7;
  padding: 17px 30px;
  font-size: 16px;
  font-weight: 400;
  color: #de7a0b;
  line-height: 22px;
  cursor: pointer;
}
</style>