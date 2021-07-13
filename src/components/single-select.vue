<template>
  <el-select v-model="localValue" @change="change">
    <el-option
      v-for="(item, index) in rows"
      :key="index"
      :label="item[itemTitle]"
      :value="item[itemKey]"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ["rows", "value", "itemKey", "itemTitle"],
  data() {
    return {
      localValue: null,
    };
  },
  mounted() {
    this.localValue = this.value;
  },
  methods: {
    change(v) {
      console.log(this.localValue);
    },
  },
};
</script>