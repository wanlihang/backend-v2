<template>
  <div class="quill-editor-box">
    <quill-editor
      class="quill-editor-obj"
      ref="myQuillEditor"
      :value="value"
      :options="editorOption"
      @change="onEditorChange"
      :style="{ height: (height || 'auto') + 'px' }"
    />

    <select-image
      :show="showUploadImage"
      :from="1"
      @close="showUploadImage = false"
      @selected="uploadImage"
    ></select-image>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import debounce from "lodash/debounce";

import SelectImage from "@/components/select-image";

export default {
  components: {
    quillEditor,
    SelectImage,
  },
  props: ["value", "height"],
  data() {
    return {
      showUploadImage: false,
      editorIndex: 0,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons

            ["blockquote", "code-block"],

            [{ list: "ordered" }, { list: "bullet" }],

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],
            [{ align: [] }],

            ["link", "image"],

            ["clean"],
          ],
        },
        placeholder: "请输入内容...",
      },
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.editor.getModule("toolbar").addHandler("image", () => {
        this.showUploadImage = true;
      });

      this.editor.on("selection-change", (range, oldRange) => {
        if (oldRange === null || oldRange.index === 0) {
          this.editorIndex = this.editor.getLength();
        } else {
          this.editorIndex = oldRange.index;
        }
        console.log(this.editorIndex);
      });
    });
  },
  methods: {
    onEditorChange: debounce(function (e) {
      console.log(e);
      this.$emit("input", e.html);
    }, 400),
    uploadImage(imgUrl) {
      this.editor.insertEmbed(this.editorIndex, "image", imgUrl);
      this.showUploadImage = false;
    },
  },
};
</script>

<style lang="less" scoped>
.quill-editor-box {
  width: 100%;
  height: auto;
  float: left;
}
</style>