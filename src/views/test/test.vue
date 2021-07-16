<template>
  <div>
    <select-vod :show="true"></select-vod>
  </div>
</template>

<script>
// import WangEditor from "@/components/wangeditor";
// import UploadImage from "@/components/upload-image";
// import MdEditor from "@/components/md-editor";
// import H5Link from "@/components/h5-link/index";
import SelectVod from '@/components/select-vod';

export default {
  components: {
    SelectVod,
  },
  data() {
    return {
      content: "",
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