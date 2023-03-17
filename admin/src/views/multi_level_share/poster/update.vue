<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑海报"></back-bar>
    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="form"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="升序" prop="sort">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                v-model="form.sort"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。小数排在前，大数排在后。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="海报名" prop="name">
          <el-input v-model="form.name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item prop="thumb" label="海报">
          <upload-image
            v-model="form.thumb"
            width="375"
            height="667"
            helper="推荐宽高1125x2000"
          ></upload-image>
        </el-form-item>

        <el-form-item label="参数" prop="config">
          <el-input
            type="textarea"
            rows="5"
            v-model="form.config"
            class="w-600px"
          ></el-input>
        </el-form-item>
      </el-form>

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
  </div>
</template>
<script>
import UploadImage from "@/components/upload-image";

export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      id: this.$route.query.id,
      form: null,
      rules: {
        name: [
          {
            required: true,
            message: "海报名不能为空",
            trigger: "blur",
          },
        ],
        config: [
          {
            required: true,
            message: "参数不能为空",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "升序不能为空",
            trigger: "blur",
          },
        ],

        thumb: [
          {
            required: true,
            message: "请上传海报",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    this.detail();
  },
  methods: {
    detail() {
      this.$api.Multishare.Poster.Detail(this.id).then((res) => {
        this.form = res.data;
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
      this.$api.Multishare.Poster.Update(this.form.id, this.form)
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