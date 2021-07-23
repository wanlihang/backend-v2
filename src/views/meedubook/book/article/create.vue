<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加电子书文章"></back-bar>

    <div class="float-left" v-if="book">
      <el-form
        ref="form"
        class="float-left"
        :model="article"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item prop="book_cid" label="章节">
          <div class="d-flex">
            <div>
              <el-select class="w-300px" v-model="article.book_cid">
                <el-option
                  v-for="(item, index) in chapters"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="ml-10">
              <p-link
                text="章节管理"
                p="addons.meedu_books.book_chapter.list"
                type="primary"
                @click="
                  $router.push({
                    name: 'MeedubookChapter',
                    query: { bid: book_id },
                  })
                "
              ></p-link>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="article.title"
            class="w-600px"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="上架时间" prop="published_at">
          <div class="d-flex">
            <div>
              <el-date-picker
                v-model="article.published_at"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="请选择日期"
                :picker-options="expireTimeOption"
              >
              </el-date-picker>
            </div>
            <div class="ml-10">
              <helper-text
                text="上架时间决定了电子书下文章的排序，时间越早越靠后。如果是未来时间，则需要等到时间到达用户才可以看到该篇文章。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="试看" prop="charge" v-if="book.charge > 0">
          <div class="d-flex">
            <div>
              <el-switch
                v-model="article.charge"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="ml-10">
              <helper-text
                text="开启试看的话未购买电子书用户可直接浏览该篇文章。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="显示" prop="is_show">
          <div class="d-flex">
            <div>
              <el-switch
                v-model="article.is_show"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="ml-10">
              <helper-text text="控制用户是否可以看到该篇文章。"></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item prop="render_content" label="文章内容">
          <div class="d-flex">
            <div>
              <mavon-editor class="w-700px" @change="getcontent"></mavon-editor>
            </div>
            <div class="ml-10">
              <helper-text
                text="为了更好的阅读体验，仅支持 Markdown 语法。"
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
import MavonEditor from "@/components/md-editor";

export default {
  components: {
    MavonEditor,
  },
  data() {
    return {
      book_id: this.$route.query.book_id,
      article: {
        bid: this.$route.query.book_id,
        published_at: null,
        is_show: 1,
        charge: 1,
        title: null,
        book_cid: null,
        original_content: null,
        render_content: null,
      },
      rules: {
        published_at: [
          {
            required: true,
            message: "上架时间不能为空",
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
      book: null,
    };
  },
  mounted() {
    this.params();
    this.getBook();
  },
  methods: {
    getcontent(pureContent, renderContent) {
      this.article.original_content = pureContent;
      this.article.render_content = renderContent;
    },
    params() {
      this.$api.Meedubook.Book.Article.Create().then((res) => {
        this.chapters = res.data.chapters[this.book_id];
      });
    },
    getBook() {
      this.$api.Meedubook.Book.Detail(this.book_id).then((res) => {
        this.book = res.data;
        if (this.book.charge > 0) {
          this.article.charge = 0;
        }
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
      this.$api.Meedubook.Book.Article.Store(this.article)
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