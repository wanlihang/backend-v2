<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="购买用户订单"></back-bar>
    <div class="float-left">
      <div class="float-left">
        <div class="float-left d-flex">
          <div class="d-flex ml-15">
            <div class="filter-label">UID</div>
            <div class="flex-1 ml-15">
              <el-input v-model="filter.user_id" class="w-200px"></el-input>
            </div>
          </div>
          <div class="ml-15">
            <el-button @click="getResults" type="primary" plain
              >筛选</el-button
            >
            <el-button @click="paginationReset">清空</el-button>
          </div>
        </div>
      </div>
      <div class="float-left mt-30" v-loading="loading">
        <div class="float-left">
          <el-table
            :data="mbooks"
            stripe
            class="float-left"
          >
         
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="user_id" label="用户ID" width="80">
            </el-table-column>
            <el-table-column prop="user.nick_name" label="用户">
            </el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">
                <span>{{scope.row.charge}}元</span>
              </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="时间" width="180">
            </el-table-column>
            
          </el-table>
        </div>
      </div>
    </div>
    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="$router.back()"
            >取消</el-button
          >
        </div>
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
        topic_id: this.$route.query.id,
        user_id: "",
      },
      total: 0,
      loading: false,
      mbooks: [],
    };
  },
  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = "";
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
      this.$api.Course.Topic.Topic.Order(params).then((res) => {
        this.loading = false;
        this.mbooks = res.data.data.data;
        this.total = res.data.data.total;
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
</style>