<template>
  <div class="user-main-body" v-if="user" v-loading="loading">
    <div class="float-left bg-white br-15 p-30">
      <back-bar class="mb-30" title="用户详情"></back-bar>
      <div class="user-info-box">
        <div class="user-base-info-box">
          <div class="user-avatar">
            <img :src="user.avatar" width="100" height="100" />
          </div>
          <div class="user-nickname">{{ user.nick_name }}</div>
        </div>
      </div>
    </div>

    <div class="panel-box mt-30">
      <div class="panel-header">
        <span>基础信息</span>
        <el-link
          type="primary"
          @click="$router.push({ name: 'MemberEdit', params: { userId: id } })"
          class="ml-15"
        >
          <i class="el-icon-edit"></i>
        </el-link>
      </div>
      <div class="panel-body">
        <div class="user-extra-info-box">
          <div class="float-left mb-15 d-flex">
            <div class="flex-1 d-flex">
              <div class="info-label">ID</div>
              <div class="flex-1 info-value">{{ user.id }}</div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">手机号</div>
              <div class="flex-1 info-value">{{ user.mobile }}</div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">积分</div>
              <div class="flex-1 info-value">
                <span> {{ user.credit1 }}</span>
                <el-link
                  type="primary"
                  @click="
                    $router.push({
                      name: 'MemberCredit1',
                      params: { userId: id },
                    })
                  "
                  class="ml-15"
                >
                  <i class="el-icon-edit"></i>
                </el-link>
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">VIP</div>
              <div class="flex-1 info-value">
                {{ user.role ? user.role.name : "" }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">VIP过期时间</div>
              <div class="flex-1 info-value">
                {{ user.role_expired_at | dateFormat }}
              </div>
            </div>
          </div>

          <div class="float-left mb-15 mt-15 d-flex">
            <div class="flex-1 d-flex">
              <div class="info-label">锁定登录</div>
              <div class="flex-1 info-value">
                {{ user.is_lock === 1 ? "是" : "否" }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">邀请人</div>
              <div class="flex-1 info-value">
                {{ user.invitor ? user.invitor.nick_name : "" }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">邀请维系时间</div>
              <div class="flex-1 info-value">
                {{ user.invite_user_expired_at | dateFormat }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">邀请余额</div>
              <div class="flex-1 info-value">
                {{ user.invite_balance }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">用户邀请码</div>
              <div class="flex-1 info-value">
                {{ user.is_used_promo_code === 1 ? "已使用" : "未使用" }}
              </div>
            </div>
          </div>

          <div class="float-left mt-15 d-flex">
            <div class="flex-1 d-flex">
              <div class="info-label">注册IP</div>
              <div class="flex-1 info-value">
                {{ user.register_ip }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">注册区域</div>
              <div class="flex-1 info-value">
                {{ user.register_area }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">标签</div>
              <div class="flex-1 info-value">
                <template v-if="user.tags">
                  <el-tag class="mr-5" v-for="item in user.tags" :key="item.id">
                    {{ item.name }}
                  </el-tag>
                </template>
                <el-link
                  type="primary"
                  @click="
                    $router.push({ name: 'MemberTag', params: { userId: id } })
                  "
                  class="ml-10"
                >
                  <i class="el-icon-edit"></i>
                </el-link>
              </div>
            </div>
            <div class="flex-1 d-flex"></div>
            <div class="flex-1 d-flex"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-box mt-30">
      <div class="panel-header">
        <span>用户备注</span>
        <el-link
          type="primary"
          @click="
            $router.push({ name: 'MemberRemark', params: { userId: id } })
          "
          class="ml-15"
        >
          <i class="el-icon-edit"></i>
        </el-link>
      </div>
      <div class="panel-body">
        <template v-if="user.remark">
          <div v-html="user.remark.remark"></div>
        </template>
        <el-empty :image-size="50" v-else></el-empty>
      </div>
    </div>

    <div class="panel-box mt-30">
      <div class="panel-header">实名信息</div>
      <div class="panel-body">
        <div class="user-extra-info-box" v-if="user.profile">
          <div class="float-left mb-15 d-flex">
            <div class="flex-1 d-flex">
              <div class="info-label">真实姓名</div>
              <div class="flex-1 info-value">
                {{ user.profile ? user.profile.real_name : "" }}
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">性别</div>
              <div class="flex-1 info-value">
                <template v-if="user.profile">
                  <span v-if="user.profile.gender == 0">未知</span>
                  <span v-else-if="user.profile.gender == 1">男</span>
                  <span v-else-if="user.profile.gender == 2">女</span>
                </template>
                <span v-else></span>
              </div>
            </div>

            <div class="flex-1 d-flex">
              <div class="info-label">年龄</div>
              <div class="flex-1 info-value">
                {{ user.profile ? user.profile.age : "" }}
              </div>
            </div>

            <div class="flex-1 d-flex">
              <div class="info-label">生日</div>
              <div class="flex-1 info-value">
                {{ user.profile ? user.profile.birthday : "" }}
              </div>
            </div>

            <div class="flex-1 d-flex">
              <div class="info-label">职业</div>
              <div class="flex-1 info-value">
                {{ user.profile ? user.profile.profession : "" }}
              </div>
            </div>
          </div>

          <div class="float-left mb-15 d-flex">
            <div class="flex-1 d-flex">
              <div class="info-label">住址</div>
              <div class="flex-1 info-value">
                {{ user.profile ? user.profile.address : "" }}
              </div>
            </div>

            <div class="flex-1 d-flex">
              <div class="info-label">身份证号</div>
              <div class="flex-1 info-value">
                {{ user.profile ? user.profile.id_number : "" }}
              </div>
            </div>

            <div class="flex-1 d-flex">
              <div class="info-label">毕业院校</div>
              <div class="flex-1 info-value">
                {{ user.profile ? user.profile.graduated_school : "" }}
              </div>
            </div>

            <div class="flex-1 d-flex">
              <div class="info-label">毕业证照片</div>
              <div class="flex-1 info-value">
                <template v-if="user.profile && user.profile.diploma">
                  <el-image
                    style="width: 100px; height: 80px"
                    :src="user.profile.diploma"
                    lazy
                    :preview-src-list="[user.profile.diploma]"
                  >
                  </el-image>
                </template>
              </div>
            </div>
            <div class="flex-1 d-flex">
              <div class="info-label">手持身份证</div>
              <div class="flex-1 info-value">
                <template v-if="user.profile && user.profile.id_hand_thumb">
                  <el-image
                    style="width: 100px; height: 80px"
                    :src="user.profile.id_hand_thumb"
                    lazy
                    :preview-src-list="[user.profile.id_hand_thumb]"
                  >
                  </el-image>
                </template>
              </div>
            </div>
          </div>

          <div class="float-left mb-15 d-flex">
            <div class="flex-1 d-flex">
              <div class="info-label">身份证人像面</div>
              <div class="flex-1 info-value">
                <template v-if="user.profile && user.profile.id_frontend_thumb">
                  <el-image
                    style="width: 100px; height: 80px"
                    :src="user.profile.id_frontend_thumb"
                    lazy
                    :preview-src-list="[user.profile.id_frontend_thumb]"
                  >
                  </el-image>
                </template>
              </div>
            </div>

            <div class="flex-1 d-flex">
              <div class="info-label">身份证国徽面</div>
              <div class="flex-1 info-value">
                <template v-if="user.profile && user.profile.id_backend_thumb">
                  <el-image
                    style="width: 100px; height: 80px"
                    :src="user.profile.id_backend_thumb"
                    lazy
                    :preview-src-list="[user.profile.id_backend_thumb]"
                  >
                  </el-image>
                </template>
              </div>
            </div>
            <div class="flex-1 d-flex"></div>
            <div class="flex-1 d-flex"></div>
            <div class="flex-1 d-flex"></div>
          </div>
        </div>

        <el-empty :image-size="50" v-else></el-empty>
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

  .user-base-info-box {
    width: 300px;
    height: auto;
    float: left;
    box-sizing: border-box;

    .user-avatar {
      width: 100%;
      height: auto;
      float: left;
      text-align: center;
      margin-bottom: 30px;

      img {
        border-radius: 50%;
      }
    }

    .user-nickname {
      width: 100%;
      height: auto;
      float: left;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #333;
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