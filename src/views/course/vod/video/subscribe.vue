<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="课程视频销售记录"></back-bar>
    <div class="float-left mb-30">
      <el-button
        @click="
          $router.push({
            name: 'VideosCreate',
            query: { course_id: pagination.cid },
          })
        "
        type="primary"
        >添加</el-button
      >
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">UID</div>
          <div class="flex-1 ml-10">
            <el-input
              class="w-100px"
              v-model="filter.user_id"
              placeholder="请选择用户"
              style="width: 200px"
            ></el-input>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">订阅时间</div>
          <div class="flex-1 ml-10">
            <el-date-picker
              v-model="filter.subscribe_start_at"
              type="date"
              align="right"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
            >
            </el-date-picker>
            至
            <el-date-picker
              v-model="filter.subscribe_end_at"
              type="date"
              align="right"
              value-format="yyyy-MM-dd"
              placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="ml-15">
          <el-button @click="getSubscribes" type="primary" plain
            >筛选</el-button
          >
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="subscribes" stripe class="float-left">
          <el-table-column prop="id" label="视频ID" width="80">
          </el-table-column>
          <el-table-column prop="user.user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column prop="user.nick_name" label="用户"></el-table-column>

          <el-table-column prop="published_at" label="订阅时间" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="
                  $router.push({
                    name: 'VideosUpdate',
                    query: { course_id: pagination.cid, id: scope.row.id },
                  })
                "
                >编辑</el-link
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

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button
            @click="
              $router.push({
                name: 'CourseVideos',
                query: { course_id: this.cid },
              })
            "
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cid: this.$route.query.course_id,
      pagination: {
        video_id: this.$route.query.video_id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        subscribe_start_at: null,
        subscribe_end_at: null,
      },
      total: 0,
      loading: false,
      subscribes: [],
    };
  },
  mounted() {
    this.getSubscribes();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.subscribe_start_at = null;
      this.filter.subscribe_end_at = null;
      this.getSubscribes();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getSubscribes();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getSubscribes();
    },
    getSubscribes() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Course.Vod.Videos.Subscribe(
        this.pagination.video_id,
        params
      ).then((res) => {
        this.loading = false;
        this.subscribes = res.data.data.data;
        this.total = res.data.total;
      });
    },
    importUser() {},
    //删除管理员
    destoryMulti() {
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
          this.$api.Course.Vod.Videos.DestoryMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getSubscribes();
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