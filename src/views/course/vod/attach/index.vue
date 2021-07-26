<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="课程附件管理"></back-bar>
    <div class="float-left mb-30">
      <el-button
        @click="
          $router.push({
            name: 'AttachCreate',
            query: { course_id: box.course_id },
          })
        "
        type="primary"
      >
        添加
      </el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="attach"  class="float-left">
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="name" label="附件名"> </el-table-column>
          <el-table-column prop="path" label="路径" width="500">
          </el-table-column>
          <el-table-column label="下载次数" width="150"
            ><template slot-scope="scope">
              <span>{{ scope.row.download_times }}次 </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                style="margin-right: 10px"
                type="danger"
                @click="delItem(scope.row.id)"
              >
                删除
              </el-link>
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
      box: {
        course_id: this.$route.query.course_id,
      },
      loading: false,
      attach: [],
    };
  },
  mounted() {
    this.getAttach();
  },
  methods: {
    getAttach() {
      if (this.loading) {
        return;
      }
      this.loading = true;
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