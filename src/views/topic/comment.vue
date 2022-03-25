<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="图文文章评论"></back-bar>
    <div class="float-left">
      <div class="float-left">
        <div class="float-left d-flex">
          <div>
            <el-input
              v-model="filter.user_id"
              class="w-200px"
              placeholder="学员ID"
            ></el-input>
          </div>
          <div class="ml-10">
            <el-select
              filterable
              :filter-method="dataFilter"
              placeholder="图文"
              class="w-200px"
              v-model="filter.topic_id"
              v-el-select-loadmore="loadmore"
            >
              <el-option
                v-for="(item, index) in filterData.topics"
                :key="index"
                :label="item.title"
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
            <el-button @click="firstPageLoad" type="primary">筛选</el-button>
          </div>
        </div>
      </div>
      <div class="float-left mt-30" v-loading="loading">
        <div class="float-left">
          <el-table
            :header-cell-style="{ background: '#f1f2f9' }"
            :data="list"
            @selection-change="handleSelectionChange"
            class="float-left"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="120">
            </el-table-column>
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
            <el-table-column prop="topic.title" label="图文"> </el-table-column>
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
            <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-link type="danger" @click="destroy(scope.row.id)"
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
      pageName: "topicComment-list",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        topic_id: null,
        user_id: null,
        created_at: null,
      },
      filterData: {
        topics: [],
      },
      spids: {
        ids: [],
        is_check: null,
      },
      total: 0,
      loading: false,
      list: [],
      formData: {
        keywords: null,
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
      this.formData.keywords = val;
      this.formData.page = 1;
      this.$api.Course.Topic.Topic.List(this.formData).then((res) => {
        this.filterData.topics = res.data.data.data;
      });
    },
    loadmore() {
      this.formData.page++;
      this.params();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.topic_id = null;
      this.filter.created_at = null;
      this.formData.keywords = null;
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
    params() {
      this.$api.Course.Topic.Topic.List(this.formData).then((res) => {
        this.filterData.topics = [
          ...this.filterData.topics,
          ...res.data.data.data,
        ];
      });
    },
    getComments() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Course.Topic.Topic.Comment(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    destroy(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.$api.Course.Topic.Topic.DestroyComment(item)
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
        .catch(() => {});
    },
    approve() {
      if (this.spids.ids == "") {
        this.$message.error("请选择需要操作的数据");
        return;
      }
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

          this.spids.is_check = 1;
          this.loading = true;
          this.$api.Course.Topic.Topic.CommentCheck(this.spids)
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
      if (this.spids.ids == "") {
        this.$message.error("请选择需要操作的数据");
        return;
      }
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

          this.spids.is_check = 0;
          this.loading = true;
          this.$api.Course.Topic.Topic.CommentCheck(this.spids)
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

<style lang="less" scoped></style>
