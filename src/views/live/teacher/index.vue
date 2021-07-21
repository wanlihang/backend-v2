<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <el-button
        @click="$router.push({ name: 'LiveTeacherCreate' })"
        type="primary"
      >
        添加
      </el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="TID" width="100"> </el-table-column>

          <el-table-column prop="name" label="姓名" width="300">
          </el-table-column>
          <el-table-column label="课程" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.courses_count }}个</span>
            </template>
          </el-table-column>
          <el-table-column label="账号">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}/{{ scope.row.password }}</span>
            </template>
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
                    name: 'LiveTeacherUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
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
      loading: false,
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      results: [],
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Course.Live.Teacher.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
        this.total = res.data.total;
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
          this.$api.Course.Live.Teacher.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
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
</style>