<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">公告</div>
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
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="title" label="公告"> </el-table-column>
          <el-table-column label="添加时间" width="200">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
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

        <div class="float-left mt-15 text-center">
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
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
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
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getData();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.System.Announcement.List(this.pagination).then((res) => {
        this.list = res.data.data;
        this.total = res.data.total;
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
          this.$api.System.Announcement.Destroy(item.id)
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