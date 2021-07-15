<template>
  <div class="float-left">
    <div class="float-left mb-15">
      <el-button
        @click="$router.push({ name: 'CategoriesCreate' })"
        type="primary"
        >添加</el-button
      >
    </div>
    <div class="table-body top-left-radius" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="categories"
          stripe
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
           <el-table-column  label="显示" width="150">
               <template slot-scope="scope">
              <span v-if="scope.row.is_show==1">是</span>
              <span v-else>否</span>
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
                    name: 'CategoriesUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="float-left mt-15">
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
          <el-button @click="$router.push({ name: 'VodCreate' })">取消</el-button>
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
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      categories: [],
      userRemark: [],
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getCategories();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getCategories();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getCategories();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getCategories();
    },
    getCategories() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Course.Vod.Categories.List(params).then((res) => {
        this.loading = false;
        this.categories = res.data.data;
        this.total = res.data.total;
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
          this.$api.Course.Vod.Categories
            .Destory(id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.paginationReset();
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