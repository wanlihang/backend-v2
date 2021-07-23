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
          <el-input
            class="w-150px"
            v-model="filter.key"
            placeholder="优惠码"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="用户ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-date-picker
            v-model="filter.expired_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="过期时间-开始"
            end-placeholder="过期时间-结束"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-date-picker
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="创建时间-开始"
            end-placeholder="创建时间-结束"
          >
          </el-date-picker>
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
          :data="list"
          stripe
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column
            prop="invited_user_reward"
            width="300"
            label="优惠码"
          >
            <template slot-scope="scope">
              <div class="mb-10">{{ scope.row.code }}</div>
              <div>面值：{{ scope.row.invited_user_reward }}元</div>
              <div>奖励：{{ scope.row.invite_user_reward }}元</div>
            </template>
          </el-table-column>

          <el-table-column label="可使用次数" width="300">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.use_times === 0">
                不限制
              </el-tag>
              <el-tag type="info" v-else>
                {{ scope.row.use_times || 0 }}次
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="已使用次数" width="150">
            <template slot-scope="scope">
              {{ scope.row.used_times || 0 }}次
            </template>
          </el-table-column>

          <el-table-column prop="expired_at" label="过期时间" width="200">
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
      pagination: {
        video_id: this.$route.query.id,
        course_id: this.$route.query.course_id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        key: null,
        created_at: null,
        expired_at: null,
      },
      spids: {
        ids: [],
      },
      total: 0,
      loading: false,
      list: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.key = null;
      this.filter.created_at = null;
      this.filter.expired_at = null;
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
    //保存选中结果
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Order.PromoCode.PromoCode(params).then((res) => {
        this.loading = false;
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    destorymulti() {
      if (this.spids.ids == "") {
        this.$message.error("请选择需要操作的数据");
        return;
      }
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

          this.loading = true;
          this.$api.Order.PromoCode.DestroyMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
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
