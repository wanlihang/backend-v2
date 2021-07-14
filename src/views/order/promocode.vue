<template>
  <el-container>
    <!-- <el-header>
      <h1>订单</h1>
    </el-header> -->
    <el-main class="main_content">
      <div class="row">
        <label>搜索</label>
        <el-input
          style="width: 200px; margin-right: 10px"
          v-model="key"
          placeholder="支持优惠吗模糊搜索"
        ></el-input>
        <label>UID</label>
        <el-input
          style="width: 200px; margin-right: 10px"
          v-model="user_id"
        ></el-input>
        <el-button type="primary" class="search" @click="search()"
          >搜索</el-button
        >
        <el-button class="reset" @click="reset()">重置</el-button>
      </div>
      <div class="alertinfo">
        优惠码的 <b>U</b> 前缀是用户专属邀请码预留的，请勿在自定义优惠码中使用！
      </div>
      <div class="row">
        <el-button type="danger">批量删除</el-button>
        <el-button type="primary">添加</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="primary">批量生成</el-button>
      </div>
      <el-table
        :data="dataList"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column
        ><!-- 显示选取表格 -->
        <el-table-column prop="id" label="ID" sortable> </el-table-column>
        <el-table-column prop="code" label="优惠码"> </el-table-column>
        <el-table-column prop="invited_user_reward" sortable label="抵扣">
          <template slot-scope="scope">
            <span>{{ scope.row.invited_user_reward }}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="invite_user_reward" label="奖励" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.invite_user_reward }}元</span>
          </template>
        </el-table-column>
        <el-table-column label="可使用">
          <template slot-scope="scope">
            <span style="color: red" v-if="scope.row.use_times == 0"
              >不限制</span
            >
            <span v-else>{{ scope.row.use_times || 0 }}次</span>
          </template>
        </el-table-column>
        <el-table-column prop="used_times"  label="已使用" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.used_times != null"
              >{{ scope.row.used_times }}次</span
            >
            <span v-else>0次</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="商品">
          <template slot-scope="scope">
            <span v-for="item in scope.row.goods" :key="item.id"
              >[{{ item.goods_text }}]{{ item.goods_name }}:￥{{
                item.goods_charge
              }}</span
            >
          </template>
        </el-table-column> -->
        <el-table-column prop="updated_at" label="创建时间"> </el-table-column>
        <el-table-column prop="deleted_at" label="过期时间"> </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      name: "Orderlist",
      page: 1,
      total: 0,
      loading: false,
      user_id: "",
      pagesize: 10,
      sort: "id",
      order: "desc",
      key: "",
      dataList: [],
      multipleSelection: "",
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      this.getList(this.page);
    },
    handleCurrentChange: function (currentPage) {
      this.page = currentPage;
      this.getList(this.page);
    },
    //保存选中结果
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.info(this.multipleSelection);
    },
    //获取order列表
    getList(p) {
      this.loading = true;
      var data = {
        page: p,
        total: this.total,
        size: this.pagesize,
        user_id: this.user_id,
        sort: this.sort,
        order: this.order,
        key: this.key,
      };
      this.$api.Order.PromoCode(data).then((resp) => {
        if (resp.status == 0) {
          this.page = resp.data.current_page;
          var data = resp.data.data;
          this.total = resp.data.total;
          this.dataList = data;
        }
        this.loading = false;
      });
    },
    //重置
    reset() {
      this.user_id = "";
      this.key = "";
      this.sort = "id";
      this.order = "desc";
      this.total = 0;
      this.getList(1);
    },
    //搜索
    search() {
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
  .alertinfo {
    width: 100%;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 15px;
    background-color: #e6a23c;
    border-radius: 2px;
    font-weight: 400;
    font-size: 15px;
    color: #fff;
    float: left;
    margin-bottom: 20px;
    b {
      font-weight: bolder;
    }
  }
}
</style>