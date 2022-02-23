<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        :text="$t('member.btn_add')"
        p="role.store"
        @click="$router.push({ name: 'Addrole' })"
        type="primary"
      >
      </p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="list"
        class="float-left"
      >
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="name" label="VIP"> </el-table-column>
        <el-table-column prop="expire_days" label="天数"> </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span> {{ scope.row.charge }}元 </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <p-link
              text="删除"
              p="role.destroy"
              type="danger"
              @click="del_Meberitem(scope.row.id)"
            >
            </p-link>
            <p-link
              text="编辑"
              p="role.update"
              type="primary"
              class="ml-5"
              @click="
                $router.push({
                  name: 'Editrole',
                  query: {
                    id: scope.row.id,
                  },
                })
              "
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
      pageName: "role-list",
      loading: false,
      list: [],
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
      this.$api.Role.List().then((res) => {
        this.loading = false;
        this.list = res.data.data;
      });
    },
    //删除会员
    del_Meberitem(id) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          this.loading = true;
          this.$api.Role.Destory(id)
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
