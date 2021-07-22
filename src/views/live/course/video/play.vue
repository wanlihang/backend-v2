<template>
  <div class="meedu-main-body" v-if="video">
    <div class="float-left">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="直播内容">
          <span>{{ video.title }}</span>
        </el-form-item>

        <el-form-item label="直播服务商" prop="service">
          <el-select
            :disabled="!(video.service === null || video.service.length === 0)"
            v-model="form.service"
          >
            <el-option
              v-for="(item, index) in services"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <template v-if="push_url">
          <el-form-item label="推流地址">
            <el-input
              placeholder="推流地址"
              class="w-600px"
              v-model="push_url"
            ></el-input>
          </el-form-item>

          <el-form-item label="OBS服务器">
            <el-input
              placeholder="OBS服务器"
              class="w-600px"
              v-model="obs.server"
            ></el-input>
          </el-form-item>

          <el-form-item label="OBS串流秘钥">
            <el-input
              placeholder="推流地址"
              class="w-600px"
              v-model="obs.token"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button
            @click="formValidate"
            :loading="loading"
            type="primary"
            v-if="!video.service"
          >
            开始直播
          </el-button>
          <el-button @click="stop" :loading="loading" type="primary" v-else>
            停止直播
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()"> 取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video_id: this.$route.query.video_id,
      video: null,
      loading: false,
      push_url: null,
      form: {
        service: null,
      },
      services: [
        {
          name: "腾讯云",
          id: "tencent",
        },
        {
          name: "阿里云",
          id: "aliyun",
        },
      ],
      obs: {
        server: null,
        token: null,
      },
      rules: {
        service: [
          {
            required: true,
            message: "请选择直播服务商",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.Course.Live.Course.Video.Detail(this.video_id).then((res) => {
        this.video = res.data;

        let service = res.data.service;
        if (!service) {
          service = null;
        }

        this.form.service = service;

        if (this.form.service) {
          this.submit();
        }
      });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    submit() {
      this.loading = true;
      this.$api.Course.Live.Course.Video.Play({
        video_id: this.video_id,
        service: this.form.service,
      })
        .then((res) => {
          // 推流地址
          this.push_url = res.data.push_url;

          // OBS推流地址解析
          let obs = this.push_url.split("/");
          for (let i = 0; i < obs.length; i++) {
            if (i === obs.length - 1) {
              this.obs.token = obs[i];
            } else {
              this.obs.server = this.obs.server + obs[i] + "/";
            }
          }

          this.video.service = this.form.service;

          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    stop() {
      this.loading = true;
      this.$api.Course.Live.Course.Video.Stop({
        video_id: this.video_id,
        service: this.form.service,
      })
        .then(() => {
          this.loading = false;
          this.$message.success("已停止直播");
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