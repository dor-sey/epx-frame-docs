# 组件继承

通过继承已有组件，可以快速创建新的组件。继承后可以获得父组件的所有属性、变量和方法，并可以对方法进行重写。

## 基本用法

使用 Vue 的 `extends` 选项来继承组件：

```js
import ListVue from '@/frame/packages/entity-list'

export default {
  name: 'epx-list-find',
  extends: ListVue,
  // 可以在这里重写或新增属性和方法
}
```

## 继承的优势

1. **代码复用**：无需重复编写已有功能，减少代码量
2. **快速开发**：基于成熟的组件进行定制，降低开发风险
3. **统一维护**：父组件的更新会自动同步到子组件

## 重写方法

继承后可以重写父组件的方法来实现自定义逻辑：

```js
import ListVue from '@/frame/packages/entity-list'

export default {
  name: 'epx-list-find',
  extends: ListVue,
  methods: {
    // 重写父组件的渲染方法
    renderComponent() {
      // 自定义渲染逻辑
      return h('div', '自定义列表')
    },

    // 重写搜索方法
    handleSearch() {
      // 自定义搜索逻辑
      console.log('自定义搜索')
    }
  }
}
```

## 实际案例

### 对象查找列表

对象查找列表组件就是通过继承对象列表组件来实现的：

```js
import ListVue from '@/frame/packages/entity-list'

export default {
  name: 'epx-entity-list-find',
  extends: ListVue,
  // 重写了部分变量和方法，使其适用于查找选择场景
}
```

### 对象子列表

对象子列表组件同样继承自对象列表组件，但针对子列表场景进行了适配：

```js
import ListVue from '@/frame/packages/entity-list'

export default {
  name: 'epx-entity-sub-list',
  extends: ListVue,
  // 针对子列表场景的定制
}
```

::: warning 注意
重写方法时要注意保留父组件的核心逻辑。如果需要调用父组件的原始方法，可以通过 `ListVue.options.methods.methodName.call(this)` 的方式调用。
:::
