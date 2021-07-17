<template>
  <div class="float-left">
    <div class="float-left mb-15">
      <el-button @click="$router.push({ name: 'ReplyCreate' })" type="primary"
        >添加规则</el-button
      >
    </div>
    <div class="table-body top-left-radius" v-loading="loading">
      <div class="float-left">
        <el-table :data="messages" stripe class="float-left">
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="type" label="类型" width="120">
          </el-table-column>
          <el-table-column label="内容" width="300"
            ><template slot-scope="scope">
              <span v-if="scope.row.type == 'event'"
                >{{ scope.row.event_type }}: {{ scope.row.event_key }}</span
              >
              <span v-else>{{ scope.row.rule }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reply_content" label="回复内容">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-link
                style="margin-right: 10px"
                type="danger"
                @click="destory(scope.row.id)"
                >删除</el-link
              >
              <el-link
                type="primary"
                @click="
                  $router.push({
                    name: 'ReplyUpdate',
                    query: { id: scope.row.id },
                  })
                "
                >编辑</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="float-left mt-15">
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
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      messages: [],
    };
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getMessages();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getMessages();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getMessages();
    },
    getMessages() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Wechat.Reply.List(params).then((res) => {
        this.loading = false;
        this.messages = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    importUser() {},
    //删除管理员
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
          this.$api.Wechat.Reply.Destory(id)
            .then((res) => {
              this.loading = false;
              this.$message.success("删除成功");
              this.getMessages();
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