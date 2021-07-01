<template>
  <div id="home">
    <el-container class="menu">
      <!-- header -->
      <el-header class="header" style="height: 56px !important">
        <div class="header-tit">
          <img src="../../assets/home/logo@2x.png" />
        </div>
        <div
          class="headname"
          v-for="item in levelList"
          :key="item.path"
          :to="{ path: item.path }"
        >
          <span>{{ $t(item.name) }}</span>
        </div>
        <!-- 面包屑 -->
        <!-- 点击图标 左侧导航出现和隐藏切换 -->
        <!-- <div class="breadcrumb"> 
            <i
              :class="[
                isCollapse == false ? 'el-icon-s-fold' : 'el-icon-s-unfold',
              ]"
              @click="changeMenu"
            ></i>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="item in levelList"
                :key="item.path"
                :to="{ path: item.path }"
              >
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div> -->
        <!-- header右边部分 -->
        <rightmenu class="rightmenu"></rightmenu>
      </el-header>
      <el-container>
        <!-- 侧边导航 -->
        <el-aside>
          <el-row class="tac">
            <!--强行加入动画过度隐藏效果-->
            <!-- default-active：当前激活菜单的 index  collapse：是否水平折叠收起菜单 -->
            <transition name="el-fade-in">
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                unique-opened
                router
                @open="handleOpen"
                v-if="!isCollapse"
                :collapse="isCollapse"
                :class="{ isCollapseFalseStyle: isCollapse != true }"
              >
                <!--将路由赋给视图 循环 没有hidden属性的展示-->
                <template
                  v-for="(item, index) in $router.options.routes"
                  v-if="!item.hidden"
                >
                  <el-submenu
                    :index="index + ''"
                    v-if="!item.leaf"
                    :key="item.path"
                  >
                    <template slot="title">
                      <img :src="item.iconCls" class="piclogo" />
                      <span
                        slot="title"
                        :class="{ navName: isActive == item.path }"
                        @click="clickname(item.path)"
                        >{{ $t(item.name) }}</span
                      >
                    </template>
                    <el-menu-item
                      v-for="child in item.children"
                      :index="child.path"
                      :key="child.path"
                      v-if="!child.hidden"
                      >{{ $t(child.name) }}
                    </el-menu-item>
                  </el-submenu>
                  <!-- 没有children的leaf属性 点击直接跳转 -->
                  <el-menu-item style="padding-left:15px !important;"
                    v-if="item.leaf"
                    :index="item.children[0].path"
                    :key="item.children[0].path"
                  >
                    <img :src="item.iconCls" class="piclogo" style="margin-right:5px !important;" />
                    <span slot="title"> {{ $t(item.children[0].name) }}</span>
                  </el-menu-item>
                </template>
              </el-menu>
            </transition>
          </el-row>
        </el-aside>

        <!-- 右侧布局显示区域 -->
        <el-main>
          <!-- 跳转展示的区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 
<script>
import rightmenu from "./rightmenu";
export default {
  components: {
    rightmenu,
  },
  name: "home",
  data() {
    return {
      isCollapse: false, //false为出现 true为隐藏
      levelList: null,
      isActive: 0,
    };
  },
  methods: {
    //渲染面包屑 获取router的name元素
    getBreadcrumb() {
      //$route.matched一个数组 包含当前路由的所有嵌套路径片段的路由记录
      let matched = this.$route.matched.filter((item) => item.name);
      this.levelList = matched;
    },

    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //点击图标切换隐藏侧边栏
    changeMenu() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },

    //点击根据路径判断  导航变色
    clickname: function (path) {
      this.isActive = path;
      console.log(path);
    },
  },
  watch: {
    //监听路由变化，自动缩减左边菜单栏目  渲染面包屑
    $route() {
      let width = document.body.clientWidth;
      if (width >= 700) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
      //面包屑监听路由变化
      this.getBreadcrumb();
    },
  },
  //页面初始获取路由信息渲染给面包屑
  created() {
    this.getBreadcrumb();
  },
  mounted() {
    //console.log(this.$router.options.routes)
  },
};
</script>
 
<style lang="less" scoped>
#home {
  background: #f1f2f9;
  width: 100%;
  height: 100%;
}
.menu {
  width: 100%;
  height: 100%;
}
.div-logo {
  width: 100%;
  height: 135px;
}
// img {
//   width: 45%;
// }

.header {
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .header-tit {
    margin-left: 24px;
    color: #fff;
    img {
      width: 112px;
      margin-top: 25px;
    }
  }
  .headname {
    display: none;
    span {
      position: absolute;
      left: 230px;
      top: 18px;
      height: 20px;
      height: 20px;
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      line-height: 20px;
    }
  }
  :nth-last-child(2) {
    display: block;
  }
}
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.breadcrumb i {
  font-size: 25px;
  margin-right: 20px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-breadcrumb-item {
  font-size: 16px;
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
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-submenu {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.el-submenu .navName {
  width: 100%;
  display: inline-block;
  color: #555566;
}
.el-submenu .el-menu-item{
  padding: 0 0 0 60px !important;
}
.el-submenu i {
  display: none !important;
}
.el-aside {
  width: auto !important;
}
.isCollapseFalseStyle {
  width: 200px !important;
}
.piclogo {
  widows: 20px;
  height: 20px;
  margin-right: 10px;
}
@media screen and (min-width: 700px) {
  .header {
    background: #fff;
  }
}
@media screen and (max-width: 700px) {
  .header {
    background: #fff;
  }
}
</style>

