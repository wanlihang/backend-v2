<template>
  <div class="float-left" v-loading="loading">
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
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
          <el-button class="ml-15" @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <el-table
      :data="courses"
      highlight-current-row
      @current-change="tableItemChoice"
      class="float-left"
    >
      <el-table-column prop="id" label="课程ID" width="120"> </el-table-column>
      <el-table-column label="课程">
        <template slot-scope="scope">
          <div class="d-flex">
            <div>
              <img :src="scope.row.thumb" width="100" height="80" />
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
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["value"],
  data() {
    return {
      link: null,
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
    };
  },
  computed: {
    ...mapState(["enabledAddonsCount"]),
  },
  watch: {
    link(newVal) {
      if (newVal) {
        this.$emit("input", newVal);
      }
    },
  },
  mounted() {
    this.link = this.value;

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
    tableItemChoice(row) {
      if (row) {
        if (this.enabledAddonsCount === 0) {
          this.link = "/course/" + row.id + "/" + row.id;
        } else {
          this.link = "/pages/course/show?id=" + row.id;
        }
      }
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
  },
};
</script>
