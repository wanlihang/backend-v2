<template>
  <div class="quill-editor-box" :class="{ 'h-min-40': height === 40 }">
    <div ref="myQuillEditor" class="quill-editor">
      <slot name="toolbar"></slot>
      <div ref="editor"></div>
    </div>

    <select-image
      :show="showUploadImage"
      :from="1"
      @close="showUploadImage = false"
      @selected="uploadImage"
    ></select-image>
  </div>
</template>

<script>
import _Quill from "quill";
import katex from "katex";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "katex/dist/katex.css";

import debounce from "lodash/debounce";
import SelectImage from "@/components/select-image";

export default {
  components: {
    SelectImage,
  },
  props: ["value", "height", "mode", "isFormula"],
  data() {
    return {
      quill: null,
      showUploadImage: false,
      editorIndex: 0,
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: this.toolbar(),
          formula: this.formula(),
        },
        placeholder: "请输入内容...",
        readOnly: false,
      },
    };
  },
  mounted() {
    window.katex = katex;
    this.init();
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },
  methods: {
    formula() {
      if (this.isFormula) {
        return true;
      } else {
        return false;
      }
    },
    toolbar() {
      if (this.mode && this.mode === "question") {
        if (this.isFormula) {
          return ["bold", "italic", "underline", "strike", "image", "formula"];
        }
        return ["bold", "italic", "underline", "strike", "image"];
      }

      return [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "video", "image"],
      ];
    },
    init() {
      this.quill = new _Quill(this.$refs["myQuillEditor"], this.editorOption);

      //禁用编辑器，防止页面自动滚动到编辑器位置
      this.quill.enable(false);
      // 初始值
      this.quill.pasteHTML(this.value || "");
      this.$nextTick(function() {
        //丢掉编辑器焦点并重新启用编辑器
        this.quill.blur();
        this.quill.enable(true);
      });

      // 自定义imageHandler
      this.quill.getModule("toolbar").addHandler("image", () => {
        this.showUploadImage = true;
      });

      // 监听记录Index
      this.quill.on("selection-change", (range, oldRange) => {
        if (oldRange === null || oldRange.index === 0) {
          this.editorIndex = this.quill.getLength();
        } else {
          this.editorIndex = oldRange.index;
        }
        console.log(this.editorIndex);
      });

      // 值变化
      this.quill.on(
        "text-change",
        debounce(() => {
          let html = this.$refs.myQuillEditor.children[0].innerHTML;
          if (html === "<p><br></p>") {
            html = "";
          }
          this.onEditorChange(html);
        }, 400)
      );
    },
    onEditorChange(val) {
      this.$emit("input", val);
    },
    uploadImage(imgUrl) {
      this.quill.insertEmbed(this.editorIndex, "image", imgUrl);
      this.showUploadImage = false;
    },
  },
};
</script>

<style lang="less" scoped>
.quill-editor-box {
  width: 100%;
  float: left;
}
</style>

<style lang="less">
.quill-editor-box {
  background-color: white;

  .ql-toolbar.ql-snow {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-color: #dcdfe6;
  }

  .ql-container.ql-snow {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-color: #dcdfe6;
  }

  .ql-picker-label::before {
    position: absolute;
  }
  .ql-picker-label {
    svg {
      display: block;
    }
  }
  .ql-toolbar.ql-snow {
    padding: 0;
  }
  .ql-editor {
    min-height: 80px;
  }

  &.h-min-40 {
    .ql-editor {
      min-height: 40px;
    }
  }
}
</style>
