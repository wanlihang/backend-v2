<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="章节组卷"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="添加"
          p="addons.Paper.practice_chapter.questions.store"
          @click="
            $router.push({
              name: 'PracticeChapterQuestionCreate',
              query: { id: pagination.id },
            })
          "
          type="primary"
        >
        </p-button>
        <p-button
          text="批量删除"
          p="addons.Paper.practice_chapter.questions.delete"
          @click="destorymulti()"
          type="danger"
        >
        </p-button>
      </div>
      <div class="d-flex">
        <div>
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
          <el-select class="w-150px" placeholder="类型" v-model="filter.type">
            <el-option
              v-for="(item, index) in filterData.types"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-select class="w-150px" placeholder="难度" v-model="filter.level">
            <el-option
              v-for="(item, index) in filterData.levels"
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
          :data="results"
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="category_name" label="分类" width="200">
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="120">
          </el-table-column>
          <el-table-column prop="level_text" label="难度" width="120">
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <question-render :question="scope.row"></question-render>
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
import QuestionRender from "@/components/question-render";

export default {
  components: {
    QuestionRender,
  },
  data() {
    return {
      pageName: "practiceChapterQuestion-list",
      pagination: {
        page: 1,
        size: 10,
        id: this.$route.query.id,
      },
      filter: {
        category_id: null,
        type: null,
        level: null,
      },
      loading: false,
      results: [],
      total: 0,
      spids: {
        id: this.$route.query.id,
        qids: [],
      },
      filterData: {
        categories: [],
        levels: [],
        types: [],
      },
    };
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.level = null;
      this.filter.category_id = null;
      this.filter.type = null;
      this.spids.qids = [];
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
      this.filter.level = null;
      this.filter.category_id = null;
      this.filter.type = null;
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
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.qids = newbox;
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.id = this.$route.query.id;
      this.spids.id = this.$route.query.id;
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Practice.Chapter.Question.List(
        this.pagination.id,
        params
      ).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;

        this.filterData.types = res.data.types;
        this.filterData.categories = res.data.categories;
        this.filterData.levels = res.data.levels;
      });
    },
    destorymulti() {
      if (this.spids.qids == "") {
        this.$message.error("请选择需要操作的数据");
        return;
      }
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
          this.$api.Exam.Practice.Chapter.Question.DestoryMulti(
            this.pagination.id,
            this.spids
          )
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
