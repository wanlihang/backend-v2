<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="添加"
        p="addons.MultiLevelShare.poster.store"
        @click="$router.push({ name: 'MultiPosterCreate' })"
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
          <el-table-column prop="name" label="海报名"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <p-link
                text="删除"
                p="addons.MultiLevelShare.poster.delete"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
              <p-link
                text="编辑"
                p="addons.MultiLevelShare.poster.update"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'MultiPosterUpdate',
                    query: { id: scope.row.id },
                  })
                "
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
      loading: false,
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
      this.$api.Multishare.Poster.List().then((res) => {
        this.loading = false;
        this.results = res.data;
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
          this.$api.Multishare.Poster.Destory(item)
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
