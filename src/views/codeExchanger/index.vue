<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'CodeExchangerCreate' })"
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
            placeholder="关键字"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="firstPageLoad()" type="primary" plain
            >筛选</el-button
          >
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <el-table :data="list" stripe class="float-left">
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="goods_id" label="商品ID" width="120">
        </el-table-column>
        <el-table-column prop="goods_type_text" label="课程类型" width="150">
        </el-table-column>
        <el-table-column prop="goods_title" label="商品" width="500">
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.goods_charge }}元</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-link type="danger" @click="destory(scope.row.id)">删除</el-link>
            <el-link
              type="primary"
              class="ml-5"
              @click="
                $router.push({
                  name: 'CodeExchangerCodes',
                  query: { id: scope.row.id },
                })
              "
              >兑换码</el-link
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
        keywords: null,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        courses: [],
      },
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
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
      Object.assign(params, this.filter, this.pagination);

      this.$api.CodeExchanger.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
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
          this.$api.CodeExchanger.Destory(item)
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

