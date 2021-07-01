
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      locollanguage:localStorage.getItem("LANGUAGE") || "zh"
    }
  },
  methods: {
    
  },
  mounted() {
    
  },
}
</script>
<style>
</style>
