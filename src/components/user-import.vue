<template>
  <div class="meedu-dialog-mask" v-show="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">学员批量导入</div>
      <div class="meedu-dialog-body">
        <div class="d-flex float-left">
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
          <div style="display: none">
            <form ref="form">
              <input type="file" ref="xlsfile" />
            </form>
          </div>
        </div>
      </div>
      <div class="meedu-dialog-footer">
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
  props: ["id", "show", "type"],
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
    close() {
      this.$emit("close");
    },
    success() {
      this.$emit("close");
      this.$emit("change");
    },
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
        if (this.type === "vod") {
          this.$api.Course.Vod.UserImport(this.id, { mobiles: parseData })
            .then(() => {
              this.loading = false;
              this.$message.success("导入成功");
              this.success();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        } else if (this.type === "live") {
          this.$api.Course.Live.Course.UserImport(this.id, {
            mobiles: parseData,
          })
            .then(() => {
              this.loading = false;
              this.$message.success("导入成功");
              this.success();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        }
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
      var array = [["手机号"]];
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
          for (let i = 0; i < roa.length; i++) {
            data.push(roa[i][0]);
          }
        }
      });
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
.meedu-dialog-mask {
  z-index: 500 !important;
}
.meedu-dialog-box {
  width: 900px !important;
  margin-left: -450px !important;
  height: 250px !important;
  margin-top: -120px !important;
  .meedu-dialog-body {
    height: 100px !important;
  }
}
</style>
