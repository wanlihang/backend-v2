<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button @click="destorymulti()" type="danger"> 批量操作 </el-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-input
            class="w-200px"
            v-model="filter.user_id"
            placeholder="UID"
          ></el-input>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">会员</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.status">
              <el-option
                v-for="(item, index) in filterData.groups"
                :key="index"
                :label="item.name"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="ml-10">
          <el-button @click="firstPageLoad()" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset()">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="results"
          stripe
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column
          ><!-- 显示选取表格 -->
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div v-if="users[scope.row.user_id]" class="d-flex">
                <div>
                  <img
                    :src="users[scope.row.user_id].avatar"
                    width="40"
                    height="40"
                  />
                </div>
                <div class="ml-10">
                  {{ users[scope.row.user_id].nick_name }}
                </div>
              </div>
              <span v-else class="c-red">用户已删除</span>
            </template>
          </el-table-column>
          <el-table-column label="金额" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.before_balance }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="channel" label="渠道" width="100">
          </el-table-column>
          <el-table-column prop="channel_name" label="渠道姓名" width="100">
          </el-table-column>
          <el-table-column prop="channel_account" label="渠道账号">
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间">
          </el-table-column>
        </el-table>
      </div>
      <div class="float-left mt-30 text-center">
        <el-pagination
          @size-change="paginationSizeChange"
          @current-change="paginationPageChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: "Orderlist",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        status: -1,
        keywords: "",
      },
      filterData: {
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
      },
      total: 0,
      loading: false,
      spids: {
        ids: [],
      },
      results: [],
      users: [],
    };
  },
  created() {
    this.getResults();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = "";
      this.filter.status = -1;
      this.filter.keywords = "";
      this.getResults();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getResults();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getResults();
    },
    //保存选中结果
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    //获取order列表
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Order.WithdrawOrders.WithdrawOrders(params).then((res) => {
        this.loading = false;
        this.results = res.data.orders.data;
        this.users = res.data.users;
        this.total = res.data.orders.total;
      });
    },
    destorymulti() {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定按钮的操作
        if (this.loading) {
          return;
        }
        if (this.spids.ids == "") {
          this.$message.error("请选择需要操作的数据");
          return;
        }
        this.loading = true;
        this.loading = false;
        //   this.$api.Course.Live.Course.Video.ChatDestoryMulti(this.spids)
        //     .then(() => {
        //       this.loading = false;
        //       this.$message.success(this.$t("common.success"));
        //       this.getResults();
        //     })
        //     .catch((e) => {
        //       this.loading = false;
        //       this.$message.error(e.message);
        //     });
        // })
        // .catch(() => {
        //   //点击删除按钮的操作
      });
    },
  },
};
</script>
