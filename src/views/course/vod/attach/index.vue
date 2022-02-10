<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="课程附件管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="course_attach.store"
        @click="
          $router.push({
            name: 'AttachCreate',
            query: { course_id: box.course_id },
          })
        "
        type="primary"
      >
      </p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="attach"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="name" label="附件名"> </el-table-column>
          <el-table-column prop="path" label="路径" width="500">
          </el-table-column>
          <el-table-column label="下载次数" width="150"
            ><template slot-scope="scope">
              <span>{{ scope.row.download_times }}次 </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <p-link
                text="删除"
                p="course_attach.destroy"
                type="danger"
                @click="delItem(scope.row.id)"
              >
              </p-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "attach-list",
      box: {
        course_id: this.$route.query.course_id,
      },
      loading: false,
      attach: [],
    };
  },
  activated() {
    this.getAttach();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    getAttach() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.box.course_id = this.$route.query.course_id;
      this.$api.Course.Vod.Attach.List(this.box).then((res) => {
        this.loading = false;
        this.attach = res.data.data;
      });
    },
    delItem(id) {
      if (this.loading) {
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.$api.Course.Vod.Attach.Destory(id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getAttach();
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
