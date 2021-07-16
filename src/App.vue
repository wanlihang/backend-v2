<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import Utils from "@/js/utils";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      locollanguage: localStorage.getItem("LANGUAGE") || "zh",
    };
  },
  methods: {
    ...mapMutations(["loginHandle", "setEnabledAddons"]),
    getEnabledAddons() {
      // 获取已开启的插件
      this.$api.System.Addons.LocalList().then((res) => {
        let enabledAddons = {};

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].enabled) {
            enabledAddons[res.data[i].sign] = 1;
          }
        }

        this.setEnabledAddons(enabledAddons);
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
