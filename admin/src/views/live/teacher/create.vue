<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加直播讲师"></back-bar>
    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="teacher"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="讲师名" prop="name">
          <el-input v-model="teacher.name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item prop="avatar" label="头像">
          <upload-image
            v-model="teacher.avatar"
            helper="长宽比1:1 推荐尺寸200x200"
            width="100"
            height="100"
            name="讲师头像"
          ></upload-image>
        </el-form-item>

        <el-form-item label="邮箱" prop="username">
          <div class="d-flex">
            <div>
              <el-input v-model="teacher.username" class="w-200px"></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="用于讲师客户端登录"></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <div class="d-flex">
            <div>
              <el-input v-model="teacher.password" class="w-200px"></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="用于讲师客户端登录"></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="简介" prop="short_desc">
          <el-input
            type="textarea"
            v-model="teacher.short_desc"
            class="w-400px"
            rows="4"
            placeholder="此处填写讲师介绍"
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
      teacher: {
        name: null,
        short_desc: null,
        is_hidden: 0,
        username: null,
        password: null,
        avatar: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "讲师名不能为空",
            trigger: "blur",
          },
        ],
        short_desc: [
          {
            required: true,
            message: "简介不能为空",
            trigger: "blur",
          },
        ],
        is_hidden: [
          {
            required: true,
            message: "请选择是否隐藏",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
        avatar: [
          {
            required: true,
            message: "请上传头像",
            trigger: "blur",
          },
        ],
      },
      loading: false,
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
      this.$api.Course.Live.Teacher.Store(this.teacher)
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
