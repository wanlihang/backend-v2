<template>
  <div ref="editor"></div>
</template>
<script>
import wangEditor from "wangeditor";
import Utils from "@/js/utils";

export default {
  props: ["html", "height"],
  data() {
    return {
      editor: null,
      content: null,
    };
  },
  mounted() {
    const editor = new wangEditor(this.$refs["editor"]);
    // 基础配置
    editor.config.height = this.height || 300;
    editor.config.zIndex = 10;
    editor.config.focus = false;
    // 图片上传配置
    editor.config.uploadImgShowBase64 = false; // base 64 存储图片
    editor.config.uploadImgServer = "/backend/api/v1/upload/image/tinymce"; // 配置服务器端地址
    editor.config.uploadImgHeaders = {
      Authorization: "Bearer " + Utils.getToken(),
    }; // 自定义 header
    editor.config.uploadFileName = "file"; // 后端接受上传文件的参数名
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024; // 将图片大小限制为 2M
    editor.config.uploadImgMaxLength = 1; // 限制一次最多上传 3 张图片
    editor.config.uploadImgTimeout = 60 * 1000; // 设置超时时间
    editor.config.uploadImgHooks = {
      customInsert: (insertImg, result) => {
        insertImg(result.location);
      },
    };
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
      "image", // 插入图片
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
  },
  beforeDestroy() {
    this.editor.destroy();
    this.editor = null;
  },
};
</script>