<template>
  <div class="meedu-main-body" v-if="user">
    <back-bar class="mb-30" title="学员备注"></back-bar>

    <div class="form-box broder-top-left-radius">
      <el-form ref="form" label-width="200px">
        <el-form-item label="备注">
          <quill-editor :height="400" v-model="remark"></quill-editor>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="confirm" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()">取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuillEditor from "@/components/quill-editor";

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      id: null,
      user: null,
      remark: null,
      loading: false,
    };
  },
  mounted() {
    this.id = this.$route.params.userId;

    this.getUser();
  },
  methods: {
    getUser() {
      this.$api.Member.Edit(this.id).then((res) => {
        this.user = res.data;
        this.remark = res.data.remark ? res.data.remark.remark : null;
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Member.RemarkUpdate(this.id, { remark: this.remark })
        .then(() => {
          this.$message.success(this.$t("common.success"));

          this.loading = false;

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
