<template>
  <div class="vod-v1-box float-left">
    <div class="title">
      <div class="text">幻灯片</div>
      <div class="desc">图片宽高比3:1 推荐尺寸1200x400</div>
    </div>

    <div class="sliders-box mb-15">
      <div class="slider-item" v-for="(item, index) in sliders" :key="index">
        <div class="btn-del" @click="delSlider(index)">
          <close-icon></close-icon>
        </div>
        <div class="img" @click="changeImage(index)">
          <img v-if="item.src" :src="item.src" width="345" height="115" />
          <img
            v-else
            src="@/assets/images/decoration/h5/default-slider.png"
            width="345"
            height="115"
          />
        </div>
        <div class="link">
          <div class="label">链接</div>
          <div class="value">
            <el-input v-model="item.href" class="w-100"></el-input>
          </div>
          <div class="option ml-15">
            <el-link type="primary" @click="selectLink(index)"
              >选择链接</el-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="float-left mt-15">
      <div class="float-left">
        <el-button class="w-100" @click="addSlider"> 添加幻灯片 </el-button>
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
      showSelectImageWin: false,
      showLinkWin: false,
      sliders: [],
      curIndex: null,
      curLinkIndex: null,
      loading: false,
    };
  },
  mounted() {
    this.sliders = this.block.config_render;
  },
  methods: {
    addSlider() {
      this.sliders.push({
        src: null,
        link: null,
      });

      this.curIndex = this.sliders.length - 1;

      this.showSelectImageWin = true;
    },
    uploadImage(src) {
      if (this.curIndex === null) {
        return;
      }
      this.sliders[this.curIndex].src = src;
      this.showSelectImageWin = false;
    },
    changeImage(index) {
      this.curIndex = index;
      this.showSelectImageWin = true;
    },
    delSlider(index) {
      this.curIndex = null;
      this.curLinkIndex = null;
      this.sliders.splice(index, 1);
    },
    save() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.ViewBlock.Update(this.block.id, {
        sort: this.block.sort,
        config: this.sliders,
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
      this.sliders[this.curLinkIndex].href = link;
      this.showLinkWin = false;
    },
    selectLink(index) {
      this.curLinkIndex = index;
      this.showLinkWin = true;
    },
  },
};
</script>

<style lang="less" scoped>
.vod-v1-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 40px;

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
}
.title {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  border-left: 5px solid #3ca7fa;
  padding-left: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  .text {
    width: auto;
    margin-right: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
  }
  .desc {
    flex: 1;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 12px;
  }
}

.sliders-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;

  .slider-item {
    position: relative;
    width: 100%;
    height: auto;
    float: left;
    margin-bottom: 30px;

    .btn-del {
      position: absolute;
      top: -17px;
      right: -17px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .img {
      width: 100%;
      height: auto;
      float: left;
      margin-bottom: 15px;
      cursor: pointer;
    }

    .link {
      width: 100%;
      height: auto;
      float: left;
      display: flex;
      align-items: center;

      .label {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
        margin-right: 15px;
      }

      .value {
        flex: 1;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .options {
        width: auto;
        margin-left: 10px;
      }
    }
  }
}
</style>
