<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="课程订单"></back-bar>

    <div class="float-left mb-30">
      <div class="float-left d-flex">
        <div>
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
          <el-select
            class="w-200px"
            placeholder="状态"
            v-model="filter.set_teacher"
          >
            <el-option
              v-for="(item, index) in filterData.setTeachersList"
              :key="index"
              :label="item.name"
              :value="item.id"
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
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          class="float-left"
        >
          <el-table-column label="学员" width="300">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="scope.row.user">
                <div class="avatar">
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">
                  {{ scope.row.user.nick_name }}
                </div>
              </div>
              <span v-else class="c-red">学员不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="课程" width="400">
            <template slot-scope="scope">
              <div class="d-flex">
                <div>
                  <img :src="scope.row.course.thumb" width="120" height="90" />
                </div>
                <div class="ml-10">
                  {{ scope.row.course.title }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="价格" property="charge">
            <template slot-scope="scope">
              <span>{{ scope.row.charge }}元</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="讲师" width="150">
            <template slot-scope="scope">
              <div class="mb-5">
                <span v-if="scope.row.teacher">
                  已设置：<b>{{ scope.row.teacher.name }}</b>
                </span>
                <span v-else class="c-red">未设置</span>
              </div>

              <p-link
                text="设置/更换"
                type="primary"
                @click="
                  $router.push({
                    name: 'K12CourseOrderTeacher',
                    query: { id: scope.row.id, course_id: scope.row.course_id },
                  })
                "
                p="addons.XiaoBanKe.order.setTeacher"
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
      pageName: "k12Order-list",
      pagination: {
        course_id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      filter: {
        teacher_id: null,
        set_teacher: null,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        teachers: [],
        setTeachersList: [
          {
            name: "全部",
            id: null,
          },
          {
            name: "已设置讲师",
            id: 1,
          },
          {
            name: "未设置讲师",
            id: 2,
          },
        ],
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
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.teacher_id = null;
      this.filter.set_teacher = null;
    },
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.teacher_id = null;
      this.filter.set_teacher = null;
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
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.course_id = this.$route.query.id;
      Object.assign(params, this.filter, this.pagination);
      this.$api.xiaoBanKe.Order.Index(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;

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
          this.$api.xiaoBanKe.Course.Destroy(item)
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

<style lang="less" scoped>
.ori-charge {
  text-decoration: line-through;
}
</style>
