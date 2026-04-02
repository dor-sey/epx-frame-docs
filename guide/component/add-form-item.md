# AddFormItem 表单分组

表单分组组件（`epx-add-form-item`）是 `epx-add-form` 的子组件，用于渲染一组表单字段。支持标题折叠、行内编辑、字段权限控制等功能。

## 静态配置项

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `showTitle` | `'more'` | 标题显示模式，可选 `'more'`（有子组件时显示）/ `'always'`（始终显示）/ `'none'`（不显示） |
| `formTitleStyle` | `'default'` | 标题样式，可选 `'default'` / `'simple'` |
| `fieldConfigs` | `{}` | 字段配置覆盖 |
| `labelAlign` | `'right'` | 标签对齐方式，可选 `'left'` / `'right'` |
| `defaultFold` | `false` | 是否默认折叠 |

## Props

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `formData` | `Object` | 表单数据对象（双向绑定） |
| `showTitle` | `Boolean` | 是否显示分组标题 |
| `formConfigs` | `Object` | 父表单传入的全局配置（含 `column`、`fieldConfigs` 等） |
| `fieldScope` | `Object` | 字段权限范围（由父表单传入） |
| `pageType` | `String` | 页面类型：`'ADD'` / `'EDIT'` / `'DETAIL'` / `'READONLY'` |
| `form` | `Object` | 父表单实例引用 |
| `edit` | `Boolean` | 是否直接进入编辑状态 |
| `fieldRelation` | `Array` | 字段联动关系配置 |

## 组件变量

| 变量名 | 说明 |
|--------|------|
| `fieldsConfigs` | 当前分组的字段配置列表（经权限处理后） |
| `isEdit` | 当前是否处于行内编辑状态 |
| `isFold` | 当前是否折叠 |
| `loadForm` | 表单是否已加载（用于强制重渲染） |
| `componentType` | 实际生效的组件类型（综合 `isEdit` 和 `pageType`） |
| `column` | 实际生效的列数（综合响应式断点和配置） |

## 组件方法

| 方法名 | 说明 |
|--------|------|
| `init()` | 初始化组件，处理折叠状态和字段配置 |
| `getFieldsConfigs(pageType?)` | 加载并处理字段配置，设置字段默认值 |
| `editEntity()` | 进入行内编辑状态 |
| `cancel(finish?)` | 取消编辑，`finish=true` 时刷新父表单 |
| `save(operate?)` | 保存行内编辑的数据 |
| `changeFieldsConfigs(v)` | 字段配置变化时向父组件上报完成状态 |

## 渲染方法

| 方法名 | 说明 |
|--------|------|
| `renderFormTitle()` | 渲染分组标题栏（含折叠按钮和操作按钮） |
| `renderOperates()` | 渲染标题栏右侧的操作按钮组 |
| `renderFormContent()` | 渲染分组内容区域（含提示信息、表单、保存按钮） |
| `renderForm()` | 渲染 `epx-table-form` 表单主体 |
| `renderFormDrawer()` | 渲染移动端编辑抽屉 |

## 使用示例

### 在 add-form 的 items 中配置

```js
items: [
  {
    title: '基本信息',
    id: 'base-info',
    contentType: 'add-form-item',
    configs: {
      fields: ['NAME', 'CODE', 'STATUS'],
      column: 2,
      showTitle: 'always',
      defaultFold: false,
      labelAlign: 'right',
      editable: true  // 启用行内编辑按钮
    }
  }
]
```

### 通过继承自定义

```js
import { AddFormItem } from 'epx-frame'

export default {
  name: 'epx-my-form-item',
  extends: AddFormItem,
  methods: {
    // 字段加载完成后的钩子
    onAfterFieldsConfigs () {
      // 对字段做额外处理
      this.fieldsConfigs.forEach(field => {
        if (field.attriName === 'STATUS') {
          field.state = 'READONLY'
        }
      })
    },
    // 重写标题渲染
    renderFormTitle () {
      const base = AddFormItemVue.options.methods.renderFormTitle.call(this)
      return base
    }
  }
}
```
