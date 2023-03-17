<template>
  <div class="slider-box">
    <el-carousel class="float-left" height="115px">
      <el-carousel-item v-for="(item, index) in config" :key="index">
        <div class="slider-item">
          <img v-if="item.src" :src="item.src" width="100%" height="115" />
          <img
            v-else
            src="@/assets/images/decoration/h5/default-slider.png"
            width="100%"
            height="115"
          />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.slider-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: white;
}
</style>