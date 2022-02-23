<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="新建"
          p="addons.Paper.practice.store"
          @click="$router.push({ name: 'ExamPracticeCreate' })"
          type="primary"
        >
        </p-button>
        <el-button
          type="primary"
          @click="$router.push({ name: 'PaperCategories' })"
        >
          分类管理
        </el-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.key"
            placeholder="练习试卷关键字"
          ></el-input>
        </div>
        <div class="d-flex ml-10">
          <el-select
            class="w-150px"
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
          <el-table-column prop="category.name" label="分类" width="200">
          </el-table-column>
          <el-table-column prop="name" label="练习名" width="500">
          </el-table-column>
          <el-table-column label="题目数">
            <template slot-scope="scope">
              <span>{{ scope.row.question_count }}个</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <p-link
                text="章节"
                p="addons.Paper.practice_chapter.list"
                type="primary"
                @click="
                  $router.push({
                    name: 'PracticeChapter',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                class="ml-5"
                text="学员"
                p="addons.Paper.practice.users"
                type="primary"
                @click="
                  $router.push({
                    name: 'PracticeUser',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <el-dropdown>
                <el-link type="primary" class="el-dropdown-link ml-5">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-link>
                <el-dropdown-menu slot="dropdown">
                  <p-dropdown-item
                    type="primary"
                    text="编辑"
                    p="addons.Paper.practice.update"
                    @click="
                      $router.push({
                        name: 'ExamPracticeUpdate',
                        query: { id: scope.row.id },
                      })
                    "
                  >
                  </p-dropdown-item>
                  <p-dropdown-item
                    text="删除"
                    p="addons.Paper.practice.delete"
                    type="danger"
                    @click="destory(scope.row.id)"
                  >
                  </p-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
      pageName: "practice-list",
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        category_id: null,
        key: null,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        categories: [],
      },
    };
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
      this.filter.category_id = null;
      this.filter.key = null;
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
      this.$api.Exam.Practice.List(params).then((res) => {
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
          var ids = [];
          ids.push(item);
          let box = {
            ids: ids,
          };
          this.$api.Exam.Practice.Destroy(box)
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
