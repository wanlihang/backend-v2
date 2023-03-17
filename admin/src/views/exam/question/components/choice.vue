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

    <div class="float-left mb-15" v-for="(i, index) in length" :key="index">
      <div class="float-left helper-text mb-10">
        <span class="c-red">*</span>
        <span class="ml-5">选项{{ i }}</span>
      </div>
      <div class="float-left">
        <quill-editor
          class="quill-content"
          :is-formula="true"
          :height="40"
          v-model="form['option' + i]"
          mode="question"
        ></quill-editor>
      </div>
    </div>

    <div class="float-left mb-15">
      <el-button @click="add" type="primary">新增选项</el-button>
      <el-button @click="del" type="danger">删除选项</el-button>
    </div>

    <div class="float-left mb-15">
      <div class="float-left helper-text mb-10">
        <span class="c-red">*</span>
        <span class="ml-5">答案</span>
      </div>
      <div class="float-left">
        <el-select class="w-400px" v-model="form.answer">
          <el-option
            v-for="(item, index) in answers"
            :key="index"
            :label="item.name"
            :value="item.key"
          >
          </el-option>
        </el-select>
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
  computed: {
    answers() {
      let rows = [];
      for (let i = 0; i < this.length; i++) {
        rows.push({
          name: "选项" + (i + 1),
          key: "option" + (i + 1),
        });
      }
      return rows;
    },
  },
  data() {
    return {
      init: false,
      length: 4,
      form: {
        score: null,
        content: null,
        answer: null,
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
    "form.option1"() {
      this.update();
    },
    "form.option2"() {
      this.update();
    },
    "form.option3"() {
      this.update();
    },
    "form.option4"() {
      this.update();
    },
    "form.option5"() {
      this.update();
    },
    "form.option6"() {
      this.update();
    },
    "form.option7"() {
      this.update();
    },
    "form.option8"() {
      this.update();
    },
    "form.option9"() {
      this.update();
    },
    "form.option10"() {
      this.update();
    },
  },
  mounted() {
    if (this.question) {
      this.lengthComp();

      Object.assign(this.form, this.question);
    }

    this.init = true;
  },
  methods: {
    lengthComp() {
      for (let i = 1; i <= 10; i++) {
        if (!this.question["option" + i]) {
          this.length = i - 1;
          break;
        }
      }
    },
    add() {
      if (this.length >= 10) {
        this.$message.error("最多10个选项");
        return;
      }
      this.length += 1;
    },
    del() {
      if (this.length <= 2) {
        this.$message.error("至少得有两个选项");
        return;
      }
      this.form.answer = null;
      this.form["option" + this.length] = null;
      this.length -= 1;
    },
    update() {
      this.$emit("change", this.form, this.index);
    },
  },
};
</script>
