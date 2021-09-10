<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="needKeepAlive" />
    </keep-alive>

    <router-view v-if="!needKeepAlive" />
  </div>
</template>
<script>
import Utils from "@/js/utils";
import { mapMutations } from "vuex";

export default {
  computed: {
    needKeepAlive() {
      if (typeof this.$route.meta.keepAlive === "undefined") {
        return false;
      }
      return this.$route.meta.keepAlive;
    },
  },
  methods: {
    ...mapMutations(["loginHandle", "setEnabledAddons"]),
    getEnabledAddons() {
      // 获取已开启的插件
      this.$api.System.Addons.LocalList().then((res) => {
        let enabledAddons = {};
        let count = 0;

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].enabled) {
            count += 1;
            enabledAddons[res.data[i].sign] = 1;
          }
        }

        this.setEnabledAddons(enabledAddons, count);
      });
    },
  },
  mounted() {
    // 自动登录
    if (this.$route.name !== "Login") {
      let token = Utils.getToken();
      if (token) {
        this.$api.Administrator.Detail().then((res) => {
          this.loginHandle(res.data);

          this.getEnabledAddons();
        });
      }
    }
  },
};
</script>
<style>
</style>
