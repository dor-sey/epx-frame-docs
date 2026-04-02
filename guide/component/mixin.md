# 混入 component

`component` 混入是 EPX-Frame 组件开发的核心机制。通过混入 `mixins.component`，组件可以接入框架的页面上下文、配置系统、事件总线和通用操作能力。

## 使用方式

```js
import { mixins } from 'epx-frame'

export default {
  name: 'epx-my-component',
  mixins: [mixins.component],
  created() {
    console.log(this.$component) // 当前组件信息
    console.log(this.$configs)   // 组件配置
  }
}
```

## Props

混入后组件将接收以下 props（由页面框架自动传入，无需手动传递）：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `compId` | String / Number | 组件唯一 ID |
| `contentType` | String | 组件模板名称（注册名去掉 `epx-` 前缀） |
| `compTitle` | String | 组件标题 |
| `compStyle` | Object | 组件样式对象 |
| `compConfigs` | Object | 页面配置中传入的组件配置项 |
| `compFlex` | Boolean | 是否启用 flex 布局 |
| `items` | Array | 子组件配置列表 |
| `itemConfigs` | Object | 子组件配置覆盖 |
| `metaId` | String | 指定组件绑定的对象元数据 ID |
| `page` | Object | 当前页面信息 |
| `meta` | Object | 当前对象元数据信息 |

## 生命周期钩子

混入提供了三个可重写的生命周期钩子，在 `created` 阶段按顺序执行：

| 钩子名 | 说明 |
|--------|------|
| `beforeCreateComponent()` | 组件创建前，可在此做前置处理 |
| `beforeInitComponent()` | 配置初始化前，可在此修改默认配置，支持返回 Promise |
| `initComponent(component)` | 组件初始化完成，`component` 为当前组件信息对象 |

```js
export default {
  mixins: [mixins.component],
  beforeInitComponent() {
    // 修改默认配置
    this.configs.pageSize = 20
  },
  initComponent(component) {
    // 组件初始化完成，开始加载数据
    this.loadData()
  }
}
```

## 计算属性

混入后组件将获得一系列计算属性（组件变量），完整列表见[组件变量](./variables.md#组件变量需混入-mixinscomponent)。

## 组件事件

混入后组件会在初始化完成时触发以下事件，可在父组件中监听：

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `get-component` | `component` | 组件信息构建完成时触发 |
| `load-component` | `component` | 组件配置加载完成时触发 |

同时支持以下页面级自定义事件（在页面 JS 中配置）：

| 事件名 | 触发时机 |
|--------|---------|
| `onMounted` | 组件挂载完成（mounted） |
| `onDestory` | 组件销毁（destroyed） |
| `onBeforeDestory` | 组件即将销毁（beforeDestroy） |

## 更多参考

- [组件变量](./variables.md) — 全局变量与混入后可访问的组件变量完整列表
- [全局方法](./methods.md#全局方法) — 挂载在 `Vue.prototype` 上，所有组件均可直接调用
- [组件方法](./methods.md#组件方法) — 由本混入提供的完整方法列表
