<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑录播视频"></back-bar>

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

    <div class="float-left" v-if="course && video">
      <el-form ref="form" :model="video" :rules="rules" label-width="200px">
        <div class="float-left" v-show="tab.active === 'base'">
          <el-form-item label="视频">
            <el-button type="primary" @click="showUploadVideoWin = true">
              <span>重新上传视频</span>
              <span class="ml-10" v-if="tit">{{ tit }}</span>
            </el-button>
          </el-form-item>

          <el-form-item label="所属章节">
            <div class="d-flex">
              <div>
                <el-select
                  class="w-300px"
                  filterable
                  clearable
                  v-model="video.chapter_id"
                >
                  <el-option
                    v-for="(item, index) in chapters"
                    :key="index"
                    :label="item.title"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="ml-10">
                <p-link
                  text="章节管理"
                  p="course_chapter"
                  @click="
                    $router.push({
                      name: 'CourseChapters',
                      query: { course_id: course_id },
                    })
                  "
                  type="primary"
                ></p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="视频名" prop="title">
            <el-input
              v-model="video.title"
              class="w-600px"
              placeholder="请输入视频名"
            ></el-input>
          </el-form-item>

          <el-form-item label="上架时间" prop="published_at">
            <div class="d-flex">
              <div>
                <el-date-picker
                  class="w-200px"
                  v-model="video.published_at"
                  type="datetime"
                  align="right"
                  placeholder="请选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </div>
              <div class="ml-10">
                <helper-text
                  text="上架时间决定了录播课程下视频排名，时间越早越靠后。上架时间如果是未来时间，则需等到时间到达后学员才可查看。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="价格" prop="charge" v-if="course.is_free !== 1">
            <div class="d-flex">
              <div>
                <el-input
                  v-model="video.charge"
                  class="w-200px"
                  placeholder="请输入整数"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text
                  text="最小单位：元。不支持小数。价格为0的话意味着该视频可以免费观看。价格大于0则需要学员购买视频/购买课程之后才能观看。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="视频时长" prop="duration">
            <div class="d-flex">
              <div>
                <input-duration
                  :disabled="false"
                  v-model="video.duration"
                ></input-duration>
              </div>
              <div class="ml-10">
                <helper-text
                  text="视频时长必须准确无误，否则影响学员观看进度的计算。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item
            label="试看"
            prop="free_seconds"
            v-if="course.is_free !== 1 && video.charge > 0"
          >
            <div class="d-flex">
              <div>
                <el-input-number
                  v-model="video.free_seconds"
                  :min="0"
                  label="秒"
                  size="small"
                ></el-input-number>
              </div>
              <div class="ml-10">
                <div class="helper-text">秒</div>
              </div>
              <div class="ml-15">
                <helper-text
                  text="如果学员未购买课程将可以观看当前配置的秒数，从视频开头计算。配置为0即为无法试看。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>
        </div>

        <div class="float-left" v-show="tab.active === 'dev'">
          <el-form-item
            label="禁止购买"
            prop="is_ban_sell"
            v-if="course.is_free !== 1"
          >
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="video.is_ban_sell"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text
                  text="该字段控制学员是否可以直接购买该视频。如果禁止购买，那么学员观看该视频的话则必须先购买该视频所属录播课程。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="显示" prop="is_show">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="video.is_show"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text
                  text="该字段控制学员是否可以看到该视频。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="禁止快进" prop="ban_drag">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="video.ban_drag"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text
                  text="该字段控制学员播放该视频时是否可以快进播放。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="阿里云视频文件ID" prop="aliyun_video_id">
            <el-input
              v-model="video.aliyun_video_id"
              class="w-300px"
              placeholder="阿里云视频文件ID"
            ></el-input>
          </el-form-item>

          <el-form-item label="腾讯云视频文件ID" prop="tencent_video_id">
            <el-input
              v-model="video.tencent_video_id"
              class="w-300px"
              placeholder="腾讯云视频文件ID"
            ></el-input>
          </el-form-item>

          <el-form-item label="视频URL" prop="url">
            <el-input
              v-model="video.url"
              class="w-300px"
              placeholder="视频URL"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()">取消</el-button>
        </div>
      </div>
    </div>

    <upload-video
      :show="showUploadVideoWin"
      @close="showUploadVideoWin = false"
      @change="uploadVideoChange"
    ></upload-video>
  </div>
</template>
<script>
import InputDuration from "@/components/input-duration";
import UploadVideo from "@/components/upload-video";

export default {
  components: {
    InputDuration,
    UploadVideo,
  },
  data() {
    return {
      showUploadVideoWin: false,
      course_id: this.$route.query.course_id,
      video_id: this.$route.query.id,
      course: null,
      video: null,
      tit: null,
      chapters: [],
      rules: {
        title: [
          {
            required: true,
            message: "视频名不能为空",
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
        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        duration: [
          {
            required: true,
            message: "视频时长不能为空",
            trigger: "blur",
          },
        ],
        free_seconds: [
          {
            required: true,
            message: "试看秒数不能为空",
            trigger: "blur",
          },
        ],
      },
      comments: [
        {
          id: 0,
          name: "关闭评论",
        },
        {
          id: 1,
          name: "所有人均可评论",
        },
        {
          id: 2,
          name: "购买后可评论",
        },
      ],
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
    this.getCreateParams();
    this.getCourse();
    this.getVideo();
  },
  methods: {
    getCreateParams() {
      this.$api.Course.Vod.Videos.Create(this.course_id).then((res) => {
        this.chapters = res.data.chapters;
      });
    },
    getVideo() {
      this.$api.Course.Vod.Videos.Detail(this.video_id).then((res) => {
        this.video = res.data.video;
        if (this.video.chapter_id === 0) {
          this.video.chapter_id = null;
        }
      });
    },
    getCourse() {
      this.$api.Course.Vod.Detail(this.course_id).then((res) => {
        this.course = res.data;
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
      this.$api.Course.Vod.Videos.Update(this.video_id, this.video)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.back();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    uploadVideoChange(video) {
      this.video.duration = video.duration;
      // this.video.title = video.title;
      this.tit = video.title;

      if (video.storage_driver === "aliyun") {
        this.video.aliyun_video_id = video.storage_file_id;
        this.video.tencent_video_id = null;
        this.video.url = null;
      } else if (video.storage_driver === "tencent") {
        this.video.tencent_video_id = video.storage_file_id;
        this.video.aliyun_video_id = null;
        this.video.url = null;
      }

      this.showUploadVideoWin = false;
    },
  },
};
</script>
