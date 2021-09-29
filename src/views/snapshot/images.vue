<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="查看照片"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="批量删除"
        p="addons.Snapshot.images.delete"
        @click="destorymulti"
        type="danger"
      >
      </p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="images"
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column label="拍照时间">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.thumb"
                :preview-src-list="srcList"
              >
              </el-image>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rid: this.$route.query.rid,
      user_id: this.$route.query.user_id,
      other_id: this.$route.query.other_id,
      images: [],
      total: 0,
      spids: {
        ids: [],
      },
      srcList: [],
      loading: false,
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    //保存选中结果
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {
        other_id: this.other_id,
        user_id: this.user_id,
      };
      this.$api.Snapshot.Images.List(params).then((res) => {
        this.loading = false;
        this.images = res.data.data[0].images;
        this.total = res.data.total;
        this.showPreview();
      });
    },
    showPreview() {
      let images = [];
      this.images.forEach((item) => {
        images.push(item.thumb);
      });
      this.srcList = images;
    },
    destorymulti() {
      if (this.spids.ids == "") {
        this.$message.warning("请选择需要操作的数据");
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.$api.Snapshot.Images.Destorymulti({
            ids: this.spids.ids,
            rid: this.rid,
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
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
