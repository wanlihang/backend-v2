<template>
  <div class="user-main-body" v-if="user" v-loading="loading">
    <div class="float-left bg-white br-15 p-30">
      <back-bar class="mb-30" title="用户详情"></back-bar>
      <div class="user-info-box">
        <div class="user-base-info-box">
          <div class="user-avatar">
            <img :src="user.avatar" width="80" height="80" />
          </div>
          <div class="user-nickname">{{ user.nick_name }}</div>
          <div class="buttons">
            <el-button
              type="primary"
              class="real-profile"
              @click="
                $router.push({ name: 'MemberProfile', params: { userId: id } })
              "
              >实名信息</el-button
            >
            <el-link
              type="primary"
              class="edit-profile"
              @click="
                $router.push({ name: 'MemberEdit', params: { userId: id } })
              "
            >
              修改资料
            </el-link>
            <p-link
              text="修改积分"
              type="primary"
              class="edit-profile"
              @click="
                $router.push({
                  name: 'MemberCredit1',
                  params: { userId: id },
                })
              "
              p="member.credit1.change"
            >
            </p-link>
            <p-link
              text="修改标签"
              type="primary"
              class="edit-profile"
              @click="
                $router.push({ name: 'MemberTag', params: { userId: id } })
              "
              p="member.tags"
            >
            </p-link>
            <p-link
              text="修改备注"
              type="primary"
              class="edit-profile"
              @click="
                $router.push({ name: 'MemberRemark', params: { userId: id } })
              "
              p="member.remark.update"
            >
            </p-link>
          </div>
        </div>
        <div class="panel-info-box">
          <el-descriptions direction="vertical" :column="4" border>
            <el-descriptions-item label="ID">{{
              user.id
            }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{
              user.mobile
            }}</el-descriptions-item>
            <el-descriptions-item label="积分">{{
              user.credit1
            }}</el-descriptions-item>
            <el-descriptions-item label="VIP">{{
              user.role ? user.role.name : ""
            }}</el-descriptions-item>
            <el-descriptions-item label="VIP过期时间">{{
              user.role_expired_at | dateFormat
            }}</el-descriptions-item>
            <el-descriptions-item label="一级邀请人"
              >{{ user.invitor ? user.invitor.nick_name : ""
              }}<template v-if="user.invitor"
                >(有效期剩
                {{ user.invite_user_expired_at | dateFormat }}天)</template
              ></el-descriptions-item
            >
            <el-descriptions-item label="用户邀请码">{{
              user.is_used_promo_code === 1 ? "已使用" : "未使用"
            }}</el-descriptions-item>
            <el-descriptions-item label="推广余额">{{
              user.invite_balance
            }}</el-descriptions-item>
            <el-descriptions-item label="锁定登录">{{
              user.is_lock === 1 ? "是" : "否"
            }}</el-descriptions-item>
            <el-descriptions-item label="IP地址">{{
              user.register_ip
            }}</el-descriptions-item>
            <el-descriptions-item label="注册区域">{{
              user.register_area
            }}</el-descriptions-item>
            <el-descriptions-item label="标签">
              <template v-if="user.tags">
                <el-tag
                  size="small"
                  class="mr-5"
                  v-for="item in user.tags"
                  :key="item.id"
                >
                  {{ item.name }}
                </el-tag>
              </template>
            </el-descriptions-item>
            <el-descriptions-item label="备注">
              <template v-if="user.remark">
                <div v-html="user.remark.remark"></div>
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>

    <!-- 用户课程区域 -->
    <div class="float-left bg-white br-15 p-30 mt-30">
      <el-tabs v-model="courseTabActive">
        <el-tab-pane
          :label="item.name"
          :name="item.key"
          v-for="item in courseTypes"
          :key="item.key"
        ></el-tab-pane>
      </el-tabs>

      <div class="float-left mt-30">
        <user-courses-comp
          :id="id"
          v-if="courseTabActive === 'vod'"
        ></user-courses-comp>
        <user-videos-comp
          :id="id"
          v-else-if="courseTabActive === 'video'"
        ></user-videos-comp>
        <user-orders-comp
          :id="id"
          v-else-if="courseTabActive === 'order'"
        ></user-orders-comp>
        <user-credit1-comp
          :id="id"
          v-else-if="courseTabActive === 'credit1'"
        ></user-credit1-comp>
        <user-roles-comp
          :id="id"
          v-else-if="courseTabActive === 'roles'"
        ></user-roles-comp>
        <user-invite-comp
          :id="id"
          v-else-if="courseTabActive === 'invite'"
        ></user-invite-comp>
        <user-vod-watch-records-comp
          :id="id"
          v-else-if="courseTabActive === 'vod-watch-records'"
        ></user-vod-watch-records-comp>
        <user-video-watch-records-comp
          :id="id"
          v-else-if="courseTabActive === 'video-watch-records'"
        ></user-video-watch-records-comp>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserCoursesComp from "./detail/vod.vue";
import UserVideosComp from "./detail/video.vue";
import UserOrdersComp from "./detail/orders.vue";
import UserCredit1Comp from "./detail/credit1.vue";
import UserRolesComp from "./detail/roles.vue";
import UserInviteComp from "./detail/invite.vue";
import UserVodWatchRecordsComp from "./detail/vod-watch-records.vue";
import UserVideoWatchRecordsComp from "./detail/video-watch-records.vue";

export default {
  components: {
    UserCoursesComp,
    UserVideosComp,
    UserOrdersComp,
    UserCredit1Comp,
    UserRolesComp,
    UserInviteComp,
    UserVodWatchRecordsComp,
    UserVideoWatchRecordsComp,
  },
  data() {
    return {
      id: null,
      user: null,
      loading: false,
      courseTabActive: "vod",
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
    courseTypes() {
      let types = [
        {
          name: "录播",
          key: "vod",
        },
        {
          name: "视频",
          key: "video",
        },
      ];

      // if (this.enabledAddons["Zhibo"]) {
      //   types.push({
      //     name: "直播",
      //     key: "live",
      //   });
      // }
      // if (this.enabledAddons["MeeduBooks"]) {
      //   types.push({
      //     name: "电子书",
      //     key: "books",
      //   });
      // }
      // if (this.enabledAddons["MeeduTopics"]) {
      //   types.push({
      //     name: "图文",
      //     key: "topics",
      //   });
      // }

      types.push(
        ...[
          {
            name: "录播观看",
            key: "vod-watch-records",
          },
          {
            name: "视频观看",
            key: "video-watch-records",
          },
          {
            name: "订单",
            key: "order",
          },
          {
            name: "积分明细",
            key: "credit1",
          },
          {
            name: "VIP记录",
            key: "roles",
          },
          {
            name: "邀请记录",
            key: "invite",
          },
        ]
      );

      return types;
    },
  },
  mounted() {
    this.id = this.$route.params.userId;

    this.getUser();
  },
  methods: {
    getUser() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Member.Detail(this.id).then((res) => {
        this.user = res.data.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user-main-body {
  width: 100%;
  height: auto;
  float: left;
}

.user-info-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  flex-direction: column;

  .user-base-info-box {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f6f9;
    display: flex;
    flex-direction: row;

    .user-avatar {
      width: 80px;
      height: 80px;
      float: left;
      margin-right: 20px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }

    .user-nickname {
      width: auto;
      height: 80px;
      float: left;
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      line-height: 80px;
    }
    .buttons {
      width: auto;
      height: 80px;
      float: left;
      display: flex;
      flex-direction: row;
      align-items: center;
      .real-profile {
        margin-right: 20px;
        margin-left: 30px;
      }
      .edit-profile {
        margin-right: 20px;
      }
    }
  }
  .panel-info-box {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding-bottom: 20px;
    padding-top: 30px;
  }
}

.user-extra-info-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 30px;

  .info-label {
    font-weight: bold;
    color: #333;
    margin-right: 15px;
  }

  .info-value {
    color: rgba(0, 0, 0, 0.8);
  }
}
</style>
