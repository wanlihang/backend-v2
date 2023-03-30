<template>
  <div class="user-main-body" v-if="user" v-loading="loading">
    <div class="float-left bg-white br-15 p-30">
      <back-bar class="mb-30" title="学员详情"></back-bar>
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
          <div class="panel-info-item">ID：{{ user.id }}</div>
          <div class="panel-info-item">手机号：{{ user.mobile }}</div>
          <div class="panel-info-item">积分：{{ user.credit1 }}</div>
<!--          <div class="panel-info-item">-->
<!--            VIP： {{ user.role ? user.role.name : "" }}-->
<!--          </div>-->
<!--          <div class="panel-info-item">-->
<!--            VIP过期时间：{{ user.role_expired_at | dateFormat }}-->
<!--          </div>-->
<!--          <div class="panel-info-item">-->
<!--            一级邀请人：{{ user.invitor ? user.invitor.nick_name : "" }}-->
<!--            <template v-if="user.invitor">-->
<!--              <div class="item">-->
<!--                (有效期剩 {{ user.invite_user_expired_at | dateFormat }}天)-->
<!--              </div>-->
<!--            </template>-->
<!--          </div>-->
<!--          <div class="panel-info-item">-->
<!--            学员邀请码：{{-->
<!--              user.is_used_promo_code === 1 ? "已使用" : "未使用"-->
<!--            }}-->
<!--          </div>-->
<!--          <div class="panel-info-item">推广余额：{{ user.invite_balance }}</div>-->
          <div class="panel-info-item">
            锁定登录：{{ user.is_lock === 1 ? "是" : "否" }}
          </div>
          <div class="panel-info-item">IP地址： {{ user.register_ip }}</div>
          <div class="panel-info-item">注册区域： {{ user.register_area }}</div>
          <div class="panel-info-item">
            标签：<template v-if="user.tags">
              <el-tag class="mr-5" v-for="item in user.tags" :key="item.id">
                {{ item.name }}
              </el-tag>
            </template>
          </div>
          <div class="panel-info-item">
            备注：<template v-if="user.remark">
              <span v-html="user.remark.remark"></span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 学员课程区域 -->
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
          name: "实验",
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
            name: "实验进度",
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
    display: grid;
    row-gap: 30px;
    column-gap: 0px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    .panel-info-item {
      display: flex;
      width: auto;
      height: auto;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 14px;
      align-items: center;
      .item {
        flex: 1;
        line-height: 20px;
        margin-left: 5px;
      }
      span {
        display: inline-block;
      }
    }
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
