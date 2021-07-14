<template>
  <el-container>
    <!-- <el-header>
      <h1>订单</h1>
    </el-header> -->
    <el-main class="main_content">
      <div class="row">
        <label>UID</label>
        <el-input
          style="width: 200px; margin-right: 10px"
          v-model="user_id"
        ></el-input>
        <label>订单号</label>
        <el-input
          style="width: 200px; margin-right: 10px"
          v-model="order_id"
          placeholder="订单号"
        ></el-input>
        <label>状态</label>
        <el-select
          v-model="status"
          placeholder="请选择状态"
          style="width: 200px; margin-right: 20px"
        >
          <el-option
            v-for="(item, index) in groups"
            :key="index"
            :label="item.name"
            :value="item.key"
          >
          </el-option>
        </el-select>
        <el-button type="primary" class="search" @click="search()">搜索</el-button>
        <el-button class="reset" @click="reset()">重置</el-button>
      </div>
      <el-table :data="dataList" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="user_id" label="用户ID"> </el-table-column>
        <el-table-column prop="nick_name" label="用户"> </el-table-column>
        <el-table-column prop="order_id" label="订单号"> </el-table-column>
        <el-table-column prop="charge" label="总价"> </el-table-column>
        <el-table-column prop="status_text" label="状态"> </el-table-column>
        <!-- <el-table-column prop="" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.title_img" alt="" style="width: 60px" />
          </template>
        </el-table-column> -->
        <el-table-column label="商品">
          <template slot-scope="scope">
            <span v-for="item in scope.row.goods" :key="item.id"
              >[{{ item.goods_text }}]{{ item.goods_name }}:￥{{
                item.goods_charge
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              v-show="scope.row.status != 9"
              @click="changeData(scope.row.id, scope.$index)"
              style="margin-bottom: 4px"
              >改为已支付</el-button
            >
            <el-button size="mini" type="primary" @click="allAdd(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      name: "Orderlist",
      page: 1,
      loading: false,
      user_id: "",
      status: "",
      order_id: "",
      dataList: [],
      rolesList: [],
      groups: [
        {
          name: "未支付",
          key: 1,
        },
        {
          name: "支付中",
          key: 5,
        },
        {
          name: "已支付",
          key: 9,
        },
        {
          name: "已取消",
          key: 7,
        },
      ],
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    //获取order列表
    getList(p) {
      this.loading = true;
      var data = {
        page: p,
        total: 0,
        size: 10,
        user_id: this.user_id,
        status: this.status,
        order_id: this.order_id,
      };
      this.$api.Order.List(data).then((resp) => {
        if (resp.status == 0) {
          this.page = resp.data.orders.current_page + 1;
          var orders = resp.data.orders;
          var users = resp.data.users;
          this.dataList = orders.data;
          for (var i = 0; i < this.dataList.length; i++) {
            var showkey = this.dataList[i].user_id;
            this.parseJson(users, showkey);
          }
        }
        this.loading = false;
      });
    },
    //搜索box
    parseJson(data, index) {
      if (typeof data[index] === "undefined") {
        //console.log("data无值");
        return "";
      }
      for (var i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].user_id == index) {
          this.dataList[i]["nick_name"] = data[index].nick_name;
        }
      }
    },
    //重置
    reset() {
      this.user_id = "";
      this.status = "";
      this.order_id = "";
      this.getList(1);
    },
    //搜索
    search(){
     this.getList(1);
    },
  },
};
</script>
<style  lang="less" scoped>
.main_content {
  width: 100%;
  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    label {
      margin-right: 10px;
      height: 40px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }
}
</style>