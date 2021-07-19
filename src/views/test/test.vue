<template>
  <div>
    <select-resource
      @change="change"
      enabled-resource="vod,video,vip,book,live,topic,learnPath,paper,practice,mock-paper"
    ></select-resource>
  </div>
</template>

<script>
// import WangEditor from "@/components/wangeditor";
// import UploadImage from "@/components/upload-image";
// import MdEditor from "@/components/md-editor";
// import H5Link from "@/components/h5-link/index";
// import SelectVod from '@/components/select-vod';
import SelectResource from "@/components/select-resources/index";

export default {
  components: {
    SelectResource,
  },
  data() {
    return {
      content: "",
      img: "http://public.qiniu.1o1.cc/images/dKeiIHRWoAnqcJRPdn5FrxjToO7E1Hl9tsyWE47Z.jpg",
    };
  },
  methods: {
    change(v1) {
      console.log(v1);
    },
  },
};
</script>