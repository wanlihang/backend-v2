<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建海报"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item label="升序" prop="sort">
            <el-input
              type="number"
              v-model="course.sort"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="海报名" prop="name">
            <el-input v-model="course.name" class="w-200px"></el-input>
          </el-form-item>

          <el-form-item prop="thumb" label="海报">
            <upload-image
              v-model="course.thumb"
              helper="长宽比4:3，建议尺寸：400x300像素"
              width="400"
              height="300"
              name="上传封面"
            ></upload-image>
          </el-form-item>
          <el-form-item label="参数" prop="config">
            <el-input type="textarea"  v-model="course.config" class="w-100"></el-input>
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
            <el-button @click="$router.push({ name: 'MultiPoster' })"
              >取消</el-button
            >
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
        config: null,
        sort: null,
        thumb: null,
      },
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
      this.$api.Multishare.Poster.Store(this.course)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "MultiPoster" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>