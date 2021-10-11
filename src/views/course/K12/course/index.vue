<template>
  <div class="meedu-main-body">
    <div class="float-left mb-30">
      <p-button
        text="添加"
        @click="$router.push({ name: 'K12CourseCreate' })"
        type="primary"
        p="addons.XiaoBanKe.course.store"
      >
      </p-button>
    </div>
    <div class="float-left">
      <div class="float-left d-flex">
        <div>
          <el-input
            class="w-200px"
            v-model="filter.id"
            placeholder="课程ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            class="w-200px"
            v-model="filter.keywords"
            placeholder="课程名称关键字"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select
            class="w-200px"
            placeholder="课程类型"
            v-model="filter.type"
          >
            <el-option
              v-for="(item, index) in filterData.typeList"
              :key="index"
              :label="item.title"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ml-10">
          <el-select class="w-200px" placeholder="状态" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.statusList"
              :key="index"
              :label="item.title"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-button @click="firstPageLoad()" type="primary" plain>
            筛选
          </el-button>
          <el-button @click="paginationReset()">清空</el-button>
        </div>
      </div>
    </div>
    <div class="float-left mt-30" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="list"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
          class="float-left"
        >
          <el-table-column prop="id" sortable label="ID" width="100">
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="120">
          </el-table-column>
          <el-table-column property="category.name" label="分类">
          </el-table-column>
          <el-table-column label="课程名" width="500">
            <template slot-scope="scope">
              <div class="d-flex">
                <div>
                  <img :src="scope.row.thumb" width="120" height="90" />
                </div>
                <div class="ml-10">
                  {{ scope.row.title }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="status_text" label="状态" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="info">
                未开始
              </el-tag>
              <el-tag v-else-if="scope.row.status === 1" type="success">
                招生中
              </el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="warning">
                停止招生
              </el-tag>
              <el-tag v-else-if="scope.row.status === 3" type="pramry">
                已开课
              </el-tag>
              <el-tag v-else-if="scope.row.status === 4" type="danger">
                已结课
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="价格" property="charge" width="120">
            <template slot-scope="scope">
              <div>现价：{{ scope.row.charge }}元</div>
              <div class="ori-charge">
                原价：{{ scope.row.original_charge }}元
              </div>
            </template>
          </el-table-column>
          <el-table-column label="报名" width="120">
            <template slot-scope="scope">
              <div>报名：{{ scope.row.join_people_num || 0 }}人</div>
              <div>上限：{{ scope.row.max_people_num }}人</div>
            </template>
          </el-table-column>
          <el-table-column label="时间" sortable width="350">
            <template slot-scope="scope">
              <div>开课：{{ scope.row.open_at | dateFormat }}</div>
              <div>结课：{{ scope.row.over_at | dateFormat }}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <p-link
                text="订单"
                type="primary"
                @click="
                  $router.push({
                    name: 'K12CourseOrder',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.XiaoBanKe.order.list"
              ></p-link>
              <p-link
                text="编辑"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'K12CourseUpdate',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.XiaoBanKe.course.update"
              ></p-link>
              <p-link
                text="删除"
                class="ml-5"
                type="danger"
                @click="destory(scope.row.id)"
                p="addons.XiaoBanKe.course.delete"
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
export default {
  data() {
    return {
      pageName: "k12-list",
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        cid: null,
        id: null,
        type: -1,
        keywords: null,
        status: -1,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        typeList: [],
        statusList: [],
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
      this.filter.cid = null;
      this.filter.id = null;
      this.filter.keywords = null;
      this.filter.status = -1;
      this.filter.type = -1;
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
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.xiaoBanKe.Course.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;

        this.filterData.typeList = res.data.typeMap;
        this.filterData.statusList = res.data.statusMap;
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
          this.$api.xiaoBanKe.Course.Destroy(item)
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

<style lang="less" scoped>
.ori-charge {
  text-decoration: line-through;
}
</style>
