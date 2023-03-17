<template>
  <div class="sliders-box">
    <div class="float-left" @click="showListWin = true">
      <template v-if="list.length > 0">
        <el-carousel :height="parseInt(width / 3) + 'px'">
          <el-carousel-item v-for="(item, index) in list" :key="index">
            <img
              :src="item.thumb"
              :width="width"
              :height="parseInt(width / 3)"
            />
          </el-carousel-item>
        </el-carousel>
      </template>
      <div class="empty-data" v-else>请添加幻灯片</div>
    </div>

    <list-comp :show="showListWin" @close="close"></list-comp>
  </div>
</template>

<script>
import ListComp from "./list.vue";

export default {
  props: ["reload", "width"],
  components: { ListComp },
  data() {
    return {
      showListWin: false,
      platform: "PC",
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
      this.$api.System.Sliders.List({
        platform: this.platform,
      }).then((res) => {
        this.list = res.data;
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
.sliders-box {
  width: 100%;
  height: auto;
  float: left;
  cursor: pointer;
}

.empty-data {
  width: 100%;
  height: 400px;
  float: left;
  line-height: 400px;
  text-align: center;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
