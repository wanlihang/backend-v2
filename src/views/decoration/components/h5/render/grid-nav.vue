<template>
  <div class="grid-nav-box">
    <div class="grid-nav">
      <div
        class="grid-line"
        :class="{ active: config.line_count === 5 }"
        v-for="index in lineCount"
        :key="index"
      >
        <template v-for="i in config.line_count">
          <div
            class="grid-item"
            :key="i"
            v-if="config.items[(index - 1) * config.line_count + i - 1]"
          >
            <div class="icon">
              <img
                v-if="config.items[(index - 1) * config.line_count + i - 1].src"
                :src="config.items[(index - 1) * config.line_count + i - 1].src"
                width="44"
                height="44"
              />
              <img
                v-else
                src="@/assets/images/decoration/h5/default-grid-nav.png"
                width="44"
                height="44"
              />
            </div>
            <div class="name">
              {{ config.items[(index - 1) * config.line_count + i - 1].name }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
// config.line_count = 每行显示几个
// config.items = nav集
export default {
  props: ["config"],
  computed: {
    lineCount() {
      if (!this.config) {
        return 0;
      }
      return Math.ceil(this.config.items.length / this.config.line_count);
    },
  },
};
</script>

<style lang="less" scoped>
.grid-nav-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 10px 25px;
  background-color: white;

  .grid-line {
    width: 100%;
    height: auto;
    float: left;
    margin-bottom: 15px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 36px;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    &.active {
      gap: 20px;
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    .name {
      width: 100%;
      height: auto;
      float: left;
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      color: #333333;
      line-height: 12px;
      text-align: center;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
