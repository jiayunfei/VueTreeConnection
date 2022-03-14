<template>
  <div id="app">
    <div class="box"></div>
    <mapper 
      :origin="originData"
      :target="targetData"
      :lines="lines"
    />
  </div>
</template>

<script>
import Mapper from '@/components/Mapper'

export default {
  name: 'App',
  components: {
    Mapper
  },
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
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.box {
  height: 300px;
}
</style>
