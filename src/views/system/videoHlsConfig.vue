<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="视频加密"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <template v-if="enabledAddons['AliyunHls'] === 1">
          <div class="title">阿里云HLS加密</div>
          <el-form-item :key="1595" label="Region">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-select
                  class="w-300px"
                  v-model="form.config['meedu.addons.AliyunHls.region']"
                >
                  <el-option
                    v-for="(item, index) in aliRegions"
                    :key="index"
                    :label="item.title"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span
                    >配置教程地址：https://www.yuque.com/meedu/lp8v5l/pe6vkb</span
                  >
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1596" label="模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.AliyunHls.template_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1597" label="AccessKeyId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.AliyunHls.access_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1598" label="AccessKeySecret">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.AliyunHls.access_secret']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1600" label="KmsKeyID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.AliyunHls.kms_key_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-if="enabledAddons['TencentCloudHls'] === 1">
          <div class="title">腾讯云HLS加密</div>
          <el-form-item :key="1601" label="腾讯云视频存储region">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-select
                  class="w-300px"
                  v-model="form.config['meedu.addons.TencentCloudHls.region']"
                >
                  <el-option
                    v-for="(item, index) in regions"
                    :key="index"
                    :label="item.title"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span
                    >配置教程：https://www.yuque.com/meedu/ww4uyo/umxey1</span
                  >
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1602" label="清晰度(多个请用英文逗号连接)">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-select
                  class="w-300px"
                  multiple
                  v-model="
                    form.config[
                      'meedu.addons.TencentCloudHls.transcode_definition'
                    ]
                  "
                >
                  <el-option
                    v-for="(item, index) in definition"
                    :key="index"
                    :label="item.title"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      key: "视频加密",
      config: null,
      loading: false,
      form: {
        config: {
          "meedu.addons.AliyunHls.region": null,
          "meedu.addons.AliyunHls.template_id": null,
          "meedu.addons.AliyunHls.access_key": null,
          "meedu.addons.AliyunHls.access_secret": null,
          "meedu.addons.AliyunHls.kms_region": null,
          "meedu.addons.AliyunHls.kms_key_id": null,
          "meedu.addons.TencentCloudHls.region": null,
          "meedu.addons.TencentCloudHls.transcode_definition": null,
        },
      },
      aliRegions: [
        {
          title: "华东2(上海)",
          key: "cn-shanghai",
        },
        {
          title: "华北2(北京)",
          key: "cn-beijing",
        },
        {
          title: "华南1(深圳)",
          key: "cn-shenzhen",
        },
      ],
      regions: [
        {
          title: "亚太东南(曼谷)",
          key: "ap-bangkok",
        },
        {
          title: "华北地区(北京)",
          key: "ap-beijing",
        },
        {
          title: "西南地区(成都)",
          key: "ap-chengdu",
        },
        {
          title: "西南地区(重庆)",
          key: "ap-chongqing",
        },
        {
          title: "华南地区(广州)",
          key: "ap-guangzhou",
        },
        {
          title: "港澳台地区(中国香港)",
          key: "ap-hongkong",
        },
        {
          title: "亚太南部(孟买)",
          key: "ap-mumbai",
        },
        {
          title: "亚太东北(首尔)",
          key: "ap-seoul",
        },
        {
          title: "华东地区(上海)",
          key: "ap-shanghai",
        },
        {
          title: "华东地区(上海金融)",
          key: "ap-shanghai-fsi",
        },
        {
          title: "华南地区(深圳金融)",
          key: "ap-shenzhen-fsi",
        },
        {
          title: "亚太东南(新加坡)",
          key: "ap-singapore",
        },
        {
          title: "亚太东北(东京)",
          key: "ap-tokyo",
        },
        {
          title: "欧洲地区(法兰克福)",
          key: "eu-frankfurt",
        },
        {
          title: "欧洲地区(莫斯科)",
          key: "eu-moscow",
        },
        {
          title: "美国东部(弗吉尼亚)",
          key: "na-ashburn",
        },
        {
          title: "美国西部(硅谷)",
          key: "na-siliconvalley",
        },
        {
          title: "北美地区(多伦多)",
          key: "na-toronto",
        },
      ],
      definition: [
        {
          title: "流畅",
          key: "210",
        },
        {
          title: "标清",
          key: "220",
        },
        {
          title: "高清",
          key: "230",
        },
        {
          title: "超清",
          key: "240",
        },
        {
          title: "2K",
          key: "270",
        },
        {
          title: "4K",
          key: "280",
        },
      ],
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
  },
  mounted() {
    if (this.enabledAddons) {
      this.getConfig();
    }
  },
  methods: {
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        if (this.enabledAddons["AliyunHls"] === 1) {
          let configData = res.data["阿里云HLS加密"];
          for (let index in configData) {
            if (configData[index].key === "meedu.addons.AliyunHls.region") {
              this.form.config["meedu.addons.AliyunHls.region"] =
                configData[index].value;
            } else if (
              configData[index].key === "meedu.addons.AliyunHls.template_id"
            ) {
              this.form.config["meedu.addons.AliyunHls.template_id"] =
                configData[index].value;
            } else if (
              configData[index].key === "meedu.addons.AliyunHls.access_key"
            ) {
              this.form.config["meedu.addons.AliyunHls.access_key"] =
                configData[index].value;
            } else if (
              configData[index].key === "meedu.addons.AliyunHls.access_secret"
            ) {
              this.form.config["meedu.addons.AliyunHls.access_secret"] =
                configData[index].value;
            } else if (
              configData[index].key === "meedu.addons.AliyunHls.kms_region"
            ) {
              this.form.config["meedu.addons.AliyunHls.kms_region"] =
                configData[index].value;
            } else if (
              configData[index].key === "meedu.addons.AliyunHls.kms_key_id"
            ) {
              this.form.config["meedu.addons.AliyunHls.kms_key_id"] =
                configData[index].value;
            }
          }
        }
        if (this.enabledAddons["TencentCloudHls"] === 1) {
          let configTenData = res.data["腾讯云HLS加密"];
          for (let index in configTenData) {
            if (
              configTenData[index].key === "meedu.addons.TencentCloudHls.region"
            ) {
              this.form.config["meedu.addons.TencentCloudHls.region"] =
                configTenData[index].value;
            } else if (
              configTenData[index].key ===
              "meedu.addons.TencentCloudHls.transcode_definition"
            ) {
              if (
                configTenData[index].value &&
                configTenData[index].value.length > 0
              ) {
                this.form.config[
                  "meedu.addons.TencentCloudHls.transcode_definition"
                ] = configTenData[index].value.split(",");
              }
            }
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
      if (
        this.form.config["meedu.addons.TencentCloudHls.transcode_definition"]
      ) {
        this.form.config["meedu.addons.TencentCloudHls.transcode_definition"] =
          this.form.config[
            "meedu.addons.TencentCloudHls.transcode_definition"
          ].join(",");
      }
      this.form.config["meedu.addons.AliyunHls.kms_region"] =
        this.form.config["meedu.addons.AliyunHls.region"];
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
