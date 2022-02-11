<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="添加"
          p="addons.MultiLevelShare.goods.store"
          @click="$router.push({ name: 'ShareGoodsCreate' })"
          type="primary"
        >
        </p-button>
        <option-bar text="分销配置" value="三级分销"></option-bar>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.keywords"
            placeholder="关键字搜索"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="goods_id" label="商品ID" width="100">
          </el-table-column>
          <el-table-column prop="goods_type_text" label="类型">
          </el-table-column>
          <el-table-column prop="goods_title" label="商品" width="400">
          </el-table-column>
          <el-table-column label="价格" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.goods_charge }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励1/2/3" width="160">
            <template slot-scope="scope">
              <div>一级：{{ scope.row.reward }}元</div>
              <div>二级：{{ scope.row.reward2 }}元</div>
              <div>三级：{{ scope.row.reward3 }}元</div>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.MultiLevelShare.goods.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'ShareGoodsUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                class="ml-5"
                text="删除"
                p="addons.MultiLevelShare.goods.delete"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
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
    firstPageLoad() {
      this.pagination.page = 1;
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
      this.$api.Multishare.Goods.List(params).then((res) => {
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
          this.$api.Multishare.Goods.Destory(item)
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
