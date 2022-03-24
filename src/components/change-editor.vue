<template>
  <div class="editor-box flex-column">
    <div class="d-flex w-800px" v-show="editorKey === 'markdown'">
      <mavon-editor
        :content="mavContent"
        class="w-800px"
        :height="height"
        :placeholder="placeholder"
        @change="change"
      ></mavon-editor>
    </div>
    <div class="d-flex w-800px" v-show="editorKey === 'quill'">
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
      desc: this.content,
      current: null,
      mavContent: this.content,
    };
  },
  computed: {
    ...mapState(["editorKey"]),
  },
  watch: {
    desc() {
      this.$emit("change", this.desc, this.desc);
    },
    editorKey() {
      this.current = this.editorKey;
    },
  },
  mounted() {
    let localCurrent = this.$utils.getEditorKey();
    let current = localCurrent ? localCurrent : "markdown";
    this.saveEditorKey(current);
    this.current = current;
  },
  methods: {
    ...mapMutations(["saveEditorKey"]),
    change(pureContent, renderContent) {
      this.$emit("change", pureContent, renderContent);
    },
    saveKey(value) {
      this.saveEditorKey(value);
      this.$utils.saveEditorKey(value);
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
