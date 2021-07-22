<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'ExamPaperCreate' })"
        type="primary"
      >
        添加
      </el-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-select
            class="w-200px"
            placeholder="分类"
            v-model="filter.category_id"
          >
            <el-option
              v-for="(item, index) in filterData.categories"
              :key="index"
              :label="item.name"
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
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="list"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
          stripe
          class="float-left"
        >
          <el-table-column prop="id" sortable label="ID" width="120">
          </el-table-column>
          <el-table-column prop="category.name" label="分类" width="150">
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column label="及格/总分" width="100">
            <template slot-scope="scope">
              <span style="color: red">{{ scope.row.pass_score }}分</span>
              <span>/{{ scope.row.score }}分</span>
            </template>
          </el-table-column>
          <el-table-column label="时长" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.expired_minutes }}m</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="350">
            <template slot-scope="scope">
              <el-link type="danger" @click="destory(scope.row.id)"
                >删除</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'ExamPaperUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'ExamPaperUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >题目设置</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'ExamPaperUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >订阅用户</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'ExamPaperUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >分数统计</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'ExamPaperUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >考试记录</el-link
              >
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
        sort: "id",
        order: "desc",
      },
      filter: {
        category_id: null,
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
      this.filter.category_id = null;
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
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Paper.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;

        this.filterData.categories = res.data.categories;
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
          this.$api.Exam.Paper.Destory(item)
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
