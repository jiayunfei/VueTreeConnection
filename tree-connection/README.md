# tree-connection

## 一款树形连线的好用软件

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
    }
