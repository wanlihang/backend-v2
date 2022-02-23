<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="电子书分类管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="addons.meedu_books.book_category.store"
        @click="$router.push({ name: 'MeedubookCategoryCreate' })"
        type="primary"
      ></p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="categories"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="150"> </el-table-column>
          <el-table-column prop="sort" label="升序" width="150">
          </el-table-column>
          <el-table-column label="分类名"
            ><template slot-scope="scope">
              <span>{{ scope.row.name }} </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <p-link
                text="删除"
                p="addons.meedu_books.book_category.delete"
                style="margin-right: 10px"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
              <p-link
                p="addons.meedu_books.book_category.update"
                type="primary"
                text="编辑"
                @click="
                  $router.push({
                    name: 'MeedubookCategoryUpdate',
                    query: { id: scope.row.id },
                  })
                "
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
      pageName: "bookCategory-list",
      loading: false,
      categories: [],
    };
  },
  activated() {
    this.getCategories();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    getCategories() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Meedubook.Book.Categories.List().then((res) => {
        this.loading = false;
        this.categories = res.data;
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
          this.$api.Meedubook.Book.Categories.Destory(id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getCategories();
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
