<template>
  <div class="meedu-main-body" v-loading="loading">
    <div class="float-left">
      <el-tabs v-model="tab">
        <el-tab-pane label="应用商城" name="repository"></el-tab-pane>
        <el-tab-pane label="已安装应用" name="local"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="float-left">
      <template v-if="tab === 'repository'">
        <div class="float-left table-content">
          <el-table :data="repositories" class="float-left">
            <el-table-column prop="name" label="插件"> </el-table-column>
            <el-table-column prop="version" label="版本" width="200">
            </el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <template v-if="scope.row.is_buy">
                  <el-link
                    type="primary"
                    @click="installAddons(scope.row)"
                    v-if="!scope.row.is_install"
                  >
                    安装
                  </el-link>
                  <el-link
                    class="ml-5"
                    type="primary"
                    @click="upgradeAddons(scope.row)"
                    v-if="scope.row.is_upgrade"
                  >
                    升级
                  </el-link>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pagination float-left mt-30 text-center">
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
      </template>

      <div class="float-left table-content" v-else-if="tab === 'local'">
        <el-table :data="localList" class="float-left">
          <el-table-column prop="name" label="插件"> </el-table-column>
          <el-table-column prop="version" label="本地版本" width="200">
          </el-table-column>
          <el-table-column prop="version" label="状态" width="150">
            <template slot-scope="scope">
              <template v-if="scope.row.enabled">
                <span class="status-success">
                  <span class="status-success-icon"></span>
                  <span class="ml-5">运行中</span>
                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-link
                v-if="scope.row.enabled"
                type="danger"
                @click="addonsSwitch(scope.row, 0)"
              >
                停用
              </el-link>
              <el-link
                v-else
                type="primary"
                @click="addonsSwitch(scope.row, 1)"
              >
                启用
              </el-link>
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
      tab: "repository",
      repositories: [],
      localList: [],
      loading: false,
      pagination: {
        page: 1,
        size: 100,
      },
      total: 0,
    };
  },
  watch: {
    tab() {
      this.reset();
    },
    "pagination.page"() {
      this.getRepository();
    },
    "pagination.size"() {
      this.getRepository();
    },
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      this.pagination.page = 1;
      this.pagination.size = 100;
      this.total = 0;

      if (this.tab === "repository") {
        this.getRepository();
      } else if (this.tab === "local") {
        this.getLocal();
      }
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
    },
    paginationPageChange(page) {
      this.pagination.page = page;
    },
    getRepository() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.System.Addons.Repository(this.pagination)
        .then((res) => {
          this.repositories = res.data.data;
          this.total = res.data.total;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    getLocal() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.System.Addons.LocalList()
        .then((res) => {
          this.localList = res.data;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    installAddons(item) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.System.Addons.Install({
        addons_id: item.id,
        addons_sign: item.sign,
      })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.getRepository();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    upgradeAddons(item) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.System.Addons.Upgrade({
        addons_id: item.id,
        addons_sign: item.sign,
      })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.getRepository();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    addonsSwitch(item, status) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.System.Addons.Switch({
        sign: item.sign,
        action: status === 1 ? "enabled" : "disabled",
      })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));

          // 重新加载数据
          this.getLocal();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.application-box {
  width: 100%;
  height: auto;
  float: left;
}

.status-success {
  font-size: 10px;
  color: red;

  .status-success-icon {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
  }
}
</style>