<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="考试记录"></back-bar>
    <div class="float-left mb-30">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">用户ID</div>
          <div class="flex-1 ml-15">
            <el-input
              class="w-200px"
              v-model="filter.user_id"
              placeholder="用户ID"
            ></el-input>
          </div>
        </div>
        <div class="d-flex ml-10">
          <el-select class="w-200px" placeholder="状态" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.categories"
              :key="index"
              :label="item.text"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-button @click="firstPageLoad()" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset()">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="list" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div class="d-flex" v-if="scope.row.user">
                <div>
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">{{ scope.row.user.nick_name }}</div>
              </div>
              <span class="c-red" v-else>用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="分数">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 2">{{ scope.row.score }}分</span>
              <span style="color: red" v-else>未完成</span>
            </template>
          </el-table-column>
          <el-table-column label="用时" width="100">
            <template slot-scope="scope">
              <duration-text
                v-if="status === 2"
                :duration="scope.row.expired_seconds"
              ></duration-text>
              <span style="color: red" v-else>未完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="status_text" label="状态" width="80">
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
import DurationText from "@/components/duration-text";

export default {
  components: {
    DurationText,
  },
  data() {
    return {
      pagination: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: "",
        status: -1,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        categories: [],
      },
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
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
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Mockpaper.Userpaper(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
        var item={
          text:'全部',
          id:-1
        }
        this.filterData.categories.push(item)
        this.filterData.categories.push(...res.data.statusMap);
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
          this.$api.Exam.Mockpaper.Destory(item)
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
