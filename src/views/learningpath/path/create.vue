<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建学习路径"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item label="路径名" prop="name">
            <el-input v-model="course.name" class="w-100"></el-input>
          </el-form-item>
         
          <el-form-item prop="thumb" label="封面">
            <upload-image
              v-model="course.thumb"
              helper="长宽比4:3，建议尺寸：400x300像素"
              width="400"
              height="300"
              name="上传封面"
            ></upload-image>
          </el-form-item>
           <el-form-item label="原价" prop="original_charge">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.original_charge"
              class="w-200px"
            ></el-input>
          </el-form-item>
           <el-form-item label="现价" prop="charge">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.charge"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item prop="desc" label="描述">
            <wang-editor class="w-100" v-model="course.desc"></wang-editor>
          </el-form-item>
           <el-form-item label="显示" prop="is_show">
            <el-switch
              v-model="course.is_show"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
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
            <el-button @click="$router.back()"
              >取消</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WangEditor from "@/components/wangeditor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    WangEditor,
    UploadImage,
  },
  data() {
    return {
      course: {
        name: null,
        original_charge: null,
        charge: null,
        is_show: 1,
        thumb: null,
        desc: null,
       
      },
      rules: {
        name: [
          {
            required: true,
            message: "路径名不能为空",
            trigger: "blur",
          },
        ],
        charge: [
          {
            required: true,
            message: "现价不能为空",
            trigger: "blur",
          },
        ],
       original_charge: [
          {
            required: true,
            message: "原价不能为空",
            trigger: "blur",
          },
        ],
       
        thumb: [
          {
            required: true,
            message: "请上传封面",
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
        desc: [
          {
            required: true,
            message: "描述不能为空",
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
  mounted() {
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
      this.$api.Course.LearnPath.Path.Store(this.course)
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