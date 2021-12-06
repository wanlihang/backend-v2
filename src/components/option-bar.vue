<template>
  <div class="options-link">
    <div
      class="link"
      @click="$router.push({ name: 'SystemConfig', query: { key: value } })"
    >
      <img src="../assets/images/config/icon-option.png" />
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["text", "value"],
};
</script>
