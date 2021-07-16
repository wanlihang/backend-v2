<template>
  <el-dialog
    :visible="show"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    width="1200px"
  >
    <div class="title">选择录播课程</div>
    <div class="courses-box">
      <div class="float-left mb-15">
        <div class="float-left d-flex">
          <div class="flex-1"></div>

          <div class="d-flex">
            <el-input
              class="w-200px"
              v-model="pagination.keywords"
              placeholder="关键字"
            ></el-input>
          </div>

          <div class="ml-15">
            <el-button @click="getCourse" type="primary">筛选</el-button>
            <el-button class="ml-15" @click="paginationReset">清空</el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="courses"
        highlight-current-row
        @current-change="handleCurrentChange"
        class="float-left"
        v-loading="loading"
      >
        <el-table-column prop="id" label="课程ID" width="120">
        </el-table-column>
        <el-table-column label="课程">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm"> 确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["show"],
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
    handleCurrentChange(row) {
      this.result = row;
    },
    getCourse() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Course.Vod.List(this.pagination).then((res) => {
        this.loading = false;
        this.courses = res.data.courses.data;
        this.total = res.data.courses.total;
      });
    },
    confirm() {
      if (this.result === null) {
        this.$message.warning("请选择课程");
        return;
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: auto;
  float: left;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  margin-bottom: 40px;
}

.courses-box {
  width: 100%;
  height: 520px;
  float: left;
  margin-bottom: 40px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 4px;
}
</style>