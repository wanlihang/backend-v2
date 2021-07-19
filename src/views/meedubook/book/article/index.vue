<template>
  <div class="meedu-main-body">
      <back-bar class="mb-30" title="电子书文章管理"></back-bar>
    <div class="float-left">
      <div class="float-left mb-30">
        <el-button
          @click="$router.push({ name: 'MeedubookArticleCreate',
          query: { book_id: filter.book_id }, })"
          type="primary"
        >
          添加
        </el-button>
      </div>
      <div class="float-left">
        <div class="float-left d-flex">
          <div class="d-flex ml-15">
            <div class="filter-label">章节</div>
            <div class="flex-1 ml-15">
              <el-select v-model="filter.cid">
                <el-option
                  v-for="(item, index) in filterData.chapters"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="ml-15">
            <el-button @click="getBook" type="primary" plain>筛选</el-button>
            <el-button @click="paginationReset">清空</el-button>
          </div>
        </div>
      </div>
      <div class="float-left mt-30" v-loading="loading">
        <div class="float-left">
          <el-table :data="mbooks" stripe class="float-left">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="chapter.name" label="章节" width="150">
            </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
           
            <el-table-column label="浏览" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.view_times }}次</span>
              </template>
            </el-table-column>
             <el-table-column label="显示" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.is_show==1">是</span>
                <span v-else>否</span>
              </template>
              </el-table-column>
            <el-table-column label="试读" width="80">
              <template slot-scope="scope">
                <span style="color:red;" v-if="scope.row.charge==0">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column prop="published_at" label="上架时间" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-link type="danger" @click="destory(scope.row.id)"
                  >删除</el-link
                >
                <el-link
                  type="primary"
                  style="margin-left: 5px"
                  @click="
                    $router.push({
                      name: 'MeedubookArticleUpdate',
                      query: { bid:filter.book_id,id: scope.row.id },
                    })
                  "
                  >编辑</el-link
                >
                <el-link
                  type="primary"
                  style="margin-left: 5px"
                  @click="
                    $router.push({
                      name: 'MeedubookArticleUpdate',
                      query: { course_id: scope.row.id },
                    })
                  "
                  >评论</el-link
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
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        book_id:this.$route.query.bid,
        chapter_id: null,
      },
      total: 0,
      loading: false,
      mbooks: [],
      filterData: {
        chapters: [],
      },
    };
  },
  mounted() {
    this.getBook();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
   
      this.filter.cid = null;
      this.getBook();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getBook();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getBook();
    },
    getBook() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Meedubook.Book.Article.List(params).then((res) => {
        this.loading = false;
        this.mbooks = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.chapters = res.data.chapters;
      });
    },
    destory(item) {
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
          this.$api.Meedubook.Book.Article.Destory(item)
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