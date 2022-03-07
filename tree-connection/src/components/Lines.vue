<template>
  <svg
    class="lines_view"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="200"
  >
    <line
      class="line"
      v-for="(line, index) in lines"
      v-show="line.visiable"
      :key="index"
      :x1="0"
      :x2="200"
      :y1="line.y1"
      :y2="line.y2"
    ></line>
  </svg>
</template>

<script>
export default {
  name: "Lines",
  props: {
    lines: {
      type: Array,
      default: () => [],
    },
  },
  methods: {

  },
};
</script>

<style scoped>
.lines_view {
  float: left;
}
.line {
  stroke: rgb(99, 99, 99);
  stroke-width: 1;
}
</style>