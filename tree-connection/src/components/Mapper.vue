<template>
  <div class="mapper-container">
    <tree-control
      :treeData="originData"
      :activeItem="active.item"
      mode="origin"
      @setActiveItem="setActiveItem"
      @expandNode="expandHandler"
    />
    <Lines
      :lines="lines"
      v-if="linesVisiable"
    />
    <tree-control
      :treeData="targetData"
      mode="target"
      @addLine="addConnect"
      @expandNode="expandHandler"
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
      originData: [
        {
          name: "第一层：hhh",
          children: [{ name: "第二次 哈哈哈" }, { name: "第二次 哈哈哈111" }],
        },
        {
          name: "第一层222",
        },
      ],
      targetData: [
        {
          name: "第一层：hhh",
          children: [{ name: "第二次 哈哈哈" }, { name: "第二次 哈哈哈111" }],
        },
        {
          name: "第一层222",
        },
      ],
      lines: [
        {
          source: {
            item: { name: "第一层222" },
          },
          target: {
            item: { name: "第一层222" },
          }
        }
      ],
      linesVisiable: true,
      active: {}
    };
  },
  mounted() {
    this.initLines()
  },
  methods: {
    initLines() {
      this.lines.forEach(line => {
        const [origin, target] = this.searchNodeForLine(line)
        if (!origin || !target) {
          return
        }
        this.$set(line, 'source', {
          item: origin,
          _el: document.getElementById(`origin-${origin.level}-${origin.name}`)
        })
        this.$set(line, 'target', {
          item: target,
          _el: document.getElementById(`target-${target.level}-${target.name}`)
        })
        this.$set(line, 'y1', this.getElCoorY(line.source._el))
        this.$set(line, 'y2', this.getElCoorY(line.target._el))
        this.$set(line, 'visiable', true)
        this.expandHandler()
      })
    },
    searchNodeForLine(line) {
      const origin = this.searchNode(line.source.item, this.originData)
      const target = this.searchNode(line.target.item, this.targetData)
      return [origin, target]
    },
    searchNode(lineNode, data) {
      for (let item of data) {
        if (item.id && item.id === lineNode.id) {
          return item
        }
        if (!item.id && item.name === lineNode.name) {
          return item
        }
        if (item.children && item.children.length > 0) {
          const res = this.searchNode(lineNode, item.children)
          if (res) return res
        }
      }
    },
    setActiveItem(origin) {
      this.active = origin
    },
    getElCoorY(el) {
      if (!el) {
        return 0
      }
      var top = 0
      while (el.offsetParent) {
        top += el.offsetTop
        el = el.offsetParent
      }
      return top + 13
    },
    addConnect(target) {
      if (!this.active._el) {
        return;
      }
      this.addLine(this.active, target)
    },
    addLine(origin, target) {
      this.lines.push({
        source: origin,
        target: target,
        y1: this.getElCoorY(origin._el),
        y2: this.getElCoorY(target._el),
        visiable: true
      });
    },
    expandHandler() {
      this.$nextTick(() => {
        this.lines.forEach(line => {
          if (line.source.item.$parent && !line.source.item.$parent.expand) {
            line.visiable = false
          } else if (line.target.item.$parent && !line.target.item.$parent.expand) {
            line.visiable = false
          } else {
            line.visiable = true
          }
          line.y1 = this.getElCoorY(line.source._el)
          line.y2 = this.getElCoorY(line.target._el)
        })
      })
    }
  },
};
</script>