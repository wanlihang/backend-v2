<template>
  <div class="select-images-box-mask" v-if="show">
    <div class="select-images">
      <div class="select-images-title">选择图片</div>
      <div class="select-images-box">
        <div class="category-box">
          <div class="title">{{ $t("common.group") }}</div>
          <div class="body">
            <div
              class="category-item"
              :class="{ active: item.key === pagination.from }"
              v-for="item in fromRows"
              :key="item.key"
              @click="pagination.from = item.key"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="images-list">
          <div class="optinos">
            <el-upload
              :headers="uploadHeaders"
              :multiple="false"
              :action="uploadAction"
              :data="uploadData"
              name="file"
              :show-file-list="false"
              :on-success="uploadSuccessEvt"
              accept="image/gif,image/jpeg,image/jpg,image/png"
            >
              <el-button type="primary">
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
              <div class="image-render">
                <img :src="item.url" width="100" height="100" />
              </div>
              <div class="image-name">{{ item.name }}</div>
            </div>
          </div>

          <div class="empty-box" v-else>
            <el-empty :description="$t('common.none')"></el-empty>
          </div>

          <div class="pagination text-center">
            <el-pagination
              @size-change="paginationSizeChange"
              @current-change="paginationPageChange"
              :current-page="pagination.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="select-images-footer">
        <el-button type="primary" @click="confirm"> 确定 </el-button>
        <el-button @click="close"> 取消 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/js/utils";

export default {
  props: ["show", "from"],
  data() {
    return {
      fromRows: [],
      pagination: {
        page: 1,
        size: 10,
        from: 0,
      },
      list: [],
      total: 0,
      loading: false,
      imageUrl: null,
    };
  },
  computed: {
    uploadAction() {
      return "/backend/api/v1/media/image";
    },
    uploadData() {
      return {
        from: this.from,
      };
    },
    uploadHeaders() {
      return {
        Authorization: "Bearer " + Utils.getToken(),
      };
    },
  },
  mounted() {
    this.getData();
  },
  watch: {
    "pagination.from"() {
      this.getData();
    },
  },
  methods: {
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

        this.fromRows = res.data.from;

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
      this.getData();
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
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.5);
}

.select-images {
  position: absolute;
  top: 10vh;
  left: 50%;
  margin-left: -600px;
  width: 1200px;
  height: auto;
  background-color: white;
  box-sizing: border-box;
}

.select-images-title {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 30px;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
}

.select-images-box {
  width: 100%;
  height: auto;
  float: left;
  display: flex;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;

  .category-box {
    width: 200px;
    height: auto;
    margin-right: 30px;
    border: 1px solid rgb(227, 227, 227);
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
        color: rgba(0, 0, 0, 0.6);

        &.active {
          background-color: rgba(0, 0, 0, 0.05);
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }

  .images-list {
    flex: 1;

    .optinos {
      width: 100%;
      height: auto;
      float: left;
      margin-bottom: 15px;
      text-align: right;
    }

    .empty-box {
      width: 100%;
      height: auto;
      float: left;
    }

    .body {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 15px;
      float: left;
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      border: 1px solid rgb(227, 227, 227);
      border-radius: 3px;

      .image-item {
        box-sizing: border-box;
        padding: 10px;
        cursor: pointer;

        &.active,
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .image-render,
        .image-name {
          width: 100%;
          height: auto;
          float: left;
          text-align: center;

          img {
            border-radius: 3px;
          }
        }

        .image-name {
          margin-top: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }

    .pagination {
      width: 100%;
      height: auto;
      float: left;
      margin-top: 15px;
    }
  }
}

.select-images-footer {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 20px 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.6);
}
</style>