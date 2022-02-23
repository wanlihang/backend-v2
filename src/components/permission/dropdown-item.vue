<template>
  <el-dropdown-item
    :divided="divided"
    :disabled="disabled"
    :icon="icon"
    v-if="through"
    @click.native="$emit('click')"
  >
    <el-link :type="type" :disabled="disabled" :underline="false">
      {{ text }}
    </el-link>
  </el-dropdown-item>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["divided", "type", "disabled", "icon", "p", "text"],
  computed: {
    ...mapState(["user"]),
    through() {
      if (!this.user) {
        return false;
      }
      return typeof this.user.permissions[this.p] !== "undefined";
    },
  },
};
</script>
