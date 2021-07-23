<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="订单详情"></back-bar>

    <div class="float-left"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
    };
  },
};
</script>