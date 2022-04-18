<template>
  <div class="watch-contanier">
    <div class="user-box" ref="userBox">
      <div
        class="bullet-user"
        v-for="(item, index) in users"
        :key="index"
        :id="item.id"
      >
        <div class="nickname">
          {{ item.user.nick_name }}
          <strong v-if="item.user.is_ban === 1 || all_ban === 1"
            >(已禁言)</strong
          >
        </div>
        <el-dropdown trigger="click">
          <div class="config"><i class="el-icon-more-outline"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="banUser(item.user)">
              <span v-if="item.user.is_ban === 1 || all_ban === 1">解禁</span>
              <span v-else>禁言</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <template v-if="users.length > 0">
        <div class="bullet-user active" v-if="!over">
          <div class="addmore" @click="getMoreUsers()">加载更多</div>
        </div>
      </template>
    </div>
    <div class="config-box">
      <div class="d-flex">
        <div class="label">全员禁言</div>
        <el-switch
          class="ml-10"
          v-model="all_ban"
          :active-value="1"
          :inactive-value="0"
          @change="roomAct"
        >
        </el-switch>
      </div>
      <div class="num">全体({{ this.total }}人)</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["vid", "course", "roomBan"],
  data() {
    return {
      users: [],
      pagination: {
        video_id: null,
        course_id: null,
        page: 1,
        size: 100,
      },
      loading: false,
      pageLoading: false,
      over: false,
      total: 0,
      all_ban: null,
    };
  },
  watch: {
    roomBan() {
      this.all_ban = this.roomBan;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.pageLoading || this.over) {
        return;
      }
      this.pageLoading = true;
      let params = {};
      this.pagination.video_id = this.vid;
      this.pagination.course_id = this.course.id;
      Object.assign(params, this.pagination);
      this.$api.Course.Live.Course.Video.Watch(params)
        .then((res) => {
          let users = res.data.data.data;
          this.total = res.data.data.total;
          this.users.push(...users);
          if (this.pagination.size !== res.data.data.data.length) {
            this.over = true;
          }
          this.pageLoading = false;
        })
        .catch((e) => {
          this.pageLoading = false;
          this.$message.error(e.message);
        });
    },
    getMoreChatRecords() {
      this.pagination.page++;
      this.getData();
    },
    banUser(item) {
      if (this.loading) {
        return;
      }
      let act = null;
      let key = item.is_ban;
      if (item.is_ban === 0) {
        act = "user-ban";
      } else {
        act = "user-un-ban";
      }
      let params = {
        course_id: this.course.id,
        video_id: this.vid,
        act: act,
        user_id: item.id,
      };
      this.loading = true;
      this.$api.Course.Live.Course.Video.RoomAction(params)
        .then((res) => {
          if (item.is_ban === 0) {
            item.is_ban = 1;
          } else {
            item.is_ban = 0;
          }
          this.$message.success(this.$t("common.success"));
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    roomAct(val) {
      if (this.loading) {
        return;
      }
      let act = null;
      if (val === 1) {
        act = "room-ban";
      } else {
        act = "room-un-ban";
      }
      let params = {
        course_id: this.course.id,
        video_id: this.vid,
        act: act,
      };
      this.loading = true;
      this.$api.Course.Live.Course.Video.RoomAction(params)
        .then((res) => {
          this.$message.success(this.$t("common.success"));
          this.loading = false;
        })
        .catch((e) => {
          if (this.all_ban === 1) {
            this.all_ban = 0;
          } else {
            this.all_ban = 1;
          }
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.watch-contanier {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  .user-box {
    width: 100%;
    height: 723px;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 30px 15px 0 15px;
    .bullet-user {
      width: 100%;
      height: auto;
      float: left;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 15px;
      }
      &.active {
        display: flex;
        justify-content: center;
      }
      .addmore {
        display: inline-block;
        width: auto;
        height: auto;
        float: left;
        font-size: 13px;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      .nickname {
        height: auto;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 14px;
        strong {
          color: #ff5068;
          font-weight: 400;
          margin-left: 10px;
        }
      }
      .config {
        width: 26px;
        height: 14px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #dddddd;
        cursor: pointer;
        i {
          color: #fff;
        }
      }
    }
  }
  .config-box {
    width: 100%;
    height: 48px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 15px;
    .label {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      line-height: 14px;
    }
    .num {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      line-height: 14px;
    }
  }
}
</style>
