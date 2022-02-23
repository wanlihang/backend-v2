<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="阅卷"></back-bar>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <div class="h-panel-body">
          <div class="float-box mb-10">
            <h2>
              {{ userPaper.status_text }}
              <span v-if="userPaper.status === 2"
                >- {{ userPaper.score }}分</span
              >
            </h2>
          </div>
          <div class="float-box mb-10">
            <div class="question-item" v-for="item in list" :key="item.id">
              <div class="content">
                <div
                  class="header"
                  v-if="item.header"
                  v-html="item.header"
                ></div>

                <div class="mb-10" v-html="item.content"></div>

                <div class="answer">
                  <p>回答：{{ item.answer }}</p>
                  <template v-if="item.thumbs.length > 0">
                    <el-image
                      v-for="(img, index) in item.thumbs"
                      :key="index"
                      :src="img"
                      :preview-src-list="item.thumbs"
                      style="width: 70px; height: 70px"
                    ></el-image>
                  </template>
                </div>

                <div class="score">
                  <p>请打分：</p>
                  <div>
                    <el-select v-model="score[item.id]">
                      <el-option
                        v-for="(item, index) in scoreList(item.score)"
                        :key="index"
                        :label="item.text"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="float-box mt-10"></div>
        </div>
      </div>

      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button
              v-if="userPaper.status === 3"
              @click="formValidate"
              :loading="loading"
              type="primary"
            >
              保存
            </el-button>
          </div>
          <div class="ml-24">
            <el-button @click="$router.back()"> 取消 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        id: this.$route.query.id,
        user_paper_id: this.$route.query.user_paper_id,
      },
      score: [],
      userPaper: {},
      questions: [],
      optionLength: 10,
      loading: false,
    };
  },
  computed: {
    list() {
      if (this.questions.length === 0) {
        return [];
      }
      let list = [];
      for (let i = 0; i < this.questions.length; i++) {
        let question = this.questions[i];
        if (question.question === null) {
          continue;
        }
        if (question.question.type === 4) {
          // 问答题
          list.push({
            id: question.id,
            score: question.question.score,
            header: null,
            content: question.question.content,
            remark: question.question.remark,
            answer: question.answer_content,
            thumbs: question.thumbs ? JSON.parse(question.thumbs) : [],
          });
          continue;
        }
        if (question.question.type === 6) {
          // 题帽题
          let questionContent = JSON.parse(question.question.content);
          let answerContent = question.answer_content
            ? JSON.parse(question.answer_content)
            : {};

          for (let j = 0; j < questionContent.questions.length; j++) {
            let childrenQuestion = questionContent.questions[j];
            let childrenAnswer =
              typeof answerContent[j] === "undefined" ? null : answerContent[j];
            if (childrenQuestion.type === 4) {
              // 题帽题中含有问答题
              list.push({
                id: question.id + "-cap-" + j,
                score: childrenQuestion.score,
                header: questionContent.header,
                content: childrenQuestion.content,
                remark: question.question.remark,
                answer: childrenAnswer ? childrenAnswer["answer"] : "",
                thumbs: childrenAnswer ? childrenAnswer["thumbs"] : [],
              });
            }
          }

          continue;
        }
      }

      return list;
    },
  },
  mounted() {
    this.params();
  },
  methods: {
    scoreList(max) {
      var rows = [];
      for (let i = 0; i <= max; i++) {
        rows.push({
          id: i,
          text: i + "分",
        });
      }
      return rows;
    },
    selectIsActive(val, answer) {
      var answers = answer.split(",");
      return answers.indexOf(val) !== -1;
    },
    userAnswer(item) {
      if (item.question.type === 1) {
        return item.question[item.answer_content];
      } else if (item.question.type === 2) {
        let rows = [];
        item.answer_content.split(",").forEach((i) => {
          rows.push(item.question[i]);
        });
        return rows.join(",");
      } else if (item.question.type === 5) {
        return parseInt(item.answer_content) === 1 ? "正确" : "错误";
      } else {
        return item.answer_content;
      }
    },
    params() {
      let params = {};
      Object.assign(params, this.filter);
      this.$api.Exam.Paper.Marking(
        this.filter.id,
        this.filter.user_paper_id,
        params
      ).then((res) => {
        this.userPaper = res.data.userPaper;
        this.questions = res.data.questions;
      });
    },
    formValidate() {
      this.confirm();
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      var data = {};
      for (let i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        data[item.id] = {
          score: this.score[item.id],
        };
      }
      this.$api.Exam.Paper.SubmitScore({
        id: this.filter.id,
        user_paper_id: this.filter.user_paper_id,
        data: data,
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.back();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.question-item {
  width: 100%;
  height: auto;
  float: left;
  padding: 15px;
  border: 1px dashed #dddddd;

  .title {
    width: 100%;
    height: auto;
    float: left;
    line-height: 36px;
    font-weight: 600;
  }

  .content {
    width: 100%;
    height: auto;
    float: left;
    font-size: 12px;

    .option {
      width: 100%;
      height: auto;
      float: left;
      margin-right: 15px;
      margin-bottom: 15px;

      .option-item {
        width: 100%;
        height: auto;
        float: left;
        line-height: 20px;
        padding-left: 10px;
        margin-bottom: 2px;

        &.user-active {
          background-color: red;
          color: white;
        }

        &.active {
          background-color: rgba(0, 128, 0, 0.6);
          color: white;

          &.user-active {
            background-color: rgba(0, 128, 0, 1);
          }
        }

        img {
          max-width: 100px;
        }
      }
    }
  }

  .header {
    width: 100%;
    height: auto;
    float: left;
    margin-bottom: 10px;
  }

  .answer {
    width: 100%;
    height: auto;
    float: left;
    color: #333;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.06);
    padding-left: 8px;
  }

  .result {
    width: 100%;
    height: auto;
    float: left;
    line-height: 30px;
  }

  .remark {
    width: 100%;
    height: auto;
    float: left;
    font-size: 12px;
    line-height: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .score {
    width: 100%;
    height: auto;
    float: left;
    margin-top: 10px;
  }
}

.green {
  color: green;
}
.red {
  color: red;
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

.operator {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 15px;
  text-align: right;
}
</style>
