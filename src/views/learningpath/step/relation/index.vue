<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="学习步骤关联"></back-bar>
    <div class="float-left mb-30">
      <el-button
        @click="
          $router.push({
            name: 'SteprelationCreate',
            query: { step_id: pagination.step_id },
          })
        "
        type="primary"
      >
        添加
      </el-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="results" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="sort" label="升序" width="80">
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="120">
          </el-table-column>
          <el-table-column prop="name" label="课程"> </el-table-column>
          <el-table-column label="价格" width="150">
            <template slot-scope="scope">
              <span>￥{{ scope.row.charge }}</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-link type="danger" @click="destory(scope.row.id)"
                >删除</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 5px"
                @click="
                  $router.push({
                    name: 'SteprelationUpdate',
                    query: { id: scope.row.id, step_id: pagination.step_id },
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
      pagination: {
        step_id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      results: [],
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getResults();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getResults();
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};

      Object.assign(params, this.pagination);
      this.$api.Course.LearnPath.Step.Relation.List(params).then((res) => {
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
          this.$api.Course.LearnPath.Step.Relation.Destory(item)
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

