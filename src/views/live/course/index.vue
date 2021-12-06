<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="添加"
        @click="$router.push({ name: 'LiveCourseCreate' })"
        type="primary"
        p="addons.Zhibo.course.store"
      >
      </p-button>
      <p-button
        text="评论"
        @click="$router.push({ name: 'LiveCourseComment' })"
        type="primary"
        p="addons.Zhibo.course_comment"
      >
      </p-button>
      <div class="options-link">
        <div
          class="link"
          @click="
            $router.push({ name: 'SystemConfig', query: { key: '直播' } })
          "
        >
          <img src="../../../assets/images/config/icon-option.png" />
          直播服务配置
        </div>
      </div>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-select
            class="w-200px"
            placeholder="分类"
            v-model="filter.category_id"
          >
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
          <el-select
            class="w-200px"
            placeholder="讲师"
            v-model="filter.teacher_id"
          >
            <el-option
              v-for="(item, index) in filterData.teachers"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-input
            class="w-200px"
            v-model="filter.keywords"
            placeholder="课程名称关键字"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-select class="w-200px" placeholder="状态" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.statusList"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-button @click="firstPageLoad()" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset()">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="list"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
          class="float-left"
        >
          <el-table-column prop="id" sortable label="ID" width="100">
          </el-table-column>
          <el-table-column prop="category.name" label="分类"> </el-table-column>
          <el-table-column prop="teacher.name" label="讲师" width="150">
          </el-table-column>
          <el-table-column label="课程" width="400">
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
          <el-table-column label="价格" property="charge" sortable width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.charge }}元</span>
            </template>
          </el-table-column>
          <el-table-column
            label="订阅人数"
            property="join_user_times"
            sortable
            width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.join_user_times }}人</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status_text }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上架时间" sortable width="200">
            <template slot-scope="scope">{{
              scope.row.published_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <p-link
                text="排课"
                type="primary"
                @click="
                  $router.push({
                    name: 'LiveCourseVideo',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.Zhibo.course_video.list"
              ></p-link>
              <p-link
                text="编辑"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LiveCourseUpdate',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.Zhibo.course.update"
              ></p-link>
              <p-link
                text="用户"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LiveCourseUsers',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.Zhibo.course.users"
              ></p-link>

              <p-link
                text="删除"
                class="ml-5"
                type="danger"
                @click="destory(scope.row.id)"
                p="addons.Zhibo.course.delete"
              ></p-link>
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
      pageName: "live-list",
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        category_id: null,
        teacher_id: null,
        keywords: null,
        status: -1,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        categories: [],
        teachers: [],
        statusList: [],
      },
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.teacher_id = null;
      this.filter.category_id = null;
      this.filter.keywords = null;
      this.filter.status = -1;
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
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Course.Live.Course.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;

        this.filterData.categories = res.data.categories;
        this.filterData.teachers = res.data.teachers;
        this.filterData.statusList = res.data.statusList;
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
              this.getData();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
