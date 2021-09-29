<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="course.store"
        @click="$router.push({ name: 'VodCreate' })"
        type="primary"
      >
      </p-button>
      <p-button
        text="课程评论"
        p="course_comment"
        @click="$router.push({ name: 'CourseComments' })"
        type="primary"
      >
      </p-button>
      <p-button
        text="视频评论"
        p="video_comment"
        @click="$router.push({ name: 'VideoComments' })"
        type="primary"
      >
      </p-button>

      <p-button
        text="视频批量导入"
        p="video.import"
        @click="$router.push({ name: 'VodImport' })"
        type="primary"
      >
      </p-button>

      <p-button
        text="阿里云视频加密"
        p="video.aliyun_hls.list"
        @click="$router.push({ name: 'CourseVodVideoAliyunHls' })"
        type="primary"
      >
      </p-button>

      <p-button
        text="腾讯云视频加密"
        p="addons.TencentCloudHls.videos"
        @click="$router.push({ name: 'CourseVodVideoTencentHls' })"
        type="primary"
      >
      </p-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.id"
            placeholder="课程ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            class="w-200px"
            v-model="filter.keywords"
            placeholder="课程名称关键字"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select v-model="filter.cid" placeholder="分类">
            <el-option
              v-for="(item, index) in filterData.categories"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-button @click="getCourse" type="primary" plain>筛选</el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="courses"
          class="float-left"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column prop="id" sortable label="ID" width="100">
          </el-table-column>
          <el-table-column label="分类">
            <template slot-scope="scope">
              <span v-if="scope.row.category">
                {{ scope.row.category.name }}
              </span>
              <span v-else class="c-red">数据不完整</span>
            </template>
          </el-table-column>
          <el-table-column label="课程" width="450">
            <template slot-scope="scope">
              <div class="d-flex">
                <div>
                  <img :src="scope.row.thumb" width="120" height="90" />
                </div>
                <div class="ml-10">
                  {{ scope.row.title }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="charge" label="价格" sortable width="100">
            <template slot-scope="scope"> {{ scope.row.charge }}元 </template>
          </el-table-column>
          <el-table-column
            label="订阅人数"
            property="user_count"
            sortable
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.user_count }}人
            </template>
          </el-table-column>

          <el-table-column
            label="上架时间"
            property="published_at"
            sortable
            width="200"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <p-link
                text="视频"
                p="video"
                type="primary"
                @click="
                  $router.push({
                    name: 'CourseVideos',
                    query: { course_id: scope.row.id },
                  })
                "
              >
              </p-link>
              <p-link
                text="编辑"
                p="course.update"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'VodUpdate',
                    query: { id: scope.row.id },
                  })
                "
              >
              </p-link>
              <p-link
                text="用户"
                p="course.subscribes"
                class="ml-5"
                type="primary"
                @click="
                  $router.push({
                    name: 'VodView',
                    params: { id: scope.row.id },
                  })
                "
              >
              </p-link>
              <p-link
                text="附件"
                p="course_attach"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'CourseAttach',
                    query: { course_id: scope.row.id },
                  })
                "
              >
              </p-link>
              <p-link
                text="删除"
                p="course.destroy"
                class="ml-5"
                type="danger"
                @click="destory(scope.row.id)"
              >
              </p-link>
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
        sort: "id",
        order: "desc",
      },
      filter: {
        id: null,
        keywords: null,
        cid: null,
      },
      total: 0,
      loading: false,
      courses: [],
      userRemark: [],
      filterData: {
        categories: [],
      },
    };
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.keywords = null;
      this.filter.id = null;
      this.filter.cid = null;
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
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getCourse();
    },
    getCourse() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Course.Vod.List(params).then((res) => {
        this.loading = false;
        this.courses = res.data.courses.data;
        this.total = res.data.courses.total;

        // 课程分类
        this.filterData.categories = res.data.categories;
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
          this.$api.Course.Vod.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));

              this.getCourse();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
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
</style>