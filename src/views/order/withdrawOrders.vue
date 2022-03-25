<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <el-button type="primary" @click="handleMulti()"> 批量操作 </el-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select class="w-150px" placeholder="状态" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.groups"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column
            type="selection"
            :selectable="
              (row) => {
                return row.status === 0;
              }
            "
            width="55"
          ></el-table-column>
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="user_id" label="学员ID" width="120">
          </el-table-column>
          <el-table-column label="学员" width="300">
            <template slot-scope="scope">
              <div v-if="users[scope.row.user_id]" class="user-item d-flex">
                <div class="avatar">
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
              <span v-else class="c-red">学员已删除</span>
            </template>
          </el-table-column>
          <el-table-column label="提现金额">
            <template slot-scope="scope">
              <span>{{ scope.row.before_balance }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="打款信息" width="300">
            <template slot-scope="scope">
              <div>渠道：{{ scope.row.channel }}</div>
              <div>姓名：{{ scope.row.channel_name }}</div>
              <div>账号：{{ scope.row.channel_account }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="150">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="primary"
                >待处理</el-tag
              >
              <el-tag v-else-if="scope.row.status === 2" type="danger"
                >已驳回</el-tag
              >
              <el-tag v-else-if="scope.row.status === 1" type="info"
                >已处理</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="300">
          </el-table-column>
          <el-table-column label="添加时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
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

    <el-dialog
      title="提现处理"
      :visible="showHandleWin"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="成功" :value="1"></el-option>
            <el-option label="驳回" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            class="w-400px"
            placeholder="请输入备注"
            type="textarea"
            rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showHandleWin = false">取消</el-button>
        <el-button type="primary" @click="formValidate">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "withdrawOrders-list",
      showHandleWin: false,
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
            name: "待处理",
            key: 0,
          },
          {
            name: "已处理",
            key: 1,
          },
          {
            name: "已驳回",
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
      form: {
        status: null,
        remark: null,
      },
      rules: {
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = "";
      this.filter.status = -1;
      this.filter.keywords = "";
      this.getData();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getData();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    handleSelectionChange(val) {
      if (val) {
        var newbox = [];
        for (var i = 0; i < val.length; i++) {
          newbox.push(val[i].id);
        }
        this.spids.ids = newbox;
      } else {
        this.spids.ids = [];
      }
    },
    getData() {
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
    handleMulti() {
      if (this.spids.ids.length === 0) {
        this.$message.error("请选择需要操作的数据");
        return;
      }
      this.showHandleWin = true;
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submitHandle();
        }
      });
    },
    submitHandle() {
      this.$api.Order.WithdrawOrders.Submit({
        ids: this.spids.ids,
        status: this.form.status,
        remark: this.form.remark,
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.showHandleWin = false;
          this.getData();
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
  },
};
</script>
