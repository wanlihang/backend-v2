<template>
  <el-container >
    <!-- el-form表单 -->
    <el-form
      :model="addForm"
      :rules="UserRules"
      ref="UserRef"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose()">取 消</el-button>
      <el-button type="primary" @click="addUserForm()">确 定</el-button>
    </span>
  </el-container >
</template>
<script>
export default {
  name: "addVip",
  data() {
    return {
      isloading: false,
      addForm: [{ username: "" }],
      UserRules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //清空表单
    clearForm(){
        this.addForm.username=""
    },
    //关闭按钮
    dialogClose() {
      this.$refs.UserRef.resetFields();
      this.$emit("addDialogClose");
      this.clearForm();
    },
    //确定
    addUserForm() {
      this.$refs.UserRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("roles", this.UserForm);
        if (res.meta.status !== 201) return this.$message.error("添加失败");
        this.$message.success("添加成功");
        this.dialogvisible = false; //关闭dialog对话框
        this.getUserList(); //重新加载列表
      });
    },
  },
};
</script>