<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="问题评论"></back-bar>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="comments" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column prop="user.nick_name" label="用户" width="120">
          </el-table-column>
          <el-table-column label="内容"
            ><template slot-scope="scope">
              <div v-html="scope.row.original_content"></div>
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
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="$router.push({  name: 'QuestionAnswer',
                    query: { id: box.id },})"
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
      box: {
        id: this.$route.query.id,
        cid: this.$route.query.cid,
      },
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
      this.$api.Wenda.Question.Comment(this.box.cid).then((res) => {
        this.loading = false;
        this.comments = res.data.comments;
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
          this.$api.Wenda.Question.DestoryComment(this.box.id,id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.create();
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