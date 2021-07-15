<template>
  <div class="float-left" v-loading="loading">
    <div class="user-import-box">
      <div class="float-left mb-15">
        优惠码批量导入模板下载：<a
          href="https://www.yuque.com/meedu/fvvkbf/lpwsry"
          target="_blank"
          >https://www.yuque.com/meedu/fvvkbf/lpwsry</a
        >
      </div>
      <div class="float-left">
        <el-button type="primary" @click="choiceFile">选择文件</el-button>

        <div style="display: none">
          <form ref="form">
            <input type="file" ref="xlsfile" />
          </form>
        </div>
      </div>
    </div>

    <div class="bottom-menus">
      <div>
        <el-button @click="$router.push({ name: 'Promocode'})"
          >取消</el-button
        >
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
        // parseData.splice(0, 1);
        if (parseData.length === 0) {
          this.$message.error("数据为空");
          return;
        }

        this.loading = true;

        // 请求导入api
        this.$refs.form.reset();

        this.$api.Order.PromoCode.Import({ data: parseData })
          .then(() => {
            this.loading = false;
            this.$message.success("导入成功");
            this.$router.push({ name: "Promocode" });
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      };
      reader.readAsArrayBuffer(f);
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