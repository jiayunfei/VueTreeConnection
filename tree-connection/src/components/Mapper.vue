<template>
  <div class="mapper-container">
    <tree-control
      :treeData="origin"
      :activeItem="activeNode.item"
      mode="origin"
      @setActiveItem="setActiveItem"
      @expandNode="expandHandler"
    />
    <Lines
      :lines="lines"
      @selectLine="selectLine"
      v-if="linesVisiable"
    />
    <tree-control
      :treeData="target"
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
  props: {
    origin: {
      type: Array,
      required: true
    },
    target: {
      type: Array,
      required: true
    },
    lines: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      linesVisiable: true,
      activeNode: {},
      activeLines: []
    };
  },
  mounted() {
    this.initLines()
    const ctx = this
    window.addEventListener('keydown', this.removeLines.bind(ctx))
  },
  destroyed() {
    window.removeEventListener('keydown', this.removeLines)
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
    selectLine(opt) {
      this.activeLines.push(opt)
    },
    searchNodeForLine(line) {
      const origin = this.searchNode(line.source.item, this.origin)
      const target = this.searchNode(line.target.item, this.target)
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
      this.activeNode = origin
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
      if (!this.activeNode._el) {
        return;
      }
      this.addLine(this.activeNode, target)
    },
    addLine(origin, target) {
      this.lines.push({
        source: origin,
        target: target,
        y1: this.getElCoorY(origin._el),
        y2: this.getElCoorY(target._el),
        visiable: true
      });
      this.$emit('lineChange', this.lines)
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
    },
    removeLines(event) {
      if (event.keyCode === 8 || event.keyCode === 46) {
        let i = 0
        while(i < this.lines.length) {
          if (this.lines[i].active) {
            this.lines.splice(i, 1)
          } else {
            i++
          }
        }
      }
      this.$emit('lineChange', this.lines)
    }
  },
};
</script>