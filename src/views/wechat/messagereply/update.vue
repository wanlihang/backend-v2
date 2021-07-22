<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="微信公众号编辑规则"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="reply" :rules="rules" label-width="200px">
        <el-form-item label="消息类型" prop="type">
          <el-select v-model="reply.type" class="w-200px">
            <el-option
              v-for="(item, index) in types"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="匹配规则" v-if="reply.type == 'text'">
          <el-input v-model="reply.rule" class="w-200px"></el-input>
          <div class="helper">支持正则表达式</div>
        </el-form-item>
        <el-form-item label="事件" v-if="reply.type == 'event'">
          <el-select v-model="reply.event_type" class="w-200px">
            <el-option
              v-for="(item, index) in events"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件key" v-if="reply.type == 'event'">
          <el-input v-model="reply.event_key" class="w-200px"></el-input>
        </el-form-item>
        <el-form-item label="回复内容" prop="reply_content">
          <el-input
            class="w-100"
            type="textarea"
            v-model="reply.reply_content"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary"
            >保存</el-button
          >
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reply: {
        id: this.$route.query.id,
        type: null,
        rule: null,
        event_key: null,
        event_type: null,
        reply_content: null,
      },
      rules: {
        type: [
          {
            required: true,
            message: "消息类型不能为空",
            trigger: "blur",
          },
        ],
        reply_content: [
          {
            required: true,
            message: "回复内容不能为空",
            trigger: "blur",
          },
        ],
      },
      types: [],
      events: [
        {
          id: "subscribe",
          name: "用户关注",
        },
        {
          id: "unsubscribe",
          name: "用户取消关注",
        },
        {
          id: "SCAN",
          name: "二维码扫描事件",
        },
        {
          id: "CLICK",
          name: "自定义菜单事件",
        },
      ],
      loading: false,
    };
  },
  mounted() {
    this.create();
    this.detail();
  },
  methods: {
    create() {
      this.$api.Wechat.Reply.Create()
        .then((res) => {
          this.types = res.data.types;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    detail() {
      this.$api.Wechat.Reply.Detail(this.reply.id)
        .then((res) => {
          this.reply.type = res.data.data.type;
          this.reply.reply_content = res.data.data.reply_content;
          this.reply.rule = res.data.data.rule;
          this.reply.event_key = res.data.data.event_key;
          this.reply.event_type = res.data.data.event_type;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.confirm();
        }
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Wechat.Reply.Update(this.reply.id, this.reply)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.back();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>