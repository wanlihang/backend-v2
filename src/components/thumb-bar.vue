<template>
  <div class="d-flex" style="width: 100%">
    <template v-if="title">
      <div class="j-flex" style="width: 120px">
        <div
          :style="{
            'background-image': 'url(' + value + ')',
            width: width + 'px',
            height: height + 'px',
            'background-position': 'center center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
          }"
        ></div>
      </div>
      <div class="ml-10" style="max-width: 250px">
        {{ title }}
      </div>
    </template>
    <template v-else>
      <div
        :style="{
          'background-image': 'url(' + value + ')',
          width: width + 'px',
          height: height + 'px',
          'background-position': 'center center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
        }"
      ></div>
    </template>
  </div>
</template>
<script>
export default {
  props: ["value", "width", "height", "title"],
  methods: {},
};
</script>
