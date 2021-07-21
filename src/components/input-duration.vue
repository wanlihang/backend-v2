<template>
  <div class="d-flex">
    <div>
      <el-input-number v-model="hour" :min="0" size="small"></el-input-number>
    </div>
    <div class="mx-10">
      <div class="helper-text">时</div>
    </div>
    <div>
      <el-input-number
        v-model="minute"
        :min="0"
        :max="59"
        size="small"
      ></el-input-number>
    </div>
    <div class="mx-10">
      <div class="helper-text">分</div>
    </div>
    <div>
      <el-input-number
        v-model="second"
        :min="0"
        :max="59"
        size="small"
      ></el-input-number>
    </div>
    <div class="mx-10">
      <div class="helper-text">秒</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
    };
  },
  watch: {
    hour() {
      this.emitUpdate();
    },
    minute() {
      this.emitUpdate();
    },
    second() {
      this.emitUpdate();
    },
    value() {
      this.parse();
    },
  },
  mounted() {
    this.parse();
  },
  methods: {
    parse() {
      if (this.value !== null) {
        this.hour = parseInt(this.value / 3600);
        this.minute = parseInt((this.value - this.hour * 3600) / 60);
        this.second = this.value - this.hour * 3600 - this.minute * 60;
      }
    },
    emitUpdate() {
      let result = null;

      if (!(this.hour === 0 && this.minute === 0 && this.second === 0)) {
        result = this.hour * 3600 + this.minute * 60 + this.second;
      }

      console.log(result);

      this.$emit("input", result);
    },
  },
};
</script>