<template>
  <el-containe class="member_content">
    <el-button>添加</el-button>
    <el-main class="main_content">
      <div class="el_item" v-for="item in memberbox" :key="item">
        <div class="name">{{ item.name }}</div>
        <div class="days">{{ item.time }}</div>
        <div class="charge">￥{{ item.price }}</div>
        <div class="options">
          <el-button type="danger"> 删除 </el-button>
          <el-button type="warning"> 编辑 </el-button>
        </div>
      </div>
    </el-main>
  </el-containe>
</template>
<script>
export default {
  name: "vip_member",
  data() {
    return {
      isloading: false,
      memberbox: [
        { name: "年度会员", time: "365天", price: "365" },
        { name: "季度会员", time: "90天", price: "89" },
        { name: "月度会员", time: "30天", price: "35" },
      ],
    };
  },
};
</script>
<style  lang="less" >
div {
  box-sizing: border-box;
}
.main_content {
  width: 100%;
  height: auto;
  float: left;
  .el_item {
    width: 300px;
    height: auto;
    float: left;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 15px 30px;
    border-radius: 20px;
    margin-right: 30px;
    margin-bottom: 30px;
    .name {
      width: 100%;
      height: auto;
      float: left;
      color: #333;
      text-align: center;
      margin-bottom: 50px;
      font-size: 24px;
      font-weight: 700;
      margin-top: 30px;
    }
    .days {
      width: 100%;
      height: auto;
      float: left;
      color: #333;
      text-align: center;
      margin-bottom: 50px;
      font-size: 18px;
    }
    .charge {
      width: 100%;
      height: auto;
      float: left;
      font-size: 30px;
      color: red;
      text-align: center;
    }
    .options {
      width: 100%;
      height: auto;
      float: left;
      text-align: right;
      margin-top: 30px;
    }
  }
}
</style>