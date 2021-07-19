<template>
  <div class="meedu-main-body">
     <back-bar class="mb-30" title="电子书分类管理"></back-bar>
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'MeedubookCategoryCreate' })"
        type="primary"
        >添加</el-button
      >
    </div>
   <div class="float-left" v-loading="loading">
      <div class="float-left">
          <el-table :data="categories" stripe class="float-left">
            <el-table-column prop="id" label="ID" width="150">
            </el-table-column>
            <el-table-column prop="sort" label="升序" width="150">
            </el-table-column>

            <el-table-column label="分类名"
              ><template slot-scope="scope">
                <span>{{ scope.row.name }} </span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-link
                  style="margin-right: 10px"
                  type="danger"
                  @click="destory(scope.row.id)"
                  >删除</el-link
                >
                <el-link
                  type="primary"
                  @click="
                    $router.push({
                      name: 'MeedubookCategoryUpdate',
                      query: { id: scope.row.id },
                    })
                  "
                  >编辑</el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>

      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div >
            <el-button @click="$router.push({ name: 'Meedubook' })"
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
 
      loading: false,
      categories: [],
    };
  },
  mounted() {
    this.getCategories();
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
          this.$api.Meedubook.Book.Categories.Destory(id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getCategories();
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