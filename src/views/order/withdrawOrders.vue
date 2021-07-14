<template>
  <el-container>
    <el-main class="main_content">
      <div class="row">
        <label>UID</label>
        <el-input
          style="width: 200px; margin-right: 10px"
          v-model="user_id"
        ></el-input>
        <label>会员</label>
        <el-select
          v-model="status"
          placeholder="请选择"
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
        <el-button type="primary" class="search" @click="search()"
          >搜索</el-button
        >
        <el-button class="reset" @click="reset()">重置</el-button>
      </div>
      <div class="row">
        <el-button type="danger" @click="deleteMulti()">批量操作</el-button>
      </div>
      <el-table
        :data="dataList"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column
        ><!-- 显示选取表格 -->
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="user_id" label="用户ID"> </el-table-column>
        <el-table-column prop="nick_name" label="用户"> </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <span>{{ scope.row.before_balance }}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="channel" label="渠道"> </el-table-column>
        <el-table-column prop="channel_name" label="渠道姓名">
        </el-table-column>
        <el-table-column prop="channel_account" label="渠道账号">
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间"> </el-table-column>
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
      status: -1,
      keywords: "",
      ids: [],
      dataList: [],
      rolesList: [],
      groups: [
        {
          name: "全部",
          key: -1,
        },
        {
          name: "已提交",
          key: 0,
        },
        {
          name: "成功",
          key: 1,
        },
        {
          name: "失败",
          key: 2,
        },
      ],
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
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.ids = newbox;
    },
    //获取order列表
    getList(p) {
      this.loading = true;
      var data = {
        page: p,
        total: this.total,
        size: this.pagesize,
        user_id: this.user_id,
        status: this.status,
        keywords: this.keywords,
      };
      this.$api.Order.WithdrawOrders.WithdrawOrders(data).then((resp) => {
        if (resp.status == 0) {
          this.page = resp.data.orders.current_page;
          var orders = resp.data.orders;
          var users = resp.data.users;
          this.total = orders.total;
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
      this.keywords = "";
      this.pagesize = 10;
      this.status = -1;
      this.total = 0;
      this.getList(1);
    },
    //搜索
    search() {
      this.getList(1);
    },
    //批量删除
    deleteMulti() {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          this.loading = true;
          var data = {
            ids: this.ids,
          };
          //批量操作函数
          console.log(data);
          this.loading = false;
        })
        .catch(() => {
          //点击删除按钮的操作
        });
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