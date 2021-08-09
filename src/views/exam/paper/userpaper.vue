<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="考试记录"></back-bar>
    <div class="float-left mb-30">
      <div class="float-left d-flex">
        <div>
          <el-input
            class="w-200px"
            v-model="filter.user_id"
            placeholder="用户ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select class="w-200px" placeholder="状态" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.statusMap"
              :key="index"
              :label="item.text"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-date-picker
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
      </div>
      <div class="float-left mt-15">
        <el-button @click="firstPageLoad()" type="primary" plain>
          筛选
        </el-button>
        <el-button @click="paginationReset()">清空</el-button>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="list"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
          class="float-left"
        >
          <el-table-column prop="id" sortable label="ID" width="120">
          </el-table-column>
          <el-table-column prop="user_id" sortable label="用户ID" width="120">
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
          <el-table-column label="得分" property="score" sortable width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 2">{{ scope.row.score }}分</span>
            </template>
          </el-table-column>
          <el-table-column label="用时" width="150">
            <template slot-scope="scope">
              <duration-text
                v-if="scope.row.status === 2"
                :duration="scope.row.used_seconds"
              ></duration-text>
            </template>
          </el-table-column>
          <el-table-column prop="status_text" label="状态">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status === 0">未开始</el-tag>
              <el-tag type="primary" v-else-if="scope.row.status === 1"
                >考试中</el-tag
              >
              <el-tag type="success" v-else-if="scope.row.status === 2"
                >已结束</el-tag
              >
              <el-tag type="warning" v-else-if="scope.row.status === 3"
                >阅卷中</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="开始时间"
            sortable
            prop="created_at"
            width="200"
          >
          </el-table-column>
          <el-table-column
            label="交卷时间"
            sortable
            prop="submit_at"
            width="200"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <p-link
                v-if="scope.row.status === 3"
                text="阅卷"
                p="addons.Paper.paper.userPaper.submit"
                type="primary"
                @click="
                  $router.push({
                    name: 'ExamPaperScore',
                    query: {
                      id: pagination.id,
                      user_paper_id: scope.row.id,
                    },
                  })
                "
                class="ml-5"
              ></p-link>
              <p-link
                text="查看"
                p="addons.Paper.paper.userPaper.detail"
                type="primary"
                target="blank"
                :href="`/backend/addons/Paper/${scope.row.paper_id}/userPaper/${scope.row.id}/render`"
                class="ml-5"
              ></p-link>
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
import DurationText from "@/components/duration-text";

export default {
  components: {
    DurationText,
  },
  data() {
    return {
      pagination: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        user_id: null,
        status: -1,
        created_at: null,
        submit_at: null,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        statusMap: [],
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
      this.filter.user_id = null;
      this.filter.status = -1;
      this.filter.submit_at = null;
      this.filter.created_at = null;
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
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getResults();
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Paper.Userpaper(this.pagination.id, params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;

        let statusMap = [
          {
            text: "全部",
            id: -1,
          },
        ];
        statusMap.push(...res.data.statusMap);
        this.filterData.statusMap = statusMap;
      });
    },
    destory(item) {
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
          this.$api.Exam.Paper.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
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
