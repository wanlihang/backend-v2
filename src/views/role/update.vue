<template>
  <el-container>
    <el-header>
      <h1>{{$t("member.btn_edit") }}</h1>
    </el-header>
    <!-- el-form表单 -->
    <el-form
      :model="addForm"
      :rules="UserRules"
      ref="UserRef"
      label-width="80px"
    >
      <div class="row">
        <el-form-item :label="$t('member.addpage.rolename')" prop="name">
          <el-input v-model="addForm.name" :placeholder="$t('member.addpage.placeholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('member.addpage.days')" prop="expire_days">
          <el-input type="number" v-model="addForm.expire_days"></el-input>
        </el-form-item>
        <el-form-item :label="$t('member.addpage.charge')"  prop="charge">
          <el-input type="number" v-model="addForm.charge"></el-input>
        </el-form-item>
      </div>
      <div class="row"><span>{{$t("member.addpage.display") }}</span></div>
      <el-switch
        prop="is_show"
        active-color="#409eff"
        :active-value="1"
        :inactive-value="0"
        v-model="addForm.is_show"
      ></el-switch>
      <div class="row">
        <el-form-item :label="$t('member.addpage.des')" prop="description">
          <el-input
            type="textarea"
            v-model="addForm.description"
             :placeholder="$t('member.addpage.textplaceholder')"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-footer>
      <el-button @click="dialogClose()">{{$t("member.addpage.btn_back") }}</el-button>
      <el-button type="primary" @click="editUserForm()">{{$t("member.addpage.btn_save") }}</el-button>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: "editRole",
  data() {
    return {
      loading: false,
      addForm: {
        id: this.$route.query.id || "",
        name: "",
        expire_days: "",
        charge: "",
        is_show: 1,
        description: "",
        weight: 0,
      },
      UserRules: {
        name: [{ required: true, message: this.$t("member.addpage.name_notice"), trigger: "blur" }],
        expire_days: [{ required: true, message: this.$t("member.addpage.day_notice"), trigger: "blur" }],
        charge: [{ required: true, message: this.$t("member.addpage.charge_notice"), trigger: "blur" }],
        description: [
          { required: true, message: this.$t("member.addpage.des_notice"), trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getinfo(this.addForm.id);
  },
  methods: {
    //获取编辑详情
    getinfo(id) {
      this.loading = true;
      this.$api.Role.Detail(id).then((resp) => {
        if (resp.status == 0) {
          var data=resp.data;
          this.addForm.id=data.id;
          this.addForm.is_show=data.is_show;
          this.addForm.name=data.name;
          this.addForm.expire_days=data.expire_days;
          this.addForm.charge=data.charge;
          this.addForm.description=data.description;
        } else {
          this.$message.error(resp.message);
        }
        this.loading = false;
      });
    },
    //清空表单
    clearForm() {
      this.addForm.name = "";
      this.addForm.expire_days = "";
      this.addForm.charge = "";
      this.addForm.is_show = 1;
      this.addForm.description = "";
    },
    //关闭按钮
    dialogClose() {
      this.clearForm();
      this.$router.push({ name: "Role" });
    },
    //确定
    editUserForm() {
      this.$refs.UserRef.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const { data: res } = await this.$api.Role.Update(this.addForm.id,this.addForm).then(
          (resp) => {
            if (resp.status == 0) {
              this.$message.success("保存成功");
              this.$router.push({ name: "Role" });
            } else {
              this.$message.error(resp.message);
            }
            this.loading = false;
          }
        );
      });
    },
  },
};
</script>
<style  lang="less" scoped>
.el-form-item__label {
  text-align: left;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  box-sizing: border-box;
  .el-input {
    width: 180px;
    margin-right: 12px;
  }
  span {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
}
.el-switch {
  margin: 20px;
}
.el-textarea__inner {
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  line-height: 1.5;
  font-size: 14px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  font-family: inherit;
  vertical-align: top;
  outline: none;
  width: 750px;
  height: 120px;
}
.el-footer {
  margin-top: 20px;
}
</style>