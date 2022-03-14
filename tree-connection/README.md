# tree-connection

## 一款树形连线的好用软件

## 下载 

`npm install tree-connection -S`

## 引用 

    import TreeConnection from 'tree-connect'

## 配置项

|  名称 |      描述              |   类型          |   默认值   | 是否必填 |
|  ----     | ----                  |  ----           | ----  |----  |
|  origin       |    左侧源树结构     | Array     |  -        | 是 |
|  target    | 右侧目标树结构        | Array          |  -       | 是 |
|  lines   | 连线数据    | Array          |  []     | 否 |

## 事件

|  名称 |      描述              |
|  ----     | ---- | 
| lineChange | 连线数量发生改变时候触发 |

## 代码示例
    // template
    <tree-connection
      :origin="origin"
      :target="target"
      :lines="lines"
    />
    // script
    import TreeConnection from 'tree-connect'
    export default {
      components: { TreeConnection },
      data() {
        return {
          origin: [],
          target: [],
          lines: []
        }
      }
    }

## 删除连线

    点击连线选中 delete/back 键 删除

## 树结构操作

  本组件不提供树结构的修改操作，可在源数据和目标数据里面处理