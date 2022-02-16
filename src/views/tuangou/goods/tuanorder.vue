<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="团列表"></back-bar>
    <div class="float-left" v-if="countMap">
      <el-tabs v-model="filter.status">
        <el-tab-pane
          :label="
            item.name +
            '(' +
            (item.key === '-1' ? orderTotal : countMap[item.key]) +
            ')'
          "
          :name="item.key"
          v-for="(item, index) in filterData.statusList"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column label="团长">
            <template slot-scope="scope">
              <span>{{ scope.row.create_user_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="200">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status === 0">{{
                scope.row.status_text
              }}</el-tag>
              <el-tag type="success" v-else-if="scope.row.status === 1">{{
                scope.row.status_text
              }}</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status === 2">{{
                scope.row.status_text
              }}</el-tag>
              <el-tag v-else-if="scope.row.status === 3">{{
                scope.row.status_text
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="模拟" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.create_user_id === 0">是</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="人数" width="120">
            <template slot-scope="scope">
              <span
                >{{ scope.row.people_num - scope.row.over_people_num }}/{{
                  scope.row.people_num
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="过期" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.expired_at | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <p-link
                text="详情"
                p="addons.TuanGou.goods.item.detail"
                @click="
                  $router.push({
                    name: 'TuangouGoodsDetail',
                    query: { id: scope.row.goods_id, tid: scope.row.id },
                  })
                "
                type="primary"
              ></p-link>
              <p-link
                class="ml-5"
                text="改为已完成"
                p="addons.TuanGou.goods.complete"
                v-if="scope.row.status != 1"
                type="danger"
                @click="handle(scope.row.id)"
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
        id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      filter: {
        status: "-1",
      },
      total: 0,
      loading: false,
      results: [],
      countMap: null,
      filterData: {
        statusList: [
          {
            name: "全部",
            key: "-1",
          },
          {
            name: "未支付",
            key: "0",
          },
          {
            name: "组团成功",
            key: "1",
          },
          {
            name: "组团失败",
            key: "2",
          },
          {
            name: "组团中",
            key: "3",
          },
        ],
      },
    };
  },
  computed: {
    orderTotal() {
      if (this.countMap === null) {
        return 0;
      }
      let total = 0;
      for (let i = 1; i < this.filterData.statusList.length; i++) {
        total += this.countMap[this.filterData.statusList[i].key];
      }
      return total;
    },
  },
  watch: {
    "filter.status"() {
      this.getResults();
    },
  },
  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.filter.status = "-1";
      this.pagination.page = 1;
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
      Object.assign(params, this.pagination);
      Object.assign(params, this.filter);
      this.$api.TuanGou.Tuan.List(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.countMap = res.data.countMap;
      });
    },
    handle(item) {
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
          var data = {
            id: item,
          };
          this.$api.TuanGou.Tuan.Complete(data)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
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
