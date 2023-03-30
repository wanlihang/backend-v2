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

    <div class="blocks-box">
      <div class="title">拖动添加板块</div>
      <div class="tip">拖动下列图标到右侧预览区</div>
      <draggable
        class="blocks"
        :sort="false"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
      >
        <div class="block-item" sign="pc-vod-v1">
          <div class="btn">
            <div class="icon">
              <img
                src="@/assets/images/decoration/h5/h5-vod-v1.png"
                width="44"
                height="44"
              />
            </div>
            <div class="name">实验课程</div>
          </div>
        </div>

        <div class="block-item" sign="pc-live-v1" v-if="enabledAddons['Zhibo']">
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
          sign="pc-book-v1"
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
          sign="pc-topic-v1"
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
          sign="pc-learnPath-v1"
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

        <div class="block-item" sign="pc-ms-v1" v-if="enabledAddons['MiaoSha']">
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

        <div class="block-item" sign="pc-tg-v1" v-if="enabledAddons['TuanGou']">
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

        <div class="block-item" sign="code">
          <div class="btn">
            <div class="icon">
              <img
                src="@/assets/images/decoration/h5/code.png"
                width="44"
                height="44"
              />
            </div>
            <div class="name">代码块</div>
          </div>
        </div>
      </draggable>
    </div>
    <div class="navs-box">
      <div class="nav-item" @click="showNavWin = true">
        <img
          src="@/assets/images/decoration/h5/icon-nav.png"
          width="30"
          height="30"
        />
        导航管理
      </div>
      <div class="nav-item" @click="showNoticeWin = true">
        <img
          src="@/assets/images/decoration/h5/icon-announce.png"
          width="30"
          height="30"
        />
        公告管理
      </div>
      <div class="nav-item" @click="showListWin = true">
        <img
          src="@/assets/images/decoration/h5/icon-banner.png"
          width="30"
          height="30"
        />
        轮播图片
      </div>
      <div class="nav-item" @click="showLinkWin = true">
        <img
          src="@/assets/images/decoration/h5/icon-link.png"
          width="30"
          height="30"
        />
        友情链接
      </div>
      <div class="tip">点击预览区直接编辑板块</div>
    </div>
    <draggable
      ref="preview-box"
      class="preview-box"
      draggable=".block-item"
      group="blocks"
      @add="dragChange"
    >
      <div class="pc-box" :style="{ width: previewWidth + 'px' }">
        <!-- 导航栏 -->
        <render-navs :reload="showNavWin"></render-navs>

        <!-- 幻灯片 -->
        <render-sliders
          :reload="showListWin"
          :width="previewWidth"
        ></render-sliders>

        <!-- 公告 -->
        <render-notice :reload="showNoticeWin"></render-notice>

        <template v-for="(item, index) in blocks">
          <div class="float-left" :key="item.id">
            <div
              class="item"
              :class="{ active: curBlockIndex === index }"
              @click="curBlockIndex = index"
            >
              <render-vod-v1
                v-if="item.sign === 'pc-vod-v1'"
                :config="item.config_render"
              ></render-vod-v1>
              <render-live-v1
                v-if="item.sign === 'pc-live-v1'"
                :config="item.config_render"
              ></render-live-v1>
              <render-book-v1
                v-if="item.sign === 'pc-book-v1'"
                :config="item.config_render"
              ></render-book-v1>
              <render-topic-v1
                v-if="item.sign === 'pc-topic-v1'"
                :config="item.config_render"
              ></render-topic-v1>
              <render-learn-path-v1
                v-if="item.sign === 'pc-learnPath-v1'"
                :config="item.config_render"
              ></render-learn-path-v1>
              <render-ms-v1
                v-if="item.sign === 'pc-ms-v1'"
                :config="item.config_render"
              ></render-ms-v1>
              <render-tg-v1
                v-if="item.sign === 'pc-tg-v1'"
                :config="item.config_render"
              ></render-tg-v1>
              <render-code
                v-if="item.sign === 'code'"
                :config="item.config_render"
              ></render-code>

              <div class="item-options" v-if="curBlockIndex === index">
                <div class="btn-item" @click="blockDestroy(index, item)">
                  <i class="el-icon-delete-solid"></i>
                </div>
                <div class="btn-item" @click="blockCopy(index, item)">
                  <i class="el-icon-document-copy"></i>
                </div>
                <div
                  class="btn-item"
                  v-if="index !== 0"
                  @click="moveTop(index, item)"
                >
                  <i class="el-icon-arrow-up"></i>
                </div>
                <div
                  class="btn-item"
                  v-if="index !== blocks.length - 1"
                  @click="moveBottom(index, item)"
                >
                  <i class="el-icon-arrow-down"></i>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 友情链接 -->
        <render-link :reload="showLinkWin"></render-link>
      </div>
    </draggable>

    <div class="config-box" v-if="curBlockIndex !== null">
      <div class="float-left mb-15">
        <el-button class="ml-15 mt-15" @click="curBlockIndex = null">
          <i class="el-icon-close"></i><span class="ml-5">关闭配置</span>
        </el-button>
      </div>
      <config-setting
        :block="blocks[curBlockIndex]"
        @update="reloadData()"
      ></config-setting>
    </div>
    <navs-list @close="close" :show="showNavWin"></navs-list>
    <list-comp :show="showListWin" @close="close"></list-comp>
    <list-notice :show="showNoticeWin" @close="close"></list-notice>
    <list-link :show="showLinkWin" @close="close"></list-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
import RenderNavs from "./components/pc/render/navs/index";
import RenderSliders from "./components/pc/render/sliders/index";
import RenderNotice from "./components/pc/render/notice/index";
import RenderLink from "./components/pc/render/links/index";
import RenderVodV1 from "./components/pc/render/vod-v1.vue";
import RenderLiveV1 from "./components/pc/render/live-v1.vue";
import RenderBookV1 from "./components/pc/render/book-v1.vue";
import RenderTopicV1 from "./components/pc/render/topic-v1.vue";
import RenderLearnPathV1 from "./components/pc/render/learn-path-v1.vue";
import RenderMsV1 from "./components/pc/render/ms-v1.vue";
import RenderTgV1 from "./components/pc/render/tg-v1.vue";
import ConfigSetting from "./components/h5/config/index.vue";
import RenderCode from "./components/pc/render/code";
import NavsList from "./components/pc/render/navs/list.vue";
import ListComp from "./components/pc/render/sliders/list.vue";
import ListNotice from "./components/pc/render/notice/list.vue";
import ListLink from "./components/pc/render/links/list.vue";

export default {
  components: {
    draggable,
    RenderNavs,
    RenderSliders,
    RenderNotice,
    RenderLink,
    RenderVodV1,
    RenderLiveV1,
    RenderBookV1,
    RenderTopicV1,
    RenderLearnPathV1,
    RenderMsV1,
    RenderTgV1,
    ConfigSetting,
    RenderCode,
    NavsList,
    ListComp,
    ListNotice,
    ListLink,
  },
  data() {
    return {
      platform: "pc",
      page: "pc-page-index",
      blocks: [],
      loading: false,
      curBlockIndex: null,
      showNavWin: false,
      showListWin: false,
      showNoticeWin: false,
      showLinkWin: false,
      screenWidth: null,
      previewWidth: 1200,
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
    lastSort() {
      let sort = 0;
      if (this.blocks.length > 0) {
        sort = this.blocks[this.blocks.length - 1].sort + 1;
      }
      return sort;
    },
  },
  mounted() {
    let screenWidth = document.body.clientWidth;
    if (screenWidth > 1500) {
      this.previewWidth = 1200;
    } else {
      this.previewWidth = 1000;
    }
    window.addEventListener("resize", this.getScreenWidth, false);
    this.getData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenWidth, false);
  },
  methods: {
    getScreenWidth() {
      let screenWidth = document.body.clientWidth;
      if (screenWidth > 1500) {
        this.previewWidth = 1200;
      } else {
        this.previewWidth = 1000;
      }
    },
    close() {
      this.showListWin = false;
      this.showNavWin = false;
      this.showNoticeWin = false;
      this.showLinkWin = false;
    },
    getData(toBottom = false) {
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
        if (toBottom) {
          // 滚动到底部
          this.$nextTick(() => {
            this.$refs["preview-box"].$el.scrollTop =
              this.$refs["preview-box"].$el.scrollHeight;
          });
        }
      });
    },
    reloadData(toBottom = false) {
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
        this.curBlockIndex = null;
        if (toBottom) {
          // 滚动到底部
          this.$nextTick(() => {
            this.$refs["preview-box"].$el.scrollTop =
              this.$refs["preview-box"].$el.scrollHeight;
          });
        }
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
      // 默认数据
      let defaultConfig = null;
      if (blockSign === "pc-vod-v1") {
        defaultConfig = {
          title: "实验课程",
          items: [
            {
              id: null,
              title: "实验课程",
              thumb: null,
              user_count: 0,
              charge: 0,
            },
            {
              id: null,
              title: "实验课程",
              thumb: null,
              user_count: 0,
              charge: 0,
            },
            {
              id: null,
              title: "实验课程",
              thumb: null,
              user_count: 0,
              charge: 0,
            },
            {
              id: null,
              title: "实验课程",
              thumb: null,
              user_count: 0,
              charge: 0,
            },
          ],
        };
      } else if (blockSign === "pc-live-v1") {
        defaultConfig = {
          title: "直播课程",
          items: [
            {
              id: null,
              title: "直播课程",
              thumb: null,
              charge: 0,
              videos_count: 0,
              teacher: {
                name: "教师xx",
              },
            },
            {
              id: null,
              title: "直播课程",
              thumb: null,
              charge: 0,
              videos_count: 0,
              teacher: {
                name: "教师xx",
              },
            },
            {
              id: null,
              title: "直播课程",
              thumb: null,
              charge: 0,
              videos_count: 0,
              teacher: {
                name: "教师xx",
              },
            },
            {
              id: null,
              title: "直播课程",
              thumb: null,
              charge: 0,
              videos_count: 0,
              teacher: {
                name: "教师xx",
              },
            },
          ],
        };
      } else if (blockSign === "pc-book-v1") {
        defaultConfig = {
          title: "电子书",
          items: [
            {
              id: null,
              name: "电子书",
              thumb: null,
              charge: 0,
            },
            {
              id: null,
              name: "电子书",
              thumb: null,
              charge: 0,
            },
            {
              id: null,
              name: "电子书",
              thumb: null,
              charge: 0,
            },
            {
              id: null,
              name: "电子书",
              thumb: null,
              charge: 0,
            },
          ],
        };
      } else if (blockSign === "pc-topic-v1") {
        defaultConfig = {
          title: "图文",
          items: [
            {
              id: null,
              title: "图文一",
              thumb: null,
              view_times: 0,
              category: {
                name: "未知分类",
              },
            },
            {
              id: null,
              title: "图文一",
              thumb: null,
              view_times: 0,
              category: {
                name: "未知分类",
              },
            },
            {
              id: null,
              title: "图文一",
              thumb: null,
              view_times: 0,
              category: {
                name: "未知分类",
              },
            },
            {
              id: null,
              title: "图文一",
              thumb: null,
              view_times: 0,
              category: {
                name: "未知分类",
              },
            },
          ],
        };
      } else if (blockSign === "pc-learnPath-v1") {
        defaultConfig = {
          title: "学习路径",
          items: [
            {
              id: null,
              name: "路径一",
              thumb: null,
              charge: 0,
              steps_count: 0,
              courses_count: 0,
              desc: "简单介绍",
            },
            {
              id: null,
              name: "路径一",
              thumb: null,
              charge: 0,
              steps_count: 0,
              courses_count: 0,
              desc: "简单介绍",
            },
          ],
        };
      } else if (blockSign === "pc-tg-v1") {
        defaultConfig = {
          title: "团购",
          items: [
            {
              id: null,
              goods_title: "团购商品一",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
            {
              id: null,
              goods_title: "团购商品一",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
            {
              id: null,
              goods_title: "团购商品一",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
            {
              id: null,
              goods_title: "团购商品一",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
          ],
        };
      } else if (blockSign === "pc-ms-v1") {
        defaultConfig = {
          title: "秒杀",
          items: [
            {
              id: null,
              goods_title: "秒杀商品",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
            {
              id: null,
              goods_title: "秒杀商品",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
            {
              id: null,
              goods_title: "秒杀商品",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
            {
              id: null,
              goods_title: "秒杀商品",
              goods_thumb: null,
              charge: 0,
              original_charge: 0,
            },
          ],
        };
      } else if (blockSign === "code") {
        defaultConfig = {
          html: null,
        };
      }

      // 添加block
      this.$api.ViewBlock.Store({
        platform: this.platform,
        page: this.page,
        sign: blockSign,
        sort: this.lastSort,
        config: defaultConfig,
      })
        .then(() => {
          this.loading = false;
          this.getData(true);
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    blockDestroy(index, item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.ViewBlock.Destroy(item.id).then(() => {
            this.$message.success(this.$t("common.success"));
            this.curBlockIndex = null;
            this.getData();
          });
        })
        .catch(() => {});
    },
    blockCopy(index, item) {
      this.$api.ViewBlock.Store({
        platform: item.platform,
        page: item.page,
        sign: item.sign,
        sort: item.sort,
        config: item.config_render,
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));

          this.getData();
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    async moveTop(index, item) {
      if (index === 0) {
        this.$message.warn("已经是第一个啦");
        return;
      }
      let changeItem = this.blocks[index - 1];

      await this.$api.ViewBlock.Update(item.id, {
        sort: changeItem.sort,
        config: item.config_render,
      });
      await this.$api.ViewBlock.Update(changeItem.id, {
        sort: item.sort,
        config: changeItem.config_render,
      });

      this.curBlockIndex = null;

      this.getData();
    },
    async moveBottom(index, item) {
      if (index === this.blocks.length - 1) {
        this.$message.warn("已经是最后一个啦");
        return;
      }

      let changeItem = this.blocks[index + 1];

      await this.$api.ViewBlock.Update(item.id, {
        sort: changeItem.sort,
        config: item.config_render,
      });
      await this.$api.ViewBlock.Update(changeItem.id, {
        sort: item.sort,
        config: changeItem.config_render,
      });

      this.curBlockIndex = null;

      this.getData();
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
  background-color: #f1f2f9;
}

.top-box {
  position: absolute;
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
  border-bottom: 1px solid #f2f2f2;

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
  position: absolute;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 210px;
  background-color: white;
  box-sizing: border-box;
  padding: 30px;
  overflow-y: auto;

  .title {
    width: 100%;
    height: auto;
    float: left;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
    margin-bottom: 15px;
  }
  .tip {
    width: 100%;
    height: auto;
    float: left;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 12px;
    margin-bottom: 30px;
  }

  .blocks {
    width: 100%;
    height: auto;
    float: left;
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .block-item {
      text-align: center;

      .btn {
        display: inline-block;
        cursor: move;
        width: 60px;
        height: 60px;
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
.navs-box {
  position: fixed;
  top: 56px;
  left: 210px;
  width: calc(100% - 210px);
  height: 56px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 30px;
  .nav-item {
    width: 96px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #3ca7fa;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    img {
      margin-left: 5px;
    }
  }
  .tip {
    height: 12px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 12px;
  }
}

.preview-box {
  position: absolute;
  top: 143px;
  left: 249px;
  bottom: 0;
  background-color: #f6f6f6;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: auto;

  .pc-box {
    height: auto;
    float: left;

    .block {
      width: 100%;
      height: 30px;
      float: left;
      background-color: #f6f6f6;
    }

    .item {
      position: relative;
      width: 100%;
      height: auto;
      float: left;
      cursor: pointer;
      border: 2px solid #f6f6f6;
      box-sizing: border-box;

      &.active {
        border: 2px solid @primary-color;
      }

      .item-options {
        position: absolute;
        z-index: 9;
        top: -36px;
        left: -2px;
        width: auto;
        height: 36px;

        .btn-item {
          color: white;
          background-color: @primary-color;
          width: 36px;
          height: 36px;
          float: left;
          text-align: center;
          line-height: 36px;

          &:hover {
            background-color: rgba(@primary-color, 0.8);
          }

          &:first-child {
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
          }

          &:last-child {
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
          }
        }
      }
    }
  }
}

.config-box {
  position: absolute;
  z-index: 10;
  top: 112px;
  right: 0;
  bottom: 0;
  width: 400px;
  box-sizing: border-box;
  background-color: white;
  border-left: 1px solid #f2f2f2;
  overflow-y: auto;
}
</style>
