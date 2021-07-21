<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建直播讲师"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item label="讲师名" prop="name">
            <el-input v-model="course.name" class="w-200px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="username">
            <el-input v-model="course.username" class="w-200px"></el-input>
            <div class="helper ml-30">用于教师登录</div>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="course.password" class="w-200px"></el-input>
          </el-form-item>
          <el-form-item label="隐藏" prop="is_hidden">
            <el-switch
              v-model="course.is_hidden"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>

          <el-form-item prop="avatar" label="头像">
            <upload-image
              v-model="course.avatar"
              helper="长宽比4:4，建议尺寸：400x400像素"
              width="400"
              height="400"
              name="上传头像"
            ></upload-image>
          </el-form-item>
          <el-form-item label="简介" prop="short_desc">
            <el-input
              type="textarea"
              v-model="course.short_desc"
              class="w-100"
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
      course: {
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
      expireTimeOption: {
        disabledDate(date) {
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
          //超过此刻可选
          return date.getTime() < Date.now();
        },
      },
      types: null,
      loading: false,
    };
  },
  mounted() {},
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
      this.$api.Course.Live.Teacher.Store(this.course)
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