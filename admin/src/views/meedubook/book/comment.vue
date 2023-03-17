<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="电子书评论"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="删除"
          p="addons.meedu_books.book.comments.delete.multi"
          @click="destorymulti()"
          type="danger"
        >
        </p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            v-model="filter.user_id"
            class="w-150px"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select
            filterable
            :filter-method="dataFilter"
            placeholder="电子书"
            class="w-150px"
            v-model="filter.bid"
            v-el-select-loadmore="loadmore"
          >
            <el-option
              v-for="(item, index) in filterData.books"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="评论时间-开始"
            end-placeholder="评论时间-结束"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="user_id" label="学员ID" width="120">
          </el-table-column>
          <el-table-column label="学员" width="300">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="scope.row.user">
                <div class="avatar">
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">
                  {{ scope.row.user.nick_name }}
                </div>
              </div>
              <span v-else class="c-red">学员不存在</span>
            </template>
          </el-table-column>
          <el-table-column prop="book.name" label="电子书"> </el-table-column>
          <el-table-column label="评论内容">
            <template slot-scope="scope">
              <span v-html="scope.row.content"></span>
            </template>
          </el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">{{
              scope.row.updated_at | dateFormat
            }}</template>
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
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      },
    },
  },
  data() {
    return {
      pageName: "bookComment-list",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        bid: null,
        user_id: null,
        created_at: null,
      },
      filterData: {
        books: [],
      },
      spids: {
        ids: [],
        is_check: null,
      },
      total: 0,
      loading: false,
      list: [],
      formData: {
        key: null,
        page: 1,
        size: 10,
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  activated() {
    this.params();
    this.getComments();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    dataFilter(val) {
      this.formData.key = val;
      this.formData.page = 1;
      this.$api.Meedubook.Book.List(this.formData).then((res) => {
        this.filterData.books = res.data.data.data;
      });
    },
    loadmore() {
      this.formData.page++;
      this.params();
    },
    params() {
      this.$api.Meedubook.Book.List(this.formData).then((res) => {
        this.filterData.books = [
          ...this.filterData.books,
          ...res.data.data.data,
        ];
      });
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.created_at = null;
      this.filter.bid = null;
      this.formData.key = null;
      this.params();
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getComments();
    },
    //保存选中结果
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
      this.$api.Meedubook.Book.Comments(params).then((res) => {
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
          this.loading = true;
          this.$api.Meedubook.Book.Destorycomment(item)
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
    destorymulti() {
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
          this.loading = true;
          this.$api.Meedubook.Book.CommentDestoryMulti(this.spids)
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
          this.$api.Meedubook.Book.CommentMulti(this.spids)
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
          this.$api.Meedubook.Book.CommentMulti(this.spids)
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
