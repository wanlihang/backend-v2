<template>
  <div class="float-left">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <el-button type="danger" @click="delRecords()">删除</el-button>
        <el-button @click="importexcel" type="primary">导出表格</el-button>
      </div>
      <div class="d-flex">
        <div>
          <el-select
            v-model="filter.is_watched"
            class="w-150px"
            placeholder="看完"
          >
            <el-option
              v-for="(item, index) in statusMapRows"
              :key="index"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="watched_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="看完时间-开始"
            end-placeholder="看完时间-结束"
          >
          </el-date-picker>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="records"
          class="float-left"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" sortable label="ID" width="120">
          </el-table-column>
          <el-table-column label="学员">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="users[scope.row.user_id]">
                <div class="avatar">
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
          <el-table-column
            property="progress"
            label="观看进度"
            sortable
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.progress }}%</span>
            </template>
          </el-table-column>
          <el-table-column sortable label="开始时间" width="240">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column sortable label="看完时间" width="240">
            <template slot-scope="scope">{{
              scope.row.watched_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column label="看完" width="80">
            <template slot-scope="scope">
              <span class="c-red" v-if="scope.row.is_watched === 1">是</span>
              <span v-else>否</span>
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
import Utils from "@/js/utils.js";

export default {
  props: ["id"],
  data() {
    return {
      course_id: this.id,
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        user_id: null,
        is_watched: null,
        watched_start_at: null,
        watched_end_at: null,
      },
      watched_at: [],
      total: 0,
      loading: false,
      records: [],
      users: [],
      selectedRows: [],
      statusMapRows: [
        {
          name: "未看完",
          key: 0,
        },
        {
          name: "已看完",
          key: 1,
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  watch: {
    watched_at(newVal) {
      if (newVal) {
        this.filter.watched_start_at = newVal[0];
        this.filter.watched_end_at = newVal[1];
      } else {
        this.filter.watched_start_at = null;
        this.filter.watched_end_at = null;
      }
    },
  },
  mounted() {
    this.course_id = this.id;
    this.getRecords();
  },
  methods: {
    paginationReset() {
      this.watched_at = null;
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.is_watched = null;
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getRecords();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getRecords();
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    getRecords() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      if (params.is_watched === null) {
        params.is_watched = -1;
      }
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
        page: 1,
        size: this.total,
      };
      Object.assign(params, this.filter);

      this.$api.Course.Vod.Records.List(this.course_id, params).then((res) => {
        if (res.data.data.total === 0) {
          this.$message.error("数据为空");
          this.loading = false;
          return;
        }

        let users = res.data.users;
        let filename = "课程观看记录|" + Utils.currentDate() + ".xlsx";
        let sheetName = "sheet1";

        let data = [
          ["用户ID", "用户", "手机号", "观看进度", "开始时间", "看完时间"],
        ];
        res.data.data.data.forEach((item) => {
          let user = users[item.user_id];
          if (typeof user === "undefined") {
            return;
          }

          data.push([
            item.user_id,
            user.nick_name,
            user.mobile,
            item.progress + "%",
            item.created_at,
            item.watched_at,
          ]);
        });

        Utils.exportExcel(data, filename, sheetName);
        this.loading = false;
      });
    },
    delRecords() {
      if (this.selectedRows.length === 0) {
        this.$message.warning("请选择需要操作的数据");
        return;
      }
      this.loading = true;
      let ids = [];
      this.selectedRows.forEach((item) => {
        ids.push(item.id);
      });
      this.$api.Course.Vod.Records.Del(this.course_id, { record_ids: ids })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.getRecords();
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
