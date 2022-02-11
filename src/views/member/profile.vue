<template>
  <div class="user-main-body" v-if="user" v-loading="loading">
    <div class="float-left bg-white br-15 p-30">
      <back-bar class="mb-30" title="实名信息"></back-bar>
      <div class="panel-info-box">
        <div class="panel-info-item">
          真实姓名： {{ user.profile ? user.profile.real_name : "" }}
        </div>
        <div class="panel-info-item">
          性别：
          <template v-if="user.profile">
            <span v-if="user.profile.gender == 0">未知</span>
            <span v-else-if="user.profile.gender == 1">男</span>
            <span v-else-if="user.profile.gender == 2">女</span>
          </template>
        </div>
        <div class="panel-info-item">
          年龄：{{ user.profile ? user.profile.age : "" }}
        </div>
        <div class="panel-info-item">
          生日： {{ user.profile ? user.profile.birthday : "" }}
        </div>
        <div class="panel-info-item">
          职业： {{ user.profile ? user.profile.profession : "" }}
        </div>
        <div class="panel-info-item">
          住址： {{ user.profile ? user.profile.address : "" }}
        </div>
        <div class="panel-info-item">
          毕业院校： {{ user.profile ? user.profile.graduated_school : "" }}
        </div>
        <div class="panel-info-item">
          身份证号码： {{ user.profile ? user.profile.id_number : "" }}
        </div>
      </div>
    </div>
    <div class="panel-box mt-30">
      <div class="panel-body">
        <div class="user-extra-info-box">
          <div class="float-left mb-15 d-flex">
            <div class="info-item">
              <div class="info-label">毕业证照片：</div>
              <div class="info-value">
                <template v-if="user.profile && user.profile.diploma">
                  <el-image
                    style="width: 200px; height: 150px; border-radius: 8px"
                    :src="user.profile.diploma"
                    lazy
                    :preview-src-list="[user.profile.diploma]"
                  >
                  </el-image>
                </template>
                <div v-else class="image"></div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">身份证正面照：</div>
              <div class="info-value">
                <template v-if="user.profile && user.profile.id_frontend_thumb">
                  <el-image
                    style="width: 200px; height: 150px; border-radius: 8px"
                    :src="user.profile.id_frontend_thumb"
                    lazy
                    :preview-src-list="[user.profile.id_frontend_thumb]"
                  >
                  </el-image>
                </template>
                <div v-else class="image"></div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">身份证背面照：</div>
              <div class="info-value">
                <template v-if="user.profile && user.profile.id_backend_thumb">
                  <el-image
                    style="width: 200px; height: 150px; border-radius: 8px"
                    :src="user.profile.id_backend_thumb"
                    lazy
                    :preview-src-list="[user.profile.id_backend_thumb]"
                  >
                  </el-image>
                </template>
                <div v-else class="image"></div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">手持身份证照：</div>
              <div class="info-value">
                <template v-if="user.profile && user.profile.id_hand_thumb">
                  <el-image
                    style="width: 200px; height: 150px; border-radius: 8px"
                    :src="user.profile.id_hand_thumb"
                    lazy
                    :preview-src-list="[user.profile.id_hand_thumb]"
                  >
                  </el-image>
                </template>
                <div v-else class="image"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      id: null,
      user: null,
      loading: false,
    };
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
  .panel-info-box {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding-bottom: 20px;
    padding-top: 10px;
    display: grid;
    row-gap: 30px;
    column-gap: 0px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    .panel-info-item {
      height: 14px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 14px;
    }
  }
}
.info-item {
  width: 324px;
  height: auto;
  float: left;
  display: flex;
  flex-direction: column;
  .info-label {
    width: 100%;
    float: left;
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 14px;
    margin-bottom: 20px;
  }
  .info-value {
    width: 100%;
    height: auto;
    float: left;
    .image {
      width: 200px;
      height: 150px;
      background: #f0f0f8;
      border-radius: 8px;
    }
  }
}
</style>
