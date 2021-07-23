<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="练习章节"></back-bar>
    <div class="float-left mb-30">
      <el-button
        @click="
          $router.push({
            name: 'PracticeChapterCreate',
            query: { pid: id },
          })
        "
        type="primary"
      >
        添加
      </el-button>
      <el-button @click="destorymulti()" type="danger"> 批量删除 </el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="results"
          @selection-change="handleSelectionChange"
          stripe
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="sort" label="升序" width="120">
          </el-table-column>
          <el-table-column prop="name" label="章节名"> </el-table-column>
          <el-table-column label="题目数" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.question_count }}个</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="
                  $router.push({
                    name: 'PracticeChapterUpdate',
                    query: { id: scope.row.id, pid: id },
                  })
                "
                >编辑</el-link
              >
              <el-link
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'PracticeChapterQuestion',
                    query: { id: scope.row.id},
                  })
                "
                >试题</el-link
              >
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
      loading: false,
      results: [],
      spids: {
        ids: [],
      },
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {
        pid: this.id,
      };
      this.$api.Exam.Practice.Chapter.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
      });
    },
    destorymulti() {
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

          this.loading = true;
          this.$api.Exam.Practice.Chapter.DestoryMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
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
