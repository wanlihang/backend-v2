<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button @click="destorymulti()" type="danger"> 批量删除 </el-button>
      <el-button @click="$router.push({ name: 'Createcode' })" type="primary">
        添加
      </el-button>
      <el-button @click="$router.push({ name: 'CodeImport' })" type="primary">
        批量导入
      </el-button>
      <el-button
        @click="$router.push({ name: 'CreateMulticode' })"
        type="primary"
      >
        批量生成
      </el-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
           <span slot="label" style="font-size:14px;">
            <form-label text="优惠码" helper="优惠码的 U 前缀是用户专属邀请码预留的，请勿在自定义优惠码中使用！"></form-label>
          </span>
          <el-input  
            class="ml-10 w-200px"
            v-model="filter.key"
            placeholder="支持优惠码模糊搜索"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            class="w-200px"
            v-model="filter.user_id"
            placeholder="UID"
          ></el-input>
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
          <el-table-column prop="code" label="优惠码"> </el-table-column>
          <el-table-column prop="invited_user_reward" width="100" label="抵扣">
            <template slot-scope="scope">
              <span>{{ scope.row.invited_user_reward }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="invite_user_reward" label="奖励" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.invite_user_reward }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="可使用" width="80">
            <template slot-scope="scope">
              <span style="color: red" v-if="scope.row.use_times == 0"
                >不限制</span
              >
              <span v-else>{{ scope.row.use_times || 0 }}次</span>
            </template>
          </el-table-column>
          <el-table-column prop="used_times" label="已使用" width="80" e>
            <template slot-scope="scope">
              <span v-if="scope.row.used_times != null"
                >{{ scope.row.used_times }}次</span
              >
              <span v-else>0次</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="165">
          </el-table-column>
          <el-table-column prop="expired_at" label="过期时间" width="165">
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
      pagination: {
        video_id: this.$route.query.id,
        course_id: this.$route.query.course_id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        key: null,
      },
      spids: {
        ids: [],
      },
      total: 0,
      loading: false,
      results: [],
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
      this.filter.user_id = null;
      this.filter.key = null;
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
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Order.PromoCode.PromoCode(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
        this.total = res.data.total;
      });
    },
    destorymulti() {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }
          if (this.spids.ids == "") {
            this.$message.error("请选择需要操作的数据");
            return;
          }
          this.loading = true;
          this.$api.Order.PromoCode.DestroyMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
