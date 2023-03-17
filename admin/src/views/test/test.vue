<template>
  <div>
    <!-- <select-resource
      @change="change"
      enabled-resource="vod,video,vip,book,live,topic,learnPath,paper,practice,mock-paper"
    ></select-resource> -->
    <!-- <user-add></user-add> -->

    <!-- <upload-video :show="true"></upload-video> -->

    <quill-editor v-model="content" :height="400"></quill-editor>
  </div>
</template>

<script>
// import UploadImage from "@/components/upload-image";
// import MdEditor from "@/components/md-editor";
// import H5Link from "@/components/h5-link/index";
// import SelectVod from '@/components/select-vod';
// import SelectResource from "@/components/select-resources/index";
// import UserAdd from '@/components/user-add';
// import UploadVideo from "@/components/upload-video";
import QuillEditor from '@/components/quill-editor';

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      content: "",
      img: "http://public.qiniu.1o1.cc/images/dKeiIHRWoAnqcJRPdn5FrxjToO7E1Hl9tsyWE47Z.jpg",
    };
  }
};
</script>