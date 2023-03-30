<template>
  <div class="meedu-main-body" v-if="id">
    <back-bar class="mb-30" title="实验学员"></back-bar>

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
      <!-- <comments :id="id" v-else-if="tabActive === 'comments'"></comments> -->
    </div>
  </div>
</template>

<script>
import SubUsers from "./components/sub-users.vue";
import WatchRecords from "./components/watch-records.vue";

export default {
  components: {
    SubUsers,
    WatchRecords,
  },
  data() {
    return {
      pageName: "vodview-list",
      id: this.$route.params.id,
      tabActive: "sub-users",
      tabs: [
        {
          name: "购买学员",
          key: "sub-users",
        },
        {
          name: "观看记录",
          key: "watch-records",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped></style>
