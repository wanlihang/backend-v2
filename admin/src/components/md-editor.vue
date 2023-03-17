<template>
  <div :style="{ height: (height || 300) + 'px' }">
    <mavon-editor
      style="height: 100%; z-index: 1999"
      ref="mavonEditor"
      :value="content"
      :boxShadow="false"
      :transition="false"
      :subfield="true"
      :toolbars="toolbars"
      :placeholder="placeholder"
      :autofocus="false"
      :xssOptions="{
        whiteList: {
          iframe: ['src', 'height', 'width'],
          div: ['style', 'height', 'width', 'align'],
        },
      }"
      @change="change"
    >
      <template slot="left-toolbar-after">
        <el-button
          type="text"
          @click="dialogLinkVisible = true"
          class="op-icon fa fa-mavon-link"
          title="链接"
        ></el-button>
        <el-button
          type="text"
          @click="dialogFormVisible = true"
          aria-hidden="true"
          class="op-icon fa"
          title="插入视频资源"
        >
          <i class="el-icon-video-camera-solid" />
        </el-button>
        <button
          type="button"
          @click="showUploadImage = true"
          class="op-icon fa fa-mavon-picture-o"
        ></button>
      </template>
    </mavon-editor>
    <el-dialog title="添加链接" :visible.sync="dialogLinkVisible">
      <el-form :model="form">
        <el-form-item
          style="margin-bottom: 22px"
          label="链接描述"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.linkDes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth">
          <el-input v-model="form.linkValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLinkVisible = false">取 消</el-button>
        <!--单机确定按钮后触发 videoLink事件函数，开始格式化链接格式并插入到文本域-->
        <el-button type="primary" @click="addLink">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 插入视频链接的dialog提示框，表单对话框 -->
    <el-dialog title="插入视频资源" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="iframe链接" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--单机确定按钮后触发 videoLink事件函数，开始格式化链接格式并插入到文本域-->
        <el-button type="primary" @click="videoLink">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 错误提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      id="link-error"
    >
      <span>视频链接格式错误，请重新确认后再输入！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
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
        link: false, // 链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
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
      dialogLinkVisible: false,
      dialogFormVisible: false, // 用于控制表单对话框的开启和关闭
      dialogVisible: false, // 用于控制错误提示对话框的开启和关闭
      formLabelWidth: "120px", // 设定表单对话框内表单是宽度
      form: {
        // 表单对话框内表单的数据
        link: "",
        region: "iframe",
        linkDes: null,
        linkValue: null,
      },
    };
  },
  methods: {
    change(pureContent, renderContent) {
      this.$emit("change", pureContent, renderContent);
    },
    addLink() {
      if (this.form.linkDes && this.form.linkValue) {
        let linkText = `[${this.form.linkDes}](${this.form.linkValue})`;
        // 获取文本域中当前光标起始位置、结束位置以及滚动条位置（滚动条位置我认为没有必要，如有需要可以自己取消注释）
        let textarea = document.getElementsByClassName(
          "auto-textarea-input"
        )[0];
        let posStart = textarea.selectionStart;
        let posEnd = textarea.selectionEnd;
        // let posScroll = document.getElementsByClassName("v-note-edit")[0].scrollTop;
        // 获取文本域中未选中的的前半部分和后半部分，以被选中内容起始和结束位置做分割点
        let subStart = this.$refs["mavonEditor"].d_value.substring(0, posStart);
        let subEnd = this.$refs["mavonEditor"].d_value.substring(
          posEnd,
          this.$refs["mavonEditor"].d_value.length
        );
        // 拼接并替换文本域内容
        this.$refs["mavonEditor"].d_value =
          subStart + "\n" + linkText + "\n" + subEnd;
      }
      this.form.linkDes = null;
      this.form.linkValue = null;
      this.dialogLinkVisible = false;
    },
    videoLink() {
      // 准备链接模板
      let linkFrame = "";
      let linkFrameStart =
        "<div align=center width=100%><iframe height=500 width=80% src='";
      let linkFrameEnd = "' frameborder=0 'allowfullscreen'></iframe></div>";
      // 创建一个div盒子，为提取src做准备
      var box = document.createElement("div");
      // 将原始链接插入到盒子中
      box.innerHTML = this.form.link;
      // 判断不同的视频原链接类型
      if (this.form.region == "url") {
        linkFrame = linkFrameStart + this.form.link + linkFrameEnd;
      } else if (
        this.form.region == "iframe" &&
        box.getElementsByTagName("iframe").length > 0
      ) {
        // 从iframe标签中提取src属性
        linkFrame =
          linkFrameStart +
          box.getElementsByTagName("iframe")[0].getAttribute("src") +
          linkFrameEnd;
      } else {
        // 原始链接格式错误时弹出错误提示
        this.dialogFormVisible = false;
        this.dialogVisible = true;
      }
      // 复原表单文本框内容
      this.form.link = "";
      this.form.region = "";

      // 获取文本域中当前光标起始位置、结束位置以及滚动条位置（滚动条位置我认为没有必要，如有需要可以自己取消注释）
      let textarea = document.getElementsByClassName("auto-textarea-input")[0];
      let posStart = textarea.selectionStart;
      let posEnd = textarea.selectionEnd;
      // let posScroll = document.getElementsByClassName("v-note-edit")[0].scrollTop;
      // 获取文本域中未选中的的前半部分和后半部分，以被选中内容起始和结束位置做分割点
      let subStart = this.$refs["mavonEditor"].d_value.substring(0, posStart);
      let subEnd = this.$refs["mavonEditor"].d_value.substring(
        posEnd,
        this.$refs["mavonEditor"].d_value.length
      );
      // 拼接并替换文本域内容
      this.$refs["mavonEditor"].d_value =
        subStart + "\n" + linkFrame + "\n" + subEnd;
      // document.getElementsByClassName("v-note-edit")[0].scrollTop = posScroll;

      // 关闭对话框
      this.dialogFormVisible = false;
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
