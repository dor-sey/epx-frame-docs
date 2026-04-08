# EntityListFind 对象选择列表

对象选择列表组件（`epx-list-find`）继承自 `epx-entity-list`，专用于弹窗/抽屉中的数据选择场景。支持单选、多选、确认模式和即时回调模式。

## 继承关系

```
epx-entity-list
  └── epx-list-find
```

继承了 `epx-entity-list` 的所有配置项、变量和方法，并在此基础上做了以下覆盖和扩展。

## 静态配置项覆盖

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `operateFlag` | `true` | 显示工具栏 |
| `showFilter` | `false` | 隐藏筛选按钮 |
| `multiSelectColumnFlag` | `false` | 默认不显示多选框列（多选时自动开启） |
| `operateColumnEllipsis` | `1` | 行操作按钮不折叠 |
| `setField` | `false` | 不显示字段设置入口 |
| `columnOperates` | `[{ text: '选择', ui: 'primary', handler: 'selectEntity' }]` | 默认行操作按钮 |

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `cancel` | `Function` | `() => null` | 关闭/取消回调 |
| `change` | `Function` | — | 选择结果变化回调，参数为 `(result, selection)` |
| `multiple` | `Boolean` | `false` | 是否多选 |
| `value` | `Array` | `[]` | 当前已选中的主键 ID 数组 |
| `labels` | `Array` | `[]` | 已选项的标签文字（用于未加载到数据时的回显） |
| `fieldConfig` | `Object` | `{}` | 字段配置（含 `objectWay`、`valueOrder` 等属性） |

## 工作模式

组件根据 `fieldConfig.attribute.objectWay` 和 `multiple` 自动决定工作模式：

| 模式 | 触发条件 | 行为 |
|------|----------|------|
| `change` | 单选，或 `objectWay !== 'dialog'` | 点击行即时回调 `change` |
| `confirm` | 多选 + `objectWay === 'dialog'` | 显示已选列表，点击"确定"后统一回调 |

## 组件变量

| 变量名 | 说明 |
|--------|------|
| `mode` | 当前工作模式：`'change'` 或 `'confirm'` |
| `labelMap` | 主键到标签文字的缓存映射（用于异步回显） |
| `firstSetCheck` | 是否首次同步选中状态（初始化后置为 `false`） |

## 组件方法

| 方法名 | 说明 |
|--------|------|
| `selectEntity(config, item)` | 点击行"选择"按钮时触发，单选模式下直接设置选中 |
| `confirm()` | 确认选择，调用 `change` 回调并关闭 |
| `cancel()` | 取消选择，调用 `cancel` 回调关闭 |
| `clearSelect()` | 清空所有已选项 |
| `cancelSelect(item)` | 从已选列表中移除指定项 |
| `openWatchSelection()` | 开启选中变化监听，在 `change` 模式下自动触发回调 |
| `getValueObject()` | 初始化时将 `value` 同步到表格选中状态 |
| `afterData()` | 数据加载完成后的钩子，触发 `getValueObject()` |

## 渲染方法

| 方法名 | 说明 |
|--------|------|
| `renderSelectList()` | 渲染右侧已选列表面板（仅 `confirm` 模式显示） |
| `renderMobile()` | 渲染移动端视图（`epx-entity-list-find-mobile`） |

## 使用示例

### 在对象字段弹窗中使用

```js
// 通常由 epx-form-item 内部自动调用，也可手动使用
{
  contentType: 'entity-list-find',
  configs: {
    metaId: 'MY_ENTITY',
    listFields: ['NAME', 'CODE', 'STATUS'],
    pageSize: 10
  },
  props: {
    multiple: true,
    value: this.selectedIds,
    change: (result, selection) => {
      this.selectedIds = result.map(item => item.id)
    },
    cancel: () => {
      this.dialogVisible = false
    }
  }
}
```

### 通过继承自定义

```js
import { EntityListFind } from 'epx-frame'

export default {
  name: 'epx-my-list-find',
  extends: EntityListFind,
  methods: {
    // 选择后追加自定义逻辑
    selectEntity (config, item) {
      EntityListFind.options.methods.selectEntity.call(this, config, item)
      // 额外处理
      console.log('selected:', item)
    },
    // 自定义已选列表渲染
    renderSelectList () {
      if (this.mode !== 'confirm') return null
      return (
        <div class="my-select-list">
          {this.selection.map(item => <span>{item.NAME}</span>)}
        </div>
      )
    }
  }
}
```
