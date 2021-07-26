<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <div class="float-left d-flex">
        <div>
          <el-input
            v-model="filter.goods_name"
            placeholder="商品名称关键字"
            class="w-200px"
          ></el-input>
        </div>
        <!-- <div class="ml-10">
          <el-input
            v-model="filter.user_id"
            class="w-200px"
            placeholder="用户ID"
          ></el-input>
        </div> -->
        <div class="ml-10">
          <el-input
            v-model="filter.order_id"
            class="w-200px"
            placeholder="订单编号"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-date-picker
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="订单添加开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-button type="primary" class="search" @click="filterAct()" plain>
            筛选
          </el-button>
          <el-button class="reset" @click="paginationReset()">清空</el-button>
        </div>
      </div>
    </div>

    <div class="float-left" v-if="countMap">
      <el-tabs v-model="filter.status">
        <el-tab-pane
          :label="
            item.name +
            '(' +
            (item.key === null ? orderTotal : countMap[item.key]) +
            ')'
          "
          :name="item.key"
          v-for="(item, index) in filterData.statusRows"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <div class="float-left" v-loading="loading">
      <el-table
        :data="dataList"
        class="float-left"
        @sort-change="sortChange"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column prop="id" sortable label="ID" :width="100">
        </el-table-column>
        <!-- <el-table-column prop="user_id" sortable label="用户ID" :width="120">
        </el-table-column> -->
        <el-table-column label="用户" :width="210">
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
         <el-table-column label="商品名称" >
          <template slot-scope="scope">
            <span v-for="item in scope.row.goods" :key="item.id">
              {{ item.goods_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="order_id" label="订单编号" :width="200">
        </el-table-column>
        <el-table-column prop="charge" sortable label="支付金额" :width="150">
        </el-table-column>
        <el-table-column prop="status_text" label="支付状态" :width="150">
        </el-table-column>
       
        <el-table-column prop="updated_at" sortable label="订单创建时间" :width="220">
        </el-table-column>
        <el-table-column label="操作" fixed="right" :width="80">
          <template slot-scope="scope">
            <p-link
              text="查看"
              p="order.detail"
              @click="
                $router.push({
                  name: 'OrderDetail',
                  query: { id: scope.row.id },
                })
              "
              type="primary"
            ></p-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="float-left mt-30 text-center">
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
        sort: "id",
        order: "desc",
      },
      total: 0,
      loading: false,
      filter: {
        user_id: null,
        goods_id: null,
        goods_name: null,
        status: null,
        order_id: null,
        created_at: null,
      },
      filterData: {
        statusRows: [
          {
            name: "全部",
            key: null,
          },
          {
            name: "未支付",
            key: "1",
          },
          {
            name: "支付中",
            key: "5",
          },
          {
            name: "已支付",
            key: "9",
          },
          {
            name: "已取消",
            key: "7",
          },
        ],
      },
      dataList: [],
      countMap: null,
    };
  },
  computed: {
    orderTotal() {
      if (this.countMap === null) {
        return 0;
      }
      let total = 0;
      for (let i = 1; i < this.filterData.statusRows.length; i++) {
        total += this.countMap[this.filterData.statusRows[i].key];
      }
      return total;
    },
  },
  watch: {
    "filter.status"() {
      this.getList();
    },
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
      this.filter.order_id = null;
      this.filter.user_id = null;
      this.filter.created_at = null;
      this.filter.goods_id = null;
      this.filter.goods_name = null;
      this.getList();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getList();
    },
    filterAct() {
      this.pagination.page = 1;
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
        this.countMap = resp.data.countMap;

        this.loading = false;
      });
    },
  },
};
</script>