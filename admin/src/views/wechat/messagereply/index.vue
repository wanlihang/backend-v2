<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="新建自动回复"
        p="mpWechatMessageReply.store"
        @click="$router.push({ name: 'ReplyCreate' })"
        type="primary"
      ></p-button>
      <p-button
        text="公众号菜单"
        p="mpWechat.menu"
        @click="$router.push({ name: 'MpWechatMenu' })"
        type="primary"
      ></p-button>
      <option-bar text="公众号配置" value="微信公众号"></option-bar>
    </div>
    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="messages"
        class="float-left"
      >
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column label="匹配规则" width="500"
          ><template slot-scope="scope">
            <span v-if="scope.row.type == 'event'"
              >{{ scope.row.type }}@{{ scope.row.event_type }}:{{
                scope.row.event_key
              }}</span
            >
            <span v-else>{{ scope.row.type }}@{{ scope.row.rule }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reply_content" label="回复内容">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <p-link
              text="编辑"
              p="mpWechatMessageReply.update"
              type="primary"
              @click="
                $router.push({
                  name: 'ReplyUpdate',
                  query: { id: scope.row.id },
                })
              "
            ></p-link>
            <p-link
              text="删除"
              p="mpWechatMessageReply.destroy"
              class="ml-5"
              type="danger"
              @click="destory(scope.row.id)"
            ></p-link>
          </template>
        </el-table-column>
      </el-table>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageName: "wechat-list",
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      messages: [],
    };
  },
  activated() {
    this.getMessages();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  computed: {
    ...mapState(["user"]),
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
              this.$message.eroor(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
