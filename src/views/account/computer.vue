<template>
  <div class="el_content">
    <div class="tabZujian">
      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="$t('computer_terminal.tab1')"
          name="first"
          :key="'first'"
        >
          <child1></child1>
        </el-tab-pane>

        <el-tab-pane
          :label="$t('computer_terminal.tab2')"
          name="second"
          :key="'second'"
        >
          <child2></child2>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('computer_terminal.tab3')"
          name="third"
          :key="'third'"
        >
          <child3></child3>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import homedisplaychild from "../components/homedisplaychild";
import slidechild from "../components/slidechild";
import noticechild from "../components/noticechild";
export default {
  name: "tabZujian",
  components: {
    child1: homedisplaychild,
    child2: slidechild,
    child3: noticechild,
  },
  data() {
    return {
      //默认第一个选项卡
      activeName: "first",
    };
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.el_content {
  width: 100%;
  height: 858px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
  border-radius: 8px;
  padding: 30px;
  position: relative;
  box-sizing: border-box;
}

</style>