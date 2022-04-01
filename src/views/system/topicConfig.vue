<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="图文推荐"></back-bar>
    <div class="float-left">
      <div class="d-flex mb-30">
        <div>
          <el-button @click="addCourse" type="primary"> 添加推荐 </el-button>
        </div>
        <div class="ml-10">
          <helper-text
            text="添加推荐的图文会在PC端图文列表右侧悬浮展示"
          ></helper-text>
        </div>
      </div>
      <div
        class="float-left thumb-box"
        v-if="selected && list && list.length > 0"
      >
        <div class="item" v-for="(item, index) in list" :key="item.id">
          <div class="btn-del" @click.stop="delCourse(index)">
            <close-icon></close-icon>
          </div>
          <thumb-bar
            :value="item.thumb"
            :width="80"
            :height="60"
            :border="4"
          ></thumb-bar>
        </div>
      </div>
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
    <select-topic
      :key="form.config['meedu.addons.meedu_topics.pc_list_page_rec_ids']"
      :show="showTopicWin"
      :selected="selected"
      @close="showTopicWin = false"
      @change="vodChange"
    ></select-topic>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SelectTopic from "@/components/select-multi-topic";
import CloseIcon from "@/components/close-icon";
export default {
  components: {
    SelectTopic,
    CloseIcon,
  },
  data() {
    return {
      key: "图文",
      config: null,
      loading: false,
      showTopicWin: false,
      form: {
        config: {
          "meedu.addons.meedu_topics.pc_list_page_rec_ids": null,
        },
      },
      pagination: {
        page: 1,
        size: 100000,
      },
      list: null,
      selected: null,
      courses: [],
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
    getCourse() {
      this.$api.Course.Topic.Topic.List(this.pagination).then((res) => {
        let list = res.data.data.data;
        this.courses = list;
        this.checkThumbox();
      });
    },
    checkThumbox() {
      let newbox = [];
      if (this.selected) {
        for (var i = 0; i < this.selected.length; i++) {
          let it = this.courses.find(
            (o) => o.id === parseInt(this.selected[i])
          );
          if (it) {
            newbox.push(it);
          }
        }
      }
      this.list = newbox;
    },
    addCourse() {
      this.showTopicWin = true;
    },
    delCourse(index) {
      this.list.splice(index, 1);
      this.selected.splice(index, 1);
      this.form.config["meedu.addons.meedu_topics.pc_list_page_rec_ids"] =
        this.selected.join(",");
    },
    vodChange(vodCourse) {
      this.selected = this.selected.concat(vodCourse);
      this.form.config["meedu.addons.meedu_topics.pc_list_page_rec_ids"] =
        this.selected.join(",");
      this.showTopicWin = false;
      this.checkThumbox();
    },
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        let configData = res.data["图文"];
        for (let index in configData) {
          if (
            configData[index].key ===
            "meedu.addons.meedu_topics.pc_list_page_rec_ids"
          ) {
            this.form.config["meedu.addons.meedu_topics.pc_list_page_rec_ids"] =
              configData[index].value;
            if (configData[index].value && configData[index].value.length > 0) {
              this.selected = configData[index].value.split(",").map(Number);
            }
          }
        }
        setTimeout(() => {
          this.loading = false;
          this.getCourse();
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
.thumb-box {
  width: 936px;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .item {
    width: 80px;
    height: 60px;
    position: relative;
    margin-right: 37px;
    margin-bottom: 37px;
    .btn-del {
      position: absolute;
      right: -7.5px;
      top: -7.5px;
    }
  }
}
</style>
