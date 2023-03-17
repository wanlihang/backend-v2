<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="团列表详情"></back-bar>
    <div class="float-left" v-loading="loading">
      <div class="float-left flex-column mb-30">
        <div class="title mb-30">已支付团员：</div>
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="users[1]"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column label="团员">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="scope.row.user">
                <div class="avatar">
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">{{ scope.row.user.nick_name }}</div>
              </div>
              <span class="c-red" v-else>学员不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="加入日期" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at | dateFormat }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="float-left flex-column">
        <div class="title mb-30">未支付团员：</div>
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="users[0]"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column label="团员">
            <template slot-scope="scope">
              <div class="user-item d-flex" v-if="scope.row.user">
                <div class="avatar">
                  <img :src="scope.row.user.avatar" width="40" height="40" />
                </div>
                <div class="ml-10">{{ scope.row.user.nick_name }}</div>
              </div>
              <span class="c-red" v-else>学员不存在</span>
            </template>
          </el-table-column>
          <el-table-column label="加入日期" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at | dateFormat }}</span>
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
      pagination: {
        id: this.$route.query.id,
        tid: this.$route.query.tid,
      },
      loading: false,
      users: [],
      list: [],
      goods: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.TuanGou.Tuan.Detail(
        this.pagination.id,
        this.pagination.tid
      ).then((res) => {
        this.loading = false;
        this.users = res.data.users;
        this.list = res.data.item;
        this.goods = res.data.goods;
      });
    },
  },
};
</script>
