<template>
  <div class="vod-v1-box" v-if="config">
    <div class="title">
      <div class="text">团购配置</div>
    </div>
    <div class="config-item">
      <div class="config-item-title">板块标题</div>
      <div class="config-item-body">
        <div class="float-left d-flex">
          <div class="form-label">标题</div>
          <div class="flex-1 ml-15">
            <el-input class="w-100" v-model="config.title"></el-input>
          </div>
        </div>
      </div>
    </div>

    <div class="config-item">
      <div class="config-item-title">板块内容</div>
      <div class="config-item-body">
        <div class="courses-list-box">
          <div
            class="course-item"
            v-for="(item, index) in config.items"
            :key="index"
            @click="changeCourse(index)"
          >
            <template v-if="item.goods_thumb">
              <thumb-bar
                v-if="item.goods_type === 'book'"
                :value="item.goods_thumb"
                :border="4"
                :width="45"
                :height="60"
              ></thumb-bar>
              <thumb-bar
                v-else
                :value="item.goods_thumb"
                :width="80"
                :height="60"
              ></thumb-bar>
            </template>
            <!--<div v-else class="default-box">选择课程</div>-->
            <img
              v-else
              src="@/assets/images/decoration/h5/pc-edit.png"
              width="80"
              height="60"
            />

            <div class="btn-del" @click.stop="delCourse(index)">
              <close-icon></close-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="float-left mt-15">
      <div class="float-left">
        <el-button class="w-100" @click="addCourse"> 添加团购课程 </el-button>
      </div>
    </div>

    <div class="float-left footer-button">
      <el-button type="primary" class="w-100" :loading="loading" @click="save">
        保存
      </el-button>
    </div>

    <select-tg
      :show="showVodWin"
      @close="showVodWin = false"
      @change="vodChange"
    ></select-tg>
  </div>
</template>

<script>
import SelectTg from "@/components/select-tg";
import CloseIcon from "@/components/close-icon";

export default {
  components: {
    CloseIcon,
    SelectTg,
  },
  props: ["block"],
  data() {
    return {
      showVodWin: false,
      config: null,
      curVodIndex: null,
      loading: false,
    };
  },
  mounted() {
    this.config = this.block.config_render;
  },
  methods: {
    changeCourse(index) {
      this.curVodIndex = index;
      this.showVodWin = true;
    },
    addCourse() {
      this.config.items.push({
        title: null,
        thumb: null,
      });
      this.curVodIndex = this.config.items.length - 1;
      this.showVodWin = true;
    },
    delCourse(index) {
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
    vodChange(vodCourse) {
      if (this.curVodIndex === null) {
        return;
      }
      Object.assign(this.config.items[this.curVodIndex], vodCourse);
      this.showVodWin = false;
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

      .form-label {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
      }

      .courses-list-box {
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(4, minmax(0, 1fr));

        .course-item {
          position: relative;
          cursor: pointer;

          img {
            border-radius: 4px;
          }

          .default-box {
            border-radius: 4px;
            width: 78px;
            height: 58px;
            border: 1px dashed #dcdfe6;
            font-size: 12px;
            color: #3ca7fa;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .btn-del {
            position: absolute;
            top: -17px;
            right: -17px;
          }
        }
      }
    }
  }
}
</style>
