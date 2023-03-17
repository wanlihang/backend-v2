<template>
  <span
    >{{ hour === 0 ? null : hour + ":"
    }}{{ minute >= 10 ? minute : "0" + minute }}:{{
      second >= 10 ? second : "0" + second
    }}</span
  >
</template>

<script>
export default {
  props: ["duration"],
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
    };
  },
  mounted() {
    if (this.duration) {
      this.hour = parseInt(this.duration / 3600);
      this.minute = parseInt((this.duration - this.hour * 3600) / 60);
      this.second = this.duration - this.hour * 3600 - this.minute * 60;
    }
  },
};
</script>
