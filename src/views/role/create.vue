<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建VIP角色"></back-bar>
    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="course"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item :label="$t('member.addpage.rolename')" prop="name">
          <el-input
            class="w-200px"
            v-model="course.name"
            :placeholder="$t('member.addpage.placeholder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('member.addpage.days')" prop="expire_days">
          <el-input
            class="w-200px"
            type="number"
            v-model="course.expire_days"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('member.addpage.charge')" prop="charge">
          <el-input
            class="w-200px"
            type="number"
            v-model="course.charge"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('member.addpage.display')" prop="is_show">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="course.is_show"
          ></el-switch>
        </el-form-item>
        <el-form-item :label="$t('member.addpage.des')" prop="description">
          <el-input
            class="w-100"
            type="textarea"
            v-model="course.description"
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
  name: "addRole",
  data() {
    return {
      loading: false,
      course: {
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
            message: this.$t("member.addpage.name_notice"),
            trigger: "blur",
          },
        ],
        expire_days: [
          {
            required: true,
            message: this.$t("member.addpage.day_notice"),
            trigger: "blur",
          },
        ],
        is_show: [
          {
            required: true,
            message: "请选择是否显示",
            trigger: "blur",
          },
        ],
        charge: [
          {
            required: true,
            message: this.$t("member.addpage.charge_notice"),
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: this.$t("member.addpage.des_notice"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
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
      this.$api.Role.Create(this.course)
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
 