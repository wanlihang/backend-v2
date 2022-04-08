<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="学员批量导入"></back-bar>

    <div class="user-import-box">
      <div class="float-left d-flex mb-30">
        <div>
          <el-button :loading="loading" type="primary" @click="choiceFile">
            选择Excel表格文件
          </el-button>
        </div>
        <div class="ml-30">
          <el-link type="primary" @click="model()">
            点击链接下载「学员批量导入模板」
          </el-link>
        </div>
      </div>
      <div class="float-left">
        <div class="rules">
          <div class="title">用户批量导入规则介绍</div>
          <div class="rule-item">
            <div class="item-title">1.手机号</div>
            <div class="item-desc">
              <span class="c-red">必填</span> -
              支持中国大陆手机号，标准的11位，不需要在手机号前面添加（+86）区号
            </div>
          </div>

          <div class="rule-item">
            <div class="item-title">2.密码</div>
            <div class="item-desc">
              <span class="c-red">必填</span> - 任意英文+数字的组合字符串
            </div>
          </div>

          <div class="rule-item">
            <div class="item-title">3.VIP</div>
            <div class="item-desc">
              选填 - 请填写[后台-运营-VIP会员]列表显示的ID
            </div>
          </div>

          <div class="rule-item">
            <div class="item-title">4.VIP过期时间</div>
            <div class="item-desc">
              选填 - 时间格式为：<code>YYYY-mm-dd HH:ii:ss</code>，如：<code
                >2022-04-08 12:00:00</code
              >
            </div>
          </div>

          <div class="rule-item">
            <div class="item-title">5.是否锁定</div>
            <div class="item-desc">
              选填 - 可填写值：[1, 0] -
              1:锁定意味着无法登录,0:不锁定意味着无登录限制
            </div>
          </div>

          <div class="rule-item">
            <div class="item-title">6.标签</div>
            <div class="item-desc">
              选填 - 任意的字符串，多个标签请用英文逗号分割 -
              例如我想给用户打上“大客户”+“精神小伙”这两个标签的话，可以这样输入：大客户,精神小伙
            </div>
          </div>
        </div>
      </div>
      <div class="float-left">
        <div style="display: none">
          <form ref="form">
            <input type="file" ref="xlsfile" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.xlsfile.addEventListener("change", this.handleFile, false);
    });
  },
  methods: {
    choiceFile() {
      this.$refs.xlsfile.click();
    },
    handleFile(e) {
      // 处理文件
      let files = e.target.files;
      if (files.length === 0) {
        this.$message.error("请选择文件");
        return;
      }
      let f = files[0];
      // 文件扩展名检测
      let extension = f.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "xlsx") {
        this.$message.error("请选择xlsx文件");
        return;
      }

      // 读取数据
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: "array", cellDates: true });
        let parseData = this.parseData(workbook);
        parseData.splice(0, 1);
        if (parseData.length === 0) {
          this.$message.error("数据为空");
          return;
        }

        this.loading = true;

        // 请求导入api
        this.$refs.form.reset();

        this.$api.Member.Import({ users: parseData })
          .then(() => {
            this.loading = false;
            this.$message.success("导入成功");
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      };
      reader.readAsArrayBuffer(f);
    },
    sheet2blob(sheet, sheetName) {
      //将文件转换为二进制文件
      sheetName = sheetName || "sheet1";
      var workbook = {
        SheetNames: [sheetName],
        Sheets: {},
      };
      workbook.Sheets[sheetName] = sheet;
      // 生成excel的配置项
      var wopts = {
        bookType: "xlsx", // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: "binary",
      };
      var wbout = XLSX.write(workbook, wopts);
      var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
      // 字符串转ArrayBuffer
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      return blob;
    },
    openDownloadXLSXDialog(url, saveName) {
      //下载模板文件
      if (typeof url == "object" && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }

      var aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event;
      if (window.MouseEvent) event = new MouseEvent("click");
      else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
      }
      aLink.dispatchEvent(event);
    },
    model() {
      var array = [
        [
          "手机号",
          "密码",
          "VIP",
          "VIP过期时间",
          "是否锁定（1锁定，0不锁定）",
          "标签",
        ],
      ];
      var sheet = XLSX.utils.aoa_to_sheet(array);
      var blob = this.sheet2blob(sheet, "学员批量导入模板");
      this.openDownloadXLSXDialog(blob, "学员批量导入模板.xlsx");
    },
    parseData(workbook) {
      let data = [];
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });
        if (roa.length) {
          data.push(...roa);
        }
      });
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
.user-import-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 30px 100px;
  border-radius: 15px;
  background-color: white;
}
</style>
