<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'MiaoshaGoodsCreate' })"
        type="primary"
      >
        添加
      </el-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-input
            class="w-200px"
            v-model="filter.keywords"
            placeholder="关键字搜索"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="getData()" type="primary" plain>筛选</el-button>
          <el-button @click="paginationReset()">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <el-table :data="results" stripe class="float-left">
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="goods_id" label="课程ID" width="120">
        </el-table-column>
        <el-table-column prop="goods_type_text" label="类型" width="160">
        </el-table-column>
        <el-table-column prop="goods_title" label="商品" width="500">
        </el-table-column>
        <el-table-column label="价格" width="150">
          <template slot-scope="scope">
            <div>秒杀价：{{ scope.row.charge }}元</div>
            <div class="ori-charge">
              原价：{{ scope.row.original_charge }}元
            </div>
          </template>
        </el-table-column>

        <el-table-column label="库存" width="120">
          <template slot-scope="scope">
            <div class="c-red">剩余：{{ scope.row.over_num }}件</div>
            <div>总量：{{ scope.row.num }}件</div>
          </template>
        </el-table-column>

        <el-table-column label="时间" width="200">
          <template slot-scope="scope">
            <div>开始:{{ scope.row.started_at }}</div>
            <div>结束:{{ scope.row.end_at }}</div>
          </template>
        </el-table-column>

        <el-table-column label="创建" prop="created_at" width="200">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-link type="danger" @click="destory(scope.row.id)">删除</el-link>
            <el-link
              type="primary"
              class="ml-5"
              @click="
                $router.push({
                  name: 'MiaoshaGoodsUpdate',
                  query: { id: scope.row.id },
                })
              "
              >编辑</el-link
            >
          </template>
        </el-table-column>
      </el-table>

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
    this.getData();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.type = null;
      this.filter.keywords = null;
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
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Miaosha.Goods.List(params).then((res) => {
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
          this.$api.Miaosha.Goods.Destory(item)
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

<style lang="less" scoped>
.ori-charge {
  text-decoration: line-through;
}
</style>