<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="电子书文章评论"></back-bar>

    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-button @click="approve"> 审核通过 </el-button>
        </div>
        <div class="ml-10">
          <el-button @click="refuse"> 审核拒绝 </el-button>
        </div>
        <div class="ml-10">
          <el-input
            v-model="filter.user_id"
            class="w-200px"
            placeholder="用户ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="getComments" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
      </div>
    </div>

    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="list"
          stripe
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="120">
          </el-table-column>
          <el-table-column label="用户" width="300">
            <template slot-scope="scope">
              <div class="d-flex" v-if="scope.row.user">
                <div>
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">
                  {{ scope.row.user.nick_name }}
                </div>
              </div>
              <span v-else class="c-red">用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="评论内容" width="600">
            <template slot-scope="scope">
              <span v-html="scope.row.content"></span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.is_check !== 1"
                >拒绝</el-tag
              >
              <el-tag type="success" v-else>通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" label="时间"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-link type="danger" @click="destory(scope.row.id)"
                >删除</el-link
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
</template>

<script>
export default {
  data() {
    return {
      bid: this.$route.query.bid,
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        article_id: this.$route.query.article_id,
        user_id: null,
      },
      spids: {
        ids: [],
        is_check: null,
      },
      total: 0,
      loading: false,
      list: [],
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.getComments();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getComments();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getComments();
    },
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getComments() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Meedubook.Book.Article.Comments(params).then((res) => {
        this.loading = false;

        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    destory(item) {
      if (this.loading) {
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          this.loading = true;
          this.$api.Meedubook.Book.Article.Destorycomment(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getComments();
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
    approve() {
      if (this.loading) {
        return;
      }
      if (this.spids.ids == "") {
        this.$message.warning("请选择需要操作的数据");
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.spids.is_check = 1;
          this.loading = true;
          this.$api.Meedubook.Book.Article.CommentMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getComments();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getComments();
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
    refuse() {
      if (this.loading) {
        return;
      }
      if (this.spids.ids == "") {
        this.$message.warning("请选择需要操作的数据");
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.spids.is_check = 0;
          this.loading = true;
          this.$api.Meedubook.Book.Article.CommentMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getComments();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getComments();
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>