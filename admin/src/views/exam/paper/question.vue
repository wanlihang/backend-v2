<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="组卷"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加试题"
        p="addons.Paper.paper.questions.add"
        type="primary"
        @click="
          $router.push({
            name: 'ExamPaperQuestionCreate',
            query: { id: pagination.id },
          })
        "
      ></p-button>
      <p-button
        text="批量删除"
        p="addons.Paper.paper.questions.delete.batch"
        @click="destorymulti()"
        type="danger"
      >
      </p-button>
    </div>
    <div class="float-left mb-30">
      <div class="float">
        <h2>{{ totalScore }}分</h2>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div
        class="float-left mb-30"
        v-for="(list, typeText) in results"
        :key="typeText"
      >
        <div class="float-left mb-10 helper-text">
          {{ typeText }}&nbsp;(共{{ list.length }}题)
        </div>
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          @selection-change="handleSelectionChange($event, typeText)"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="试题ID" width="120">
          </el-table-column>
          <el-table-column label="分数" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}分</span>
            </template>
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="200">
          </el-table-column>
          <el-table-column prop="level_text" label="难度" width="200">
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <question-render :question="scope.row"></question-render>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <p-link
                text="删除"
                p="addons.Paper.paper.questions.delete"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
            </template>
          </el-table-column>
        </el-table>
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
      pageName: "paperQuestion-list",
      pagination: {
        id: this.$route.query.id,
      },
      spids: {
        ids: [],
      },
      ids1: [],
      ids2: [],
      ids3: [],
      ids4: [],
      ids5: [],
      ids6: [],
      loading: false,
      results: [],
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
  computed: {
    totalScore() {
      let score = 0;
      for (let index in this.results) {
        let list = this.results[index];
        for (let i = 0; i < list.length; i++) {
          score += list[i].score;
        }
      }
      return score;
    },
  },
  methods: {
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.id = this.$route.query.id;
      Object.assign(params, this.pagination);
      this.$api.Exam.Paper.Question(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.results = res.data.questions;
      });
    },
    handleSelectionChange(val, type) {
      let newbox = [];
      if (type === "单选题") {
        for (var i = 0; i < val.length; i++) {
          newbox.push(val[i].id);
        }
        this.ids1 = newbox;
      } else if (type === "多选题") {
        for (var j = 0; j < val.length; j++) {
          newbox.push(val[j].id);
        }
        this.ids2 = newbox;
      } else if (type === "填空题") {
        for (var l = 0; l < val.length; l++) {
          newbox.push(val[l].id);
        }
        this.ids3 = newbox;
      } else if (type === "问答题") {
        for (var m = 0; m < val.length; m++) {
          newbox.push(val[m].id);
        }
        this.ids4 = newbox;
      } else if (type === "判断题") {
        for (var n = 0; n < val.length; n++) {
          newbox.push(val[n].id);
        }
        this.ids5 = newbox;
      } else if (type === "题帽题") {
        for (var k = 0; k < val.length; k++) {
          newbox.push(val[k].id);
        }
        this.ids6 = newbox;
      }

      this.spids.ids = [
        ...this.ids1,
        ...this.ids2,
        ...this.ids3,
        ...this.ids4,
        ...this.ids5,
        ...this.ids6,
      ];
    },
    destory(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.$api.Exam.Paper.QuestionDestroy(this.pagination.id, item)
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
          this.$api.Exam.Paper.QuestionDestoryMulti(
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
