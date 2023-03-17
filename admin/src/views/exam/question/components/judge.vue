<template>
  <div class="float-left" v-if="init">
    <div class="float-left mb-15">
      <div class="float-left helper-text mb-10">
        <span class="c-red">*</span>
        <span class="ml-5">分数</span>
      </div>
      <div class="float-left d-flex">
        <div>
          <el-input
            type="number"
            class="w-200px"
            placeholder="分数"
            v-model="form.score"
          ></el-input>
        </div>
        <div class="ml-10">
          <helper-text text="请输入整数。不支持小数。"></helper-text>
        </div>
        <div class="ml-10">
          <span class="helper-text">常见分数</span>
          <el-link class="ml-10" @click="form.score = 1" type="primary"
            >1分</el-link
          >
          <el-link class="ml-10" @click="form.score = 2" type="primary"
            >2分</el-link
          >
          <el-link class="ml-10" @click="form.score = 5" type="primary"
            >5分</el-link
          >
          <el-link class="ml-10" @click="form.score = 10" type="primary"
            >10分</el-link
          >
        </div>
      </div>
    </div>

    <div class="float-left mb-15">
      <div class="float-left helper-text mb-10">
        <span class="c-red">*</span>
        <span class="ml-5">试题内容</span>
      </div>
      <div class="float-left">
        <quill-editor
          class="quill-content"
          :is-formula="true"
          :height="40"
          v-model="form.content"
          mode="question"
        ></quill-editor>
      </div>
    </div>

    <div class="float-left mb-15">
      <div class="float-left helper-text mb-10">
        <span class="c-red">*</span>
        <span class="ml-5">答案</span>
      </div>
      <div class="float-left">
        <el-radio v-model="form.answer" :label="1">正确</el-radio>
        <el-radio v-model="form.answer" :label="0">错误</el-radio>
      </div>
    </div>

    <div class="float-left">
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

export default {
  components: {
    QuillEditor,
  },
  props: ["question", "index"],
  data() {
    return {
      init: false,
      form: {
        score: null,
        content: null,
        answer: null,
        remark: null,
      },
    };
  },
  watch: {
    "form.score"() {
      this.update();
    },
    "form.content"() {
      this.update();
    },
    "form.answer"() {
      this.update();
    },
    "form.remark"() {
      this.update();
    },
  },
  mounted() {
    if (this.question) {
      let question = {};
      Object.assign(question, this.question);

      question.answer = parseInt(question.answer);
      Object.assign(this.form, question);
    }

    this.init = true;
  },
  methods: {
    update() {
      this.$emit("change", this.form, this.index);
    },
  },
};
</script>
