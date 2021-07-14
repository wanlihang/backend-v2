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
    ...mapMutations(["loginHandle"]),
  },
  mounted() {
    // 自动登录
    let token = Utils.getToken();
    if (token) {
      this.$api.Administrator.Info().then((res) => {
        this.loginHandle(res.data);
      });
    }
  },
};
</script>
<style>
</style>
