<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="视频批量导入"></back-bar>

    <div class="user-import-box">
      <div class="float-left d-flex mb-15">
        <div>
          <el-button type="primary" @click="choiceFile">
            选择Excel表格文件
          </el-button>
        </div>
        <div class="ml-30">
          <el-link type="primary" @click="model()">
            点击链接下载「视频批量导入模板」
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

        this.$api.Course.Vod.Videos.ImportAct({ data: parseData })
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
          "课程名",
          "章节",
          "视频名",
          "视频时长（单位：秒）",
          "腾讯云视频id",
          "视频url",
          "阿里云视频id",
          "价格（元）",
          "上架时间",
          "seo关键字",
          "seo描述",
          "试看（单位：秒）",
        ],
        [
          "我是实验课的名字",
          "我是章节（章节可空）",
          "我是视频名字",
          "3600",
          "",
          "",
          "",
          "10",
          "2022/1/11 11:11",
          "功能不支持，请忽略",
          "功能不支持，请忽略",
          "45",
        ],
      ];
      var sheet = XLSX.utils.aoa_to_sheet(array);
      // for (const key in sheet) {
      //   if (key.replace(/[^0-9]/gi, "") === "2") {
      //     sheet[key].s = {
      //       ...sheet[key].s,
      //       font: {
      //         //覆盖字体
      //         color: "ff5858",
      //       },
      //     };
      //   }
      // }
      var blob = this.sheet2blob(sheet, "视频批量导入模板");
      this.openDownloadXLSXDialog(blob, "视频批量导入模板.xlsx");
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
