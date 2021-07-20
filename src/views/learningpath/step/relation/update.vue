<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑步骤关联"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="other_id" label="课程">
            <div class="d-flex">
              <div>
                <el-button @click="selgoods"> 选择课程 </el-button>
                <span
                  v-if="this.course.other_id"
                  style="color: red; margin-left: 4px"
                  >已选择</span
                >
                <select-resource
                  v-bind:show="msg"
                  @change="change"
                   :selectedIds="this.course.other_id"
                  :enabled-resource="types"
                ></select-resource>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="课程名" prop="name">
            <el-input v-model="course.name" class="w-100"></el-input>
          </el-form-item>
          <el-form-item prop="thumb" label="课程封面">
            <upload-image
              v-model="course.thumb"
              helper="长宽比4:3，建议尺寸：400x300像素"
              width="400"
              height="300"
              name="上传封面"
            ></upload-image>
          </el-form-item>
          <el-form-item label="课程价格" prop="charge">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.charge"
              class="w-200px"
            ></el-input>
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
            <el-button
              @click="
                $router.push({
                  name: 'Steprelation',
                  query: {
                    id: course.step_id,
                  },
                })
              "
              >取消</el-button
            >
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
      course: {
        id: this.$route.query.id,
        step_id: this.$route.query.step_id,
        name: null,
        other_id: null,
        charge: null,
        sort: null,
        type: null,
        thumb: null,
      },
      types: null,
      msg: false,
      categories: [],
      rules: {
        other_id: [
          {
            required: true,
            message: "课程不能为空",
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
      expireTimeOption: {
        disabledDate(date) {
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
          //超过此刻可选
          return date.getTime() < Date.now();
        },
      },
      loading: false,
    };
  },
  mounted() {
    this.params();
    this.detail();
  },
  methods: {
    change(v1) {
      console.log(v1);
      var data = v1;
      this.course.other_id = data.id;
      this.course.type = data.resource_type;
      if (data.resource_type == "vod") {
        this.course.type = "course";
      }
      this.course.name = data.title;
      this.course.charge = data.original_charge;
      this.course.thumb = data.thumb;
      this.msg = false;
    },
    detail() {
      this.$api.Course.LearnPath.Step.Relation.Detail(this.course.id).then((res) => {
        var data = res.data.data;
        this.course.name = data.name;
        this.course.charge = data.charge;
        this.course.other_id = data.other_id;
        this.course.type= data.type;
        this.course.sort = data.sort;
        this.course.thumb = data.thumb;
      });
    },
    params() {
      this.types = "vod,book,live,paper,practice,";
    },
    selgoods() {
      this.msg = true;
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
      this.$api.Course.LearnPath.Step.Relation.Update(this.course.id,this.course)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({
            name: "Steprelation",
            query: {
              id: this.course.step_id,
            },
          });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>