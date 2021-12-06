<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="腾讯云视频加密"></back-bar>

    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <p-button
            text="提交加密转码"
            p="addons.TencentCloudHls.videos.submitTransTask"
            @click="submit"
            type="primary"
          ></p-button>
        </div>
        <div class="ml-10">
          <el-input
            class="w-300px"
            v-model="filter.keywords"
            placeholder="视频名关键字"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="getData" type="primary" plain>筛选</el-button>
          <el-button @click="paginationReset">清空</el-button>
        </div>
        <div class="options-link">
          <div
            class="link"
            @click="
              $router.push({
                name: 'SystemConfig',
                query: { key: '腾讯云HLS加密' },
              })
            "
          >
            <img src="../../../assets/images/config/icon-option.png" />
            腾讯云HLS加密
          </div>
        </div>
      </div>
    </div>

    <div class="float-left mt-30" v-loading="loading">
      <el-table
        :data="list"
        @selection-change="handleSelectionChange"
        class="float-left"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="title" label="视频"> </el-table-column>
        <el-table-column prop="tencent_video_id" label="FileId" width="320">
        </el-table-column>
        <el-table-column label="状态" width="200">
          <template slot-scope="scope">
            <el-tag
              type="danger"
              v-if="typeof hlsVideoIds[scope.row.id] === 'undefined'"
            >
              未提交
            </el-tag>
            <el-tag v-else type="success">已提交</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="float-left mt-30 text-center">
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
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        keywords: null,
      },
      total: 0,
      loading: false,
      list: [],
      hlsVideoIds: [],
      selectedRows: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.keywords = null;
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
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.TencentHls.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;

        this.hlsVideoIds = res.data.hlsVideoIds;
      });
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    submit() {
      if (this.loading) {
        return;
      }
      if (this.selectedRows === null) {
        this.$message.warning("请选择需要操作的数据");
        return;
      }
      this.loading = true;

      let ids = [];
      this.selectedRows.forEach((item) => {
        ids.push(item.id);
      });

      this.$api.TencentHls.Submit({
        ids: ids,
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.loading = false;
          this.getData();
        })
        .catch((e) => {
          this.$message.error(e.message);
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
