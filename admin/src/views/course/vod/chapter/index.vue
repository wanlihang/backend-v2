<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="课程章节管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="course_chapter.store"
        @click="
          $router.push({
            name: 'ChaptersCreate',
            query: { course_id: box.course_id },
          })
        "
        type="primary"
      ></p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="chapters" class="float-left">
          <el-table-column prop="sort" label="升序" width="150">
          </el-table-column>

          <el-table-column label="章节"
            ><template slot-scope="scope">
              <span>{{ scope.row.title }} </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="course_chapter.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'ChaptersUpdate',
                    query: { course_id: box.course_id, id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="删除"
                p="course_chapter.destroy"
                class="ml-5"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
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
      pageName: "vodChapter-list",
      box: {
        course_id: this.$route.query.course_id,
      },
      loading: false,
      chapters: [],
    };
  },
  activated() {
    this.getChapters();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    getChapters() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.box.course_id = this.$route.query.course_id;
      this.$api.Course.Vod.Chapters.List(this.box.course_id, this.box).then(
        (res) => {
          this.loading = false;
          this.chapters = res.data.chapters;
        }
      );
    },
    importUser() {},
    //删除管理员
    destory(id) {
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
          this.$api.Course.Vod.Chapters.Destory(this.box.course_id, id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getChapters();
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