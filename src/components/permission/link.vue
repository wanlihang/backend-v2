<template>
  <el-link
    :href="href"
    :underline="underline"
    :disabled="disabled"
    :target="target"
    :type="type"
    :icon="icon"
    @click="$emit('click')"
    v-if="user && user.permissions[p]"
    >{{ text }}</el-link
  >
</template>

<script>
import { mapState } from "vuex";

export default {
  props: [
    "href",
    "target",
    "type",
    "underline",
    "disabled",
    "icon",
    "p",
    "text",
  ],
  computed: {
    ...mapState(["user"]),
  },
};
</script>