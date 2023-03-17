<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="考试记录"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select class="w-150px" placeholder="状态" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.statusMap"
              :key="index"
              :label="item.text"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
          class="float-left"
        >
          <el-table-column prop="id" sortable label="ID" width="120">
          </el-table-column>
          <el-table-column prop="user_id" sortable label="学员ID" width="120">
          </el-table-column>
          <el-table-column label="学员" width="300">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="scope.row.user">
                <div class="avatar">
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">{{ scope.row.user.nick_name }}</div>
              </div>
              <span class="c-red" v-else>学员不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="分数" sortable property="get_score">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1"
                >{{ scope.row.get_score }}分</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="用时"
            width="150"
            sortable
            property="use_seconds"
          >
            <template slot-scope="scope">
              <duration-text
                v-if="!loading"
                :duration="scope.row.use_seconds"
              ></duration-text>
            </template>
          </el-table-column>
          <el-table-column sortable label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column prop="status_text" label="状态" width="100">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="查看"
                p="addons.Paper.mock_paper.userPaper"
                type="primary"
                @click="
                  $router.push({
                    name: 'ExamMockpaperShow',
                    query: {
                      id: scope.row.paper_id,
                      pid: scope.row.id,
                    },
                  })
                "
                class="ml-5"
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
import DurationText from "@/components/duration-text";

export default {
  components: {
    DurationText,
  },
  data() {
    return {
      pageName: "mockpaperRecord-list",
      pagination: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        user_id: null,
        status: -1,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        statusMap: [
          {
            id: -1,
            text: "全部",
          },
          {
            id: 0,
            text: "未交卷",
          },
          {
            id: 1,
            text: "已交卷",
          },
        ],
      },
    };
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.status = -1;
    },
  },
  activated() {
    this.getResults();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
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
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getResults();
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.list = [];
      let params = {};
      this.pagination.id = this.$route.query.id;
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Mockpaper.Userpaper(this.pagination.id, params).then(
        (res) => {
          this.loading = false;
          this.list = res.data.data;
          this.total = res.data.total;
        }
      );
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
