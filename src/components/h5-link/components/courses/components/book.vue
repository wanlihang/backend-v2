<template>
  <div class="float-left" v-loading="loading">
    <div class="float-left mb-15">
      <div class="float-left d-flex">
        <div class="flex-1"></div>
        <div class="d-flex">
          <el-input
            class="w-200px"
            v-model="pagination.key"
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
      <el-table-column prop="id" label="电子书ID" width="120">
      </el-table-column>
      <el-table-column label="电子书">
        <template slot-scope="scope">
          <div class="d-flex">
            <div>
              <img :src="scope.row.thumb" width="80" height="100" />
            </div>
            <div class="ml-15">{{ scope.row.name }}</div>
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
        key: null,
      },
      loading: false,
      total: 0,
      courses: [],
    };
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
      this.pagination.key = null;
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
        this.link = "/pages/book/show?id=" + row.id;
      }
    },
    getCourse() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Meedubook.Book.List(this.pagination).then((res) => {
        this.loading = false;
        this.courses = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
  },
};
</script>
