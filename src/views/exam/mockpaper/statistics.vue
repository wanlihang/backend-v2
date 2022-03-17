<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="分数统计"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <el-button @click="exportXlsx()" type="primary"> 导出成绩 </el-button>
      </div>
      <div class="d-flex">
        <div>
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="考试开始时间-起始"
            end-placeholder="考试开始时间-结束"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="filter.submit_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="交卷时间-起始"
            end-placeholder="交卷时间-结束"
          >
          </el-date-picker>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left">
      <div class="d-flex stat-box">
        <div class="flex-1 stat-item">
          <div class="name">总分</div>
          <div class="value">{{ total_score }}分</div>
        </div>
        <div class="flex-1 stat-item">
          <div class="name">及格分</div>
          <div class="value">{{ pass_score }}分</div>
        </div>
        <div class="flex-1 stat-item">
          <div class="name">最低分</div>
          <div class="value">{{ stat.min }}分</div>
        </div>
        <div class="flex-1 stat-item">
          <div class="name">最高分</div>
          <div class="value">{{ stat.max }}分</div>
        </div>
        <div class="flex-1 stat-item">
          <div class="name">平均分</div>
          <div class="value">{{ stat.average }}分</div>
        </div>
        <div class="flex-1 stat-item">
          <div class="name">及格率</div>
          <div class="value">{{ stat.pass_rate }}%</div>
        </div>
        <div class="flex-1 stat-item">
          <div class="name">及格人数</div>
          <div class="value">{{ stat.pass_count }}人</div>
        </div>
        <div class="flex-1 stat-item">
          <div class="name">总人数</div>
          <div class="value">{{ total }}人</div>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          class="float-left"
        >
          <el-table-column prop="user_id" label="用户ID" width="120">
          </el-table-column>
          <el-table-column label="用户" width="300">
            <template slot-scope="scope">
              <div v-if="users[scope.row.user_id]" class="user-item d-flex">
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
              <span v-else class="c-red">用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="最高得分">
            <template slot-scope="scope">
              <span>{{ scope.row.get_score }}分</span>
            </template>
          </el-table-column>
          <el-table-column label="及格">
            <template slot-scope="scope">
              <span v-if="scope.row.get_score >= pass_score">及格</span>
              <span class="c-red" v-else>不及格</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column label="交卷时间">
            <template slot-scope="scope">{{
              scope.row.updated_at | dateFormat
            }}</template>
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
      pageName: "mockpaperStat-list",
      pagination: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      filter: {
        created_at: null,
        submit_at: null,
      },
      pass_score: 0,
      total_score: 0,
      total: 0,
      loading: false,
      list: [],
      users: [],
      stat: [],
      filterData: {
        categories: [],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.created_at = null;
      this.filter.submit_at = null;
    },
  },
  activated() {
    this.getResults();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.created_at = null;
      this.filter.submit_at = null;
      this.getResults();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getResults();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getResults();
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.id = this.$route.query.id;
      Object.assign(params, this.pagination, this.filter);
      this.$api.Exam.Mockpaper.Stat(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.list = res.data.data;
        this.users = res.data.users;
        this.total = res.data.total;
        this.pass_score = res.data.pass_score;
        this.total_score = res.data.total_score;
        this.stat = res.data.stat;
      });
    },
    exportXlsx() {
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.Exam.Mockpaper.Stat(this.pagination.id, params).then((res) => {
        this.loading = false;
        let filename = "成绩导出|" + this.$utils.currentDate() + ".xlsx";
        let sheetName = "默认";

        let rows = [["用户ID", "用户名", "账号", "分数", "及格", "时间"]];
        res.data.data.forEach((item) => {
          let user = res.data.users[item.user_id];
          if (typeof user === "undefined") {
            return;
          }

          let isPass = item.get_score >= res.data.pass_score ? "是" : "否";

          rows.push([
            item.user_id,
            user.nick_name,
            user.mobile,
            item.get_score + "分",
            isPass,
            item.updated_at,
          ]);
        });

        // 总结
        rows.push(["", "", ""]);
        rows.push(["最低分", res.data.stat.min + "分"]);
        rows.push(["最高分", res.data.stat.max + "分"]);
        rows.push(["平均分", res.data.stat.average + "分"]);
        rows.push(["总人数", res.data.total + "人"]);
        rows.push(["及格分", res.data.pass_score + "分"]);
        rows.push(["及格人数", res.data.stat.pass_count + "人"]);
        rows.push(["及格率", res.data.stat.pass_rate + "%"]);

        this.$utils.exportExcel(rows, filename, sheetName);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.stat-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.05);

  .stat-item {
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.05);

    &:last-child {
      border-right: 0;
    }

    .name {
      width: 100%;
      height: auto;
      float: left;
      margin-bottom: 30px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
    }
    .value {
      width: 100%;
      height: auto;
      float: left;
      font-size: 24px;
      font-weight: #333;
    }
  }
}
</style>
