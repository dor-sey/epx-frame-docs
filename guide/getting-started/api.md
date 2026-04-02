# 对外接口

`epx-frame` 包对外暴露了以下所有组件和工具，可按需引入使用。

## 引入方式

```js
import epxFrame, {
  createApp,
  axios,
  http,
  util,
  lodash,
  moment,
  cookie,
  mixins,
  store,
  router,
  Vue,
  vuex
} from 'epx-frame'
```

也可以通过默认导出对象访问：

```js
import epxFrame from 'epx-frame'

epxFrame.createApp()
epxFrame.util.search('id')
```

## 核心

| 导出名 | 类型 | 说明 |
|--------|------|------|
| `createApp` | Function | 创建并返回 Vue 应用实例，自动完成全局注册、工具注入等初始化工作 |
| `Vue` | Class | Vue 2 构造函数，与项目使用的同一个 Vue 实例 |
| `vuex` | Object | Vuex 模块，与项目使用的同一个 Vuex 实例 |
| `store` | Object | 全局 Vuex Store 实例 |
| `router` | Object | 全局 Vue Router 实例 |

## 工具

| 导出名 | 类型 | 说明 | 组件内访问 |
|--------|------|------|-----------|
| `axios` | Object | 封装的 axios 实例，用于发起 HTTP 请求 | `this.$axios` |
| `http` | Object | 业务请求工具，提供实体数据 CRUD 语义化 API | `this.$http` |
| `util` | Object | 通用工具函数集合 | `this.$util` |
| `lodash` | Object | lodash 常用方法子集 | `this.$_` |
| `moment` | Function | Moment.js 日期处理库（已配置中文 locale） | `this.$moment` |
| `cookie` | Object | js-cookie，Cookie 读写工具 | `this.$cookie` |
| `mixins` | Object | 混入对象集合，包含 `component`、`global` 等混入 | — |

## 组件

框架通过默认导出的 `install` 方法全局注册了以下组件，使用 `Vue.use(epxFrame)` 后可直接在模板中使用：

| 组件名 | 说明 |
|--------|------|
| `epx-add-form` | 新增编辑表单组件 |
| `epx-add-form-item` | 表单项组件 |
| `epx-entity-list` | 对象列表组件 |
| `epx-entity-list-find` | 对象查找列表组件 |
| `epx-entity-sub-list` | 对象子列表组件 |
| `epx-ai-chat-page` | AI 对话页面组件 |
| `epx-ai-agent-page` | AI Agent 对话页面组件 |
| `epx-ai-session` | AI 对话会话组件 |

## createApp

`createApp` 是框架的入口函数，调用后返回一个已完成初始化的 Vue 实例。

```js
import { createApp } from 'epx-frame'

const app = createApp()
app.$mount('#app')
```

`createApp` 会自动完成以下工作：

- 创建 Vue 实例并挂载 Vuex Store 和 Vue Router
- 全局注册所有内置组件（Element UI、Vant 及自定义组件）
- 注入全局工具到 Vue 原型（`$http`、`$axios`、`$util`、`$_`、`$cookie`、`$moment` 等）
- 安装全局指令和混入
- 初始化国际化（i18n）

## mixins

`mixins` 对象包含框架提供的混入，用于在组件中获取页面上下文和框架能力：

```js
import { mixins } from 'epx-frame'

export default {
  mixins: [mixins.component],
  created() {
    console.log(this.$component) // 当前组件信息
    console.log(this.$configs)   // 组件配置
    console.log(this.$metaId)    // 对象 ID
  }
}
```

| 混入名 | 说明 |
|--------|------|
| `mixins.component` | 组件混入，提供 `$component`、`$configs`、`$metaId`、`$event` 等 |
| `mixins.global` | 全局混入，已由框架自动安装，通常无需手动使用 |

详细说明请参阅 [混入 component](/guide/component/mixin)。

## store 和 router

框架暴露了全局的 Vuex Store 和 Vue Router 实例，可在非组件环境（如工具函数、服务层）中使用：

```js
import { store, router } from 'epx-frame'

// 在非组件中访问 store
const user = store.state.user

// 在非组件中进行路由跳转
router.push('/home')
```

::: warning 注意
`store` 和 `router` 需要在 `createApp()` 调用之后才能正常使用，因为它们依赖框架的初始化流程。
:::
