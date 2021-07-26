<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加学习路径"></back-bar>
    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="course"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="路径名" prop="name">
          <el-input v-model="course.name" class="w-500px"></el-input>
        </el-form-item>

        <el-form-item prop="thumb" label="封面">
          <upload-image
            v-model="course.thumb"
            helper="长宽比4:3，建议尺寸：400x300像素"
            width="200"
            height="150"
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
          <el-input
            type="textarea"
            v-model="course.desc"
            class="w-600px"
            rows="4"
            placeholder="描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示" prop="is_show">
          <div class="d-flex">
            <div>
              <el-switch
                v-model="course.is_show"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="ml-10">
              <helper-text text="该字段控制用户能否看到该路径"></helper-text>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button @click="formValidate" :loading="loading" type="primary">
              保存
            </el-button>
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