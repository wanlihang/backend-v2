<template>
  <div class="config-box" v-loading="loading">
    <div class="options">
      <div class="body">
        <el-select
          v-model="activeItem"
          placeholder="请选择需要配置的栏目"
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in groups"
            :key="index"
            :label="item.name"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="extra">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>

    <div class="config-body" v-if="config">
      <template v-for="c in config[activeItem]">
        <div class="config-item" :key="c.id">
          <div class="label-name">{{ c.name }}</div>
          <div class="input-box">
            <!-- 单行文本输入框 -->
            <el-input
              v-if="c.field_type === 'text'"
              v-model="c.value"
            ></el-input>
            <!-- 数字输入框 -->
            <el-input
              v-else-if="c.field_type === 'number'"
              v-model="c.value"
            ></el-input>
            <!-- 多行文本输入框 -->
            <el-input
              v-else-if="c.field_type === 'textarea'"
              type="textarea"
              :rows="3"
              v-model="c.value"
            >
            </el-input>
            <!-- 富文本输入框 -->
            <wang-editor
              v-model="c.value"
              v-else-if="c.field_type === 'longtext'"
            ></wang-editor>
            <!-- 图片上传 -->
            <upload-image
              v-model="c.value"
              :name="c.name"
              v-else-if="c.field_type === 'image'"
            ></upload-image>

            <!-- 开关 -->
            <el-switch
              v-else-if="c.field_type === 'switch'"
              v-model="c.value"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>

            <!-- 选择 -->
            <el-select
              class="w-300px"
              v-model="c.value"
              v-else-if="c.field_type === 'select'"
            >
              <el-option
                v-for="(item, index) in c.option_value"
                :key="index"
                :label="item.title"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </div>
          <div class="helper-box" v-if="c.help">
            {{ c.help }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import WangEditor from "@/components/wangeditor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    WangEditor,
    UploadImage,
  },
  data() {
    return {
      activeItem: "系统",
      config: null,
      loading: false,
    };
  },
  computed: {
    groups() {
      if (!this.config) {
        return [];
      }
      let groups = [];
      for (var i in this.config) {
        groups.push({
          name: i,
          key: i,
        });
      }
      return groups;
    },
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
        let configData = res.data;

        // select数据修饰下
        for (let index in configData) {
          for (let index2 in configData[index]) {
            let item = configData[index][index2];

            if (item.field_type === "select") {
              for (let i = 0; i < item.option_value.length; i++) {
                configData[index][index2].option_value[i].key += "";
              }
            }
          }
        }

        this.config = configData;

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
      let data = {};
      for (let index in this.config) {
        for (let index2 in this.config[index]) {
          let item = this.config[index][index2];
          data[item.key] = item.value;
        }
      }
      this.$api.System.Config.Save({ config: data }).then(() => {
        this.$message.success(this.$t("common.success"));
        this.loading = false;

        this.getConfig();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.config-box {
  width: 100%;
  height: auto;
  float: left;
  border: 1px solid rgb(227, 227, 227);
  border-radius: 3px;

  .options {
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding: 15px;
    background-color: rgb(243, 245, 247);
    color: #333;

    .body {
      flex: 1;
    }

    .extra {
      width: auto;
      margin-left: 15px;
    }
  }

  .config-body {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 30px;

    .config-item {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      padding: 10px 30px;

      .label-name {
        width: 100%;
        height: auto;
        float: left;
        font-size: 14px;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 10px;
      }

      .input-box {
        width: 100%;
        height: auto;
        float: left;
        margin-bottom: 15px;
      }

      .helper-box {
        width: 100%;
        height: auto;
        float: left;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.3);
        font-weight: normal;
      }
    }
  }
}
</style>