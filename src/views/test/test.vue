<template>
  <div>
    <!-- wangEditor 用法 -->
    <wang-editor html="123" @change="change"></wang-editor>
  </div>
</template>

<script>
import WangEditor from "@/components/wangeditor";
export default {
  components: {
    WangEditor,
  },
  data() {
    return {};
  },
  methods: {
    change(v) {
      console.log(v);
    },
  },
};
</script>