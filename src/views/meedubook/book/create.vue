<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="新建电子书"></back-bar>

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

    <div class="float-left">
      <el-form
        ref="form"
        :model="course"
        :rules="rules"
        class="float-left"
        label-width="200px"
      >
        <div class="float-left" v-show="tab.active === 'base'">
          <el-form-item prop="cid" label="分类">
            <div class="d-flex">
              <div>
                <el-select v-model="course.cid">
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
                  p="addons.meedu_books.book_category.list"
                  type="primary"
                  @click="$router.push({ name: 'MeedubookCategory' })"
                ></p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="书名" prop="name">
            <el-input
              v-model="course.name"
              class="w-500px"
              placeholder="书名"
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
                  text="上架时间决定了电子书的排名，时间越早排名越靠后。如果是未来时间，则必须等到时间达到学员才能看到。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item prop="thumb" label="封面">
            <upload-image
              v-model="course.thumb"
              helper="长宽比3:4，建议尺寸：300x400像素"
              width="90"
              height="120"
              name="上传封面"
            ></upload-image>
          </el-form-item>

          <el-form-item label="价格" prop="charge">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  placeholder="单位：元"
                  v-model="course.charge"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text
                  text="最小单位：元。不支持小数。价格为0意味着学员可免费直接观看。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item
            label="会员免费"
            prop="is_vip_free"
            v-if="course.charge > 0"
          >
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="course.is_vip_free"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text
                  text="如果开启该选项，则购买VIP会员的学员可以无需购买即可观看该电子书。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item prop="short_desc" label="简短介绍">
            <el-input
              class="w-400px"
              rows="4"
              type="textarea"
              maxlength="150"
              show-word-limit
              v-model="course.short_desc"
              placeholder="简短介绍"
            ></el-input>
          </el-form-item>

          <el-form-item prop="original_desc" label="详细介绍">
            <div class="w-800px">
              <quill-editor
                :height="400"
                v-model="course.original_desc"
              ></quill-editor>
            </div>
          </el-form-item>
        </div>

        <div class="float-left" v-show="tab.active === 'dev'">
          <el-form-item label="订阅人数" prop="count">
            <div class="d-flex">
              <div>
                <el-input
                  v-model="course.user_count"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text
                  text="订阅人数是学员端可看到的数值，可手动指定该值。该值会随着购买人数的增加而增加。"
                ></helper-text>
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
                  text="控制学员是否能够看到该电子书。"
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
import QuillEditor from "@/components/quill-editor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    QuillEditor,
    UploadImage,
  },
  data() {
    return {
      course: {
        published_at: null,
        is_show: 1,
        charge: null,
        name: null,
        cid: null,
        is_vip_free: 0,
        thumb: null,
        short_desc: null,
        original_desc: null,
        render_desc: null,
        user_count: null,
      },
      rules: {
        cid: [
          {
            required: true,
            message: "分类不能为空",
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
        published_at: [
          {
            required: true,
            message: "上架时间不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "书名不能为空",
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
        short_desc: [
          {
            required: true,
            message: "简短介绍不能为空",
            trigger: "blur",
          },
        ],
        original_desc: [
          {
            required: true,
            message: "详细介绍不能为空",
            trigger: "blur",
          },
        ],
      },
      categories: [],
      loading: false,
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
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.Meedubook.Book.Create().then((res) => {
        this.categories = res.data.categories;
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
      this.$api.Meedubook.Book.Store(this.course)
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
