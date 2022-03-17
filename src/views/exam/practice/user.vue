<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="参与学员"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加学员"
        p="addons.Paper.practice.user.insert"
        @click="showUserAddWin = true"
        type="primary"
      ></p-button>
      <el-button @click="exportXlsx" type="primary">导出记录</el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="user_id" label="学员ID" width="120">
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
          <el-table-column label="已练习" width="200">
            <template slot-scope="scope">
              <div>总试题：{{ questionCount }}题</div>
              <div class="c-red" v-if="practiceProgress[scope.row.user_id]">
                已练习：{{ practiceProgress[scope.row.user_id].submit_count }}题
              </div>
              <div class="c-red" v-else>已练习：0题</div>
            </template>
          </el-table-column>
          <el-table-column label="练习进度">
            <template slot-scope="scope">
              <div v-if="practiceProgress[scope.row.user_id]">
                {{
                  (
                    (practiceProgress[scope.row.user_id].submit_count * 100) /
                    questionCount
                  ).toFixed(2)
                }}%
              </div>
              <div v-else>0%</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="详细"
                p="addons.Paper.practice.user.progress"
                type="primary"
                @click="
                  $router.push({
                    name: 'PracticeProgress',
                    query: { pid: scope.row.user_id, id: pagination.id },
                  })
                "
              ></p-link>
              <p-link
                text="删除"
                class="ml-5"
                p="addons.Paper.practice.user.delete"
                type="danger"
                @click="destroy(scope.row.user_id)"
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
    <user-add-comp
      :show="showUserAddWin"
      @close="showUserAddWin = false"
      @confirm="userAddChange"
    ></user-add-comp>
  </div>
</template>

<script>
import UserAddComp from "@/components/user-add";

export default {
  components: {
    UserAddComp,
  },
  data() {
    return {
      pageName: "practiceUser-list",
      showUserAddWin: false,
      pagination: {
        page: 1,
        size: 10,
        id: this.$route.query.id,
      },
      total: 0,
      questionCount: 0,
      loading: false,
      results: [],
      practiceProgress: [],
      selectedRows: null,
    };
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
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
      this.pagination.id = this.$route.query.id;
      Object.assign(params, this.pagination);
      this.$api.Exam.Practice.User(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.questionCount = res.data.question_count;
        this.practiceProgress = res.data.progress;
      });
    },
    destroy(item) {
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
          let params = {
            id: this.pagination.id,
            user_id: item,
          };
          this.$api.Exam.Practice.DestroyUser(this.pagination.id, params)
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
    userAddChange(rows) {
      let ids = [];
      rows.forEach((item) => {
        ids.push(item.mobile);
      });

      this.$api.Exam.Practice.Add(this.pagination.id, {
        id: this.pagination.id,
        mobiles: ids,
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.firstPageLoad();
          this.showUserAddWin = false;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    exportXlsx() {
      this.loading = true;
      this.$api.Exam.Practice.User(this.pagination.id, {
        page: 1,
        size: this.total,
      }).then((resp) => {
        this.loading = false;

        if (resp.data.data.total === 0) {
          this.$message.error("暂无数据");

          return;
        }

        let data = resp.data.data.data;
        let questionCount = resp.data.question_count;
        let practiceProgress = resp.data.progress;

        let filename = "练习进度|" + this.$utils.currentDate() + ".xlsx";
        let sheetName = "sheet1";

        let rows = [
          ["用户ID", "用户名", "手机号", "总题目数", "已练习题目数", "进度"],
        ];
        data.forEach((item) => {
          if (!item.user) {
            return;
          }

          let p = 0;
          if (questionCount > 0 && practiceProgress[item.user_id]) {
            p = (
              (practiceProgress[item.user_id].submit_count / questionCount) *
              100
            ).toFixed(2);
          }

          rows.push([
            item.user_id,
            item.user.nick_name,
            item.user.mobile,
            questionCount,
            practiceProgress[item.user_id]
              ? practiceProgress[item.user_id].submit_count
              : 0,
            p + "%",
          ]);
        });

        this.$utils.exportExcel(rows, filename, sheetName);
      });
    },
  },
};
</script>
