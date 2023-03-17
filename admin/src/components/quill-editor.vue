<template>
  <div class="quill-editor-box" :class="{ 'h-min-40': height === 40 }">
    <div ref="myQuillEditor" :style="style" class="quill-editor">
      <slot name="toolbar"></slot>
      <div ref="editor"></div>
    </div>
    <!--弹窗数据-->
    <el-dialog
      title="插入视频地址"
      :visible="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form">
        <el-form-item>
          <el-input
            v-model="form.videoIframe"
            placeholder="如：<iframe src=... ></iframe>"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      showUploadImage: false,
      form: {
        videoIframe: "",
      },
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
  computed: {
    style() {
      if (this.height !== 40) {
        return { height: (this.height || 300) + "px" };
      }
      return null;
    },
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
          return [
            "bold",
            "italic",
            "underline",
            "strike",
            "video",
            "image",
            "formula",
          ];
        }
        return ["bold", "italic", "underline", "strike", "video", "image"];
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
      this.$nextTick(function () {
        //丢掉编辑器焦点并重新启用编辑器
        this.quill.blur();
        this.quill.enable(true);
      });

      // 自定义imageHandler
      this.quill.getModule("toolbar").addHandler("image", () => {
        this.showUploadImage = true;
      });
      //  自定义插入视频
      this.quill.getModule("toolbar").addHandler("video", () => {
        this.dialogFormVisible = true;
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
    confirm() {
      this.quill.focus();
      if (!/^<iframe.+<\/iframe>$/.test(this.form.videoIframe)) {
        this.form.videoIframe = "";
        return;
      }
      var range = this.quill.getSelection();
      if (range) {
        //  在当前光标位置插入图片
        this.quill
          .getModule("toolbar")
          .quill.clipboard.dangerouslyPasteHTML(
            range.index,
            this.form.videoIframe
          );
        //  将光标移动到图片后面
        this.quill.getModule("toolbar").quill.setSelection(range.index + 1);
      }
      this.form.videoIframe = "";
      this.dialogFormVisible = false;
    },
    uploadImage(imgUrl) {
      let index = this.editorIndex;
      let nextIndex = this.editorIndex + 1;
      let html = this.$refs.myQuillEditor.children[0].innerHTML;
      if (html === "<p><br></p>") {
        index = 0;
        nextIndex = 1;
      }
      this.quill.insertEmbed(index, "image", imgUrl);
      this.quill.getModule("toolbar").quill.setSelection(nextIndex);
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
    .ql-picker-label {
      color: #ccc;
    }
    .ql-picker-label {
      color: #ccc;
    }
    .ql-active {
      color: #000;
    }
    .ql-stroke {
      stroke: #ccc;
    }
    .ql-fill {
      fill: #ccc;
    }
    .ql-picker.ql-expanded .ql-picker-options {
      z-index: 2001;
    }
  }

  .ql-container.ql-snow {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-color: #dcdfe6;
    font-size: 14px;
    color: #606266;
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
  .ql-editor[data-placeholder]::before {
    font-style: normal;
    font-size: 14px;
    color: #c0c4cc;
  }

  &.h-min-40 {
    .ql-editor {
      min-height: 40px;
    }
  }
}
</style>
