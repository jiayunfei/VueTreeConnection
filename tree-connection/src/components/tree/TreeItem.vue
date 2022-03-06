<template>
  <div class="tree-main">
    <div
      class="tree-item"
      :style="getStyle"
    >
      <div class="tree-content">
        <div class="tree-icon">
          <i
            v-if="item.children && item.children.length > 0"
            class="icon icon-shrink"
            @click="expandNode"
            :class="{ 'icon-expand': item.expand }"
          ></i>
        </div>
        <i
          class="icon-mid icon-line"
          v-if="mode === 'target'"
          :class="{ 'icon-line-active' : item === active ? true : false }"
          @click="toLink(item)"
        ></i>
        <span>{{ item.name }}</span>
        <i
          class="icon-mid icon-right icon-line"
          v-if="mode === 'origin'"
          :class="{ 'icon-line-active' : item === active ? true : false }"
          @click="toActive(item)"
        ></i>
      </div>
    </div>
    <div
      v-for="(child, index) in item.children"
      :key="index"
      v-show="item.expand"
    >
      <tree-item
        :item="child"
        :mode="mode"
        :active="active"
        @toActive="$emit('toActive', $event)"
        @toLink="$emit('toLink', $event)"
        @expand="$emit('expand', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeItem",
  /**
   * item 树单条数据
   * mode 模式, target/origin
   *
   */
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: "origin",
    },
    active: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    activeItem(val) {
      console.log("active", val);
    },
  },
  computed: {
    getStyle() {
      return { "padding-left": (this.item.level - 1) * 16 + "px" };
    },
  },
  methods: {
    expandNode() {
      this.item.expand = !this.item.expand;
      this.$emit("expand", this.item);
    },
    toActive(item) {
      this.$emit("toActive", item);
    },
    toLink(item) {
      this.$emit("toLink", item);
    },
  },
};
</script>

<style scoped>
.tree-main {
  font-size: 14px;
}
.tree-item {
  background: rgb(221, 221, 221);
  border-bottom: 1px solid #fff;
  position: relative;
}
.tree-content {
  line-height: 26px;
  display: flex;
  align-items: center;
}
.tree-icon {
  width: 20px;
}
.icon {
  cursor: pointer;
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 4px;
}
.icon-shrink {
  background: url(../../assets/icon/arrow-right.svg);
  background-size: contain;
}
.icon-expand {
  background: url(../../assets/icon/arrow-down.svg);
  background-size: contain;
}
.icon-mid {
  cursor: pointer;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0 4px;
}
.icon-right {
  position: absolute;
  right: 5px;
}
.icon-line {
  background: url(../../assets/icon/line.svg);
  background-size: contain;
}
.icon-line-active {
  background: url(../../assets/icon/line-active.svg);
  background-size: contain;
}
</style>