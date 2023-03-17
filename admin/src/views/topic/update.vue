<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑图文"></back-bar>

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

    <div class="float-left" v-if="topic">
      <el-form
        ref="form"
        class="float-left"
        :model="topic"
        :rules="rules"
        label-width="200px"
      >
        <div class="float-left" v-show="tab.active === 'base'">
          <el-form-item prop="cid" label="分类">
            <div class="d-flex">
              <div>
                <el-select v-model="topic.cid">
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
                  text="分类管理"
                  @click="
                    $router.push({
                      name: 'TopicCategory',
                    })
                  "
                  type="primary"
                  p="addons.meedu_topics.category.list"
                ></p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="标题" prop="title">
            <el-input
              v-model="topic.title"
              class="w-600px"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item prop="thumb" label="封面">
            <upload-image
              v-model="topic.thumb"
              width="200"
              height="150"
              helper="建议尺寸400x300 宽高比4:3"
            ></upload-image>
          </el-form-item>

          <el-form-item label="价格">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  placeholder="价格"
                  v-model="topic.charge"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text
                  text="最小单位：元。不支持小数。价格为0意味着文章免费可直接观看。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="VIP免费" v-if="topic.charge > 0">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="topic.is_vip_free"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text
                  text="开启VIP免费的话，购买VIP会员的学员可无需购买直接观看文章。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item
            prop="free_content"
            label="免费内容"
            v-if="topic.charge > 0"
          >
            <div class="d-flex w-800px">
              <mavon-editor
                v-if="topic.editor === 'MARKDOWN'"
                :height="500"
                :content="topic.free_content"
                @change="getfreecontent"
              ></mavon-editor>
              <quill-editor
                v-else
                :height="458"
                v-model="topic.free_content"
              ></quill-editor>
            </div>
          </el-form-item>

          <el-form-item
            prop="original_content"
            v-if="topic.charge > 0"
            label="付费内容"
          >
            <div class="d-flex w-800px">
              <mavon-editor
                v-if="topic.editor === 'MARKDOWN'"
                :content="topic.original_content"
                :height="500"
                @change="getcontent"
              ></mavon-editor>
              <quill-editor
                v-else
                v-model="topic.original_content"
                :height="458"
              ></quill-editor>
            </div>
          </el-form-item>
          <el-form-item prop="original_content" v-else label="文章内容">
            <div class="d-flex w-800px">
              <mavon-editor
                v-if="topic.editor === 'MARKDOWN'"
                :content="topic.original_content"
                :height="500"
                @change="getcontent"
              ></mavon-editor>
              <quill-editor
                v-else
                v-model="topic.original_content"
                :height="458"
              ></quill-editor>
            </div>
          </el-form-item>
        </div>

        <div class="float-left" v-show="tab.active === 'dev'">
          <el-form-item label="显示" prop="is_show">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="topic.is_show"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text text="控制文章是否可以被学员看到。"></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="排序" prop="sorted_at">
            <div class="d-flex">
              <div>
                <el-date-picker
                  v-model="topic.sorted_at"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </div>
              <div class="ml-10">
                <helper-text
                  text="控制文章在学员端的显示顺序，时间越早越靠后"
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
import MavonEditor from "@/components/md-editor";
import QuillEditor from "@/components/quill-editor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    MavonEditor,
    QuillEditor,
    UploadImage,
  },
  data() {
    return {
      id: this.$route.query.id,
      topic: null,
      rules: {
        cid: [
          {
            required: true,
            message: "分类不能为空",
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
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur",
          },
        ],
        original_content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
      },
      chapters: [],
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
    this.getDetail();
  },
  methods: {
    getcontent(pureContent, renderContent) {
      this.topic.original_content = pureContent;
      this.topic.render_content = renderContent;
    },
    getfreecontent(pureContent, renderContent) {
      this.topic.free_content = pureContent;
      this.topic.free_content_render = renderContent;
    },
    params() {
      this.$api.Course.Topic.Topic.Create().then((res) => {
        this.chapters = res.data;
      });
    },
    getDetail() {
      this.$api.Course.Topic.Topic.Detail(this.id).then((res) => {
        this.topic = res.data;
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
      if (this.topic.editor !== "MARKDOWN") {
        this.topic.render_content = this.topic.original_content;
        this.topic.free_content_render = this.topic.free_content;
      }
      this.$api.Course.Topic.Topic.Update(this.id, this.topic)
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
