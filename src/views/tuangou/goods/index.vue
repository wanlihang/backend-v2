<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'TuangouGoodsCreate' })"
        type="primary"
      >
        添加
      </el-button>
      <el-button
        @click="$router.push({ name: 'TuangouMoodsOrder' })"
        type="primary"
      >
        订单
      </el-button>
      <el-button
        @click="$router.push({ name: 'TuangouGoodsCreate' })"
        type="primary"
      >
        退款
      </el-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">关键字</div>
          <div class="flex-1 ml-15">
            <el-input
              class="w-200px"
              v-model="filter.keywords"
              placeholder="关键字搜索"
            ></el-input>
          </div>
        </div>

        <div class="d-flex ml-15">
          <div class="filter-label">商品类型</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.type">
              <el-option
                v-for="(item, index) in filterData.courses"
                :key="index"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="ml-15">
          <el-button @click="getResults" type="primary" plain>筛选</el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="other_id" label="商品ID" width="80">
          </el-table-column>
          <el-table-column prop="goods_type_text" label="类型" width="160">
          </el-table-column>
          <el-table-column prop="goods_title" label="商品"> </el-table-column>
          <el-table-column label="价格" width="150">
            <template slot-scope="scope">
              <span
                >￥{{ scope.row.charge }}/<span
                  style="text-decoration: line-through"
                  >￥{{ scope.row.original_charge }}</span
                ></span
              >
            </template>
          </el-table-column>

          <el-table-column label="人数" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.people_num }}人</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.started_at }}-{{ scope.row.end_at }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-link type="danger" @click="destory(scope.row.id)"
                >删除</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 5px"
                @click="
                  $router.push({
                    name: 'TuangouMoodsUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 5px"
                @click="
                  $router.push({
                    name: 'MiaoshaGoodsUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >团列表</el-link
              >
            </template>
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
        page: 1,
        size: 10,
      },
      filter: {
        type: null,
        keywords: null,
      },
      total: 0,
      loading: false,
      results: [],
      filterData: {
        courses: [],
      },
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.type = null;
      this.filter.keywords = null;
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
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.TuanGou.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.courses = res.data.types;
      });
    },
    destory(item) {
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
          this.$api.TuanGou.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
            })
            .catch((e) => {
              this.loading = false;
              this.$message(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>

<style lang="less" scoped>
.filter-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 15px;
  background-color: white;

  .filter-label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
}
.user-item {
  width: auto;
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 10px;
  }
  .nickname {
    font-size: 15px;
    font-weight: normal;
  }
}
</style>