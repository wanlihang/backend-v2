<template>
  <div class="float-left">
    <div class="filter-box">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">UID</div>
          <div class="flex-1 ml-15">
            <el-input v-model="filter.user_id"></el-input>
          </div>
        </div>

        <div class="d-flex ml-15">
          <div class="filter-label">订单编号</div>
          <div class="flex-1 ml-15">
            <el-input v-model="filter.order_id" placeholder="订单号"></el-input>
          </div>
        </div>

        <div class="d-flex ml-15">
          <div class="filter-label">订单状态</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.status">
              <el-option
                v-for="(item, index) in filterData.statusRows"
                :key="index"
                :label="item.name"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="float-left mt-15">
        <el-button type="primary" class="search" @click="getList()">
          筛选
        </el-button>
        <el-button class="reset" @click="paginationReset()">清空</el-button>
      </div>
    </div>

    <div class="table-body top-left-radius" v-loading="loading">
      <el-table :data="dataList" stripe class="float-left">
        <el-table-column prop="id" label="ID" :width="120"> </el-table-column>
        <el-table-column prop="user_id" label="用户ID" :width="120">
        </el-table-column>
        <el-table-column label="用户" :width="300">
          <template slot-scope="scope">
            <div class="d-flex" v-if="users[scope.row.user_id]">
              <div>
                <img
                  :src="users[scope.row.user_id].avatar"
                  width="40"
                  height="40"
                />
              </div>
              <div class="ml-10">{{ users[scope.row.user_id].nick_name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="order_id" label="订单编号" :width="200">
        </el-table-column>
        <el-table-column prop="charge" label="总价" :width="120">
        </el-table-column>
        <el-table-column prop="status_text" label="状态" :width="100">
        </el-table-column>
        <el-table-column label="商品" :width="500">
          <template slot-scope="scope">
            <span v-for="item in scope.row.goods" :key="item.id">
              {{ item.goods_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="时间" :width="200">
        </el-table-column>
        <el-table-column label="操作" fixed="right" :width="80">
          <template slot-scope="scope">
            <el-link type="primary" @click="detail(scope.row)">查看</el-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="float-left mt-15">
        <el-pagination
          style="margin-top: 20px"
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
      total: 0,
      loading: false,
      filter: {
        user_id: null,
        status: null,
        order_id: null,
      },
      filterData: {
        statusRows: [
          {
            name: "未支付",
            key: 1,
          },
          {
            name: "支付中",
            key: 5,
          },
          {
            name: "已支付",
            key: 9,
          },
          {
            name: "已取消",
            key: 7,
          },
        ],
      },
      dataList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getList();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getList();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.status = null;
      this.filter.order_id = null;
      this.filter.user_id = null;
      this.getList();
    },
    getList() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let data = {};
      Object.assign(data, this.pagination);
      Object.assign(data, this.filter);

      this.$api.Order.OrderList.List(data).then((resp) => {
        this.users = resp.data.users;
        this.total = resp.data.orders.total;
        this.dataList = resp.data.orders.data;

        this.loading = false;
      });
    },
    detail(item) {},
  },
};
</script>