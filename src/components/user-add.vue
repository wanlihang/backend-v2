<template>
  <div class="meedu-dialog-mask" v-if="show">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">添加学员</div>
      <div class="meedu-dialog-body">
        <div class="float-left">
          <div class="float-left d-flex">
            <div>
              <el-input
                class="w-150px"
                v-model="filter.keywords"
                placeholder="关键字"
              ></el-input>
            </div>
            <div class="ml-10">
              <el-select
                v-model="filter.tag_id"
                class="w-150px"
                placeholder="学员标签"
                filterable
              >
                <el-option
                  v-for="(item, index) in filterData.tags"
                  :key="index"
                  :label="item.name"
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
                start-placeholder="注册开始日期"
                end-placeholder="注册结束日期"
              >
              </el-date-picker>
            </div>
            <div class="ml-10">
              <el-button @click="paginationReset">清空</el-button>
              <el-button @click="firstPageLoad" type="primary">筛选</el-button>
            </div>
          </div>
        </div>
        <div class="float-left mt-30" v-loading="loading">
          <div class="float-left">
            <el-table
              :header-cell-style="{ background: '#f1f2f9' }"
              :data="users"
              class="float-left"
              @sort-change="sortChange"
              :default-sort="{ prop: 'id', order: 'descending' }"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="id" sortable label="学员ID" width="120">
              </el-table-column>
              <el-table-column label="学员">
                <template slot-scope="scope">
                  <div class="user-item d-flex">
                    <div class="avatar">
                      <img :src="scope.row.avatar" width="40" height="40" />
                    </div>
                    <div class="ml-10">{{ scope.row.nick_name }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="mobile" label="手机号" width="200">
              </el-table-column>
              <el-table-column sortable="" label="注册时间" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.created_at | dateFormat }}</span>
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
      <div class="meedu-dialog-footer">
        <el-button type="primary" @click="confirm"> 确定 </el-button>
        <el-button @click="close"> 取消 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        keywords: null,
        role_id: null,
        tag_id: null,
        created_at: null,
      },
      total: 0,
      loading: false,
      users: [],
      filterData: {
        tags: [],
        roles: [],
      },
      selectedRows: [],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.filter.keywords = null;
      this.filter.role_id = null;
      this.filter.tag_id = null;
      this.filter.created_at = null;
      this.getUser();
    },
    paginationSizeChange(size) {
      this.pagination.size = size;
      this.getUser();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getUser();
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getUser();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getUser();
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    getUser() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Member.List(params).then((res) => {
        this.loading = false;
        this.users = res.data.data.data;
        this.total = res.data.data.total;

        this.filterData.tags = res.data.tags;
        this.filterData.roles = res.data.roles;
      });
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      if (this.selectedRows.length === 0) {
        this.$message.warning("请选择需要操作的学员");
        return;
      }
      this.$emit("confirm", this.selectedRows);
    },
  },
};
</script>

<style lang="less" scoped></style>
