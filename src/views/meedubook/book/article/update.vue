<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑电子书文章"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="book_cid" label="章节">
            <div class="d-flex">
              <div>
                <el-select v-model="course.book_cid">
                  <el-option
                    v-for="(item, index) in chapters"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="标题" prop="name">
            <el-input
              v-model="course.title"
              class="w-100"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="charge">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.charge"
              class="w-200px"
            ></el-input>
            <div class="helper ml-30">价格为0即视为试看，可免费阅读</div>
          </el-form-item>
          <el-form-item label="显示" prop="is_show">
            <el-switch
              v-model="course.is_show"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="上架时间" prop="published_at">
            <el-date-picker
              v-model="course.published_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择日期"
              :picker-options="expireTimeOption"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="render_content" label="内容">
            <mavon-editor :content="course.original_content" class="w-100" v-on:change="getcontent"></mavon-editor>
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
                  name: 'MeedubookArticle',
                  query: { bid: book_id },
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
import MavonEditor from "@/components/md-editor";

export default {
  components: {
    MavonEditor,
  },
  data() {
    return {
      book_id: this.$route.query.book_id,
      course: {
        bid: this.$route.query.book_id,
        id: this.$route.query.id,
        published_at: null,
        is_show: false,
        charge: null,
        title: null,
        book_cid: null,
        original_content: null,
        render_content: null,
      },
      rules: {
        book_cid: [
          {
            required: true,
            message: "章节不能为空",
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
        is_show: [
          {
            required: true,
            message: "请选择显示",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur",
          },
        ],

        render_content: [
          {
            required: true,
            message: "内容不能为空",
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
      chapters: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
    this.detail();
  },
  methods: {
    getcontent: function (pureContent, renderContent) {
      this.course.original_content = pureContent;
      this.course.render_content = renderContent;
    },
    detail() {
      this.$api.Meedubook.Book.Article.Detail(this.course.id).then((res) => {
        var data = res.data;
        this.course.original_content = data.original_content;
        this.course.render_content = data.render_content;
        if (data.is_show == 1) {
          this.course.is_show = true;
        } else {
          this.course.is_show = false;
        }
        this.course.published_at = data.published_at;
        this.course.charge = data.charge;
        this.course.book_cid = data.book_cid;
        this.course.bid = data.bid;
        this.book_id = data.bid;
        this.course.title = data.title;
      });
    },
    params() {
      this.$api.Meedubook.Book.Article.Create().then((res) => {
        this.chapters = res.data.chapters[this.book_id];
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
      this.$api.Meedubook.Book.Article.Update(this.course.id, this.course)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({
            name: "MeedubookArticle",
            query: { bid: this.book_id },
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