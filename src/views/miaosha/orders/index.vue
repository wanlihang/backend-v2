<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">课程</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.type">
              <el-option
                v-for="(item, index) in filterData.courses"
                :key="index"
                :label="item.goods_type_text"
                :value="item.goods_type"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">课程</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.gid">
              <el-option
                v-for="(item, index) in activeItemList"
                :key="index"
                :label="item.goods_title"
                :value="item.id"
              >
              </el-option>
            </el-select>
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
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column label="商品ID" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">{{
                scope.row.goods.goods_id
              }}</span>
              <span style="color: red" v-else>已删除</span>
            </template>
          </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column prop="user.nick_name" label="用户" width="150">
          </el-table-column>
          <el-table-column label="商品类型" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">{{
                scope.row.goods.goods_type_text
              }}</span>
              <span style="color: red" v-else>已删除</span>
            </template>
          </el-table-column>
          <el-table-column prop="goods.goods_title" label="商品">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">{{
                scope.row.goods.goods_title
              }}</span>
              <span style="color: red" v-else>已删除</span>
            </template>
          </el-table-column>
          <el-table-column label="秒杀价" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.charge }}元</span>
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
      },
      total: 0,
      loading: false,
      results: [],
      spids: {
        ids: [],
      },
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
      this.filter.type = null;
      this.filter.gid = null;
      this.filter.status = -1;
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
      this.$api.Miaosha.Orders.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.courses = res.data.types;
        this.filterData.goods = res.data.goods;
      });
    },
    destoryMulti() {
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
            this.$message("请选择需要操作的数据");
            return;
          }
          this.loading = true;
          this.$api.Wenda.Question.DestoryMulti(this.spids)
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