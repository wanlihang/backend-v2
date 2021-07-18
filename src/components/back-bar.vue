<template>
  <div class="back-bar-box">
    <div class="btn-back" @click="back()">
      <i class="el-icon-back"></i>
      返回
    </div>
    <div class="line"></div>
    <div class="name">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.back-bar-box {
  width: 100%;
  height: auto;
  float: left;
  display: flex;
  align-items: center;

  .btn-back {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }
  }

  .line {
    width: 1px;
    height: 14px;
    background-color: #d8d8d8;
    margin-right: 15px;
    margin-left: 15px;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  }
}
</style>