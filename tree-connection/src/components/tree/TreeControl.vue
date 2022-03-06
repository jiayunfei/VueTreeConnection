<template>
  <div class="tree-container">
    <template v-for="(item, index) in treeData">
      <tree-item
        :item="item"
        :key="index"
        :mode="mode"
        :active="activeItem"
        @toActive="changeActive"
        @toLink="addLines"
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
  },
  data() {
    this.curY = 0;
    return {
      activeItem: null,
    };
  },
  mounted() {
    this.addLevel(this.treeData, 1);
    this.initCoor();
  },
  methods: {
    addLevel(data, level) {
      data.forEach((item) => {
        this.$set(item, "level", level);
        this.$set(item, "expand", false);
        if (item.children && item.children.length > 0) {
          this.addLevel(item.children, level + 1);
        }
      });
    },
    initCoor() {
      this.coorHandler(this.treeData, true);
    },
    changeActive(item) {
      this.activeItem = item;
    },
    addLines(target) {
      this.$emit("addLine", target);
    },
    expandNode() {
      this.curY = 0;
      this.coorHandler(this.treeData, true);
      this.$parent.updateView();
    },
    coorHandler(data, expand) {
      data.forEach((item) => {
        if (expand) {
          this.mode === "origin" ? (item.x = 0) : (item.x = 200);
          item.y = this.curY + 13;
          this.curY += 26;
        } else {
          item.y = null;
        }
        if (item.children && item.children.length > 0) {
          this.coorHandler(item.children, item.expand);
        }
      });
    },
  },
};
</script>

<style scoped>
.tree-container {
  width: 30%;
  float: left;
}
</style>