<template>
  <div class="mapper-container">
    <tree-control
      :treeData="model1"
      mode="origin"
      ref="origin"
    />
    <Lines
      :lines="lines"
      v-if="linesVisiable"
    />
    <tree-control
      :treeData="model2"
      mode="target"
      @addLine="addLine"
    />
  </div>
</template>

<script>
import TreeControl from "./tree/TreeControl";
import Lines from "./Lines";

export default {
  components: { TreeControl, Lines },
  name: "Mapper",
  data() {
    return {
      model1: [
        {
          name: "第一层：hhh",
          children: [{ name: "第二次 哈哈哈" }, { name: "第二次 哈哈哈111" }],
        },
        {
          name: "第一层222",
        },
      ],
      model2: [
        {
          name: "第一层：hhh",
          children: [{ name: "第二次 哈哈哈" }, { name: "第二次 哈哈哈111" }],
        },
        {
          name: "第一层222",
        },
      ],
      lines: [],
      linesVisiable: true,
    };
  },
  methods: {
    addLine(target) {
      const sourceItem = this.$refs.origin.activeItem;
      if (!sourceItem) {
        return;
      }
      this.lines.push({
        source: sourceItem,
        target: target,
      });
    },
    updateView() {
      this.linesVisiable = false;
      this.$nextTick(() => {
        this.linesVisiable = true;
      });
    },
  },
};
</script>