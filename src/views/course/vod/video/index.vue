<template>
  <div class="meedu-main-body">
     <back-bar class="mb-30" title="课程视频管理"></back-bar>
    <div class="float-left mb-30">
      <el-button type="danger" @click="destoryMulti()">批量删除</el-button>
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
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="videos"
          stripe
          class="float-left"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column
          ><!-- 显示选取表格 -->
          <el-table-column prop="id" label="视频ID" width="80">
          </el-table-column>
          <el-table-column prop="title" label="视频"> </el-table-column>
          <el-table-column label="价格" width="120"
            ><template slot-scope="scope">
              <span>￥{{ scope.row.charge }} </span>
            </template>
          </el-table-column>
          <el-table-column label="时长" width="120"
            ><template slot-scope="scope">
              <span>{{ scope.row.duration }}s</span>
            </template>
          </el-table-column>
          <el-table-column prop="published_at" label="上架时间" width="200">
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
              <el-link
                style="margin-left: 5px"
                type="primary"
                @click="
                  $router.push({
                    name: 'VideosUpdate',
                    query: { course_id: pagination.cid, id: scope.row.id },
                  })
                "
                >销售记录</el-link
              >
              <el-link
                style="margin-left: 5px"
                type="primary"
                @click="
                  $router.push({
                    name: 'VideosUpdate',
                    query: { course_id: pagination.cid, id: scope.row.id },
                  })
                "
                >用户观看</el-link
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
          <el-button @click="$router.push({ name: 'Vod' })">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        cid: this.$route.query.course_id,
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      videos: [],
      spids: {
        ids: [],
      },
    };
  },
  mounted() {
    this.getVideos();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getVideos();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getVideos();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getVideos();
    },
    //保存选中结果
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getVideos() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Course.Vod.Videos.List(params).then((res) => {
        this.loading = false;
        this.videos = res.data.videos.data;
        this.total = res.data.videos.total;
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
              this.getVideos();
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