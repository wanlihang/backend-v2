<template>
  <div class="bg" v-loading="loading">
    <div class="top-box">
      <div class="btn-back" @click="$router.back()">
        <i class="el-icon-back"></i>
        返回
      </div>
      <div class="line"></div>
      <div class="name">电脑端首页</div>
    </div>

    <div class="main-body">
      <div class="blocks-box">
        <div class="title">拖动添加板块</div>
        <draggable
          class="blocks"
          :sort="false"
          :group="{ name: 'blocks', pull: 'clone', put: false }"
        >
          <div class="block-item" sign="h5-vod-v1">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-vod-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">点播</div>
            </div>
          </div>

          <div
            class="block-item"
            sign="h5-live-v1"
            v-if="enabledAddons['Zhibo']"
          >
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-live-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">直播</div>
            </div>
          </div>

          <div
            class="block-item"
            sign="h5-book-v1"
            v-if="enabledAddons['MeeduBooks']"
          >
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-book-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">电子书</div>
            </div>
          </div>

          <div
            class="block-item"
            sign="h5-topic-v1"
            v-if="enabledAddons['MeeduTopics']"
          >
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-topic-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">图文</div>
            </div>
          </div>

          <div
            class="block-item"
            sign="h5-learnPath-v1"
            v-if="enabledAddons['LearningPaths']"
          >
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-learn-path-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">路径</div>
            </div>
          </div>

          <div
            class="block-item"
            sign="h5-ms-v1"
            v-if="enabledAddons['MiaoSha']"
          >
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-ms-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">秒杀</div>
            </div>
          </div>

          <div
            class="block-item"
            sign="h5-tg-v1"
            v-if="enabledAddons['TuanGou']"
          >
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-tg-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">团购</div>
            </div>
          </div>
        </draggable>
      </div>

      <draggable
        class="preview-box"
        draggable=".block-item"
        group="blocks"
        @add="dragChange"
      >
        <div class="pc-box">
          <!-- 导航栏 -->
          <render-navs></render-navs>
          <div class="block"></div>

          <!-- 幻灯片 -->
          <render-sliders></render-sliders>

          <!-- 公告 -->
          <render-notice></render-notice>
          <div class="block"></div>

          <!-- 友情链接 -->
          <render-link></render-link>
        </div>
      </draggable>

      <div class="config-box" v-if="curBlockIndex !== null"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
import RenderNavs from "./components/pc/render/navs/index";
import RenderSliders from "./components/pc/render/sliders/index";
import RenderNotice from "./components/pc/render/notice/index";
import RenderLink from "./components/pc/render/links/index";

export default {
  components: {
    draggable,
    RenderNavs,
    RenderSliders,
    RenderNotice,
    RenderLink,
  },
  data() {
    return {
      platform: "pc",
      page: "pc-page-index",
      blocks: [],
      loading: false,
      curBlockIndex: null,
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
  },
  methods: {
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.ViewBlock.List({
        platform: this.platform,
        page: this.page,
      }).then((res) => {
        this.blocks = res.data;
        this.loading = false;
      });
    },
    dragChange(e) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let blockSign = e.item.getAttribute("sign");
      // 移除dom
      e.item.parentNode.removeChild(e.item);
    },
  },
};
</script>

<style lang="less" scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: #f1f2f9;
}
.top-box {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 56px;
  float: left;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  background-color: white;
  line-height: 56px;

  .btn-back {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }
  }

  .line {
    width: 1px;
    height: 14px;
    background-color: #d8d8d8;
    margin-right: 15px;
    margin-left: 15px;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  }
}

.blocks-box {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 230px;
  background-color: white;
  box-sizing: border-box;
  padding: 30px;

  .title {
    width: 100%;
    height: auto;
    float: left;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
    margin-bottom: 40px;
  }

  .blocks {
    width: 100%;
    height: auto;
    float: left;
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .block-item {
      text-align: center;

      .btn {
        display: inline-block;
        cursor: move;

        &:hover {
          box-shadow: 0px 4px 8px 0px rgba(102, 102, 102, 0.15);
          border-radius: 8px;
        }

        .name {
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          line-height: 12px;
        }
      }
    }
  }
}

.preview-box {
  position: fixed;
  top: 70px;
  left: 230px;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 50px;
  overflow-y: auto;
  overflow-x: auto;

  .pc-box {
    width: 1200px;
    height: auto;
    float: left;

    .block {
      width: 100%;
      height: 30px;
      float: left;
      background-color: #f6f6f6;
    }
  }
}

.config-box {
  position: fixed;
  z-index: 12;
  top: 56px;
  right: 0;
  bottom: 0;
  width: 400px;
  box-sizing: border-box;
  background-color: white;
}
</style>
