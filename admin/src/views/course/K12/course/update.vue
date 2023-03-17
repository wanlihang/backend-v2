<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑大小班"></back-bar>

    <div class="center-tabs mb-30">
      <div>
        <el-tabs v-model="tab.active">
          <el-tab-pane
            :label="item.name"
            :name="item.key"
            v-for="(item, index) in tab.list"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="float-left mt-30" v-if="course">
      <el-form
        ref="form"
        class="float-left"
        :model="course"
        :rules="rules"
        label-width="200px"
      >
        <div class="float-left" v-show="tab.active === 'base'">
          <el-form-item label="分类" prop="category_id">
            <div class="d-flex">
              <div>
                <el-select class="w-300px" v-model="course.category_id">
                  <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="item.isLabel"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="ml-10">
                <p-link
                  text="分类管理"
                  type="primary"
                  @click="$router.push({ name: 'K12Categories' })"
                  p="addons.XiaoBanKe.course_category.list"
                >
                </p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="讲师" prop="teacher_ids">
            <div class="d-flex">
              <div>
                <el-select
                  class="w-300px"
                  multiple
                  v-model="course.teacher_ids"
                >
                  <el-option
                    v-for="(item, index) in teachers"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="ml-10">
                <p-link
                  text="讲师管理"
                  type="primary"
                  @click="$router.push({ name: 'K12Teacher' })"
                  p="addons.XiaoBanKe.teacher.list"
                >
                </p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="课程名" prop="title">
            <el-input
              v-model="course.title"
              class="w-800px"
              placeholder="课程名"
            ></el-input>
          </el-form-item>

          <el-form-item prop="thumb" label="课程封面">
            <upload-image
              v-model="course.thumb"
              width="400"
              height="300"
              name="上传课程封面"
              helper="推荐尺寸400x300 宽高比4:3"
            ></upload-image>
          </el-form-item>

          <el-form-item label="价格" prop="charge">
            <div class="d-flex">
              <div>
                <el-input
                  v-model="course.charge"
                  placeholder="价格"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text
                  text="最小单位：元。不支持小数。价格为0意味着免费观看。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="原价" prop="original_charge">
            <div class="d-flex">
              <div>
                <el-input
                  v-model="course.original_charge"
                  placeholder="原价"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text text="最小单位：元。不支持小数。"></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="开课时间" prop="open_at">
            <div class="d-flex">
              <div>
                <el-date-picker
                  v-model="course.open_at"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </div>
              <div class="ml-10">
                <helper-text text="用于提醒学员什么时候开课"></helper-text>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="结课时间" prop="over_at">
            <div class="d-flex">
              <div>
                <el-date-picker
                  v-model="course.over_at"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </div>
              <div class="ml-10">
                <helper-text text="用于提醒学员什么时候结课"></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="简短介绍" prop="short_desc">
            <el-input
              type="textarea"
              maxlength="150"
              v-model="course.short_desc"
              class="w-500px"
              show-word-limit
              rows="3"
            ></el-input>
          </el-form-item>

          <el-form-item label="详细介绍">
            <div class="w-800px">
              <quill-editor
                :height="400"
                v-model="course.original_desc"
              ></quill-editor>
            </div>
          </el-form-item>
        </div>

        <div class="float-left" v-show="tab.active === 'dev'">
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
                <helper-text
                  text="该字段控制学员是否可以看到课程。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>
        </div>
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
import UploadImage from "@/components/upload-image";
import QuillEditor from "@/components/quill-editor";

export default {
  components: {
    UploadImage,
    QuillEditor,
  },
  data() {
    return {
      id: this.$route.query.id,
      course: null,
      rules: {
        title: [
          {
            required: true,
            message: "课程名不能为空",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "blur",
          },
        ],
        category_id: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur",
          },
        ],
        teacher_ids: [
          {
            required: true,
            message: "请选择讲师",
            trigger: "blur",
          },
        ],
        charge: [
          {
            required: true,
            message: "价格不能为空",
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
        short_desc: [
          {
            required: true,
            message: "简短介绍不能为空",
            trigger: "blur",
          },
        ],
        open_at: [
          {
            required: true,
            message: "请选择开课时间",
            trigger: "blur",
          },
        ],
        over_at: [
          {
            required: true,
            message: "请选择结课时间",
            trigger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传课程封面",
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
      },
      tab: {
        active: "base",
        list: [
          {
            name: "基础信息",
            key: "base",
          },
          {
            name: "可选信息",
            key: "dev",
          },
        ],
      },
      types: [
        { title: "小班课", key: 0 },
        { title: "大班课", key: 1 },
        { title: "直播课", key: 2 },
        { title: "1v1", key: 3 },
      ],
      categories: [],
      teachers: [],
      loading: false,
    };
  },
  watch: {
    "course.type"() {
      if (this.course.type === 0) {
        this.course.max_people_num = 6;
      } else if (this.course.type === 1) {
        // 大班课
        this.course.max_people_num = 200;
      } else if (this.course.type === 2) {
        // 直播课
        this.course.max_people_num = 0;
      } else if (this.course.type === 3) {
        // 1v1
        this.course.max_people_num = 1;
      }
    },
  },
  mounted() {
    this.create();
    this.getDetail();
  },
  methods: {
    create() {
      this.$api.xiaoBanKe.Course.Create().then((res) => {
        var data = res.data;
        this.categories = data.categories;
        this.teachers = data.teachers;
      });
    },
    getDetail() {
      this.$api.xiaoBanKe.Course.Edit(this.id).then((res) => {
        let data = res.data.data;
        data.teacher_ids = res.data.teacher_ids;

        this.course = data;
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
      this.course.render_desc = this.course.original_desc;
      this.$api.xiaoBanKe.Course.Update(this.id, this.course)
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
