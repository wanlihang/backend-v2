<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="新建自动回复"></back-bar>

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
        <el-form-item label="触发关键字" v-show="reply.type === 'text'">
          <div class="d-flex">
            <div>
              <el-input
                v-model="reply.rule"
                class="w-200px"
                placeholder="请输入触发关键字"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="支持正则表达式"></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="事件" v-show="reply.type == 'event'">
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
          <el-input v-model="reply.event_key" class="w-400px"></el-input>
        </el-form-item>

        <el-form-item label="回复内容" prop="reply_content">
          <el-input
            class="w-500px"
            type="textarea"
            rows="4"
            placeholder="请输入回复内容"
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
          id: "CLICK",
          name: "自定义菜单事件",
        },
      ],
      loading: false,
    };
  },
  mounted() {
    this.create();
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
      this.$api.Wechat.Reply.Store(this.reply)
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
