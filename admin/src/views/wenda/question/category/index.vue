<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="问题分类"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="addons.Wenda.category.store"
        @click="
          $router.push({
            name: 'QuestionCategoryCreate',
          })
        "
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
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="sort" label="升序" width="120">
          </el-table-column>
          <el-table-column label="分类名"
            ><template slot-scope="scope">
              <span>{{ scope.row.name }} </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.Wenda.category.update"
                type="primary"
                @click="
                  $router.push({
                    name: 'QuestionCategoryUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="删除"
                p="addons.Wenda.category.delete"
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
      pageName: "wendaCategory-list",
      loading: false,
      categories: [],
    };
  },
  activated() {
    this.create();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    create() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Wenda.Question.Category().then((res) => {
        this.loading = false;
        this.categories = res.data.data;
      });
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
          this.$api.Wenda.Question.Cate.Destory(id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.create();
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
