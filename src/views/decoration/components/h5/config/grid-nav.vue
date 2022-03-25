<template>
  <div class="grid-nav-box" v-if="config">
    <div class="title">
      <div class="text">宫格导航</div>
    </div>
    <div class="config-item">
      <div class="config-item-title">排列样式</div>
      <div class="config-body">
        <div class="float-left d-flex">
          <div class="form-label">每行显示个数</div>
          <div class="ml-30">
            <el-radio v-model="config.line_count" :label="4">4个</el-radio>
            <el-radio v-model="config.line_count" class="ml-15" :label="5">
              5个
            </el-radio>
          </div>
        </div>
      </div>
    </div>
    <div class="config-item">
      <div class="config-item-title">导航内容</div>
      <div class="config-body">
        <template v-for="(item, index) in config.items">
          <div class="nav-item" :key="index">
            <div class="btn-del" @click="delNav(index)">
              <close-icon></close-icon>
            </div>
            <div class="nav-icon" @click="selectIcon(index)">
              <img v-if="item.src" :src="item.src" width="60" height="60" />
              <img
                v-else
                src="@/assets/images/decoration/h5/default-grid-nav.png"
                width="60"
                height="60"
              />
            </div>
            <div class="nav-body">
              <div class="float-left d-flex">
                <div class="form-label">标题</div>
                <div class="ml-15">
                  <el-input class="w-100px" v-model="item.name"></el-input>
                </div>
              </div>
              <div class="float-left d-flex mt-15">
                <div class="form-label">链接</div>
                <div class="ml-15 flex-1">
                  <el-input class="w-100px" v-model="item.href"></el-input>
                </div>
                <div class="ml-10">
                  <el-link
                    type="primary"
                    style="font-size: 12px"
                    @click="selectLink(index)"
                    >选择链接</el-link
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="float-left mt-15">
      <div class="float-left">
        <el-button class="w-100" @click="addNav"> 添加导航 </el-button>
      </div>
    </div>

    <div class="float-left footer-button">
      <el-button type="primary" class="w-100" :loading="loading" @click="save">
        保存
      </el-button>
    </div>

    <select-image
      :show="showSelectImageWin"
      :from="1"
      @close="showSelectImageWin = false"
      @selected="uploadImage"
    ></select-image>

    <h5-link
      @change="linkChange"
      @close="showLinkWin = false"
      :show="showLinkWin"
    ></h5-link>
  </div>
</template>
<script>
import SelectImage from "@/components/select-image";
import CloseIcon from "@/components/close-icon";
import H5Link from "@/components/h5-link";

export default {
  components: {
    SelectImage,
    CloseIcon,
    H5Link,
  },
  props: ["block"],
  data() {
    return {
      config: null,
      showSelectImageWin: false,
      showLinkWin: false,
      curImageIndex: null,
      curLinkIndex: null,
      loading: false,
    };
  },
  computed: {
    lineCount() {
      if (!this.config) {
        return 0;
      }
      return Math.ceil(this.config.items.length / this.config.line_count);
    },
  },
  mounted() {
    this.config = this.block.config_render;
  },
  methods: {
    addNav() {
      this.config.items.push({
        name: null,
        href: null,
        icon: null,
      });
    },
    delNav(index) {
      this.curImageIndex = null;
      this.curLinkIndex = null;
      this.config.items.splice(index, 1);
    },
    save() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.ViewBlock.Update(this.block.id, {
        sort: this.block.sort,
        config: this.config,
      })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.$emit("update");
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    linkChange(link) {
      if (this.curLinkIndex === null) {
        return;
      }
      this.config.items[this.curLinkIndex].href = link;
      this.showLinkWin = false;
    },
    selectLink(index) {
      this.curLinkIndex = index;
      this.showLinkWin = true;
    },
    selectIcon(index) {
      this.curImageIndex = index;
      this.showSelectImageWin = true;
    },
    uploadImage(src) {
      if (this.curImageIndex === null) {
        return;
      }
      this.config.items[this.curImageIndex].src = src;
      this.showSelectImageWin = false;
    },
  },
};
</script>

<style lang="less" scoped>
.w-100px {
  width: 100px;
}
.grid-nav-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 60px;

  .footer-button {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 400px;
    height: 70px;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: 15px 30px;
  }

  .title {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    border-left: 5px solid #3ca7fa;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
    margin-bottom: 30px;
  }

  .config-item {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding-top: 30px;
    padding-bottom: 30px;
    border-top: 1px solid #f1f2f9;

    .config-item-title {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      line-height: 14px;
      padding-bottom: 30px;
    }

    .config-body {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;

      .form-label {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
      }

      .nav-item {
        position: relative;
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0px 4px 8px 0px rgba(102, 102, 102, 0.15);
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        &:last-child {
          margin-bottom: 0;
        }

        .btn-del {
          position: absolute;
          top: -17px;
          right: -17px;
        }

        .nav-icon {
          margin-right: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
