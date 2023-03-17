<template>
  <el-button
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :autofocus="autofocus"
    @click="$emit('click')"
    v-if="through"
    >{{ text }}</el-button
  >
</template>

<script>
import { mapState } from "vuex";

export default {
  props: [
    "type",
    "p",
    "text",
    "size",
    "plain",
    "round",
    "circle",
    "loading",
    "disabled",
    "icon",
    "autofocus",
  ],
  computed: {
    ...mapState(["user"]),
    through() {
      if (!this.user) {
        return false;
      }
      return typeof this.user.permissions[this.p] !== "undefined";
    }
  },
};
</script>