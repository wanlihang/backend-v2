<template>
  <div class="image-group-box">
    <template v-if="config.v === 'v-1'">
      <img v-if="config.items[0].src" :src="config.items[0].src" width="100%" />
      <img
        v-else
        src="@/assets/images/decoration/h5/empty-image.png"
        width="100%"
      />
    </template>

    <template v-else-if="config.v === 'v-2'">
      <div class="d-flex">
        <div class="flex-1">
          <img
            v-if="config.items[0].src"
            :src="config.items[0].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>

        <div class="flex-1" v-if="config.items[1]">
          <img
            v-if="config.items[1].src"
            :src="config.items[1].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
      </div>
    </template>

    <template v-else-if="config.v === 'v-3'">
      <div class="d-flex">
        <div class="flex-1">
          <img
            v-if="config.items[0].src"
            :src="config.items[0].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
        <div class="flex-1" v-if="config.items[1]">
          <img
            v-if="config.items[1].src"
            :src="config.items[1].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
        <div class="flex-1" v-if="config.items[2]">
          <img
            v-if="config.items[2].src"
            :src="config.items[2].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
      </div>
    </template>

    <template v-else-if="config.v === 'v-4'">
      <div class="d-flex">
        <div class="flex-1">
          <img
            v-if="config.items[0].src"
            :src="config.items[0].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
        <div class="flex-1" v-if="config.items[1]">
          <img
            v-if="config.items[1].src"
            :src="config.items[1].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
        <div class="flex-1" v-if="config.items[2]">
          <img
            v-if="config.items[2].src"
            :src="config.items[2].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
        <div class="flex-1" v-if="config.items[3]">
          <img
            v-if="config.items[3].src"
            :src="config.items[3].src"
            width="100%"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
          />
        </div>
      </div>
    </template>

    <template v-else-if="config.v === 'v-1-2'">
      <div class="d-flex">
        <div class="flex-1" style="height: 150px">
          <img
            v-if="config.items[0].src"
            :src="config.items[0].src"
            width="100%"
            height="150"
          />
          <img
            v-else
            src="@/assets/images/decoration/h5/empty-image.png"
            width="100%"
            height="150"
          />
        </div>
        <div class="flex-1">
          <div class="float-left" style="height: 75px" v-if="config.items[1]">
            <img
              v-if="config.items[1].src"
              :src="config.items[1].src"
              width="100%"
              height="75"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/empty-image.png"
              width="100%"
              height="75"
            />
          </div>
          <div class="float-left" style="height: 75px" v-if="config.items[2]">
            <img
              v-if="config.items[2].src"
              :src="config.items[2].src"
              width="100%"
              height="75"
            />
            <img
              v-else
              src="@/assets/images/decoration/h5/empty-image.png"
              width="100%"
              height="75"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.image-group-box {
  width: 100%;
  height: auto;
  float: left;
}
</style>