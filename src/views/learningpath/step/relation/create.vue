<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加课程"></back-bar>
    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="form"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item prop="other_id" label="课程">
          <div class="d-flex">
            <div>
              <el-button type="primary" @click="showSelectResourceWin = true">
                请选择关联课程 <span v-if="form.name">「{{ form.name }}」</span>
              </el-button>
              <select-resource
                :show="showSelectResourceWin"
                @close="showSelectResourceWin = false"
                @change="change"
                enabled-resource="vod,book,live,paper,practice"
              ></select-resource>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="课程名" prop="name">
          <el-input
            v-model="form.name"
            class="w-600px"
            placeholder="课程名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="thumb" label="课程封面">
          <upload-image
            v-model="form.thumb"
            helper="长宽比4:3，建议尺寸：400x300像素"
            width="200"
            height="150"
            name="上传封面"
          ></upload-image>
        </el-form-item>
        <el-form-item label="课程价格" prop="charge">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                placeholder="单位：元"
                v-model="form.charge"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="最小单位：元。不支持小数。该价格仅作为参考，无实际意义。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="升序" prop="sort">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                v-model="form.sort"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。小数排在前，大数排在后。"
              ></helper-text>
            </div>
          </div>
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
import SelectResource from "@/components/select-resources/index";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    UploadImage,
    SelectResource,
  },
  data() {
    return {
      form: {
        step_id: this.$route.query.step_id,
        name: null,
        other_id: null,
        charge: null,
        sort: null,
        type: null,
        thumb: null,
      },
      showSelectResourceWin: false,
      categories: [],
      rules: {
        other_id: [
          {
            required: true,
            message: "请选择课程",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入课程名",
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
        charge: [
          {
            required: true,
            message: "课程价格不能为空",
            trigger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "课程封面不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    change(data) {
      // 选中课程基础信息
      this.form.other_id = data.id;
      this.form.name = data.title;
      this.form.charge = data.original_charge;
      this.form.thumb = data.thumb;

      if (data.resource_type == "vod") {
        this.form.type = "course";
      } else if (data.resource_type === "paper") {
        this.form.type = "paper_paper";
      } else if (data.resource_type === "practice") {
        this.form.type = "paper_practice";
      } else {
        this.form.type = data.resource_type;
      }

      this.showSelectResourceWin = false;
    },
    selgoods() {
      this.showSelectResourceWin = true;
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
      this.$api.Course.LearnPath.Step.Relation.Store(this.form)
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