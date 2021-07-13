<template>
  <div>
    <!-- wangEditor 用法 -->
    <!-- <wang-editor html="123" @change="change"></wang-editor> -->

    <select-image :show="true" :from="1"></select-image>
  </div>
</template>

<script>
// import WangEditor from "@/components/wangeditor";
import SelectImage from "@/components/select-image";

export default {
  components: {
    // WangEditor,
    SelectImage,
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