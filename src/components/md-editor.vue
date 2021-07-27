<template>
  <div :style="{ height: (height || 300) + 'px' }">
    <mavon-editor
      style="height: 100%; z-index: 2001"
      ref="mavonEditor"
      :value="content"
      :boxShadow="false"
      :transition="false"
      :subfield="true"
      :toolbars="toolbars"
      :placeholder="placeholder"
      :autofocus="false"
      @change="change"
    >
      <template slot="left-toolbar-after">
        <button
          type="button"
          @click="showUploadImage = true"
          class="op-icon fa fa-mavon-picture-o"
        ></button>
      </template>
    </mavon-editor>

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

export default {
  components: {
    SelectImage,
  },
  props: ["content", "placeholder", "height"],
  data() {
    return {
      showUploadImage: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        undo: true, // 上一步
        redo: true, // 下一步
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      imgCount: 0,
    };
  },
  methods: {
    change(pureContent, renderContent) {
      this.$emit("change", pureContent, renderContent);
    },
    uploadImage(src) {
      this.imgCount++;

      let pos = this.imgCount;

      let imgText = {
        prefix: `![${pos}](`,
        subfix: ")",
        str: src,
      };

      this.$refs["mavonEditor"].insertText(
        this.$refs["mavonEditor"].getTextareaDom(),
        imgText
      );

      // 图片选择结束
      this.showUploadImage = false;
    },
  },
};
</script>