# 可视化配置面板开发

EPX-Frame 的可视化设计器中，每个业务组件都对应一个配置面板（Visual Config）。配置面板负责渲染该组件的所有可配置项，并将用户的修改实时同步回页面配置。

## 架构概述

配置面板采用继承体系：

```
epx-visual-component（基类）
  └── epx-visual-entity-list（EntityList 配置面板）
  └── epx-visual-add-form（AddForm 配置面板）
  └── ...（其他组件配置面板）
```

基类 `epx-visual-component` 提供通用的配置项渲染、默认值管理、字段/操作/规则数据加载等能力。子类通过覆盖特定方法来定制自己的配置项和默认值。

---

## 基类：epx-visual-component

### 核心数据

| 属性 | 说明 |
|------|------|
| `config` | 当前组件的配置对象（用户已修改的值） |
| `defaultConfigs` | 当前组件的默认配置（由 `initDefaultConfigs()` 生成） |
| `allConfigs` | `config` 与 `defaultConfigs` 的合并结果（computed），用于渲染时取值 |
| `configOptions` | 配置项描述数组，驱动面板渲染 |
| `showConfigOptions` | 经过 `showFlag` / `showCondition` 过滤后的配置项（computed） |

### Props

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `designer` | `Object` | 设计器实例 |
| `widget` | `Object` | 当前组件的 widget 描述 |
| `id` | `String/Number` | 组件 ID |
| `metaId` | `String` | 页面对象 ID |
| `upMetaId` | `String` | 父组件对象 ID |
| `componentInfo` | `Object` | 组件元信息（含 `ID`、`title` 等） |
| `compConfig` | `Object` | 组件当前配置（初始值） |
| `globalConfigs` | `Object` | 页面全局配置（含 JS 代码等） |
| `pageActionList` | `Array` | 页面级接口列表 |
| `pageRuleList` | `Array` | 页面级规则列表 |
| `pageParams` | `Array` | 页面参数列表 |
| `scopeConfigs` | `Object` | 范围查询配置 |

### 关键方法

| 方法名 | 说明 |
|--------|------|
| `initDefaultConfigs()` | 初始化默认配置，子类必须覆盖此方法来定义组件专属默认值 |
| `initConfigOptions()` | 初始化配置项描述数组，从服务端加载组件属性定义 |
| `afterConfigOptions()` | 配置项初始化完成后的钩子，用于合并父组件的 `subConfigOptions` |
| `initConfig()` | 将 `compConfig` 克隆到 `config`，触发后续响应 |
| `afterInitConfig()` | `initConfig` 完成后的钩子，子类可覆盖做额外处理 |
| `changeConfigItem(key, value)` | 修改单个配置项 |
| `getConfigs()` | 导出最终配置（过滤掉与默认值相同的项，置为 `null`） |
| `getComponentSetting()` | 导出组件级属性（`flex`、`span`、`style` 等） |
| `getActionList(metaId)` | 加载指定对象的接口列表 |
| `getRuleList(metaId)` | 加载指定对象的规则列表 |
| `getAllFields()` | 加载当前对象的字段树 |
| `getFieldOptions()` | 初始化字段配置项的选项列表（`fieldOptions`） |
| `getOperateOptions()` | 初始化操作按钮配置项（`operateConfigs`、`handlerList`、`commonOperates`） |
| `renderFormItem(item)` | 根据配置项描述渲染对应的配置控件 |

---

## configOptions 配置项描述

`configOptions` 是一个数组，每个元素描述一个配置项，驱动面板自动渲染。

### 基本结构

```js
{
  key: 'pageSize',       // 对应 config 中的字段名
  label: '每页记录数',    // 面板显示的标签
  type: 'num',           // 控件类型
  defaultValue: 20,      // 默认值（可选）
  tip: '说明文字',        // 鼠标悬浮提示（可选）
  showTip: true,         // 是否显示 tip 图标
  showFlag: {            // 显示条件（可选）
    type: 'table'        // 仅当 config.type === 'table' 时显示
  },
  showCondition: '...',  // 动态显示条件表达式（JSON 格式，可选）
}
```

### 支持的控件类型（type）

| type | 说明 | 常用附加属性 |
|------|------|------|
| `text` | 文本输入框（默认） | `inputVariable`、`regExp`、`readonly` |
| `textarea` | 多行文本 | 支持 i18n |
| `num` | 数字输入 | |
| `switch` | 开关 | |
| `radio` | 单选组 | `options` 或 `code`（字典 key） |
| `checkbox` | 多选组 | `options` 或 `code` |
| `select` | 下拉选择 | `options`、`multiple` |
| `tree` | 树形选择 | `options` |
| `color` | 颜色选择器 | |
| `font` | 字体样式（可折叠） | |
| `html` | 富文本 | 支持 i18n |
| `image` | 图片选择 | |
| `field` | 字段选择 | `multiple`、`limit`（限制数据类型）、`showSubField` |
| `list-field` | 字段列表（可配置每个字段的属性） | `field-options` |
| `order-field` | 排序字段 | |
| `m-field` | 移动端字段列表 | |
| `object` / `multiobject` | 对象选择 | `object`（对象 ID）、`dataKey`、`flag`、`scopeParams` |
| `operates` / `operate` | 操作按钮配置 | `operate-configs`、`handlerList`、`common-operates` |
| `scope` | 范围查询条件 | `extendFields` |
| `params` | 参数映射 | |
| `el` | 表达式编辑器 | |
| `action` | 接口选择 | 从 `actionList` 中选择 |
| `rule` | 规则选择 | 从 `ruleList` 中选择 |
| `row` | 行字段配置（卡片布局） | `field-options` |
| `list` | 通用列表选择 | `options`、`multiple` |
| `event` | 组件事件配置 | `eventList` |
| `function` | JS 函数选择 | |
| `page` | 页面选择 | |
| `custom` | 自定义渲染 | `CUSTOM_FUNCTION`（方法名） |
| `report` | 报表配置 | |

### showFlag 显示条件

`showFlag` 是一个对象，key 为 `config` 中的字段名，value 为期望值（或数组）：

```js
// 仅当 config.handler === 'goPage' 时显示
showFlag: { handler: 'goPage' }

// 仅当 config.handler 为 'goPage' 或 'addEntity' 时显示
showFlag: { handler: ['goPage', 'addEntity'] }

// 多条件同时满足（AND 关系）
showFlag: { handler: 'sendMessage', type: 'table' }
```

`showCondition` 支持更复杂的动态表达式，格式为 JSON 字符串，`el` 字段为可执行的 JS 表达式，`config` 变量指向 `allConfigs`：

```js
showCondition: JSON.stringify({ el: '#{config.editable === true && config.dataType === "object"}' })
```

---

## 开发新组件的配置面板

### 1. 创建配置面板文件

```js
// src/frame/views/visual/MyComponent.vue
import { VisualComponent } from 'epx-frame'

export default {
  name: 'epx-visual-my-component',
  extends: ComponentVue,

  methods: {
    // 必须覆盖：定义组件默认配置
    initDefaultConfigs () {
      this.defaultConfigs = {
        flex: false,
        span: 24,
        myOption: 'default',
        pageSize: 10
      }
    },

    // 可选覆盖：追加自定义配置项
    async initConfigOptions () {
      await ComponentVue.options.methods.initConfigOptions.call(this)
      this.configOptions.push(
        {
          key: 'myOption',
          label: '自定义选项',
          type: 'radio',
          options: [
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' }
          ]
        },
        {
          key: 'pageSize',
          label: '每页记录数',
          type: 'num'
        }
      )
    },

    // 可选覆盖：扩展操作按钮配置
    getOperateOptions () {
      ComponentVue.options.methods.getOperateOptions.call(this)
      this.handlerList.push({ label: '自定义操作', value: 'myHandler' })
    },

    // 可选覆盖：扩展字段配置项选项
    getFieldOptions () {
      ComponentVue.options.methods.getFieldOptions.call(this)
      this.fieldOptions.push({
        key: 'myFieldOption',
        label: '自定义字段配置',
        type: 'switch'
      })
    },

    // 可选：自定义某个配置项的渲染（custom 类型）
    renderMyCustomOption (item) {
      return (
        <div>
          <el-input vModel={this.config[item.key]} />
        </div>
      )
    }
  }
}
```

在 `configOptions` 中使用 `custom` 类型时，`CUSTOM_FUNCTION` 指定上面的方法名：

```js
{
  key: 'myCustomKey',
  label: '自定义控件',
  type: 'custom',
  CUSTOM_FUNCTION: 'renderMyCustomOption'
}
```

### 2. 注册到设计器

在设计器的组件映射表中将配置面板与业务组件关联：

```js
{
  componentName: 'epx-my-component',
  visualComponent: 'epx-visual-my-component'
}
```

---

## 示例：EntityList 配置面板

`epx-visual-entity-list` 继承自基类，主要覆盖了以下内容：

**`initDefaultConfigs()`** — 根据当前对象动态生成默认配置：
- 从 `metaView` 或对象元数据中读取默认 `listFields`
- 生成默认的 `operates`（新增、删除、导入、导出）
- 生成默认的 `columnOperates`（编辑）
- 生成默认的 `treeListOperates`（上移、下移、移到最前/最后/外层、拖拽排序）

**`getOperateOptions()`** — 扩展了大量业务专属的操作配置项，例如：
- `batchCheck`：审核意见、签名字段配置
- `sendMessage`：消息模板、接收人手机/邮箱配置
- `exportFile`：是否直接导出、导出附件字段配置
- `skipProcessNode`：流程跳转节点选择、结束其他节点开关
- `resetCheckPerson` / `rejectionProcess`：流程管理员操作

**`getFieldOptions()`** — 扩展了列表字段的专属配置项：
- 字段对齐方式、锁定、可编辑、可排序
- 图片显示方式（剪切/填充/缩放）
- 链接跳转（页面/URL）及参数配置
- 关联对象字段的统计方式（记录数、求和等）
- 行内编辑的查找页面、对象查询范围

**`renderCardBackground()`** — 自定义渲染卡片背景配置区域，支持静态背景样式和多条件动态背景（每个条件对应独立的背景样式）。
