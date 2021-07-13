<template>
  <div>
    <!-- wangEditor 用法 -->
    <wang-editor html="123" @change="change"></wang-editor>

    <div>
      <upload-image
        v-model="img"
        helper="图片1200x800"
        :height="150"
        :width="200"
      ></upload-image>
    </div>
  </div>
</template>

<script>
import WangEditor from "@/components/wangeditor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    WangEditor,
    UploadImage,
  },
  data() {
    return {
      img: 'http://public.qiniu.1o1.cc/images/dKeiIHRWoAnqcJRPdn5FrxjToO7E1Hl9tsyWE47Z.jpg',
    };
  },
  methods: {
    change(v) {
      console.log(v);
    },
  },
};
</script>