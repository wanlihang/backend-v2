<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30 d-flex">
      <div>
        <el-input
          placeholder="关键字"
          class="w-200px"
          v-model="filter.keywords"
        ></el-input>
      </div>
      <div class="ml-10">
        <el-input
          placeholder="用户ID"
          class="w-200px"
          v-model="filter.user_id"
        ></el-input>
      </div>
      <div class="ml-10">
        <el-select class="w-200px" v-model="filter.status">
          <el-option
            v-for="(item, index) in filterData.status"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="ml-10">
        <el-date-picker
          v-model="filter.created_at"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="ml-10">
        <el-button @click="firstPageLoad" type="primary" plain>筛选</el-button>
        <el-button @click="paginationReset">清空</el-button>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>

          <el-table-column label="商品ID" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">{{ scope.row.goods.goods_id }}</span>
              <span class="c-red" v-else>已删除</span>
            </template>
          </el-table-column>

          <el-table-column prop="user_id" label="用户ID" width="120">
          </el-table-column>

          <el-table-column label="商品">
            <template slot-scope="scope">
              <template v-if="scope.row.goods">
                <div class="d-flex">
                  <div>
                    <img
                      :src="scope.row.goods.goods_thumb"
                      width="120"
                      height="90"
                    />
                  </div>
                  <div class="ml-10">
                    {{ scope.row.goods.goods_title }}
                  </div>
                </div>
              </template>
              <span class="c-red" v-else>商品已删除</span>
            </template>
          </el-table-column>

          <el-table-column label="用户" :width="300">
            <template slot-scope="scope">
              <template v-if="scope.row.user">
                <div class="d-flex" v-if="scope.row.user">
                  <div>
                    <img :src="scope.row.user.avatar" width="40" height="40" />
                  </div>
                  <div class="ml-10">
                    {{ scope.row.user.nick_name }}
                  </div>
                </div>
              </template>
              <span class="c-red" v-else>用户不存在</span>
            </template>
          </el-table-column>

          <el-table-column label="秒杀价" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.charge }}元</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status !== 1" type="info">未支付</el-tag>
              <el-tag type="success" v-else>已支付</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="时间" prop="created_at"></el-table-column>
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
        gid: null,
        status: -1,
        created_at: null,
        user_id: null,
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
      this.filter.type = null;
      this.filter.gid = null;
      this.filter.status = -1;
      this.filter.keywords = null;
      this.filter.created_at = null;
      this.filter.user_id = null;
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
      this.$api.Miaosha.Orders.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.courses = res.data.types;
        this.filterData.goods = res.data.goods;
      });
    },
  },
};
</script>

