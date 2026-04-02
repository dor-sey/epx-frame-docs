# 组件开发

## 命名规则

组件名称一般用 **项目编号-组件名称** 来命名，以保证组件名称的唯一性。详细的命名规范请参阅 [组件规范](/guide/component/specification)。

## 开发方式

组件开发方式和创建 Vue 组件一样，可以使用 `template` 渲染，也可以使用 `render` 函数进行渲染。

### Template 方式

使用 Vue 的模板语法编写组件，适合结构相对简单、布局固定的组件：

```vue
<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

### Render（JSX）方式

使用 render 函数编写组件，适合需要动态渲染逻辑的复杂组件。配合混入 `component` 可以获取页面信息和组件配置：

```vue
<template>
  <div class="container" :style="style">
    <span v-text="$configs.content"></span>
  </div>
</template>

<script>
import { mixins } from 'epx-frame'

export default {
  name: 'epx-text',
  mixins: [mixins.component],
  created() {
    console.log(this.$component)
    console.log(this.$configs)
  }
}
</script>
```

## 混入 component

通过混入 `component` 可以获取到页面信息、对象页面和组件信息，方便组件的渲染。混入后组件将拥有以下能力：

- **`$component`**：当前组件的完整信息（配置、标题、标识、编号等）
- **`$configs`**：当前组件的配置信息
- **`$metaId`**：组件对象 ID
- **`$meta`**：组件对象元数据
- **`$event`**：页面内组件间通信

详细的混入说明请参阅 [混入 component](/guide/component/mixin)。

## 组件继承

除了从头开发组件外，还可以通过继承已有组件来快速创建新组件。继承后可以获得父组件的所有属性、变量和方法，并可以对方法进行重写：

```js
import ListVue from '@/frame/packages/entity-list'

export default {
  name: 'epx-list-find',
  extends: ListVue,
  // 重写或新增属性和方法
}
```

详细的继承说明请参阅 [组件继承](/guide/component/inheritance)。
