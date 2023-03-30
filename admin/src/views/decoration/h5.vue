<template>
  <div class="bg" v-loading="loading">
    <div class="top-box">
      <div class="btn-back" @click="$router.back()">
        <i class="el-icon-back"></i>
        返回
      </div>
      <div class="line"></div>
      <div class="name">移动端首页</div>
    </div>

    <div class="main-body">
      <div class="blocks-box">
        <div class="title">拖动添加板块</div>
        <draggable
          class="blocks"
          :sort="false"
          :group="{ name: 'blocks', pull: 'clone', put: false }"
        >
          <div class="block-item" sign="slider">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/slider.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">幻灯片</div>
            </div>
          </div>

          <div class="block-item" sign="grid-nav">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/grid-nav.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">宫格导航</div>
            </div>
          </div>

          <div class="block-item" sign="blank">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/blank.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">空白快</div>
            </div>
          </div>

          <div class="block-item" sign="image-group">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/image-group.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">图片魔方</div>
            </div>
          </div>

          <!-- <div class="block-item" sign="mp-wechat">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/mp-wechat.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">微信公众号</div>
            </div>
          </div> -->

          <div class="block-item" sign="h5-vod-v1">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-vod-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">实验</div>
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
          <div class="block-item" sign="h5-gzh-v1">
            <div class="btn">
              <div class="icon">
                <img
                  src="@/assets/images/decoration/h5/h5-gognzhoanghao-v1.png"
                  width="44"
                  height="44"
                />
              </div>
              <div class="name">公众号</div>
            </div>
          </div>
        </draggable>
      </div>

      <draggable
        ref="preview-box"
        class="preview-box"
        draggable=".block-item"
        group="blocks"
        @add="dragChange"
      >
        <div class="status-bar">
          <img
            src="@/assets/images/decoration/h5/status-bar.png"
            width="100%"
            height="26"
          />
        </div>
        <div class="search-bar">
          <img
            src="@/assets/images/decoration/h5/search-bar.png"
            width="100%"
            height="50"
          />
        </div>

        <template v-for="(item, index) in blocks">
          <div class="float-left" :key="item.id">
            <div
              class="item"
              :class="{ active: curBlock === index }"
              @click="curBlock = index"
            >
              <render-slider
                v-if="item.sign === 'slider'"
                :config="item.config_render"
              ></render-slider>
              <render-grid-nav
                v-else-if="item.sign === 'grid-nav'"
                :config="item.config_render"
              ></render-grid-nav>
              <render-vod-v1
                v-else-if="item.sign === 'h5-vod-v1'"
                :config="item.config_render"
              ></render-vod-v1>
              <render-live-v1
                v-else-if="item.sign === 'h5-live-v1'"
                :config="item.config_render"
              ></render-live-v1>
              <render-book-v1
                v-else-if="item.sign === 'h5-book-v1'"
                :config="item.config_render"
              ></render-book-v1>
              <render-topic-v1
                v-else-if="item.sign === 'h5-topic-v1'"
                :config="item.config_render"
              ></render-topic-v1>
              <render-learn-path-v1
                v-else-if="item.sign === 'h5-learnPath-v1'"
                :config="item.config_render"
              ></render-learn-path-v1>
              <render-tg-v1
                v-else-if="item.sign === 'h5-tg-v1'"
                :config="item.config_render"
              ></render-tg-v1>
              <render-ms-v1
                v-else-if="item.sign === 'h5-ms-v1'"
                :config="item.config_render"
              ></render-ms-v1>
              <render-blank
                v-else-if="item.sign === 'blank'"
                :config="item.config_render"
              ></render-blank>
              <render-mp-wechat
                v-else-if="item.sign === 'mp-wechat'"
                :config="item.config_render"
              ></render-mp-wechat>
              <render-image-group
                v-else-if="item.sign === 'image-group'"
                :config="item.config_render"
              ></render-image-group>
              <render-gzh-v1
                v-else-if="item.sign === 'h5-gzh-v1'"
                :config="item.config_render"
              ></render-gzh-v1>

              <div class="item-options" v-if="curBlock === index">
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
      </draggable>

      <div class="config-box" v-if="curBlock !== null">
        <config-setting
          :block="blocks[curBlock]"
          @update="getData()"
        ></config-setting>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
import RenderSlider from "./components/h5/render/slider.vue";
import RenderGridNav from "./components/h5/render/grid-nav.vue";
import RenderVodV1 from "./components/h5/render/vod-v1.vue";
import RenderLiveV1 from "./components/h5/render/live-v1.vue";
import RenderBookV1 from "./components/h5/render/book-v1.vue";
import RenderTopicV1 from "./components/h5/render/topic-v1.vue";
import RenderLearnPathV1 from "./components/h5/render/learnPath-v1.vue";
import RenderTgV1 from "./components/h5/render/tg-v1.vue";
import RenderMsV1 from "./components/h5/render/ms-v1.vue";
import ConfigSetting from "./components/h5/config/index.vue";
import RenderBlank from "./components/h5/render/blank.vue";
import RenderMpWechat from "./components/h5/render/mp-wechat";
import RenderImageGroup from "./components/h5/render/image-group";
import RenderGzhV1 from "./components/h5/render/gzh-v1.vue";

export default {
  components: {
    draggable,
    RenderSlider,
    RenderGridNav,
    RenderVodV1,
    RenderLiveV1,
    RenderBookV1,
    RenderTopicV1,
    RenderLearnPathV1,
    RenderTgV1,
    RenderMsV1,
    ConfigSetting,
    RenderBlank,
    RenderMpWechat,
    RenderImageGroup,
    RenderGzhV1,
  },
  data() {
    return {
      platform: "h5",
      page: "h5-page-index",
      blocks: [],
      loading: false,
      curBlock: null,
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
    this.getData();
  },
  methods: {
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
        this.curBlock = null;
        if (toBottom) {
          // 滚动到底部
          this.$nextTick(() => {
            let dom = document.querySelector(".bg");
            dom.scrollTop = dom.scrollHeight;
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
      // 默认config
      let defaultConfig = null;
      if (blockSign === "grid-nav") {
        defaultConfig = {
          line_count: 4,
          items: [
            {
              src: null,
              name: "xxx",
            },
            {
              src: null,
              name: "xxx",
            },
            {
              src: null,
              name: "xxx",
            },
            {
              src: null,
              name: "xxx",
            },
          ],
        };
      } else if (blockSign === "slider") {
        defaultConfig = [
          {
            src: null,
            url: null,
          },
        ];
      } else if (blockSign === "h5-vod-v1") {
        defaultConfig = {
          title: "实验课程",
          items: [
            {
              id: null,
              title: "xxx",
              thumb: null,
            },
          ],
        };
      } else if (blockSign === "h5-live-v1") {
        defaultConfig = {
          title: "直播课程",
          items: [
            {
              id: null,
              title: "直播课程一",
              thumb: null,
            },
            {
              id: null,
              title: "直播课程二",
              thumb: null,
            },
          ],
        };
      } else if (blockSign === "h5-book-v1") {
        defaultConfig = {
          title: "电子书",
          items: [
            {
              id: null,
              name: "电子书一",
              thumb: null,
            },
          ],
        };
      } else if (blockSign === "h5-topic-v1") {
        defaultConfig = {
          title: "图文",
          items: [
            {
              id: null,
              title: "图文一",
              thumb: null,
            },
          ],
        };
      } else if (blockSign === "h5-learnPath-v1") {
        defaultConfig = {
          title: "学习路径",
          items: [
            {
              id: null,
              name: "路径一",
              thumb: null,
            },
          ],
        };
      } else if (blockSign === "h5-tg-v1") {
        defaultConfig = {
          title: "团购",
          items: [
            {
              id: null,
              goods_title: "团购商品一",
              goods_thumb: null,
            },
          ],
        };
      } else if (blockSign === "h5-ms-v1") {
        defaultConfig = {
          title: "秒杀",
          items: [
            {
              id: null,
              goods_title: "秒杀一",
              goods_thumb: null,
            },
          ],
        };
      } else if (blockSign === "blank") {
        defaultConfig = {
          height: 10,
          bgcolor: "#FFFFFF",
        };
      } else if (blockSign === "mp-wechat") {
        defaultConfig = {
          name: "微信公众号名称",
          desc: "微信公众号简介",
        };
      } else if (blockSign === "image-group") {
        defaultConfig = {
          v: "v-4",
          items: [
            {
              src: null,
              url: null,
            },
            {
              src: null,
              url: null,
            },
            {
              src: null,
              url: null,
            },
            {
              src: null,
              url: null,
            },
          ],
        };
      } else if (blockSign === "h5-gzh-v1") {
        defaultConfig = {
          title: "公众号",
          name: "公众号名称",
          logo: null,
          desc: "公众号引导",
          qrcode: null,
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
            this.curBlock = null;
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

      this.curBlock = null;

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

      this.curBlock = null;

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

.preview-box {
  position: absolute;
  z-index: 8;
  top: 86px;
  left: 50%;
  margin-left: -188px;
  width: 375px;
  height: auto;
  min-height: 600px;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding-bottom: 50px;

  .status-bar {
    width: 100%;
    height: 20px;
    float: left;
  }
  .search-bar {
    width: 100%;
    height: 50px;
    float: left;
  }

  .item {
    position: relative;
    width: 100%;
    height: auto;
    float: left;
    cursor: pointer;
    box-sizing: border-box;
    border: 2px solid #f6f6f6;

    &.active {
      border: 2px solid @primary-color;
    }

    .item-options {
      position: absolute;
      z-index: 9;
      top: -36px;
      right: -2px;
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
          border-bottom-right-radius: 2px;
        }

        &:last-child {
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
      }
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
  overflow-y: auto;
}
</style>
