<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="已关联课程"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="addons.learnPaths.relation.store"
        @click="
          $router.push({
            name: 'SteprelationCreate',
            query: { step_id: pagination.step_id },
          })
        "
        type="primary"
      >
      </p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="sort" label="升序" width="120">
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="120">
          </el-table-column>
          <el-table-column label="课程" width="500">
            <template slot-scope="scope">
              <div class="d-flex">
                <div>
                  <img :src="scope.row.thumb" width="120" height="90" />
                </div>
                <div class="ml-10">
                  {{ scope.row.name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="价格">
            <template slot-scope="scope">
              <span>￥{{ scope.row.charge }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.learnPaths.relation.delete"
                type="primary"
                @click="
                  $router.push({
                    name: 'SteprelationUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="删除"
                class="ml-5"
                p="addons.learnPaths.relation.update"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
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
      pageName: "learnstepRelation-list",
      step_id: this.$route.query.id,
      pagination: {
        step_id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      loading: false,
      results: [],
    };
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
    },
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
      let params = {};
      this.step_id = this.$route.query.id;
      this.pagination.step_id = this.$route.query.id;
      Object.assign(params, this.pagination);
      this.$api.Course.LearnPath.Step.Relation.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
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
