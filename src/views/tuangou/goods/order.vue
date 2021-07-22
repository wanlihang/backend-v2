<template>
  <div class="meedu-main-body">
    <!-- <back-bar class="mb-30" title="团购商品订单"></back-bar> -->
    <div class="float-left mb-30">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">关键字</div>
          <div class="flex-1 ml-15">
            <el-input
              class="w-100"
              v-model="filter.keywords"
              placeholder="请输入商品名关键字"
              style="width: 200px"
            ></el-input>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">用户ID</div>
          <div class="flex-1 ml-15">
            <el-input
              class="w-100"
              v-model="filter.user_id"
              placeholder="用户ID"
              style="width: 200px"
            ></el-input>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">支付状态</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.status">
              <el-option
                v-for="(item, index) in filterData.status"
                :key="index"
                :label="item.name"
                :value="item.id"
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
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column label="商品ID" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">{{ scope.row.goods.other_id }}</span>
              <span style="color: red" v-else>已删除</span>
            </template>
          </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">{{
                scope.row.goods.goods_title
              }}</span>
              <span style="color: red" v-else>已删除</span>
            </template>
          </el-table-column>
          <el-table-column label="用户" :width="300">
            <template slot-scope="scope">
              <div class="d-flex" v-if="scope.row.user">
                <div>
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">
                  {{ scope.row.user.nick_name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="支付" width="120">
            <template slot-scope="scope">
              <span>￥{{ scope.row.charge }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color: red"
                >未支付</span
              >
              <span v-else>已支付</span>
            </template>
          </el-table-column>
          <el-table-column prop="user.created_at" label="时间" width="160">
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
        keywords: null,
        user_id: null,
        status: null,
      },
      total: 0,
      loading: false,
      results: [],
      filterData: {
        courses: [],
        goods: [],
        status: [
          {
            id: -1,
            name: "全部",
          },
          {
            id: 0,
            name: "未支付",
          },
          {
            id: 1,
            name: "已支付",
          },
        ],
      },
    };
  },
  computed: {
    activeItemList: function () {
      return this.filterData.goods.filter((item, index) => {
        return item.goods_type == this.filter.type;
      });
    },
  },
  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.keywords = null;
      this.filter.user_id = null;
      this.filter.status = null;
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
      this.$api.TuanGou.Order.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>

