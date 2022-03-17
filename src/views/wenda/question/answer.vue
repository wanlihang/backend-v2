<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="问题回答"></back-bar>

    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="answers"
        class="float-left"
      >
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
        <el-table-column label="点赞" width="120"
          ><template slot-scope="scope">
            <span>{{ scope.row.vote_count }}次</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" width="500">
          <template slot-scope="scope">
            <div v-html="scope.row.original_content"></div>
          </template>
        </el-table-column>
        <el-table-column label="答案" width="120">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.is_correct === 1">
              答案
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="200">
          <template slot-scope="scope">{{
            scope.row.created_at | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <p-link
              text="评论"
              p="addons.Wenda.question.answers.comments"
              type="primary"
              @click="
                $router.push({
                  name: 'QuestionComment',
                  query: { id: scope.row.question_id, answer_id: scope.row.id },
                })
              "
            >
            </p-link>
            <p-link
              text="设为答案"
              p="addons.Wenda.question.answers.setTrue"
              v-if="status !== 1"
              class="ml-5"
              type="primary"
              @click="setAnswer(scope.row.id)"
            >
            </p-link>
            <p-link
              text="删除"
              class="ml-5"
              p="addons.Wenda.question.answers.delete"
              type="danger"
              @click="destory(scope.row.id)"
            >
            </p-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageName: "wendaAnswer-list",
      id: this.$route.query.id,
      loading: false,
      answers: [],
      question: null,
      status: parseInt(this.$route.query.status),
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.id = this.$route.query.id;
      this.status = parseInt(this.$route.query.status);
      this.$api.Wenda.Question.Answer(this.id).then((res) => {
        this.loading = false;
        this.answers = res.data.answers;
      });
    },
    setAnswer(id) {
      this.$api.Wenda.Question.SetAnswer(this.id, id)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.status = 1;
          this.getData();
        })
        .catch((e) => {
          this.$message.error(e.message);
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
          this.$api.Wenda.Question.DestoryAnswer(this.id, id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
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
