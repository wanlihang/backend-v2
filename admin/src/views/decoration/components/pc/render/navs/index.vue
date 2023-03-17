<template>
  <div class="float-left">
    <div class="navs" @click="showListWin = true">
      <template v-if="list.length > 0">
        <div class="nav-item" v-for="(item, index) in list" :key="index">
          {{ item.name }}
          <template v-if="item.children.length > 0">
            <i class="el-icon-arrow-down"></i>
            <div class="nav-children">
              <div
                class="nav-children-item"
                v-for="(item, index2) in item.children"
                :key="index2"
              >
                {{ item.name }}
              </div>
            </div>
          </template>
        </div>
      </template>

      <span class="ml-10 helper-text" v-else>未配置导航栏</span>
    </div>

    <navs-list @close="close" :show="showListWin"></navs-list>
  </div>
</template>

<script>
import NavsList from "./list.vue";
export default {
  props: ["reload"],
  components: { NavsList },
  data() {
    return {
      platform: "PC",
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
      this.$api.System.Navs.List({ platform: this.platform }).then((res) => {
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
  height: 50px;
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
