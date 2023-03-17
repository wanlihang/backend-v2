<template>
  <div class="float-left">
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
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <el-table
      :header-cell-style="{ background: '#f1f2f9' }"
      :data="courses"
      highlight-current-row
      @current-change="handleCurrentChange"
      class="float-left mb-15"
      v-loading="loading"
    >
      <el-table-column label width="45">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model="radio"
            ><span></span
          ></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="视频ID" width="120"> </el-table-column>
      <el-table-column label="视频">
        <template slot-scope="scope">
          {{ scope.row.title }}
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
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
        keywords: null,
      },
      radio: "",
      loading: false,
      total: 0,
      courses: [],
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getCourse();
    },
    handleCurrentChange(row) {
      if (row) {
        this.radio = row.id;
        this.$emit("change", {
          resource_type: "video",
          id: row.id,
          title: row.title,
          thumb: row.course.thumb,
          charge: row.charge,
          original_charge: row.charge,
        });
      }
    },
    getCourse() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Course.Vod.Videos.List(this.pagination).then((res) => {
        this.loading = false;
        this.courses = res.data.videos.data;
        this.total = res.data.videos.total;
      });
    },
  },
};
</script>
