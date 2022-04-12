<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">上传视频</div>
      <div class="meedu-dialog-body">
        <div class="float-left">
          <el-tabs v-model="tab.active">
            <el-tab-pane
              :label="item.name"
              :name="item.key"
              v-for="(item, index) in tab.list"
              :key="index"
            ></el-tab-pane>
          </el-tabs>
        </div>

        <div class="float-left" v-show="tab.active === 'list'">
          <div class="float-left mb-15">
            <div class="float-left d-flex">
              <div class="d-flex">
                <el-input
                  class="w-150px"
                  v-model="pagination.keywords"
                  placeholder="关键字"
                ></el-input>
              </div>

              <div class="ml-10">
                <el-button @click="paginationReset"> 清空 </el-button>
                <el-button @click="firstPageLoad" type="primary">
                  筛选
                </el-button>
              </div>
            </div>
          </div>

          <el-table
            :header-cell-style="{ background: '#f1f2f9' }"
            :data="list"
            ref="table"
            highlight-current-row
            @current-change="handleCurrentChange"
            class="float-left mb-15"
            v-loading="loading"
          >
            <el-table-column label width="45">
              <template slot-scope="scope">
                <el-radio :label="scope.row.id" v-model="radio"
                  ><span></span
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="title" label="视频"> </el-table-column>
            <el-table-column label="时长" width="150">
              <template slot-scope="scope">
                <duration-text :duration="scope.row.duration"></duration-text>
              </template>
            </el-table-column>
            <el-table-column prop="storage_driver" label="存储" width="100">
            </el-table-column>
            <el-table-column label="大小" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.size_mb }}MB</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.created_at | dateFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="50">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确认删除吗？"
                  @confirm="destory(scope.row.id)"
                >
                  <p-link
                    slot="reference"
                    text="删除"
                    p="media.video.delete.multi"
                    type="danger"
                  ></p-link>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <div class="float-left mt-15 text-center">
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

        <div class="float-left" v-show="tab.active === 'upload'">
          <div class="float-left mb-30">
            <el-button
              type="primary"
              :disabled="upload.loading"
              plain
              @click="uploadAliyunVod"
              >上传到阿里云点播</el-button
            >
            <el-button
              type="primary"
              :disabled="upload.loading"
              plain
              @click="uploadTencentVod"
              >上传到腾讯云点播</el-button
            >
          </div>

          <template v-if="upload.loading || upload.fileId">
            <div class="upload-process-box mb-30 mt-30">
              <div>
                <el-progress
                  type="circle"
                  :stroke-width="15"
                  :percentage="upload.process"
                ></el-progress>
              </div>
            </div>
            <div class="float-left text-center">
              <span class="helper-text">{{ upload.file.title }}</span>
            </div>
          </template>

          <div style="display: none">
            <input type="file" ref="video-file" @change="fileChange" />
            <video ref="video-play" @loadedmetadata="videoPlayEvt"></video>
          </div>
        </div>
      </div>
      <div class="meedu-dialog-footer">
        <el-button type="primary" @click="confirm"> 确定 </el-button>
        <el-button @click="close" class="ml-30">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import TcVod from "vod-js-sdk-v6";
import DurationText from "@/components/duration-text";

export default {
  components: {
    DurationText,
  },
  props: ["show"],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
      },
      list: [],
      total: 0,
      radio: "",
      loading: false,
      tab: {
        active: "list",
        list: [
          {
            name: "已上传视频",
            key: "list",
          },
          {
            name: "直接上传",
            key: "upload",
          },
        ],
      },
      upload: {
        // 阿里云obj
        aliyun: null,
        // 上传服务商
        service: null,
        // 是否上传中
        loading: false,
        // 上传进度
        process: 0,
        // 本地视频文件信息
        file: {
          title: null,
          thumb: null,
          size: null,
        },
        // 上传成功视频文件id
        fileId: null,
      },
      // 已选择的视频
      selectedVideo: null,
    };
  },
  computed: {
    tableCurrentRow() {
      if (this.selectedVideo === null) {
        return null;
      }
      let row = null;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id === this.selectedVideo.id) {
          row = this.list[i];
          break;
        }
      }
      return row;
    },
  },
  watch: {
    "tab.active"(newVal) {
      if (newVal === "list") {
        this.paginationReset();
      }
    },
  },
  mounted() {
    this.getData();

    this.aliyunInit();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.pagination.keywords = null;
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    handleCurrentChange(row) {
      if (row !== null) {
        this.selectedVideo = row;
        // 清空已上传的
        this.upload.fileId = null;
        this.radio = row.id;
      }
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Media.Video.List(this.pagination).then((res) => {
        this.loading = false;
        this.list = res.data.data;
        this.total = res.data.total;

        if (this.tableCurrentRow !== null) {
          this.$refs["table"].setCurrentRow(this.tableCurrentRow);
        }
      });
    },
    confirm() {
      if (this.selectedVideo === null) {
        this.$message.warning("请选择视频");
        return;
      }
      this.$emit("change", this.selectedVideo);
    },
    close() {
      this.radio = "";
      this.$emit("close");
    },
    videoPlayEvt() {
      let duration = this.$refs["video-play"].duration;
      this.upload.file.duration = duration;
    },
    aliyunInit() {
      // 阿里云初始化
      this.upload.aliyun = new window.AliyunUpload.Vod({
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        onUploadstarted: (uploadInfo) => {
          if (uploadInfo.videoId) {
            this.$api.System.VideoUpload.AliyunTokenRefresh({
              video_id: uploadInfo.videoId,
            })
              .then((res) => {
                this.upload.aliyun.setUploadAuthAndAddress(
                  uploadInfo,
                  res.data.upload_auth,
                  res.data.upload_address,
                  res.data.video_id
                );
              })
              .catch((e) => {
                this.$message.error(e.message);
              });
          } else {
            this.$api.System.VideoUpload.AliyunTokenCreate({
              title: uploadInfo.file.name,
              filename: uploadInfo.file.name,
            })
              .then((res) => {
                this.upload.aliyun.setUploadAuthAndAddress(
                  uploadInfo,
                  res.data.upload_auth,
                  res.data.upload_address,
                  res.data.video_id
                );
              })
              .catch((e) => {
                this.$message.error(e.message);
              });
          }
        },
        onUploadSucceed: (uploadInfo) => {
          this.upload.fileId = uploadInfo.videoId;
          this.uploadSuccess(uploadInfo.videoId, "");
        },
        onUploadFailed: (uploadInfo, code, message) => {
          this.upload.loading = false;
          this.uploadFailHandle(
            "视频上到阿里云失败传失败，错误信息：" + message + ":code:" + code
          );
        },
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          this.upload.process = Math.ceil(loadedPercent * 100);
        },
        onUploadTokenExpired: (uploadInfo) => {
          this.$api.System.VideoUpload.AliyunTokenRefresh({
            video_id: uploadInfo.videoId,
          })
            .then((res) => {
              this.upload.aliyun.resumeUploadWithAuth(res.data.upload_auth);
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        },
      });
    },
    uploadAliyunVod() {
      if (this.upload.loading) {
        return;
      }
      this.upload.service = "aliyun";
      this.$refs["video-file"].click();
    },
    uploadTencentVod() {
      if (this.upload.loading) {
        return;
      }
      this.upload.service = "tencent";
      this.$refs["video-file"].click();
    },
    fileChange(e) {
      if (e.target.files.length === 0) {
        return;
      }

      this.upload.process = 0;
      this.upload.loading = true;

      let file = e.target.files[0];

      // 文件基础信息
      this.upload.file.title = file.name;
      this.upload.file.size = file.size;

      // 解析视频时长
      this.$refs["video-play"].src = URL.createObjectURL(file);

      if (this.upload.service === "aliyun") {
        this.aliyunUploadHandle(file);
      } else if (this.upload.service === "tencent") {
        this.tencentUploadHandle(file);
      }
    },
    aliyunUploadHandle(file) {
      this.upload.aliyun.addFile(file, null, null, null, "");
      this.upload.aliyun.startUpload();
    },
    tencentUploadHandle(file) {
      const tcVod = new TcVod({
        getSignature: () => {
          return this.$api.System.VideoUpload.TencentToken()
            .then((res) => {
              return res.data.signature;
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        },
      });

      const uploader = tcVod.upload({
        mediaFile: file,
      });

      uploader.on("media_progress", (info) => {
        this.upload.process = parseInt(info.percent * 100);
      });

      // 回调结果说明
      // type doneResult = {
      //   fileId: string,
      //   video: {
      //     url: string
      //   },
      //   cover: {
      //     url: string
      //   }
      // }

      uploader
        .done()
        .then((doneResult) => {
          this.upload.fileId = doneResult.fileId;

          this.uploadSuccess(doneResult.fileId, "");
        })
        .catch((err) => {
          this.uploadFailHandle("上传视频到腾讯云点播错误");
        });
    },
    uploadFailHandle(msg) {
      this.upload.loading = false;
      this.upload.fileId = null;
      this.upload.file.title = null;
      this.$refs["video-file"].value = null;

      this.$message.error(msg);
    },
    uploadSuccess(fileId, thumb) {
      this.upload.process = 100;
      this.upload.loading = false;
      this.$refs["video-file"].value = null;

      this.$api.Media.Video.Store({
        title: this.upload.file.title,
        duration: this.upload.file.duration,
        thumb: thumb,
        size: this.upload.file.size,
        storage_driver: this.upload.service,
        storage_file_id: fileId,
      })
        .then((res) => {
          this.selectedVideo = res.data;
          this.$message.success("上传成功");
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    destory(item) {
      //点击确定按钮的操作
      if (this.loading) {
        return;
      }
      this.loading = true;
      let ids = [];
      ids.push(item);
      this.$api.Media.Video.Destroy({
        ids: ids,
      })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.getData();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.upload-process-box {
  width: 100%;
  height: auto;
  float: left;
  display: flex;
  justify-content: center;
}
</style>
<style lang="less">
.el-popconfirm__main {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
