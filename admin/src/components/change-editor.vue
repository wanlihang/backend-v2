<template>
  <div class="editor-box flex flex-row">
    <div class="d-flex w-800px" v-if="editorKey === 'markdown'">
      <mavon-editor
        v-if="renderComponent"
        :content="mavContent"
        class="w-800px"
        :height="height"
        :placeholder="placeholder"
        @change="change"
      ></mavon-editor>
    </div>
    <div class="d-flex w-800px" v-if="editorKey === 'quill'">
      <quill-editor
        :height="height - 42"
        v-model="desc"
        v-if="renderComponent"
      ></quill-editor>
    </div>
    <div class="editor-tab">
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
      renderComponent: true,
    };
  },
  computed: {
    ...mapState(["editorKey"]),
  },
  watch: {
    desc() {
      this.$emit("change", this.desc, this.desc);
    },
    editorKey(newVal, oldVal) {
      this.current = this.editorKey;
      if (oldVal !== null) {
        this.$emit("change", null, null);
        this.desc = null;
        this.mavContent = null;
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
      }
    },
  },
  mounted() {
    let localCurrent = this.$utils.getEditorKey();
    let current = localCurrent ? localCurrent : "quill";
    this.saveEditorKey(current);
    this.current = current;
  },
  methods: {
    ...mapMutations(["saveEditorKey"]),
    change(pureContent, renderContent) {
      this.$emit("change", pureContent, renderContent);
    },
    saveKey(value) {
      this.$confirm("切换编辑器将清空已编辑文章内容，是否切换？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.saveEditorKey(value);
          this.$utils.saveEditorKey(value);
        })
        .catch(() => {
          //点击删除按钮的操作
          this.current = this.$utils.getEditorKey();
        });
    },
  },
};
</script>
<style lang="less" scoped>
.editor-box {
  width: 100%;
  float: left;
  .editor-tab {
    margin-left: 30px;
  }
}
</style>
