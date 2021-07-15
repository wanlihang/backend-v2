<template>
  <div class="float-left">
    <div class="filter-box">
      <div class="float-left d-flex">
        <div class="d-flex">
          <div class="filter-label">UID</div>
          <div class="flex-1 ml-15">
            <el-input
              class="w-100"
              v-model="filter.user_id"
              placeholder="请选择用户"
              style="width: 200px"
            ></el-input>
          </div>
        </div>
        <div class="d-flex ml-15">
          <div class="filter-label">看完时间</div>
          <div class="flex-1 ml-15">
            <el-date-picker
              v-model="filter.watched_start_at"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="float-left mt-15">
        <el-button @click="getRecords" type="primary">筛选</el-button>
        <el-button @click="paginationReset">清空</el-button>
        <el-button @click="importexcel" type="primary">导出表格</el-button>
      </div>
    </div>
    <div class="table-body top-left-radius" v-loading="loading">
      <div class="float-left">
        <el-table :data="records" stripe class="float-left">
          <el-table-column prop="course_id" label="课程ID" width="80">
          </el-table-column>
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div class="d-flex" v-if="users[scope.row.user_id]">
                <div>
                  <img
                    :src="users[scope.row.user_id].avatar"
                    width="40"
                    height="40"
                  />
                </div>
                <div class="ml-10">
                  {{ users[scope.row.user_id].nick_name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="手机号" width="160">
            <template slot-scope="scope">
              <div class="d-flex" v-if="users[scope.row.user_id]">
                <div class="ml-10">
                  {{ users[scope.row.user_id].mobile }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="观看进度" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.progress }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" label="开始时间" width="200">
          </el-table-column>
          <el-table-column prop="watched_at" label="看完时间" width="200">
          </el-table-column>
          <el-table-column label="订阅" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.is_watched == 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="
                  $router.push({
                    name: 'RecordDetail',
                    query: { id: scope.row.id },
                  })
                "
                >详情</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="float-left mt-15">
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
import Utils from "@/js/utils.js";
export default {
  data() {
    return {
      course_id: this.$route.query.course_id,
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        watched_start_at: null,
        watched_end_at: null,
      },
      total: 0,
      loading: false,
      records: [],
      users: [],
    };
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.watched_start_at = null;
      this.filter.watched_end_at = null;
      this.getRecords();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getRecords();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getRecords();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getRecords();
    },
    getRecords() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Course.Vod.Records.List(this.course_id, params).then((res) => {
        this.loading = false;
        this.records = res.data.data.data;
        this.total = res.data.data.total;
        this.users = res.data.users;
      });
    },
    importexcel() {
      if (this.loading) {
        return;
      }
      this.loading = true;

      let params = {
        id: this.course_id,
        page: 1,
        size: this.total,
      };
      this.$api.Course.Vod.Records.List(this.course_id, params).then((res) => {
        if (res.data.data.total === 0) {
          this.$message.warn("数据为空");
          return;
        }
        let users = res.data.users;
        let subscribeRecords = res.data.subscribe_records;
        let filename = "课程观看记录|" + Utils.currentDate() + ".xlsx";
        let sheetName = "sheet1";

        let data = [
          [
            "用户ID",
            "用户",
            "手机号",
            "观看进度",
            "开始时间",
            "看完时间",
            "是否订阅",
          ],
        ];
        res.data.data.data.forEach((item) => {
          let user = users[item.user_id];
          if (typeof user === "undefined") {
            return;
          }

          let isSub =
            typeof subscribeRecords[item.user_id] === "undefined" ? "否" : "是";

          data.push([
            item.user_id,
            user.nick_name,
            user.mobile,
            item.progress + "%",
            item.created_at,
            item.watched_at,
            isSub,
          ]);
        });

        Utils.exportExcel(data, filename, sheetName);
        this.loading=false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.filter-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 15px;
  background-color: white;

  .filter-label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>