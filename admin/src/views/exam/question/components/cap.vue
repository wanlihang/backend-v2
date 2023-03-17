<template>
  <div class="float-left" v-if="init">
    <div class="float-left mb-15">
      <div class="float-left helper-text mb-10">
        <span class="c-red">*</span>
        <span class="ml-5">题帽</span>
      </div>
      <div class="float-left">
        <quill-editor
          class="quill-content"
          :is-formula="true"
          :height="40"
          v-model="header"
          mode="question"
        ></quill-editor>
      </div>
    </div>

    <div class="float-left">
      <div class="question-item" v-for="(item, index) in list" :key="index">
        <div class="btn-close" @click="remove(index)">
          <close-icon></close-icon>
        </div>
        <div class="float-left mb-15 helper-text">
          <span v-if="item.type === 1">单选题</span>
          <span v-if="item.type === 2">多选题</span>
          <span v-if="item.type === 3">填空题</span>
          <span v-if="item.type === 4">问答题</span>
          <span v-if="item.type === 5">判断题</span>
        </div>

        <q-choice
          @change="change"
          :index="index"
          :question="item"
          v-if="item.type === 1"
        ></q-choice>
        <q-select
          @change="change"
          :index="index"
          :question="item"
          v-else-if="item.type === 2"
        ></q-select>
        <q-input
          @change="change"
          :index="index"
          :question="item"
          v-else-if="item.type === 3"
        ></q-input>
        <q-qa
          @change="change"
          :index="index"
          :question="item"
          v-else-if="item.type === 4"
        ></q-qa>
        <q-judge
          @change="change"
          :index="index"
          :question="item"
          v-else-if="item.type === 5"
        ></q-judge>
      </div>
    </div>

    <div class="float-left mt-15 mb-15">
      <div class="d-flex">
        <div>
          <el-select
            class="w-300px"
            placeholder="试题类型"
            v-model="addForm.type"
          >
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="填空" :value="3"></el-option>
            <el-option label="问答" :value="4"></el-option>
            <el-option label="判断" :value="5"></el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-button type="primary" @click="add">新增子题</el-button>
        </div>
      </div>
    </div>

    <div class="float-left mb-15">
      <div class="float-left helper-text mb-10">
        <span>总分</span>
      </div>
      <div class="float-left">
        <span>{{ form.score || 0 }}分</span>
      </div>
    </div>

    <div class="float-left mb-15">
      <div class="float-left helper-text mb-10">解析</div>
      <div class="float-left">
        <quill-editor
          class="quill-content"
          :is-formula="true"
          :height="40"
          v-model="form.remark"
          mode="question"
        ></quill-editor>
      </div>
    </div>
  </div>
</template>

<script>
import QuillEditor from "@/components/quill-editor";
import CloseIcon from "@/components/close-icon";

import QChoice from "./choice.vue";
import QSelect from "./select.vue";
import QInput from "./input.vue";
import QJudge from "./judge.vue";
import QQa from "./qa.vue";

export default {
  components: {
    QuillEditor,
    CloseIcon,
    QChoice,
    QSelect,
    QInput,
    QJudge,
    QQa,
  },
  props: ["question"],
  data() {
    return {
      init: false,
      header: null,
      list: [],
      form: {
        content: null,
        answer: null,
        score: null,
        remark: null,
      },
      addForm: {
        type: null,
      },
    };
  },
  watch: {
    header() {
      this.update();
    },
    "form.remark"() {
      this.update();
    },
  },
  mounted() {
    if (this.question) {
      Object.assign(this.form, this.question);

      let data = JSON.parse(this.question.content);
      this.list = data.questions;
      this.header = data.header;
    }

    this.init = true;
  },
  methods: {
    add() {
      if (!this.addForm.type) {
        this.$message.warning("请选择添加的试题类型");
        return;
      }

      let data = {
        type: this.addForm.type,
        content: null,
        answer: null,
        score: null,
        remark: null,
      };
      switch (this.addForm.type) {
        case 1:
          Object.assign(data, {
            option1: null,
            option2: null,
            option3: null,
            option4: null,
            option5: null,
            option6: null,
            option7: null,
            option8: null,
            option9: null,
            option10: null,
          });
          break;
        case 2:
          Object.assign(data, {
            answer: [],
            option1: null,
            option2: null,
            option3: null,
            option4: null,
            option5: null,
            option6: null,
            option7: null,
            option8: null,
            option9: null,
            option10: null,
          });
          break;
      }

      this.list.push(data);
      this.addForm.type = null;
    },
    remove(index) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.list.splice(index, 1);

          this.update();
        })
        .catch(() => {});
    },
    change(question, index) {
      if (question.type === 2 && Array.isArray(question.answer)) {
        question.answer = question.answer.join(",");
      }
      Object.assign(this.list[index], question);

      this.update();
    },
    update() {
      // 分数统计
      let score = 0;
      this.list.forEach((item) => {
        if (typeof item.score === "undefined" || item.score === null) {
          return;
        }
        score += parseInt(item.score);
      });
      this.form.score = score;

      // content
      this.form.content = JSON.stringify({
        header: this.header,
        questions: this.list,
      });

      // 触发emit
      this.$emit("change", this.form);
    },
  },
};
</script>

<style lang="less" scoped>
.question-item {
  position: relative;
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  margin-bottom: 15px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  .btn-close {
    position: absolute;
    left: 0;
    top: -18px;
  }
}
</style>
