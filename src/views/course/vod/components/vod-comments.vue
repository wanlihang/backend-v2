<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="课程评论"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          type="danger"
          text="删除"
          p="course_comment.destroy"
          @click="delRecords()"
        ></p-button>
      </div>

      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select
            filterable
            :filter-method="dataFilter"
            placeholder="课程"
            class="w-150px"
            v-model="filter.course_id"
            v-el-select-loadmore="loadmore"
          >
            <el-option
              v-for="(item, index) in filterData.courses"
              :key="index"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="评论时间-开始"
            end-placeholder="评论时间-结束"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          class="float-left"
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="user_id" label="学员ID" width="120">
          </el-table-column>
          <el-table-column label="学员" width="300">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="users[scope.row.user_id]">
                <div class="avatar">
                  <img
                    :src="users[scope.row.user_id].avatar"
                    width="40"
                    height="40"
                  />
                </div>
                <div class="ml-10">
                  {{ users[scope.row.user_id].nick_name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="course.title" label="课程"> </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <div v-html="scope.row.render_content"></div>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="float-left text-center mt-30">
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
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      },
    },
  },
  props: ["id"],
  data() {
    return {
      pageName: "vodComment-list",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        course_id: null,
        user_id: null,
        created_at: null,
      },
      total: 0,
      loading: false,
      users: [],
      list: [],
      formData: {
        keywords: null,
        page: 1,
        size: 10,
      },
      filterData: {
        courses: [],
      },
      selectedRows: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  activated() {
    this.params();
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    dataFilter(val) {
      this.formData.keywords = val;
      this.formData.page = 1;
      let params = {};
      Object.assign(params, this.formData);
      this.$api.Course.Vod.List(params).then((res) => {
        this.filterData.courses = res.data.courses.data;
      });
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.course_id = null;
      this.filter.user_id = null;
      this.filter.created_at = null;
      this.formData.keywords = null;
      this.params();
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
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getData();
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    loadmore() {
      this.formData.page++;
      this.params();
    },
    params() {
      let params = {};
      Object.assign(params, this.formData);
      this.$api.Course.Vod.List(params).then((res) => {
        this.filterData.courses = [
          ...this.filterData.courses,
          ...res.data.courses.data,
        ];
      });
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = { course_id: this.id };
      Object.assign(params, this.pagination, this.filter);
      this.$api.Course.Vod.Comment.List(params).then((res) => {
        this.loading = false;

        this.list = res.data.data.data;
        this.total = res.data.data.total;

        this.users = res.data.users;
      });
    },
    delRecords() {
      if (this.loading) {
        return;
      }
      if (this.selectedRows === null) {
        this.$message.warning("请选择需要操作的数据");
        return;
      }
      this.loading = true;

      let ids = [];
      this.selectedRows.forEach((item) => {
        ids.push(item.id);
      });

      this.$api.Course.Vod.Comment.Destroy({ ids: ids })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.firstPageLoad();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
