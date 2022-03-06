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
      :key="index"
      :x1="line.source.x"
      :x2="line.target.x"
      :y1="line.source.y"
      :y2="line.target.y"
      v-show="isLineVisiable(line)"
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
    isLineVisiable(line) {
      if (line.source.y && line.target.y) {
        return true;
      }
      return false;
    },
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