<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" :title="paper.title"></back-bar>
    <el-button @click="download()" type="primary">下载pdf格式试卷 </el-button>
    <div class="float-left" id="pdfDom">
      <div class="top float-left d-flex">
        <div class="user-info">账户名：{{ user.nick_name }}</div>
        <div class="user-info">账号：{{ user.mobile }}</div>
      </div>
      <div class="top float-left d-flex">
        <div class="score" v-if="userPaper && userPaper.status === 1">
          最终得分：{{ userPaper.get_score }}
        </div>
        <div class="score" v-else>阅卷中</div>
        <div class="score-info">
          及格分：{{ paper.pass_score }}分/{{ paper.score }}分
        </div>
      </div>
      <div class="paper-box">
        <div class="questions-box" v-if="questions && userPaper">
          <template v-for="(question, index) in questions">
            <div class="item" :key="index">
              <!-- 单选 -->
              <question-choice
                :num="index + 1"
                v-if="question.question.type === 1"
                :question="question.question"
                :reply="question.answer_content"
                :score="question.score"
                :is-correct="question.is_correct"
                @update="questionUpdate"
                :is-over="true"
              ></question-choice>

              <!-- 多选 -->
              <question-select
                :num="index + 1"
                v-else-if="question.question.type === 2"
                :question="question.question"
                :reply="question.answer_content"
                :score="question.score"
                :is-correct="question.is_correct"
                @update="questionUpdate"
                :is-over="true"
              ></question-select>

              <!-- 填空 -->
              <question-input
                :num="index + 1"
                v-else-if="question.question.type === 3"
                :question="question.question"
                :reply="question.answer_content"
                :score="question.score"
                :is-correct="question.is_correct"
                @update="questionUpdate"
                :is-over="true"
              ></question-input>

              <!-- 问答 -->
              <question-qa
                :num="index + 1"
                v-else-if="question.question.type === 4"
                :question="question.question"
                :reply="question.answer_content"
                :thumbs="question.thumbs_rows"
                :score="question.score"
                :is-correct="question.is_correct"
                @update="questionUpdate"
                :show-image="true"
                :is-over="true"
              ></question-qa>

              <!-- 判断 -->
              <question-judge
                :num="index + 1"
                v-else-if="question.question.type === 5"
                :question="question.question"
                :score="question.score"
                :is-correct="question.is_correct"
                :reply="parseInt(question.answer_content)"
                @update="questionUpdate"
                :is-over="true"
              ></question-judge>

              <!-- 题帽题 -->
              <question-cap
                :num="index + 1"
                v-else-if="question.question.type === 6"
                :question="question.question"
                :score="question.score"
                :show-image="true"
                :is-correct="false"
                :reply="question.answer_content"
                @update="questionUpdate"
                :is-over="true"
              ></question-cap>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionChoice from "../../../components/choice.vue";
import QuestionSelect from "../../../components/select.vue";
import QuestionInput from "../../../components/input.vue";
import QuestionQa from "../../../components/qa.vue";
import QuestionJudge from "../../../components/judge.vue";
import QuestionCap from "../../../components/cap.vue";

export default {
  components: {
    QuestionChoice,
    QuestionSelect,
    QuestionInput,
    QuestionQa,
    QuestionJudge,
    QuestionCap,
  },
  data() {
    return {
      workTime: 0,
      id: this.$route.query.id || 0,
      pid: this.$route.query.pid || 0,
      paper: [],
      user: [],
      questions: [],
      userPaper: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    finish() {
      this.submitHandle();
    },
    questionUpdate(qid, answer, thumbs) {
      console.log(qid + ":" + thumbs + ":" + answer);
    },
    download() {
      let shareContent = document.querySelector("#pdfDom");
      let imgList = shareContent.querySelectorAll("img");
      if (imgList) {
        console.log(imgList);
        var i;
        for (i = 1; i < imgList.length; i++) {
          imgList[i].src += "&timeSign=" + Date.now().toString();
          console.log(imgList[i].src);

          window.URL = window.URL || window.webkitURL;
          var xhr = new XMLHttpRequest();
          xhr.open("get", imgList[i].src, true);
          xhr.send();
        }
      }
      this.$htmlToPdf.downloadPdf(this.paper.title);
    },
    getData() {
      this.$api.Exam.MockPaperJoinRecord(this.id, this.pid)
        .then((res) => {
          this.paper = res.data.paper;
          document.title = res.data.paper.title;
          this.userPaper = res.data.user_paper;
          this.user = res.data.user;
          let normaldata = res.data.questions;
          if (normaldata.length === 0) {
            this.$message.error("未获取到试题");
            this.$router.back();
            return;
          }
          let box = [];
          for (let key in normaldata) {
            box.push(...normaldata[key]);
          }
          let params = [];
          let choice = [];
          let select = [];
          let input = [];
          let qa = [];
          let judge = [];
          let cap = [];
          box.forEach((item) => {
            if (item.question) {
              if (item.question.type === 1) {
                choice.push(item);
              }
              if (item.question.type === 2) {
                select.push(item);
              }
              if (item.question.type === 3) {
                input.push(item);
              }
              if (item.question.type === 4) {
                qa.push(item);
              }
              if (item.question.type === 5) {
                judge.push(item);
              }
              if (item.question.type === 6) {
                cap.push(item);
              }
            }
          });

          if (choice.length > 0) {
            params.push(...choice);
          }
          if (select.length > 0) {
            params.push(...select);
          }
          if (input.length > 0) {
            params.push(...input);
          }
          if (qa.length > 0) {
            params.push(...qa);
          }
          if (judge.length > 0) {
            params.push(...judge);
          }
          if (cap.length > 0) {
            params.push(...cap);
          }
          this.questions = params;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 60px;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 30px;
  box-sizing: border-box;
  .score {
    height: 24px;
    font-size: 24px;
    font-weight: 600;
    color: #333333;
    line-height: 24px;
    margin-right: 50px;
  }
  .user-info {
    height: 16px;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 16px;
    margin-right: 30px;
  }
  .score-info {
    height: 16px;
    font-size: 16px;
    font-weight: 400;
    color: #666666;
    line-height: 16px;
    margin-right: 30px;
  }
  .remaining-time {
    height: 16px;
    font-size: 16px;
    font-weight: 400;
    color: #666666;
    line-height: 16px;
    margin-right: 50px;
  }
  .button {
    width: 104px;
    height: 40px;
    background: #3ca7fa;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
  }
}

.paper-box {
  display: flex;
  width: 100%;
  margin: 0 auto;
  min-height: 600px;
  background: #ffffff;
  border-radius: 8px;
  margin-top: 0px;
  .questions-box {
    width: 100%;
  }
}
</style>
