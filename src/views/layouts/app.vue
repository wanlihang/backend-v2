<template>
  <div id="home">
    <el-container class="main-box">
      <el-header class="header-box" style="height: 56px !important">
        <div class="logo-box">
          <img src="@/assets/home/logo.png" width="112" height="30" />
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
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside>
          <el-row>
            <transition name="el-fade-in">
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
                      <img :src="item.icon" class="piclogo" />
                      <span slot="title">{{ $t(item.name) }}</span>
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
                    <img :src="item.icon" class="piclogo" />
                    <span slot="title"> {{ $t(item.name) }}</span>
                  </el-menu-item>
                </template>
              </el-menu>
            </transition>
          </el-row>
        </el-aside>

        <!-- 主区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 
<script>
import Menus from "@/js/menus.js";
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
  mounted() {
    this.defaultActive = this.$route.name;
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
    changePassword() {},
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
  },
};
</script>
 
<style lang="less" scoped>
#home {
  background: #f1f2f9;
  width: 100%;
  height: 100%;
  float: left;
}
.main-box {
  width: 100%;
  height: 100%;
  float: left;
}

.header-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
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

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  .el-row {
    margin-top: 24px;
  }
}

.el-menu-item {
  width: 200px;
  text-align: left;
}

.el-submenu {
  text-align: left;

  .active {
    width: 100%;
    display: inline-block;
    color: #555566;
  }
}

.el-aside {
  width: auto !important;
}

.piclogo {
  widows: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>

