<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="直播安排"></back-bar>
    <div class="float-left mb-30">
      <el-button
        @click="
          $router.push({
            name: 'LiveCourseVideoCreate',
            query: { course_id: pagination.course_id },
          })
        "
        type="primary"
      >
        添加
      </el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="name" label="标题">
            <template slot-scope="scope">
              <span>{{ scope.row.chapter.name }}</span>
              <span class="mx-5">/</span>
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="published_at" label="直播时间" width="200">
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status == 1">
                {{ scope.row.status_text }}
              </el-tag>
              <el-tag v-else-if="scope.row.status == 2">
                {{ scope.row.status_text }}
              </el-tag>
              <el-tag v-else type="info">
                {{ scope.row.status_text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-link type="danger" @click="destory(scope.row.id)">
                删除
              </el-link>
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LiveCourseVideoUpdate',
                    query: {
                      id: scope.row.id,
                      course_id: pagination.course_id,
                    },
                  })
                "
              >
                编辑
              </el-link>
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LiveCourseVideoPlay',
                    query: {
                      video_id: scope.row.id,
                      course_id: pagination.course_id,
                    },
                  })
                "
                >开播</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LiveCourseVideoUpdate',
                    query: {
                      id: scope.row.id,
                      course_id: pagination.course_id,
                    },
                  })
                "
                >观看</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LiveCourseVideoUpdate',
                    query: {
                      id: scope.row.id,
                      course_id: scope.row.course_id,
                    },
                  })
                "
                >讨论</el-link
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
        course_id: this.$route.query.id,
        keywords: "",
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      results: [],
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
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
      Object.assign(params, this.pagination);
      this.$api.Course.Live.Course.Video.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
        this.total = res.data.total;
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
          this.$api.Course.Live.Course.Video.Destory(item)
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