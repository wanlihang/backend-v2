<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建学习步骤"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="path_id" label="学习路径">
            <div class="d-flex">
              <div>
                <el-select v-model="course.path_id">
                  <el-option
                    v-for="(item, index) in categories"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="步骤名" prop="name">
            <el-input v-model="course.name" class="w-100"></el-input>
          </el-form-item>
          <el-form-item prop="desc" label="描述">
            <wang-editor class="w-100" v-model="course.desc"></wang-editor>
          </el-form-item>
          <el-form-item label="升序" prop="sort">
            <el-input
              type="number"
              v-model="course.sort"
              class="w-200px"
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
            <el-button @click="$router.push({ name: 'LearningStep' })"
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

export default {
  components: {
    WangEditor,
  },
  data() {
    return {
      course: {
        name: null,
        path_id: null,
        sort: null,
        decs: "",
        desc: null,
      },
      categories: [],
      rules: {
        path_id: [
          {
            required: true,
            message: "学习路径不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "步骤名不能为空",
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
    this.params();
  },
  methods: {
    params() {
      this.$api.Course.LearnPath.Step.Create().then((res) => {
        this.categories = res.data.paths;
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
      this.$api.Course.LearnPath.Step.Store(this.course)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "LearningStep" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>