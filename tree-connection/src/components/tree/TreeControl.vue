<template>
  <div class="tree-container">
    <template v-for="(item, index) in treeData">
      <tree-item
        :item="item"
        :key="index"
        :mode="mode"
        :active="activeItem"
        @toActive="$emit('setActiveItem', $event)"
        @toLink="$emit('addLine', $event)"
        @expand="expandNode"
      />
    </template>
  </div>
</template>

<script>
import TreeItem from "./TreeItem";

export default {
  name: "TreeControl",
  components: { TreeItem },
  /**
   * treeData 树数据
   * mode 模式, target/origin
   *
   */
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: "origin",
    },
    activeItem: {
      type: [Object, undefined],
      default: undefined,
    }
  },
  data() {
    return { };
  },
  created() {
    this.addLevel(this.treeData, 1);
    this.initCoor();
  },
  methods: {
    addLevel(data, level, parent) {
      data.forEach((item) => {
        this.$set(item, "level", level);
        this.$set(item, "expand", false);
        if (parent) {
          item.$parent = parent
        }
        if (item.children && item.children.length > 0) {
          this.addLevel(item.children, level + 1, item);
        }
      });
    },
    initCoor() {
      // this.coorHandler(this.treeData, true);
    },
    expandNode() {
      this.$emit('expandNode')
    }
  },
};
</script>

<style scoped>
.tree-container {
  width: 30%;
  float: left;
}
</style>