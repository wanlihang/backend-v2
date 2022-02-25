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

    <div class="float-left mb-15" v-for="(i, index) in length" :key="i">
      <div class="d-flex">
        <div class="helper-text">
          <span class="c-red">*</span>
          <span class="ml-5">空{{ i }}答案</span>
        </div>
        <div class="flex-1 ml-10">
          <el-input
            class="w-400px"
            placeholder="答案"
            v-model="answers[index]"
          ></el-input>
        </div>
      </div>
    </div>

    <div class="float-left mb-15">
      <el-link type="primary" @click="inc">增加一个空</el-link>
      <el-link class="ml-10" type="danger" v-if="length > 1" @click="dec">
        删除一个空
      </el-link>
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
      length: 1,
      form: {
        score: null,
        content: null,
        answer: null,
        remark: null,
      },
      answers: [],
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
    answers() {
      let data = [];
      for (let i = 0; i < this.length; i++) {
        data.push(this.answers[i]);
      }
      this.form.answer = data.join(",");
    },
  },
  mounted() {
    if (this.question) {
      Object.assign(this.form, this.question);

      // 解析答案
      if (this.form.answer) {
        this.answers = this.form.answer.split(",");
        this.length = this.answers.length;
      }
    }

    this.init = true;
  },
  methods: {
    update() {
      this.$emit("change", this.form, this.index);
    },
    inc() {
      this.length += 1;
    },
    dec() {
      if (this.length <= 1) {
        this.$message.warning("最少一个空");
        return;
      }
      this.answers.splice(this.length - 1, 1);
      this.length -= 1;
    },
  },
};
</script>
