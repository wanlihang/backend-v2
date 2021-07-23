<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="参与用户"></back-bar>
    <div class="float-left mb-30">
      <el-button @click="showUserAddWin = true">添加用户</el-button>
      <el-button @click="exportXlsx" type="primary">导出记录</el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
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
          <el-table-column label="已练习" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.submit_count }}题</span>
            </template>
          </el-table-column>
          <el-table-column label="练习进度" width="150">
            <template slot-scope="scope">
              <span
                >{{
                  ((scope.row.submit_count * 100) / question_count).toFixed(2)
                }}%</span
              >
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-link type="danger" @click="destory(scope.row.user_id)"
                >删除</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'PracticeProgress',
                    query: { pid: scope.row.user_id, id: pagination.id },
                  })
                "
                >练习进度</el-link
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
    <user-add-comp
      :show="showUserAddWin"
      @close="showUserAddWin = false"
      @confirm="userAddChange"
    ></user-add-comp>
  </div>
</template>

<script>
import UserAddComp from "@/components/user-add";
import Utils from "@/js/utils.js";

export default {
  components: {
    UserAddComp,
  },
  data() {
    return {
      showUserAddWin: false,
      pagination: {
        page: 1,
        size: 10,
        id: this.$route.query.id,
      },
      total: 0,
      question_count: null,
      loading: false,
      results: [],
      electedRows: null,
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
      Object.assign(params, this.pagination);
      this.$api.Exam.Practice.User(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.question_count = res.data.question_count;
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
          let params = {
            id: this.pagination.id,
            user_id: item,
          };
          this.$api.Exam.Practice.DestoryUser(this.pagination.id, params)
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
        size: 20000,
        id: this.pagination.id,
      }).then((resp) => {
        this.loading = false;

        if (resp.data.data.total === 0) {
          this.$message.error("暂无数据");

          return;
        }

        let data = resp.data.data.data;
        let questionCount = resp.data.question_count;

        let filename = "练习进度|" + Utils.currentDate() + ".xlsx";
        let sheetName = "sheet1";

        let rows = [["用户ID", "用户名", "手机号", "已练习题目数", "进度"]];
        data.forEach((item) => {
          if (!item.user) {
            return;
          }

          let p =
            questionCount === 0
              ? 0
              : ((item.submit_count / questionCount) * 100).toFixed(2);

          rows.push([
            item.user_id,
            item.user.nick_name,
            item.user.mobile,
            item.submit_count,
            p + "%",
          ]);
        });

        Utils.exportExcel(rows, filename, sheetName);
      });
    },
  },
};
</script>
