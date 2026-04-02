# 项目概述

epx-frame 是一个基于 Vue 2 的企业级低代码开发框架，提供完整的页面渲染引擎、组件体系、权限管理、主题换肤等能力。通过配置驱动的方式，开发者可以快速搭建业务系统，无需从零编写每个页面。

## 核心能力

| 能力 | 说明 |
|------|------|
| 配置驱动渲染 | 通过 JSON 配置描述页面结构和组件行为，无需手写每个页面 |
| 丰富内置组件 | 覆盖列表、表单、图表、审批流、数据导入导出等常见业务场景 |
| 全局工具注入 | $http、$util、$cookie、$moment 等工具开箱即用 |
| 主题换肤 | 基于 SASS Mixin 的动态主题系统，支持多主题切换 |
| 多端适配 | 同一套代码自动适配 PC 端和移动端（基于 Element UI + Vant） |
| 插件按需加载 | ECharts、PDF、百度地图、TinyMCE 等大型库按需异步加载 |
| 权限控制 | 内置按钮级权限检查，与平台权限体系无缝集成 |
| 低代码设计器 | 内置可视化页面设计器（PageDesigner），支持拖拽配置页面 |

## 快速开始
### 下拉项目
```bash
git clone http://dev.epxcloud.com:8081/front/product/demo.git
```

### 安装依赖

```bash
yarn
```

### 启动开发服务器

```bash
yarn serve
```

### 应用入口

```js
import { createApp } from 'epx-frame'

createApp().$mount('#app')
```

createApp 会自动完成以下工作：

- 初始化 Vue 实例并挂载 Vuex Store 和 Router
- 全局注册所有内置组件（Element UI、Vant 及自定义组件）
- 注入全局工具到 Vue 原型（、、、、 等）
- 安装全局指令和混入
- 加载应用配置和元数据

## 版本要求

| 工具 | 推荐版本 |
|------|----------|
| Node.js | v18+ |
| npm | v10+ |

## 下一步

- [对外接口](/guide/getting-started/api) — 了解框架对外暴露的所有组件和工具
- [页面](/guide/page/) — 了解页面模板和页面配置
- [组件](/guide/component/) — 了解组件开发和使用
- [工具](/guide/tools/http-entity) — 了解 HTTP 请求等内置工具
