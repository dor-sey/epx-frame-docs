# AddForm 新增/编辑表单

表单页面组件（`epx-add-form`）是 EPX-Frame 中用于新增和编辑业务数据的核心页面组件。它支持多分组字段展示、目录导航、审核流程、AI 填写、签名等功能。

## 静态配置项

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `saveSuccessText` | `'新增成功'` | 新增成功提示文字 |
| `updateSuccessText` | `'编辑成功'` | 编辑成功提示文字 |
| `saveAction` | `'save'` | 新增接口 action |
| `updateAction` | `'update'` | 编辑接口 action |
| `backTarget` | `'list'` | 提交成功后返回的目标页面 |
| `editPage` | `'entity-edit-page'` | 编辑页面组件名 |
| `titleFlag` | `true` | 是否显示标题 |
| `operateFlag` | `true` | 是否显示操作按钮区域 |
| `column` | `2` | 表单默认列数 |
| `styleType` | `'default'` | 样式类型，可选 `'default'` / `'table'` |
| `showCatalog` | `false` | 是否显示左侧目录导航 |
| `catalogPosition` | `'left'` | 目录位置，可选 `'left'` / `'right'` |
| `catalogLoadWay` | `'all'` | 目录加载方式，可选 `'all'` / `'one'` / `'lazy'` |
| `catalogOpen` | `'first'` | 目录默认展开项 |
| `showCatalogHeader` | `false` | 是否显示目录头部信息 |
| `operateAffixBottom` | `false` | 操作按钮是否固定在底部 |
| `mOperateEllipsis` | `2` | 移动端未折叠按钮显示数量 |
| `editOne` | `false` | 是否单字段编辑模式 |
| `submitParams` | `{}` | 额外提交参数 |
| `operates` | 见下方 | 默认操作按钮配置 |
| `items` | 见下方 | 默认子组件配置 |

默认 `operates`：
```js
[
  { text: '保存', ui: 'primary', handler: 'submitForm', showConditionEl: 'pageType==="ADD" || pageType==="EDIT"' },
  { text: '返回', cls: 'btn_hollow', handler: 'backPage' }
]
```

默认 `items`：
```js
[{ title: '基本信息', id: 'form-base', contentType: 'add-form-item' }]
```

## Props

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `formData` | `Object` | 外部传入的表单数据（通常由父页面注入） |
| `id` | `String` | 记录主键 |
| `popup` | `Boolean` | 是否以弹窗方式打开 |

## 组件变量

| 变量名 | 说明 |
|--------|------|
| `data` | 当前表单数据对象 |
| `operates` | 当前可用的操作按钮列表（经权限过滤后） |
| `fieldGroups` | 字段分组配置列表 |
| `pageType` | 当前页面类型：`'ADD'` / `'EDIT'` / `'DETAIL'` / `'READONLY'` |
| `fieldScope` | 字段权限范围配置 |
| `fieldRelation` | 字段联动关系配置 |
| `catalogList` | 目录导航列表 |
| `activeIndex` | 当前激活的目录项 ID |
| `checkOptionDialogVisible` | 审核对话框配置，`false` 时隐藏 |
| `showAiFillingDrawer` | 是否显示 AI 填写抽屉 |
| `componentStatus` | 各子组件的状态映射 |

## 组件方法

### 数据操作

| 方法名 | 说明 |
|--------|------|
| `init()` | 初始化组件，加载字段权限和表单数据 |
| `getData()` | 获取表单数据（新增时获取默认值，编辑时获取记录数据） |
| `getFieldScope()` | 获取字段权限范围 |
| `getFieldRelation()` | 获取字段联动关系 |
| `$refesh()` | 刷新表单数据（公开方法） |
| `reloadData()` | 重新加载表单数据 |

### 操作按钮

| 方法名 | 说明 |
|--------|------|
| `getOperates()` | 计算并更新当前可用操作按钮列表（含审核流程按钮） |
| `getCheckOperateList(operate)` | 获取审核流程的目标节点按钮列表 |
| `applyEntity(buttonConfig)` | 执行流程申请/审核操作 |
| `editEntity(configs?)` | 跳转到编辑页面 |
| `goPage(config)` | 通用页面跳转方法 |

### 目录导航

| 方法名 | 说明 |
|--------|------|
| `loadCatalog()` | 加载目录导航数据 |
| `foldFn(key)` | 切换目录项的折叠状态 |

## 渲染方法

| 方法名 | 说明 |
|--------|------|
| `renderForm()` | 渲染表单主体区域（含子组件列表） |
| `renderComponent(component)` | 渲染单个子组件（`epx-component` 包装） |
| `renderCatalog()` | 渲染左侧目录导航容器 |
| `renderCatalogList(catalogList, parent?)` | 递归渲染目录列表 |
| `renderBase()` | 渲染目录头部（标题、图标、操作按钮） |
| `renderCheck()` | 渲染审核区域（PC 为对话框，移动端为抽屉） |
| `rendercheckDialog()` | 渲染审核对话框（PC） |
| `renderCheckDrawer()` | 渲染审核抽屉（移动端） |
| `renderCheckPerson()` | 渲染审核人选择对话框 |

## 使用示例

### 在页面模板中使用

```js
{
  contentType: 'add-form',
  configs: {
    column: 2,
    showCatalog: true,
    catalogPosition: 'left',
    operates: [
      { text: '提交', ui: 'primary', handler: 'submitForm' },
      { text: '返回', handler: 'backPage' }
    ],
    items: [
      { title: '基本信息', id: 'base', contentType: 'add-form-item' },
      { title: '附件', id: 'attach', contentType: 'sub-list' }
    ]
  }
}
```

### 通过继承自定义

```js
import AddFormVue from '@/frame/packages/add-form'

export default {
  name: 'epx-my-form',
  extends: AddFormVue,
  methods: {
    // 提交前自定义校验
    async beforeSubmit () {
      if (!this.data.NAME) {
        this.$message.error('名称不能为空')
        return false
      }
      return true
    },
    // 重写目录头部渲染
    renderBase () {
      const base = AddFormVue.options.methods.renderBase.call(this)
      return base
    }
  }
}
```
