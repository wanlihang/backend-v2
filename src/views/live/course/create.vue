<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="新建直播课程"></back-bar>

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

    <div class="float-left mt-30">
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
                    v-for="(item, index) in categories"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="ml-10">
                <p-link
                  text="分类管理"
                  type="primary"
                  @click="$router.push({ name: 'LiveCourseCategory' })"
                  p="addons.Zhibo.course_category.list"
                >
                </p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="讲师" prop="teacher_id">
            <div class="d-flex">
              <div>
                <el-select class="w-300px" v-model="course.teacher_id">
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
                  @click="$router.push({ name: 'LiveTeacher' })"
                  p="addons.Zhibo.teacher.list"
                >
                </p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="课程名" prop="title">
            <el-input
              v-model="course.title"
              class="w-600px"
              placeholder="课程名"
            ></el-input>
          </el-form-item>

          <el-form-item label="上架时间" prop="published_at">
            <div class="d-flex">
              <div>
                <el-date-picker
                  v-model="course.published_at"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </div>
              <div class="ml-10">
                <helper-text
                  text="上架时间决定了课程在学员端的排名，时间越早排名越靠后。如果是未来时间，则需要等到时间到达学员才能看到该课程。"
                ></helper-text>
              </div>
            </div>
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
                  text="最小单位：元。不支持小数。价格为0意味着学员可以直接观看直播，价格大于0则需要学员购买后才能观看直播。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="会员免费" v-if="course.charge > 0">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="course.vip_can_view"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text
                  text="如果启用会员免费那么购买VIP会员的学员将可以无需购买直接观看直播。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="简短介绍" prop="short_description">
            <el-input
              type="textarea"
              show-word-limit
              maxlength="150"
              v-model="course.short_description"
              class="w-500px"
              rows="3"
            ></el-input>
          </el-form-item>

          <el-form-item label="详细介绍" prop="original_desc">
            <div class="w-800px">
              <quill-editor
                :height="400"
                v-model="course.original_desc"
              ></quill-editor>
            </div>
          </el-form-item>
        </div>

        <div class="float-left" v-show="tab.active === 'dev'">
          <el-form-item label="播放封面">
            <div class="d-flex">
              <div>
                <upload-image
                  v-model="course.poster"
                  :can-clear="true"
                  width="400"
                  height="166.7"
                  name="上传播放封面"
                  helper="播放封面是在进入直播时播放器显示的图片。推荐尺寸：1200x500"
                ></upload-image>
              </div>
            </div>
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
      course: {
        category_id: null,
        is_show: 1,
        charge: null,
        original_desc: null,
        render_desc: null,
        short_description: null,
        poster: null,
        teacher_id: null,
        published_at: null,
        vip_can_view: 0,
        title: null,
        thumb: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: "课程名不能为空",
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
        teacher_id: [
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
        short_description: [
          {
            required: true,
            message: "简短介绍不能为空",
            trigger: "blur",
          },
        ],
        published_at: [
          {
            required: true,
            message: "请选择上架时间",
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
        original_desc: [
          {
            required: true,
            message: "请输入详细介绍",
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
      types: null,
      categories: [],
      teachers: [],
      loading: false,
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      this.$api.Course.Live.Course.Create().then((res) => {
        var data = res.data;
        this.categories = data.categories;
        this.teachers = data.teachers;
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
      this.$api.Course.Live.Course.Store(this.course)
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
