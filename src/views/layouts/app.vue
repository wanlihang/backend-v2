<template>
  <div id="home">
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
              {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
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
              <template v-for="(item, index) in menus">
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
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import Menus from "@/js/menus.js";
import CONSTANT from "@/js/constant.js";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      defaultActive: "Dashboard",
      menus: Menus,
    };
  },
  computed: {
    ...mapState(["user"]),
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
  mounted() {
    let activeName =
      typeof CONSTANT.menuActiveMap[this.$route.name] !== "undefined"
        ? CONSTANT.menuActiveMap[this.$route.name]
        : "Dashboard";
    this.defaultActive = activeName;
  },
  methods: {
    ...mapMutations(["logout"]),
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
      this.logout();
      this.$message.success(this.$t("common.success"));
      this.$router.push({ name: "Login" });
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
      overflow-y: auto;
      box-sizing: border-box;
      padding-top: 24px;
      background-color: white;
    }

    .page-main-body-box {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
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

