<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="分数统计"></back-bar>
    <div class="float-left mb-30">
      <el-button @click="exportXlsx()" type="primary"> 导出成绩 </el-button>
    </div>
    <div class="float-left">
      <div>
        <span>总分:{{ total_score }}</span>
        <span class="ml-10">及格分:{{ pass_score }}分</span>
        <span class="ml-10">最低分:{{ stat.min }}分</span>
        <span class="ml-10">最高分:{{ stat.max }}分</span>
        <span class="ml-10">平均分:{{ stat.average }}分</span>
        <span class="ml-10">及格率:{{ stat.pass_rate }}%</span>
        <span class="ml-10">及格人数:{{ stat.pass_count }}人</span>
        <span class="ml-10">总人数:{{ total }}人</span>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table :data="list" stripe class="float-left">
          <el-table-column prop="user_id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div v-if="users[scope.row.user_id]" class="d-flex">
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
              <span v-else class="c-red">用户不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="最高得分">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}分</span>
            </template>
          </el-table-column>
          <el-table-column label="及格">
            <template slot-scope="scope">
              <span v-if="scope.row.score >= pass_score">及格</span>
              <span class="c-red" v-else>不及格</span>
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
  data() {
    return {
      pagination: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
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
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationReset() {
      this.pagination.page = 1;
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
      Object.assign(params, this.pagination);
      this.$api.Exam.Paper.Stat(this.pagination.id, params).then((res) => {
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
      this.$api.Exam.Paper.Stat(this.pagination.id, params).then((res) => {
        this.loading = false;
        let filename = "成绩导出|" + Utils.currentDate() + ".xlsx";
        let sheetName = "默认";

        let rows = [["用户ID", "用户名", "手机号", "分数", "及格", "时间"]];
        res.data.data.forEach((item) => {
          let user = res.data.users[item.user_id];
          if (typeof user === "undefined") {
            return;
          }

          let isPass = item.score >= res.data.pass_score ? "是" : "否";

          rows.push([
            item.user_id,
            user.nick_name,
            user.mobile,
            item.score,
            isPass,
            item.created_at,
          ]);
        });

        // 总结
        rows.push(["", "", ""]);
        rows.push(["最低分", res.data.stat.min]);
        rows.push(["最高分", res.data.stat.max]);
        rows.push(["平均分", res.data.stat.average]);
        rows.push(["总人数", res.data.total]);
        rows.push(["及格人数", res.data.stat.pass_count]);
        rows.push(["及格率", res.data.stat.pass_rate + "%"]);

        Utils.exportExcel(rows, filename, sheetName);
      });
    },
  },
};
</script>
