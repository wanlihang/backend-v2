<template>
  <div>
    <md-editor :content="content" @change="change"></md-editor>
  </div>
</template>

<script>
// import WangEditor from "@/components/wangeditor";
// import UploadImage from "@/components/upload-image";
import MdEditor from "@/components/md-editor";

export default {
  components: {
    MdEditor,
  },
  data() {
    return {
      content: '',
      img: "http://public.qiniu.1o1.cc/images/dKeiIHRWoAnqcJRPdn5FrxjToO7E1Hl9tsyWE47Z.jpg",
    };
  },
  methods: {
    change(v1, v2) {
      console.log(v1, v2);
    },
  },
};
</script>