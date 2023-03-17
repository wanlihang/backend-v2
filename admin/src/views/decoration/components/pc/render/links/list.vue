<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">友情链接</div>
      <div class="meedu-dialog-body" v-loading="loading">
        <div class="float-left mb-15">
          <el-button type="primary" @click="showCreateWin = true">
            添加
          </el-button>
        </div>
        <el-table
          :data="list"
          class="float-left"
          row-key="id"
          :tree-props="{ children: 'children' }"
          v-loading="loading"
        >
          <el-table-column prop="sort" label="升序" width="120">
          </el-table-column>
          <el-table-column prop="name" label="链接名">
          </el-table-column>
          <el-table-column prop="url" label="链接" width="300">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-link type="primary" @click="editItem(scope.row)">
                编辑
              </el-link>
              <el-link type="danger" class="ml-10" @click="delItem(scope.row)">
                删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="meedu-dialog-footer">
        <el-button @click="close">取消</el-button>
      </div>
    </div>

    <create-comp @close="closeEvt" v-if="showCreateWin"></create-comp>

    <edit-comp
      @close="closeEvt"
      :id="editItemId"
      v-if="showEditWin"
    ></edit-comp>
  </div>
</template>

<script>
import CreateComp from "./create.vue";
import EditComp from "./edit.vue";

export default {
  components: {
    CreateComp,
    EditComp,
  },
  props: ["show"],
  data() {
    return {
      list: [],
      showCreateWin: false,
      showEditWin: false,
      loading: false,
      editItemId: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.System.Links.List({ page: 1, size: 1000 }).then((res) => {
        this.list = res.data.data;
        this.loading = false;
      });
    },
    close() {
      this.$emit("close");
    },
    closeEvt() {
      this.showCreateWin = false;
      this.showEditWin = false;
      this.getData();
    },
    delItem(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.System.Links.Destroy(item.id)
            .then(() => {
              this.$message.success(this.$t("common.success"));
              this.getData();
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        })
        .catch(() => {});
    },
    editItem(item) {
      this.editItemId = item.id;
      this.showEditWin = true;
    },
  },
};
</script>