<template>
  <div class="meedu-main-body" v-if="id">
    <back-bar class="mb-30" title="录播课程详情"></back-bar>

    <div class="float-left">
      <div class="float-left">
        <el-tabs v-model="tabActive">
          <el-tab-pane
            :label="item.name"
            :name="item.key"
            v-for="(item, index) in tabs"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="float-left">
      <sub-users :id="id" v-if="tabActive === 'sub-users'"></sub-users>
      <watch-records
        :id="id"
        v-else-if="tabActive === 'watch-records'"
      ></watch-records>
    </div>
  </div>
</template>

<script>
import SubUsers from "./sub-users.vue";
import WatchRecords from "./watch-records.vue";

export default {
  components: {
    SubUsers,
    WatchRecords,
  },
  data() {
    return {
      id: null,
      tabActive: "sub-users",
      tabs: [
        {
          name: "订阅用户",
          key: "sub-users",
        },
        {
          name: "观看记录",
          key: "watch-records",
        },
      ],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>