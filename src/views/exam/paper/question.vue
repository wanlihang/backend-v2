<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="设置习题"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加习题"
        p="addons.Paper.paper.questions.add"
        type="primary"
        @click="
          $router.push({
            name: 'ExamPaperQuestionCreate',
            query: { id: pagination.id },
          })
        "
      ></p-button>
    </div>
    <div class="float-left mb-30">
      <div class="float">
        <span>总分：{{ totalScore }}分</span>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <div
          class="questions-box"
          v-for="(list, typeText) in results"
          :key="typeText"
        >
          <div class="title">{{ typeText }}&nbsp;(共{{ list.length }}题)</div>
          <el-table
            :data="list"
            @selection-change="handleSelectionChange"
            stripe
            class="float-left"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column label="分数">
              <template slot-scope="scope">
                <span>{{ scope.row.score }}分</span>
              </template>
            </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        id: this.$route.query.id,
      },
      loading: false,
      results: [],
      spids: {
        ids: [],
      },
    };
  },

  mounted() {
    this.getResults();
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
      Object.assign(params, this.pagination);
      this.$api.Exam.Paper.Question(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.results = res.data.questions;
      });
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
  },
};
</script>
