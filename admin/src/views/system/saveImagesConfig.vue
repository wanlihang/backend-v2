<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="图片存储"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <el-form-item :key="36" label="图片存储驱动">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-select
                class="w-300px"
                v-model="form.config['meedu.upload.image.disk']"
              >
                <el-option
                  v-for="(item, index) in selects"
                  :key="index"
                  :label="item.title"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <template v-if="form.config['meedu.upload.image.disk'] === 'oss'">
          <el-form-item :key="42" label="阿里云OSS AccessKeyId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.oss.access_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="43" label="阿里云OSS AccessKeySecret">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.oss.access_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="44" label="阿里云OSS Bucket">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.oss.bucket']"
                ></el-input>
              </div>
            </div>
          </el-form-item>

          <el-form-item :key="45" label="阿里云OSS Endpoint">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.oss.endpoint']"
                ></el-input>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span>必须配置，否则无法上传图片</span>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="46" label="阿里云OSS CDN加速域名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.oss.cdnDomain']"
                ></el-input>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span>必须配置，否则无法上传图片</span>
                </div>
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-else-if="form.config['meedu.upload.image.disk'] === 'cos'">
          <el-form-item :key="1886" label="腾讯云COS Region">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.cos.region']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1887" label="腾讯云COS AppId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['filesystems.disks.cos.credentials.appId']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1888" label="腾讯云COS SecretId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['filesystems.disks.cos.credentials.secretId']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1889" label="腾讯云COS SecretKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['filesystems.disks.cos.credentials.secretKey']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1890" label="腾讯云COS Bucket">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.cos.bucket']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1891" label="腾讯云COS CDN域名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.cos.cdn']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </template>
        <template
          v-else-if="form.config['meedu.upload.image.disk'] === 'qiniu'"
        >
          <el-form-item :key="37" label="七牛访问域名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['filesystems.disks.qiniu.domains.default']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="38" label="七牛访问域名(https)">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.qiniu.domains.https']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="39" label="七牛AccessKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.qiniu.access_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="40" label="七牛SecretKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.qiniu.secret_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="41" label="七牛Bucket">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['filesystems.disks.qiniu.bucket']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </template>
      </el-form>
      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button @click="save" :loading="loading" type="primary"
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
export default {
  data() {
    return {
      key: "图片存储",
      config: null,
      loading: false,
      selects: [
        {
          key: "public",
          title: "本地",
        },
        {
          key: "oss",
          title: "阿里云OSS",
        },
        {
          key: "cos",
          title: "腾讯云COS",
        },
        {
          key: "qiniu",
          title: "七牛云",
        },
      ],
      form: {
        config: {
          "meedu.upload.image.disk": null,
          "filesystems.disks.qiniu.domains.default": null,
          "filesystems.disks.qiniu.domains.https": null,
          "filesystems.disks.qiniu.access_key": null,
          "filesystems.disks.qiniu.secret_key": null,
          "filesystems.disks.qiniu.bucket": null,
          "filesystems.disks.oss.access_id": null,
          "filesystems.disks.oss.access_key": null,
          "filesystems.disks.oss.bucket": null,
          "filesystems.disks.oss.endpoint": null,
          "filesystems.disks.oss.cdnDomain": null,
          "filesystems.disks.cos.region": null,
          "filesystems.disks.cos.credentials.appId": null,
          "filesystems.disks.cos.credentials.secretId": null,
          "filesystems.disks.cos.credentials.secretKey": null,
          "filesystems.disks.cos.bucket": null,
          "filesystems.disks.cos.cdn": null,
        },
      },
    };
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        let configData = res.data["图片存储"];
        for (let index in configData) {
          if (configData[index].key === "meedu.upload.image.disk") {
            this.form.config["meedu.upload.image.disk"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.qiniu.domains.default"
          ) {
            this.form.config["filesystems.disks.qiniu.domains.default"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.qiniu.domains.https"
          ) {
            this.form.config["filesystems.disks.qiniu.domains.https"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.qiniu.access_key"
          ) {
            this.form.config["filesystems.disks.qiniu.access_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.qiniu.secret_key"
          ) {
            this.form.config["filesystems.disks.qiniu.secret_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.qiniu.bucket"
          ) {
            this.form.config["filesystems.disks.qiniu.bucket"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.oss.access_id"
          ) {
            this.form.config["filesystems.disks.oss.access_id"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.oss.access_key"
          ) {
            this.form.config["filesystems.disks.oss.access_key"] =
              configData[index].value;
          } else if (configData[index].key === "filesystems.disks.oss.bucket") {
            this.form.config["filesystems.disks.oss.bucket"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.oss.endpoint"
          ) {
            this.form.config["filesystems.disks.oss.endpoint"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.oss.cdnDomain"
          ) {
            this.form.config["filesystems.disks.oss.cdnDomain"] =
              configData[index].value;
          } else if (configData[index].key === "filesystems.disks.cos.region") {
            this.form.config["filesystems.disks.cos.region"] =
              configData[index].value;
          } else if (
            configData[index].key === "filesystems.disks.cos.credentials.appId"
          ) {
            this.form.config["filesystems.disks.cos.credentials.appId"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "filesystems.disks.cos.credentials.secretId"
          ) {
            this.form.config["filesystems.disks.cos.credentials.secretId"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "filesystems.disks.cos.credentials.secretKey"
          ) {
            this.form.config["filesystems.disks.cos.credentials.secretKey"] =
              configData[index].value;
          } else if (configData[index].key === "filesystems.disks.cos.bucket") {
            this.form.config["filesystems.disks.cos.bucket"] =
              configData[index].value;
          } else if (configData[index].key === "filesystems.disks.cos.cdn") {
            this.form.config["filesystems.disks.cos.cdn"] =
              configData[index].value;
          }
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    save() {
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.$api.System.Config.Save(this.form).then(() => {
        this.$message.success(this.$t("common.success"));
        this.loading = false;

        this.getConfig();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 30px !important;
}
.meedu-main-body {
  width: 100%;
}
.title {
  width: 100%;
  height: 16px;
  border-left: 4px solid #3ca7fa;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: #333333;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
