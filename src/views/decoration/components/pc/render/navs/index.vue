<template>
  <div class="float-left">
    <div class="navs" @click="showListWin = true">
      <div class="nav-item" v-for="(item, index) in list" :key="index">
        {{ item.name }}
        <i class="el-icon-arrow-down" v-if="item.children.length > 0"></i>
        <div class="nav-children" v-if="item.children.length > 0">
          <div
            class="nav-children-item"
            v-for="(item, index2) in item.children"
            :key="index2"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

    <navs-list @close="close" :show="showListWin"></navs-list>
  </div>
</template>

<script>
import NavsList from "./list.vue";
export default {
  components: { NavsList },
  data() {
    return {
      showListWin: false,
      list: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.System.Navs.List().then((res) => {
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
.navs {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: white;
  cursor: pointer;

  .nav-item {
    position: relative;
    width: 100px;
    height: 50px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    line-height: 50px;
    text-align: center;

    .nav-children {
      display: none;
      position: absolute;
      z-index: 11;
      top: 50px;
      left: -25px;
      background-color: white;
      box-sizing: border-box;

      .nav-children-item {
        width: 150px;
        height: 50px;
        line-height: 50px;
        float: left;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);

      .nav-children {
        display: block;
      }
    }
  }
}
</style>