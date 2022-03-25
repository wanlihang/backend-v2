<template>
  <div class="select-images-box-mask" v-if="show">
    <div class="select-images">
      <div class="select-images-title">选择图片</div>
      <div class="select-images-box">
        <div class="category-box">
          <div class="body">
            <div
              class="category-item"
              :class="{ active: item.key === pagination.from }"
              v-for="item in fromRows"
              :key="item.key"
              @click="selectpage(item.key)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="images-list">
          <div class="optinos">
            <el-upload
              :headers="uploadHeaders"
              :multiple="true"
              :action="uploadAction"
              :data="uploadData"
              name="file"
              :show-file-list="false"
              :on-success="uploadSuccessEvt"
              accept="image/gif,image/jpeg,image/jpg,image/png"
            >
              <el-button class="upbtn">
                {{ $t("common.image.upload") }}
              </el-button>
            </el-upload>
          </div>

          <div
            class="body"
            v-if="list.length > 0 || loading"
            v-loading="loading"
          >
            <div
              class="image-item"
              :class="{ active: imageUrl === item.url }"
              v-for="item in list"
              :key="item.id"
              @click="imageUrl = item.url"
            >
              <div class="sel" v-if="imageUrl === item.url">
                <img src="../assets/home/selected.png" />
              </div>
              <div class="image-render">
                <div
                  class="image-view"
                  :style="{ 'background-image': 'url(' + item.url + ')' }"
                ></div>
              </div>
              <div class="image-name">
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
          </div>

          <div class="empty-box" v-else>
            <el-empty :description="$t('common.none')"></el-empty>
          </div>

          <div class="pagination text-center" v-if="pagination.size < total">
            <el-pagination
              @size-change="paginationSizeChange"
              @current-change="paginationPageChange"
              :current-page="pagination.page"
              :page-size="pagination.size"
              layout="total, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="select-images-footer">
        <el-button class="footer_btn" type="primary" @click="confirm">
          确定
        </el-button>
        <el-button class="footer_btn ml-30" @click="close"> 取消 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/js/config";

export default {
  props: ["show", "from"],
  data() {
    return {
      fromRows: [
        { key: 0, name: "全部图片" },
        {
          key: 1,
          name: "幻灯片",
        },
        {
          key: 2,
          name: "课程封面",
        },
        {
          key: 3,
          name: "课程详情页",
        },
        {
          key: 4,
          name: "文章配图",
        },
      ],
      pagination: {
        page: 1,
        size: 15,
        from: 0,
      },
      upfrom: 0,
      list: [],
      total: 0,
      loading: false,
      imageUrl: null,
    };
  },
  computed: {
    uploadAction() {
      return config.url + "/backend/api/v1/media/image";
    },
    uploadData() {
      return {
        from: this.pagination.from,
      };
    },
    uploadHeaders() {
      return {
        Authorization: "Bearer " + this.$utils.getToken(),
      };
    },
  },
  watch: {
    "pagination.from"() {
      this.getData();
    },
    show(newVal) {
      if (newVal) {
        this.getData();
      }
    },
  },
  methods: {
    selectpage(key) {
      this.pagination.from = key;
      this.upfrom = key;
    },
    resetLoad() {
      this.pagination.page = 1;
      this.pagination.from = 0;
      this.getData();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getData();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      this.$api.Media.Image.List(this.pagination).then((res) => {
        // 分页数据
        let data = res.data.data;
        this.list = data.data;
        this.total = data.total;

        //this.fromRows = res.data.from;
        this.pagination.from = this.upfrom;
        this.loading = false;
      });
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      if (this.imageUrl === null) {
        this.$message.warning("请选择图片");
        return;
      }
      this.$emit("selected", this.imageUrl);
    },
    uploadSuccessEvt() {
      this.resetLoad();
    },
  },
  beforeDestroy() {
    this.imageUrl = null;
  },
};
</script>

<style lang="less" scoped>
.select-images-box-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2002;
  background-color: rgba(0, 0, 0, 0.5);
}

.select-images {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 881px;
  height: 674px;
  background: #ffffff;
  margin-top: -337px;
  margin-left: -440.5px;
  box-sizing: border-box;
}

.select-images-title {
  width: 100%;
  height: 70px;
  float: left;
  box-sizing: border-box;
  padding: 26px 30px;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
}

.select-images-box {
  width: 100%;
  height: 534px;
  float: left;
  display: flex;
  box-sizing: border-box;
  padding-left: 0px;
  padding-right: 30px;
  padding-bottom: 0px;
  .category-box {
    width: 150px;
    height: auto;
    margin-right: 30px;
    border-right: 1px solid #d8d8d8;
    border-radius: 3px;

    .title {
      width: 100%;
      height: auto;
      float: left;
      background-color: rgb(243, 245, 247);
      box-sizing: border-box;
      padding: 15px;
      color: rgba(0, 0, 0, 0.8);
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      font-size: 15px;
      line-height: 15px;
    }

    .body {
      width: 100%;
      height: auto;
      float: left;

      .category-item {
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 15px;
        padding-bottom: 15px;
        cursor: pointer;
        font-size: 15px;
        line-height: 15px;
        color: #333333;

        &.active {
          background-color: rgba(60, 167, 250, 0.1);
          color: #333333;
        }
      }
    }
  }

  .images-list {
    flex: 1;

    .optinos {
      width: 100%;
      height: 40px;
      float: left;
      margin-bottom: 15px;
      text-align: right;
      .upbtn {
        width: 116px;
        position: absolute;
        top: 15px;
        right: 30px;
      }
    }

    .empty-box {
      width: 100%;
      height: auto;
      float: left;
    }

    .body {
      width: 100%;
      margin-top: -55px;
      height: auto;
      box-sizing: border-box;
      padding: 0;
      float: left;
      display: grid;
      row-gap: 27px;
      column-gap: 30px;
      grid-template-columns: repeat(5, minmax(0, 1fr));

      .image-item {
        width: 110px;
        min-height: 142px;
        background: #f4fafe;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        .sel {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 58px;
          left: 40px;
          img {
            width: 30px;
            height: 30px;
          }
        }
        .image-render,
        .image-name {
          width: 100%;

          .image-view {
            width: 100%;
            height: 110px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
          }
        }

        .image-render {
          height: 110px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-name {
          width: 110px;
          height: auto;
          padding: 10px 5px;
          box-sizing: border-box;
          .name {
            width: 100px;
            height: 15px;
            font-size: 10px;
            font-weight: 400;
            color: #333333;
            line-height: 15px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        &.active,
        &:hover {
          background: #fff;
          border: 2px solid #3ca7fa;
          border-bottom: none;
          .image-render {
            background-color: rgba(60, 167, 250, 0.2);
            width: 106px;
            height: 110px;
            .image-view {
              width: 106px;
              height: 108px;
            }
          }
          .image-name {
            width: 110px;
            height: auto;
            padding: 0;
            display: flex;
            padding: 10px 5px;
            top: 110px;
            left: -2px;
            position: absolute;
            z-index: 10;
            background-color: rgb(216, 237, 254);
            border: 2px solid #3ca7fa;
            border-top: none;
            .name {
              width: 96px;
              height: auto;
              word-wrap: break-word;
              white-space: unset;
              text-overflow: unset;
              overflow: unset;
            }
          }
        }
      }
    }

    .pagination {
      width: 100%;
      height: auto;
      float: left;
      margin-top: 12px;
    }
  }
}

.select-images-footer {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 15px 30px;
  box-shadow: 0px -2px 4px 0px rgba(102, 102, 102, 0.05);
  .footer_btn {
    width: 88px;
  }
}
</style>
