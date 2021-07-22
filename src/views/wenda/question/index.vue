<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'QuestionCategory' })"
        type="primary"
      >
        分类管理
      </el-button>
      <el-button @click="destoryMulti()" type="danger"> 批量删除 </el-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">用户ID</div>
          <div class="flex-1 ml-15">
            <el-input
              class="w-100"
              v-model="filter.user_id"
              placeholder="用户ID"
              style="width: 200px"
            ></el-input>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">分类</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.category_id">
              <el-option
                v-for="(item, index) in filterData.categories"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">状态</div>
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
          <el-button @click="getQuestion" type="primary" plain>筛选</el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="questions"
          stripe
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column
          ><!-- 显示选取表格 -->
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column prop="category.name" label="分类" width="100">
          </el-table-column>
          <el-table-column label="用户">
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
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column label="浏览" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.view_times }}次</span>
            </template>
          </el-table-column>
          <el-table-column label="点赞" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.vote_count }}次</span>
            </template>
          </el-table-column>
          <el-table-column label="答案" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.answer_count }}个</span>
            </template>
          </el-table-column>
          <el-table-column label="积分" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.credit1 }}积分</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" style="color: red">{{
                scope.row.status_text
              }}</span>
              <span v-else>{{ scope.row.status_text }}</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="
                  $router.push({
                    name: 'QuestionAnswer',
                    query: { id: scope.row.id },
                  })
                "
                >回答</el-link
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
      },
      filter: {
        user_id: null,
        category_id: null,
        status: "",
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
  mounted() {
    // this.create();
    this.getQuestion();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.category_id = null;
      this.filter.user_id = null;
      this.filter.status = "";
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
    //保存选中结果
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

