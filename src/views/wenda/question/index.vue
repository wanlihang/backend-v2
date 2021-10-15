<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="分类管理"
        p="addons.Wenda.category.list"
        @click="$router.push({ name: 'QuestionCategory' })"
        type="primary"
      >
      </p-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-input
            class="w-200px"
            v-model="filter.keywords"
            placeholder="关键字"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-input
            class="w-200px"
            v-model="filter.user_id"
            placeholder="用户ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select
            placeholder="分类"
            class="w-200px"
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
          <el-select placeholder="状态" class="w-200px" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.status"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-date-picker
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="float-left mt-30">
        <el-button @click="destoryMulti()" type="danger"> 批量删除 </el-button>
        <el-button @click="firstPageLoad()" type="primary" plain
          >筛选</el-button
        >
        <el-button @click="paginationReset()">清空</el-button>
      </div>
    </div>

    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="questions"
          @selection-change="handleSelectionChange"
          class="float-left"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" sortable label="ID" width="120">
          </el-table-column>
          <el-table-column prop="user_id" sortable label="用户ID" width="120">
          </el-table-column>
          <el-table-column prop="category.name" label="分类" width="200">
          </el-table-column>
          <el-table-column label="用户" width="300">
            <template slot-scope="scope">
              <div class="d-flex" v-if="scope.row.user">
                <div>
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">
                  {{ scope.row.user.nick_name }}
                </div>
              </div>
              <span v-else class="c-red">用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="500">
          </el-table-column>
          <el-table-column
            label="浏览"
            sortable
            property="view_times"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.view_times }}次</span>
            </template>
          </el-table-column>
          <el-table-column
            label="点赞"
            sortable
            property="vote_count"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.vote_count }}次</span>
            </template>
          </el-table-column>
          <el-table-column
            label="答案"
            sortable
            property="answer_count"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.answer_count }}个</span>
            </template>
          </el-table-column>
          <el-table-column label="积分" sortable property="credit1" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.credit1 }}积分</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 1" type="success">
                {{ scope.row.status_text }}
              </el-tag>
              <el-tag type="info" v-else>{{ scope.row.status_text }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column sortable width="200" label="时间">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <p-link
                text="回答"
                p="addons.Wenda.question.answers"
                type="primary"
                @click="
                  $router.push({
                    name: 'QuestionAnswer',
                    query: { id: scope.row.id, status: scope.row.status },
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
      pageName: "wenda-list",
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        user_id: null,
        category_id: null,
        status: -1,
        created_at: null,
        keywords: null,
      },
      total: 0,
      loading: false,
      questions: [],
      spids: {
        ids: [],
      },
      filterData: {
        categories: [],
        status: [
          {
            id: -1,
            name: "全部",
          },
          {
            id: 0,
            name: "未解决",
          },
          {
            id: 1,
            name: "已解决",
          },
        ],
      },
    };
  },
  activated() {
    this.getQuestion();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getQuestion();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.category_id = null;
      this.filter.user_id = null;
      this.filter.status = -1;
      this.filter.keywords = null;
      this.filter.created_at = null;
      this.getQuestion();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getQuestion();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getQuestion();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getQuestion();
    },
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    create() {
      this.$api.Wenda.Question.Category()
        .then((res) => {
          this.filterData.categories = res.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    getQuestion() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Wenda.Question.List(params).then((res) => {
        this.loading = false;
        this.questions = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.categories = res.data.categories;
      });
    },
    destoryMulti() {
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
          this.$api.Wenda.Question.DestoryMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getQuestion();
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

