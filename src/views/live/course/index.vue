<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'LiveCourseCategory' })"
        type="primary"
      >
        直播课程分类
      </el-button>
      <el-button
        @click="$router.push({ name: 'LiveCourseComment' })"
        type="primary"
      >
        直播课程评论
      </el-button>
      <el-button
        @click="$router.push({ name: 'LiveCourseCreate' })"
        type="primary"
      >
        添加课程
      </el-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">分类</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.category_id">
              <el-option
                v-for="(item, index) in filterData.courses"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="d-flex ml-15">
          <div class="filter-label">讲师</div>
          <div class="flex-1 ml-15">
            <el-select v-model="filter.teacher_id">
              <el-option
                v-for="(item, index) in filterData.teachers"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">搜索</div>
          <div class="flex-1 ml-15">
            <el-input
              class="w-200px"
              v-model="filter.keywords"
              placeholder="请输入关键字"
            ></el-input>
          </div>
        </div>
        <div class="ml-15">
          <el-button @click="getResults" type="primary" plain>筛选</el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="category.name" label="分类" width="120">
          </el-table-column>
          <el-table-column prop="teacher.name" label="讲师" width="160">
          </el-table-column>
          <el-table-column prop="title" label="课程名"> </el-table-column>
          <el-table-column label="价格" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.charge }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="学员" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.join_user_times }}人</span>
            </template>
          </el-table-column>
          <el-table-column label="学员" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status_text }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="260">
            <template slot-scope="scope">
              <el-link type="danger" @click="destory(scope.row.id)"
                >删除</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 5px"
                @click="
                  $router.push({
                    name: 'LiveCourseUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 5px"
                @click="
                  $router.push({
                    name: 'LiveCourseChapter',
                    query: { id: scope.row.id },
                  })
                "
                >章节</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 5px"
                @click="
                  $router.push({
                    name: 'LiveCourseUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >内容安排</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 5px"
                @click="
                  $router.push({
                    name: 'LiveCourseUsers',
                    query: { id: scope.row.id },
                  })
                "
                >购买用户</el-link
              >
            </template>
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
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        category_id: null,
        teacher_id: null,
        keywords: null,
      },
      total: 0,
      loading: false,
      results: [],
      filterData: {
        courses: [],
        teachers: [],
      },
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.teacher_id = null;
      this.filter.category_id = null;
      this.filter.keywords = null;
      this.getResults();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getResults();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getResults();
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      console.log(this.filter);
      this.$api.Course.Live.Course.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.courses = res.data.categories;
        this.filterData.teachers = res.data.teachers;
      });
    },
    destory(item) {
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
          this.$api.Course.Live.Course.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
            })
            .catch((e) => {
              this.loading = false;
              this.$message(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>

<style lang="less" scoped>
.filter-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 15px;
  background-color: white;

  .filter-label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
}
.user-item {
  width: auto;
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 10px;
  }
  .nickname {
    font-size: 15px;
    font-weight: normal;
  }
}
</style>