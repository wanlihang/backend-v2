<template>
  <div class="editor-box flex-column">
    <div class="d-flex w-100" v-show="current === 'markdown'">
      <mavon-editor
        :content="content"
        class="w-100"
        :height="height"
        :placeholder="placeholder"
        @change="change"
      ></mavon-editor>
    </div>
    <div class="d-flex w-100" v-show="current === 'quill'">
      <quill-editor :height="height - 42" v-model="desc"></quill-editor>
    </div>
    <div class="editor-tab d-flex w-100">
      <el-select @change="saveKey" class="w-150px" v-model="current">
        <el-option
          v-for="(item, index) in tools"
          :key="index"
          :label="item.title"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import MavonEditor from "@/components/md-editor";
import QuillEditor from "@/components/quill-editor";
export default {
  components: {
    MavonEditor,
    QuillEditor,
  },
  props: ["content", "placeholder", "height"],
  data() {
    return {
      tools: [
        { title: "Markdown", key: "markdown" },
        { title: "富文本编辑器", key: "quill" },
      ],
      current: "markdown",
      desc: this.content,
    };
  },
  computed: {
    ...mapState(["editorKey"]),
  },
  watch: {
    desc() {
      this.$emit("change", this.desc, this.desc);
    },
  },
  mounted() {
    if (this.editorKey) {
      this.current = this.editorKey;
    }
  },
  methods: {
    ...mapMutations(["saverEditorKey"]),
    change(pureContent, renderContent) {
      this.$emit("change", pureContent, renderContent);
    },
    saveKey(value) {
      this.saverEditorKey(value);
    },
  },
};
</script>
<style lang="less" scoped>
.editor-box {
  width: 100%;
  float: left;
  .editor-tab {
    margin-top: 5px;
  }
}
</style>
