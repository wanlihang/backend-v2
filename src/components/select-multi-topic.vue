<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">选择图文</div>
      <div class="meedu-dialog-body">
        <div class="courses-box">
          <div class="float-left mb-15">
            <div class="float-left d-flex">
              <div class="d-flex">
                <el-input
                  class="w-150px"
                  v-model="pagination.keywords"
                  placeholder="关键字"
                ></el-input>
              </div>

              <div class="ml-10">
                <el-button @click="paginationReset"> 清空 </el-button>
                <el-button @click="firstPageLoad" type="primary"
                  >筛选</el-button
                >
              </div>
            </div>
          </div>
          <el-table
            ref="table"
            :header-cell-style="{ background: '#f1f2f9' }"
            :data="courses"
            @selection-change="handleSelectionChange"
            class="float-left mb-15"
            v-loading="loading"
          >
            <el-table-column
              type="selection"
              width="55"
              :selectable="checkSelectable"
            ></el-table-column>
            <el-table-column prop="id" label="图文ID" width="120">
            </el-table-column>
            <el-table-column label="图文">
              <template slot-scope="scope">
                <div class="d-flex">
                  <div>
                    <img :src="scope.row.thumb" width="80" height="60" />
                  </div>
                  <div class="ml-15">{{ scope.row.title }}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="float-left mt-15 text-center">
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
      <div class="meedu-dialog-footer">
        <el-button type="primary" @click="confirm"> 确定 </el-button>
        <el-button @click="close" class="ml-30">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show", "selected"],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        sort: "created_at",
        order: "desc",
        keywords: null,
      },
      loading: false,
      total: 0,
      courses: [],
      result: null,
    };
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    checkSelectable(row) {
      let id = row.id;
      if (!this.selected) {
        return true;
      }
      return this.selected.indexOf(id) <= -1;
    },
    paginationReset() {
      this.pagination.page = 1;
      this.pagination.keywords = null;
      this.getCourse();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getCourse();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getCourse();
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getCourse();
    },
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.result = newbox;
    },
    getCourse() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Course.Topic.Topic.List(this.pagination).then((res) => {
        this.loading = false;
        this.courses = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    confirm() {
      if (this.result === null || this.result === "") {
        this.$message.warning("请选择图文");
        return;
      }
      this.$emit("change", this.result);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.courses-box {
  width: 100%;
  height: auto;
  float: left;
}

.meedu-dialog-box {
  width: 900px !important;
  margin-left: -450px !important;
}
</style>
