<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="新建"
          p="course.store"
          @click="$router.push({ name: 'VodCreate' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="录播课分类"
          p="courseCategory"
          @click="$router.push({ name: 'CourseCategories' })"
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

        <option-bar text="录播课设置" value="播放器配置"></option-bar>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.keywords"
            placeholder="课程名称关键字"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="filterAct" type="primary">筛选</el-button>
        </div>
        <div class="drawerMore d-flex ml-10" @click="drawer = true">
          <template v-if="showStatus">
            <img src="../../../assets/img/icon-filter-h.png" />
            <span class="act">已选</span>
          </template>
          <template v-else>
            <img src="../../../assets/img/icon-filter.png" />
            <span>更多</span>
          </template>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
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
          <el-table-column label="课程" width="400">
            <template slot-scope="scope">
              <thumb-bar
                :value="scope.row.thumb"
                :width="120"
                :height="90"
                :title="scope.row.title"
              ></thumb-bar>
            </template>
          </el-table-column>
          <el-table-column property="charge" label="价格" sortable width="100">
            <template slot-scope="scope"> {{ scope.row.charge }}元 </template>
          </el-table-column>
          <el-table-column
            label="付费人数"
            property="user_count"
            sortable
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.user_count }}人
            </template>
          </el-table-column>

          <el-table-column label="上架时间" sortable width="200">
            <template slot-scope="scope">{{
              scope.row.published_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
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
                text="学员"
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
              <el-dropdown>
                <el-link type="primary" class="el-dropdown-link ml-5">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-link>
                <el-dropdown-menu slot="dropdown">
                  <p-dropdown-item
                    text="编辑"
                    p="course.update"
                    type="primary"
                    @click="
                      $router.push({
                        name: 'VodUpdate',
                        query: { id: scope.row.id },
                      })
                    "
                  >
                  </p-dropdown-item>
                  <p-dropdown-item
                    text="附件"
                    p="course_attach"
                    type="primary"
                    @click="
                      $router.push({
                        name: 'CourseAttach',
                        query: { course_id: scope.row.id },
                      })
                    "
                  >
                  </p-dropdown-item>
                  <p-dropdown-item
                    text="删除"
                    p="course.destroy"
                    type="danger"
                    @click="destory(scope.row.id)"
                  >
                  </p-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
    <el-drawer :size="360" :visible.sync="drawer" :with-header="false">
      <div class="n-padding-box">
        <div class="tit flex">更多筛选</div>
        <div class="j-flex">
          <el-input
            class="w-300px"
            v-model="filter.keywords"
            placeholder="课程名称关键字"
          ></el-input>
        </div>
        <div class="j-flex mt-20">
          <el-select class="w-300px" v-model="filter.cid" placeholder="分类">
            <el-option
              v-for="(item, index) in filterData.categories"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="j-flex mt-20">
          <el-input
            class="w-300px"
            v-model="filter.id"
            placeholder="课程ID"
          ></el-input>
        </div>
        <div class="j-b-flex mt-30">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="filterAct" type="primary">筛选</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "vod-list",
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
      drawer: false,
    };
  },
  activated() {
    this.params();
    this.getCourse();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  computed: {
    showStatus() {
      if (this.filter.cid || this.filter.id || this.filter.keywords) {
        return true;
      }
      return false;
    },
  },
  methods: {
    params() {
      this.$api.Course.Vod.Create().then((res) => {
        let categories = res.data.categories;
        let box = [];
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].children.length > 0) {
            box.push(categories[i]);
            let children = categories[i].children;
            for (let j = 0; j < children.length; j++) {
              children[j].name = "|----" + children[j].name;
              box.push(children[j]);
            }
          } else {
            box.push(categories[i]);
          }
        }
        this.filterData.categories = box;
      });
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.keywords = null;
      this.filter.id = null;
      this.filter.cid = null;
      this.getCourse();
      this.drawer = false;
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getCourse();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getCourse();
    },
    filterAct() {
      this.pagination.page = 1;
      this.getCourse();
      this.drawer = false;
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
        .catch(() => {});
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
