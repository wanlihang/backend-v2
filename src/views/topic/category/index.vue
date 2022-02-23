<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="图文分类管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        @click="$router.push({ name: 'TopicCategoryCreate' })"
        type="primary"
        p="addons.meedu_topics.category.store"
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
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="删除"
                style="margin-right: 10px"
                type="danger"
                @click="destory(scope.row.id)"
                p="addons.meedu_topics.category.delete"
              ></p-link>
              <p-link
                text="编辑"
                type="primary"
                @click="
                  $router.push({
                    name: 'TopicCategoryUpdate',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.meedu_topics.category.update"
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
      pageName: "topicCategory-list",
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
      this.$api.Course.Topic.Category.List().then((res) => {
        this.loading = false;
        this.categories = res.data;
      });
    },
    importUser() {},
    //删除
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
          this.$api.Course.Topic.Category.Destory(id)
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
