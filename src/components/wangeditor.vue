<template>
  <div>
    <div ref="editor"></div>
    <select-image
      :show="showUploadImage"
      :from="1"
      @close="showUploadImage = false"
      @selected="uploadImage"
    ></select-image>
  </div>
</template>
<script>
import SelectImage from "@/components/select-image";
import wangEditor from "wangeditor";

export default {
  components: {
    SelectImage,
  },
  props: ["html", "height"],
  data() {
    return {
      editor: null,
      content: null,
      showUploadImage: false,
    };
  },
  mounted() {
    // 自定义菜单
    const { BtnMenu } = wangEditor;
    var that = this;
    class UploadImage extends BtnMenu {
      constructor(editor) {
        const $elem = wangEditor.$(
          `<div class="w-e-menu" data-title="Images"><i class="w-e-icon-image"></i></div>`
        );
        super($elem, editor);
      }
      clickHandler() {
        that.showUploadImage = true;
      }
      tryChangeActive() {}
    }
    wangEditor.registerMenu("meedu-upload-image", UploadImage);
    // 初始化
    const editor = new wangEditor(this.$refs["editor"]);
    // 基础配置
    editor.config.height = this.height || 300;
    editor.config.zIndex = 10;
    editor.config.focus = false;
    // 配置菜单
    editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "link", // 插入链接
      "justify", // 对齐方式
      "quote", // 引用
      "video", // 插入iframe
      "table", // 表格
      "code", // 插入代码
    ];
    // 内容更新
    editor.config.onchange = (newHtml) => {
      this.emitUpdate(newHtml);
    };
    editor.create();
    editor.txt.html(this.html);
    this.editor = editor;
  },
  methods: {
    emitUpdate(val) {
      this.$emit("change", val);
    },
    uploadImage(imgUrl) {
      this.editor.cmd.do(
        "insertHTML",
        `<img src="${imgUrl}" style="max-width:100%;" contenteditable="false"/>`
      );
      this.showUploadImage = false;
    },
  },
  beforeDestroy() {
    this.editor.destroy();
    this.editor = null;
  },
};
</script>