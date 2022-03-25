<template>
  <div class="options-link">
    <div class="link" @click="goRouter()">
      <img src="../assets/images/config/icon-option.png" />
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["text", "value"],
  methods: {
    goRouter() {
      if (this.value === "积分") {
        this.$router.push({
          name: "SystemCreditSignConfig",
        });
      } else if (this.value === "微信公众号") {
        this.$router.push({
          name: "SystemMpwechatConfig",
        });
      } else {
        this.$router.push({
          name: "SystemConfig",
          query: { key: this.value },
        });
      }
    },
  },
};
</script>
