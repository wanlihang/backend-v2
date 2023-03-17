<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="电子书章节管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="addons.meedu_books.book_chapter.store"
        @click="
          $router.push({
            name: 'MeedubookChapterCreate',
            query: { bid: box.bid },
          })
        "
        type="primary"
      ></p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="chapters"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="150"> </el-table-column>
          <el-table-column prop="sort" label="升序" width="150">
          </el-table-column>

          <el-table-column label="章节"
            ><template slot-scope="scope">
              <span>{{ scope.row.name }} </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.meedu_books.book_chapter.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'MeedubookChapterUpdate',
                    query: { bid: box.bid, id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="删除"
                p="addons.meedu_books.book_chapter.delete"
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
      pageName: "bookChapters-list",
      box: {
        bid: this.$route.query.bid,
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
      this.box.bid = this.$route.query.bid;
      this.$api.Meedubook.Book.Chapters.List(this.box).then((res) => {
        this.loading = false;
        this.chapters = res.data;
      });
    },
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
          this.$api.Meedubook.Book.Chapters.Destory(id)
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

<style lang="less" scoped></style>
