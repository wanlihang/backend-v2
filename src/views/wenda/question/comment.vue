<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="问题评论"></back-bar>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="comments" stripe class="float-left">
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
          <el-table-column label="内容" width="500">
            <template slot-scope="scope">
              <div v-html="scope.row.original_content"></div>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="200" prop="created_at">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <p-link
                text="删除"
                p="addons.Wenda.question.answers.comments.delete"
                type="danger"
                @click="destory(scope.row.id)"
              >
              </p-link>
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
      id: this.$route.query.id,
      answer_id: this.$route.query.answer_id,
      loading: false,
      comments: [],
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Wenda.Question.Comment(this.answer_id).then((res) => {
        this.loading = false;
        this.comments = res.data.comments;
      });
    },
    destory(id) {
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
          this.$api.Wenda.Question.DestoryComment(id)
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
