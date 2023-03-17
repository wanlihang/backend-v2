<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑学员"></back-bar>

    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="头像" prop="avatar">
          <upload-image
            v-model="user.avatar"
            :width="100"
            :height="100"
            helper="建议尺寸：100x100"
          ></upload-image>
        </el-form-item>

        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="user.nick_name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="user.mobile" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" class="w-200px"></el-input>
        </el-form-item>
        <el-form-item label="VIP">
          <el-select :clearable="true" v-model="user.role_id">
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="VIP到期时间" v-if="user.role_id">
          <el-date-picker
            v-model="user.role_expired_at"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="is_lock">
          <span slot="label">
            <form-label text="登录锁定" helper="锁定学员无法登录"></form-label>
          </span>
          <el-switch
            v-model="user.is_lock"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()"> 取消 </el-button>
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
      id: null,
      user: {
        avatar: null,
        nick_name: null,
        mobile: null,
        password: null,
        role_id: null,
        role_expired_at: null,
        is_lock: null,
      },
      rules: {
        avatar: [
          {
            required: true,
            message: "请上传头像",
            trigger: "blur",
          },
        ],
        nick_name: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
      },
      roles: [],
      loading: false,
    };
  },
  mounted() {
    this.id = this.$route.params.userId;

    this.getUser();
    this.params();
  },
  methods: {
    getUser() {
      this.$api.Member.Edit(this.id).then((res) => {
        let data = res.data;
        if (data.role_id === 0) {
          data.role_id = null;
        }

        this.user = data;
      });
    },
    params() {
      this.$api.Member.Create().then((res) => {
        this.roles = res.data.roles;
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
      this.$api.Member.Update(this.id, this.user)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.loading = false;
          this.getUser();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
