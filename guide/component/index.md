# 组件概述

EPX-Frame 提供了丰富的组件体系，包括三方组件库和自定义业务组件，帮助开发者快速构建页面。

## 三方组件

epx-frame 对 **Element UI** 和 **Vant** 进行了全局注册，可以在项目中无需局部注册，直接使用它们的组件。

### Element UI 示例

```vue
<el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>
```

### Vant 示例

Vant 组件主要用于移动端场景，同样可以直接在模板中使用。

::: tip 提示
关于 Element UI 和 Vant 的详细用法，请参考官方文档：
- [Element UI 文档](https://element.eleme.io/#/zh-CN)
- [Vant 文档](https://youzan.github.io/vant/v2/)
:::

## 自定义组件

结合业务场景，EPX-Frame 基于 Element UI 封装了一系列自定义组件，可以更好更快地生成业务页面：

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

## 组件开发方式

EPX-Frame 支持两种组件开发方式：

1. **Template 方式**：使用 Vue 模板语法编写组件，适合结构简单的组件
2. **Render（JSX）方式**：使用 render 函数编写组件，适合需要动态渲染逻辑的复杂组件

详细的组件开发指南请参阅 [组件开发](/guide/component/development)。

## 组件相关文档

- [组件开发](/guide/component/development) — 组件的命名规则和开发方式
- [组件规范](/guide/component/specification) — 组件命名规范
- [组件变量](/guide/component/variables) — 组件可用的内置变量
- [组件方法](/guide/component/methods) — 组件可用的内置方法
- [混入 component](/guide/component/mixin) — component 混入详解
- [组件继承](/guide/component/inheritance) — 通过继承快速创建组件
- [EntityList 对象列表](/guide/component/entity-list) — 对象列表组件详解
- [AddForm 新增编辑表单](/guide/component/add-form) — 新增编辑表单组件详解
- [AiChatPage AI 对话页面](/guide/component/ai-chat-page) — AI 对话页面组件详解
- [AiSession 对话会话](/guide/component/ai-session) — AI 对话会话组件详解
