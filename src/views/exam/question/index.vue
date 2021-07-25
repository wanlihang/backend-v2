<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="批量删除"
        p="addons.Paper.question.delete"
        @click="destorymulti()"
        type="danger"
      >
      </p-button>
      <p-button
        text="添加试题"
        p="addons.Paper.question.store"
        @click="
          $router.push({
            name: 'ExamQuestionCreate',
          })
        "
        type="primary"
      >
      </p-button>
      <p-button
        text="批量导入试题"
        p="addons.Paper.question.import.csv"
        @click="
          $router.push({
            name: 'ExamQuestionImport',
          })
        "
        type="primary"
      >
      </p-button>
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
          <el-select class="w-200px" placeholder="类型" v-model="filter.type">
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
          <el-select class="w-200px" placeholder="难度" v-model="filter.level">
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
          :data="results"
          @selection-change="handleSelectionChange"
          stripe
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="category_name" label="分类"> </el-table-column>
          <el-table-column prop="type_text" label="类型"> </el-table-column>
          <el-table-column prop="level_text" label="难度"> </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <div v-html="scope.row.content"></div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.Paper.question.update"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'ExamQuestionUpdate',
                    query: { id: scope.row.id },
                  })
                "
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
        page: 1,
        size: 10,
      },
      filter: {
        category_id: null,
        type: null,
        level: null,
      },
      total: 0,
      loading: false,
      results: [],
      spids: {
        ids: [],
      },
      filterData: {
        categories: [],
        levels: [],
        types: [],
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
      this.spids.ids = newbox;
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Question.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.types = res.data.types;
        this.filterData.categories = res.data.categories;
        this.filterData.levels = res.data.levels;
      });
    },
    destorymulti() {
      if (this.spids.ids == "") {
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
          this.$api.Exam.Question.DestoryMulti(this.spids)
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
