<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建课程视频"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="video" :rules="rules" label-width="200px">
        <el-form-item label="视频名" prop="title">
          <el-input v-model="video.title" class="w-100"></el-input>
        </el-form-item>
        <el-form-item label="上架时间" prop="published_at">
          <form-label
            style="margin-left: -12px"
            helper="该字段决定前台视频排序，时间越早越靠前"
          ></form-label>

          <el-date-picker
            class="w-200px"
            v-model="video.published_at"
            type="datetime"
            align="right"
            placeholder="请选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="章节">
          <el-select v-model="video.chapter_id" class="w-100">
            <el-option
              v-for="(item, index) in chapters"
              :key="index"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="charge">
          <el-input
            type="number"
            v-model="video.charge"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="禁止购买" prop="is_ban_sell">
          <el-switch
            v-model="video.is_ban_sell"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="显示" prop="is_show">
          <el-switch
            v-model="video.is_show"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="禁止快进" prop="ban_drag">
          <el-switch
            v-model="video.ban_drag"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="上传视频" prop="tencent_video_id">
          <upload-video
            name="上传视频"
            helper="请上传MP4格式视频"
            v-model="video.tencent_video_id"
          ></upload-video>
        </el-form-item>
        <el-form-item label="视频时长" prop="duration">
          <el-input type="number" v-model="hour" style="width: 80px"></el-input
          >时
          <el-input type="number" v-model="min" style="width: 80px"></el-input
          >分
          <el-input
            type="number"
            v-model="second"
            style="width: 80px"
          ></el-input
          >秒
        </el-form-item>
        <el-form-item label="试看时长" prop="free_seconds">
          <el-input
            type="number"
            v-model="r_hour"
            style="width: 80px"
          ></el-input
          >时
          <el-input type="number" v-model="r_min" style="width: 80px"></el-input
          >分
          <el-input
            type="number"
            v-model="r_second"
            style="width: 80px"
          ></el-input
          >秒
        </el-form-item>
        <el-form-item label="评论开关" prop="comment_status">
          <el-select v-model="video.comment_status">
            <el-option
              v-for="(item, index) in comments"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SEO描述">
          <el-input
            class="w-100"
            type="textarea"
            v-model="video.seo_description"
            placeholder="SEO描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="SEO关键字">
          <el-input
            class="w-100"
            type="textarea"
            v-model="video.seo_keywords"
            placeholder="SEO关键字"
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
                name: 'CourseVideos',
                query: { course_id: video.course_id },
              })
            "
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UploadVideo from "@/components/upload-video";

export default {
  components: {
    UploadVideo,
  },
  data() {
    return {
      video: {
        course_id: this.$route.query.course_id,
        published_at: null,
        aliyun_video_id: "",
        sort: null,
        title: null,
        charge: 0,
        comment_status: 2,
        is_show: 1,
        is_ban_sell: 1,
        ban_drag: 0,
        chapter_id: null,
        duration: this.hour * 3600 + this.min * 60 + this.second,
        free_seconds: this.r_hour * 3600 + this.r_min * 60 + this.r_second,
        description: "",
        short_description: "",
        tencent_video_id: "",
        player_h5: "xg",
        url: "",
        player_pc: "xg",
        seo_description: "",
        seo_keywords: "",
      },
      box: {
        course_id: this.$route.query.course_id,
      },
      hour: 0,
      min: 0,
      second: 0,
      r_hour: 0,
      r_min: 0,
      r_second: 0,
      chapters: [],
      rules: {
        sort: [
          {
            required: true,
            message: "升序不能为空",
            trigger: "blur",
          },
        ],
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
        is_show: [
          {
            required: true,
            message: "请选择是否显示",
            trigger: "blur",
          },
        ],
        is_ban_sell: [
          {
            required: true,
            message: "请选择是否禁止购买",
            trigger: "blur",
          },
        ],
        ban_drag: [
          {
            required: true,
            message: "请选择是否禁止快进",
            trigger: "blur",
          },
        ],
        time: [
          {
            required: true,
            message: "视频时长不能为空",
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
          name: "订阅后可评论",
        },
      ],
      loading: false,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.$api.Course.Vod.Videos.Create(this.video.course_id, this.box)
        .then((res) => {
          this.chapters = res.data.chapters;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
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
      this.$api.Course.Vod.videos
        .Store(this.video)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({
            name: "Coursevideos",
            query: { course_id: this.video.course_id },
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