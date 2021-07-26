<template>
  <div v-html="title"></div>
</template>

<script>
export default {
  props: ["question"],
  computed: {
    title() {
      if (!this.question) {
        return "";
      }
      let defaultTypes = {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
      };
      if (defaultTypes[this.question.type]) {
        return this.question.content;
      }
      let content = JSON.parse(this.question.content);
      return content.header;
    },
  },
};
</script>