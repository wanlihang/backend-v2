<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <div class="float-left d-flex">
        <div>
          <el-select
            class="w-200px"
            placeholder="课程类型"
            v-model="filter.type"
          >
            <el-option
              v-for="(item, index) in filterData.types"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-input
            class="w-200px"
            v-model="filter.user_id"
            placeholder="用户ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            class="w-200px"
            v-model="filter.other_id"
            placeholder="课程ID"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-button @click="firstPageLoad()" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset()">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table :data="list" class="float-left">
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="100">
          </el-table-column>
          <el-table-column prop="other_id" label="资源ID" width="100">
          </el-table-column>
          <el-table-column label="用户" width="300">
            <template slot-scope="scope">
              <div class="d-flex" v-if="scope.row.user">
                <div>
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">{{ scope.row.user.nick_name }}</div>
              </div>
              <span class="c-red" v-else>用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="100">
          </el-table-column>
          <el-table-column prop="type_title" label="资源"> </el-table-column>
          <el-table-column prop="count" label="照片" width="50">
          </el-table-column>
          <el-table-column label="最后拍照时间" width="200">
            <template slot-scope="scope">{{
              scope.row.last_snap_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link type="primary" @click="see(scope.row)">查看</el-link>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "snapshot-list",
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        type: null,
        user_id: null,
        other_id: null,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        types: [
          {
            id: "vod",
            name: "视频",
          },
          {
            id: "live",
            name: "直播课程",
          },
          {
            id: "book",
            name: "电子书",
          },
          {
            id: "paper",
            name: "考试",
          },
          {
            id: "practice",
            name: "练习",
          },
        ],
      },
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.type = null;
      this.filter.other_id = null;
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
      Object.assign(params, this.filter, this.pagination);
      this.$api.Snapshot.Images.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    see(item) {
      if (!item.images) {
        this.$message.warning("暂无照片");
        return;
      }
      this.$router.push({
        name: "SnapshotImages",
        query: { rid: item.id, other_id: item.other_id, user_id: item.user_id },
      });
    },
  },
};
</script>
