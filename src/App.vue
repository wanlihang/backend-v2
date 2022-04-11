<template>
  <div id="app">
    <template v-if="initComplete">
      <router-view v-if="this.$route.meta.pure" />

      <div id="home" v-if="!this.$route.meta.pure">
        <div class="meedu-main-box">
          <!-- 顶部栏 -->
          <header class="header-box">
            <div class="logo-box">
              <a href="javascript:void(0)" @click="goDashboard">
                <img src="@/assets/home/logo.png" width="112" height="30" />
              </a>
            </div>
            <div class="page-name">{{ $t($route.meta.title) }}</div>
            <div class="user-info" v-if="user">
              <el-dropdown @command="dropMenuEvt">
                <span class="el-dropdown-link">
                  {{ user.name
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="changePassword"
                    >修改密码</el-dropdown-item
                  >
                  <el-dropdown-item command="logout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </header>

          <!-- 页面主体 -->
          <div class="page-body">
            <!-- 左侧菜单 -->
            <div class="page-body-left-menus">
              <div class="app-menus">
                <el-menu
                  :default-active="defaultActive"
                  unique-opened
                  @select="menuSelect"
                >
                  <template v-for="(item, index) in activeMenus">
                    <el-submenu
                      v-if="item.children.length > 0"
                      :index="index + ''"
                      :key="item.key"
                    >
                      <template slot="title">
                        <i class="iconfont" :class="item.icon"></i
                        >{{ $t(item.name) }}
                      </template>
                      <!-- 子菜单 -->
                      <el-menu-item
                        v-for="child in item.children"
                        :index="child.key"
                        :key="child.key"
                        >{{ $t(child.name) }}
                      </el-menu-item>
                    </el-submenu>

                    <el-menu-item
                      class="menu-item"
                      v-else
                      :index="item.key"
                      :key="item.key"
                    >
                      <template slot="title">
                        <i class="iconfont" :class="item.icon"></i
                        >{{ $t(item.name) }}
                      </template>
                    </el-menu-item>
                  </template>
                </el-menu>
              </div>
            </div>

            <div class="page-main-body-box">
              <keep-alive>
                <router-view v-if="this.$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!this.$route.meta.keepAlive"></router-view>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import Utils from "@/js/utils";
import Menus from "@/js/menus.js";
import CONSTANT from "@/js/constant.js";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      defaultActive: "Dashboard",
      menus: Menus,
      loading: false,
      initComplete: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    activeMenus() {
      let menus = [];
      let defaultMenus = Menus;

      if (!this.user) {
        return menus;
      }

      for (let i in defaultMenus) {
        let menuItem = defaultMenus[i];

        if (menuItem.children.length === 0) {
          // 一级菜单不做权限控制
          menus.push(menuItem);
          continue;
        }

        let children = [];

        for (let j in menuItem.children) {
          let childrenItem = menuItem.children[j];

          if (childrenItem.permission === "super-slug") {
            // 超管判断
            if (this.user.is_super) {
              children.push(childrenItem);
            }
            continue;
          }

          if (
            typeof this.user.permissions[childrenItem.permission] !==
            "undefined"
          ) {
            // 存在权限
            children.push(childrenItem);
          }
        }

        if (children.length > 0) {
          menus.push(Object.assign({}, menuItem, { children: children }));
        }
      }

      return menus;
    },
  },
  watch: {
    "$route.name"(newVal) {
      let activeName =
        typeof CONSTANT.menuActiveMap[newVal] !== "undefined"
          ? CONSTANT.menuActiveMap[newVal]
          : "Dashboard";
      this.defaultActive = activeName;
    },
  },
  methods: {
    ...mapMutations(["loginHandle", "setEnabledAddons", "logout"]),
    async getEnabledAddons() {
      // 获取已开启的插件
      let res = await this.$api.System.Addons.LocalList();
      let enabledAddons = {};
      let count = 0;

      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].enabled) {
          count += 1;
          enabledAddons[res.data[i].sign] = 1;
        }
      }

      this.setEnabledAddons(enabledAddons, count);
    },
    async autoLogin() {
      if (this.$route.name !== "Login") {
        let token = Utils.getToken();
        if (token) {
          let res = await this.$api.Administrator.Detail();
          this.loginHandle(res.data);
          await this.getEnabledAddons();
        }
      }
    },
    initMenu() {
      let activeName =
        typeof CONSTANT.menuActiveMap[this.$route.name] !== "undefined"
          ? CONSTANT.menuActiveMap[this.$route.name]
          : "Dashboard";
      this.defaultActive = activeName;
    },
    menuSelect(path) {
      if (this.$route.name === path) {
        // 已经是当前页面
        return;
      }
      this.$router.push({ name: path });
    },
    changePassword() {
      this.$router.push({ name: "AdministratorChangePassword" });
    },
    logoutEvt() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Auth.Logout()
        .then((res) => {
          this.loading = false;
          this.logout();
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "Login" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error("网络错误");
        });
    },
    dropMenuEvt(cmd) {
      if (cmd === "logout") {
        this.logoutEvt();
      } else if (cmd === "changePassword") {
        this.changePassword();
      }
    },
    goDashboard() {
      if (this.$route.name !== "Dashboard") {
        this.$router.push({ name: "Dashboard" });
      }
    },
  },
  mounted() {
    this.initMenu();
    this.autoLogin();
    // 系统初始化完成
    this.initComplete = true;
    // 关闭加载框
    document.getElementById("meedu-loading-box").remove();
  },
};
</script>

<style lang="less" scoped>
.meedu-main-box {
  width: 100%;
  height: 100vh;
  float: left;

  .header-box {
    width: 100%;
    height: 56px;
    float: left;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 0;
    padding-right: 0;
    background-color: white;

    .logo-box {
      margin-left: 44px;
      margin-right: 44px;
      padding-top: 25px;
    }

    .page-name {
      flex: 1;
      padding-left: 30px;
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      line-height: 56px;
      text-align: left;
    }

    .user-info {
      width: auto;
      padding-right: 30px;
    }
  }

  .page-body {
    width: 100%;
    height: calc(100vh - 56px);
    float: left;
    display: flex;

    .page-body-left-menus {
      width: 200px;
      height: 100%;
      float: left;
      overflow-x: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      padding-top: 24px;
      background-color: white;
    }

    .page-main-body-box {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding: 20px 5px 20px 20px;
      overflow-y: auto;
      background-color: #f1f2f9;
    }
  }
}

.el-menu {
  .el-menu-item {
    box-sizing: border-box;
    padding-left: 74px !important;

    &.menu-item {
      padding-left: 20px !important;
    }

    &.is-active {
      background-color: @primary-color;
      color: #fff;
    }
  }
}

.iconfont {
  font-size: 24px;
  margin-right: 15px;
  color: #555566;
}
</style>
