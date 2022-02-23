<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="兑换码"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="批量删除"
          @click="destorymulti()"
          type="danger"
          p="addons.CodeExchanger.codes.delete.multi"
        >
        </p-button>
        <p-button
          text="生成10个"
          @click="getnum(10)"
          type="primary"
          p="addons.CodeExchanger.codes.generate"
        >
        </p-button>
        <p-button
          text="生成50个"
          @click="getnum(50)"
          type="primary"
          p="addons.CodeExchanger.codes.generate"
        >
        </p-button>
        <p-button
          text="导出未使用兑换码"
          @click="importcode()"
          type="primary"
          p="addons.CodeExchanger.codes.export"
        >
        </p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.code"
            placeholder="兑换码"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="用户ID"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="code" label="兑换码" width="400">
          </el-table-column>
          <el-table-column label="是否使用" width="150">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_used === 1" type="danger"
                >已使用</el-tag
              >
              <el-tag v-else typpe="info">未使用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="使用用户ID"
            width="120"
            prop="user_id"
          ></el-table-column>
          <el-table-column label="使用用户" width="200">
            <template slot-scope="scope">
              <div class="d-flex" v-if="scope.row.is_used === 1">
                <div class="d-flex">
                  <div>
                    <img :src="scope.row.user.avatar" width="40" height="40" />
                  </div>
                  <div class="ml-10">{{ scope.row.user.nick_name }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="使用时间">
            <template slot-scope="scope">{{
              scope.row.used_at | dateFormat
            }}</template>
          </el-table-column>
        </el-table>
      </div>

      <div class="float-left mt-30 text-center">
        <el-pagination
          @size-change="paginationSizeChange"
          @current-change="paginationPageChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "codes-list",
      pagination: {
        gid: this.$route.query.id,
        page: 1,
        size: 10,
      },
      filter: {
        code: "",
        user_id: "",
      },
      spids: {
        ids: [],
      },
      popbox: {
        gid: this.$route.query.id,
        count: null,
      },
      total: 0,
      loading: false,
      results: [],
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.code = "";
      this.filter.user_id = "";
      this.spids.ids = [];
    },
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.code = "";
      this.filter.user_id = "";
      this.getData();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getData();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.gid = this.$route.query.id;
      this.popbox.gid = this.$route.query.id;
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.CodeExchanger.Codes.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    destorymulti() {
      if (this.spids.ids == "") {
        this.$message.error("请选择需要操作的数据");
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }

          this.loading = true;
          this.$api.CodeExchanger.Codes.DestoryMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
    getnum(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.popbox.count = item;
          this.$api.CodeExchanger.Codes.Generate(this.popbox)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
    importcode() {
      const XLSX = require("xlsx");
      // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
      function sheet2blob(sheet, sheetName) {
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
        var blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream",
        });
        // 字符串转ArrayBuffer
        function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
          return buf;
        }
        return blob;
      }

      function openDownloadDialog(url, saveName) {
        if (typeof url == "object" && url instanceof Blob) {
          url = URL.createObjectURL(url); // 添加blob地址
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
      }

      this.$api.CodeExchanger.Codes.Export().then((res) => {
        let header = [["兑换码"]];
        res.data.forEach((item) => {
          header.push([item.code]);
        });
        let sheet = XLSX.utils.aoa_to_sheet(header);
        openDownloadDialog(sheet2blob(sheet), "兑换码.xlsx");
      });
    },
  },
};
</script>
