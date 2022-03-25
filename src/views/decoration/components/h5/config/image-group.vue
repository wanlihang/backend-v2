<template>
  <div class="vod-v1-box" v-if="config">
    <div class="title">
      <div class="text">图片魔方</div>
    </div>

    <div class="config-item">
      <div class="config-item-title">排版</div>
      <div class="config-item-body">
        <div class="d-flex">
          <div class="image-group-1 cursor-pointer" @click="swtichV('v-1')">
            <img
              v-if="config.v === 'v-1'"
              src="@/assets/images/decoration/h5/image-group-1-active.png"
              width="50"
              height="50"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/image-group-1.png"
              width="50"
              height="50"
            />
          </div>

          <div
            class="image-group-2 ml-5 cursor-pointer"
            @click="swtichV('v-2')"
          >
            <img
              v-if="config.v === 'v-2'"
              src="@/assets/images/decoration/h5/image-group-2-active.png"
              width="50"
              height="50"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/image-group-2.png"
              width="50"
              height="50"
            />
          </div>

          <div
            class="image-group-2 ml-5 cursor-pointer"
            @click="swtichV('v-3')"
          >
            <img
              v-if="config.v === 'v-3'"
              src="@/assets/images/decoration/h5/image-group-3-active.png"
              width="50"
              height="50"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/image-group-3.png"
              width="50"
              height="50"
            />
          </div>

          <div
            class="image-group-4 ml-5 cursor-pointer"
            @click="swtichV('v-4')"
          >
            <img
              v-if="config.v === 'v-4'"
              src="@/assets/images/decoration/h5/image-group-4-active.png"
              width="50"
              height="50"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/image-group-4.png"
              width="50"
              height="50"
            />
          </div>

          <div
            class="image-group-1-2 ml-5 cursor-pointer"
            @click="swtichV('v-1-2')"
          >
            <img
              v-if="config.v === 'v-1-2'"
              src="@/assets/images/decoration/h5/image-group-1-2-active.png"
              width="50"
              height="50"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/image-group-1-2.png"
              width="50"
              height="50"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="config-item">
      <div class="config-item-title">配置</div>
      <div class="config-item-body">
        <template v-if="config.v === 'v-1'">
          <div class="float-left cursor-pointer" @click="setCurIndex(0)">
            <img
              v-if="config.items[0].src"
              :src="config.items[0].src"
              width="100%"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/empty-image.png"
              width="100%"
            />
          </div>
        </template>

        <template v-else-if="config.v === 'v-2'">
          <div class="d-flex">
            <div class="flex-1 cursor-pointer" @click="setCurIndex(0)">
              <img
                v-if="config.items[0].src"
                :src="config.items[0].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>

            <div
              class="flex-1 cursor-pointer"
              @click="setCurIndex(1)"
              v-if="config.items[1]"
            >
              <img
                v-if="config.items[1].src"
                :src="config.items[1].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
          </div>
        </template>

        <template v-else-if="config.v === 'v-3'">
          <div class="d-flex">
            <div class="flex-1 cursor-pointer" @click="setCurIndex(0)">
              <img
                v-if="config.items[0].src"
                :src="config.items[0].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
            <div
              class="flex-1 cursor-pointer"
              @click="setCurIndex(1)"
              v-if="config.items[1]"
            >
              <img
                v-if="config.items[1].src"
                :src="config.items[1].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
            <div
              class="flex-1 cursor-pointer"
              @click="setCurIndex(2)"
              v-if="config.items[2]"
            >
              <img
                v-if="config.items[2].src"
                :src="config.items[2].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
          </div>
        </template>

        <template v-else-if="config.v === 'v-4'">
          <div class="d-flex">
            <div class="flex-1 cursor-pointer" @click="setCurIndex(0)">
              <img
                v-if="config.items[0].src"
                :src="config.items[0].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
            <div
              class="flex-1 cursor-pointer"
              @click="setCurIndex(1)"
              v-if="config.items[1]"
            >
              <img
                v-if="config.items[1].src"
                :src="config.items[1].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
            <div
              class="flex-1 cursor-pointer"
              @click="setCurIndex(2)"
              v-if="config.items[2]"
            >
              <img
                v-if="config.items[2].src"
                :src="config.items[2].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
            <div
              class="flex-1 cursor-pointer"
              @click="setCurIndex(3)"
              v-if="config.items[3]"
            >
              <img
                v-if="config.items[3].src"
                :src="config.items[3].src"
                width="100%"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
              />
            </div>
          </div>
        </template>

        <template v-else-if="config.v === 'v-1-2'">
          <div class="d-flex">
            <div
              class="flex-1 cursor-pointer"
              @click="setCurIndex(0)"
              style="height: 150px"
            >
              <img
                v-if="config.items[0].src"
                :src="config.items[0].src"
                width="100%"
                height="150"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/empty-image.png"
                width="100%"
                height="150"
              />
            </div>
            <div class="flex-1">
              <div
                class="float-left cursor-pointer"
                @click="setCurIndex(1)"
                style="height: 75px"
                v-if="config.items[1]"
              >
                <img
                  v-if="config.items[1].src"
                  :src="config.items[1].src"
                  width="100%"
                  height="75"
                />
                <img
                  v-else
                  src="@/assets/images/decoration/h5/empty-image.png"
                  width="100%"
                  height="75"
                />
              </div>
              <div
                class="float-left cursor-pointer"
                @click="setCurIndex(2)"
                style="height: 75px"
                v-if="config.items[2]"
              >
                <img
                  v-if="config.items[2].src"
                  :src="config.items[2].src"
                  width="100%"
                  height="75"
                />
                <img
                  v-else
                  src="@/assets/images/decoration/h5/empty-image.png"
                  width="100%"
                  height="75"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="config-item" v-if="curIndex !== null">
      <div class="config-item-title">第{{ curIndex + 1 }}张图的链接</div>
      <div class="config-item-body">
        <div class="d-flex">
          <div class="flex-1">
            <el-input v-model="link" class="w-100"></el-input>
          </div>
          <div class="ml-15">
            <el-link type="primary" @click="showLinkWin = true">
              选择链接
            </el-link>
          </div>
        </div>
      </div>
    </div>

    <div class="float-left footer-button">
      <el-button type="primary" class="w-100" :loading="loading" @click="save">
        保存
      </el-button>
    </div>

    <select-image
      :show.sync="showSelectImageWin"
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
import H5Link from "@/components/h5-link";

export default {
  components: {
    SelectImage,
    H5Link,
  },
  props: ["block"],
  data() {
    return {
      showLinkWin: false,
      showSelectImageWin: false,
      config: null,
      loading: false,
      curIndex: null,
      link: null,
    };
  },
  watch: {
    link(newVal) {
      if (this.curIndex !== null) {
        this.config.items[this.curIndex].url = newVal;
      }
    },
  },
  mounted() {
    this.config = this.block.config_render;
  },
  methods: {
    setCurIndex(index) {
      this.curIndex = index;
      this.link = this.config.items[this.curIndex].url;
      this.showSelectImageWin = true;
    },
    swtichV(newVal) {
      this.curIndex = null;
      this.config.v = newVal;

      if (newVal === "v-1") {
        this.config.items = [
          {
            src: null,
            url: null,
          },
        ];
      } else if (newVal === "v-2") {
        this.config.items = [
          {
            src: null,
            url: null,
          },
          {
            src: null,
            url: null,
          },
        ];
      } else if (newVal === "v-3") {
        this.config.items = [
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
        ];
      } else if (newVal === "v-4") {
        this.config.items = [
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
        ];
      } else if (newVal === "v-1-2") {
        this.config.items = [
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
        ];
      }
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
    uploadImage(src) {
      this.showSelectImageWin = false;
      if (this.curIndex === null) {
        return;
      }
      this.config.items[this.curIndex].src = src;
    },
    linkChange(url) {
      this.showLinkWin = false;
      if (this.curIndex === null) {
        return;
      }
      this.config.items[this.curIndex].url = this.link = url;
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

    .config-item-body {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
    }
  }
}
</style>
