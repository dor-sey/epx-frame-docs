# 页面模板

页面模板可以通过页面配置来渲染出不同的页面效果，一般为**一组组件的集合**；也可以不加载组件，自定义个性化的模板渲染。

## 组件模板

组件模板是最常用的页面模板类型。它将多个组件组合在一起，形成一个完整的页面布局。例如：

- **对象列表页面**由【标题导航组件】和【对象列表组件】组成
- **对象新增页面**由【标题导航组件】和【新增编辑表单组件】组成

组件模板一般继承【空白页面（BasePage）】来进行组件的渲染。

### 模板结构

```vue
<template>
  <div class="base-page" :style="$component.style" ref="container">
    <el-row class="base-page__row" :style="pageStyle">
      <!-- 组件 -->
      <el-col
        :class="['base-page__col', {'base-page__col--header': component.contentType.includes('header')}]"
        :style="componentStyle(component)"
        v-for="component in components"
        :key="component.id"
        v-bind="colAttribute(component)"
      >
        <epx-component
          v-bind="isPage ? $attrs : {}"
          :name="component.contentType"
          is-component
          :content-type="component.contentType"
          :comp-id="getComponentId(component)"
          :comp-title="component.title"
          :items="component.items"
          :comp-style="component.style"
          :comp-configs="component.configs"
        />
      </el-col>
    </el-row>
  </div>
</template>
```

### 模板配置

通过 `items` 属性定义页面中包含的组件及其配置：

```js
import BasePageVue from '../base-page/BasePage.vue'

export default {
  name: 'epx-entity-list-page',
  extends: BasePageVue,
  searchComponent: '',
  items: [
    {
      title: '导航',
      id: 'nav',
      contentType: 'header'
    },
    {
      title: '列表区域',
      id: 'list',
      contentType: 'entity-list',
      configs: {
        // 列表组件的配置
      }
    }
  ]
}
```

### items 配置说明

每个 item 对象包含以下属性：

| 属性 | 说明 |
|------|------|
| `title` | 组件标题，用于标识组件 |
| `id` | 组件唯一标识，用于组件间通信和配置定位 |
| `contentType` | 组件编号，对应注册的组件类型 |
| `configs` | 组件配置，控制组件的渲染样式和行为 |
| `items` | 子组件配置 |
| `style` | 组件样式 |

## 个性化页面模板

除了标准的组件模板外，还可以创建个性化的页面模板，用于特殊的业务场景。例如：

- **登录页面模板**：自定义登录表单和验证逻辑
- **图表模板**：集成 ECharts 等图表库的数据可视化页面
- **仪表盘模板**：数据概览和统计展示页面

个性化模板不继承 BasePage，而是完全自定义模板结构和渲染逻辑，开发者可以自由设计页面布局和交互方式。
