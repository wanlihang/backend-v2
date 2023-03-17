<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑VIP"></back-bar>

    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="form"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="VIP名" prop="name">
          <el-input
            class="w-200px"
            v-model="form.name"
            placeholder="VIP名"
          ></el-input>
        </el-form-item>

        <el-form-item label="天数" prop="expire_days">
          <div class="d-flex">
            <div>
              <el-input
                class="w-200px"
                type="number"
                v-model="form.expire_days"
                placeholder="天数"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="决定用户购买VIP之后可享受的天数。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="价格" prop="charge">
          <div class="d-flex">
            <div>
              <el-input
                class="w-200px"
                type="number"
                v-model="form.charge"
                placeholder="价格"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="请输入整数。不支持小数。"></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="显示" prop="is_show">
          <div class="d-flex">
            <div>
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="form.is_show"
              ></el-switch>
            </div>
            <div class="ml-10">
              <helper-text text="控制用户是否能够看到并购买该VIP"></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            class="w-400px"
            rows="5"
            type="textarea"
            v-model="form.description"
            :placeholder="$t('member.addpage.textplaceholder')"
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
export default {
  data() {
    return {
      id: this.$route.query.id,
      loading: false,
      form: {
        name: null,
        expire_days: null,
        charge: "",
        is_show: 1,
        description: null,
        weight: 0,
      },
      rules: {
        name: [
          {
            required: true,
            message: "VIP名不能为空",
            trigger: "blur",
          },
        ],
        expire_days: [
          {
            required: true,
            message: "天数不能为空",
            trigger: "blur",
          },
        ],
        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.Role.Detail(this.id).then((res) => {
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
      this.$api.Role.Update(this.id, this.form)
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
 