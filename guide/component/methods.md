# 组件方法

框架通过全局混入和 `mixins.component` 两层机制向组件注入方法。

- **全局方法**：无需任何混入，所有组件均可直接调用
- **组件方法**：需要混入 `mixins.component` 后才可调用

## 全局方法

以下方法挂载在 `Vue.prototype` 上，所有组件实例均可直接通过 `this` 调用。

### 广播与组件查找

#### `this.$broadcast(componentName, eventName, params)`

向子组件树中所有 `$options.componentName` 匹配的组件广播事件。

| 参数 | 类型 | 说明 |
|------|------|------|
| `componentName` | String | 目标组件的 `componentName` |
| `eventName` | String | 事件名 |
| `params` | Any | 传递的参数 |

#### `this.$broadcastCom(componentName, eventName, params)`

向子组件树中所有 `$options.name` 为 `epx-{componentName}` 的组件广播事件。

#### `this.$getComponentById(id)`

在子组件树中递归查找 `compId` 匹配的组件实例，返回找到的组件或 `undefined`。

#### `this.$dispatch(componentName, eventName, ...params)`

向上查找 `$options.componentName` 匹配的祖先组件并触发事件。

#### `this.$dispatchPage(eventName, params, componentName?)`

向上查找最近的页面组件（`$componentType === 'page'`）并触发事件。

#### `this.$listenPage(eventName, callback, componentName?)`

向上查找最近的页面组件并监听事件。

---

### 页面导航

#### `this.goPage(config, row?)`

通用页面跳转方法，支持选中记录校验、参数格式化和确认弹窗。

| 参数 | 类型 | 说明 |
|------|------|------|
| `config.type` | String | 跳转类型，默认 `'push'` |
| `config.pageFlag` | String | 目标页面标识符 |
| `config.metaId` | String | 目标页面对象元数据 ID，默认为当前页面 |
| `config.metaViewId` | String | 目标视图 ID |
| `config.num` | Number/String | 选中记录数校验：`0` 不需要选中，`1` 必须选中一条，`n` 至少选中一条 |
| `config.openMode` | String | 打开方式（见 `$createPage` 的 `openType`） |
| `config.component` | String | 目标组件名 |
| `config.pageId` | String | 目标页面 ID |
| `config.menuId` | String | 目标菜单 ID |
| `config.confirm` | Boolean | 是否需要确认弹窗 |
| `config.confirmMsg` | String | 确认弹窗内容 |
| `config.params` | Object | 传递给目标页面的参数，支持 `#[字段名]`、`$[变量名]` 语法 |
| `row` | Object | 当前操作行数据 |

#### `this.$createPage(options)`

底层页面创建方法，支持多种打开方式。

| `openType` 值 | 说明 |
|--------------|------|
| `'1'` | 在标签页中打开 |
| `'2'` | 以弹窗方式打开 |
| `'3'` | 关闭所有弹窗后跳转 |
| `'4'` | 打开新浏览器窗口 |
| `'5'` | 以抽屉方式打开 |
| 不传 | 在当前路由视图中跳转 |

#### `this.$backPage(options?)`

返回上一页。弹窗模式下关闭弹窗，标签页模式下销毁当前页。

| 参数 | 类型 | 说明 |
|------|------|------|
| `options.reload` | Boolean | 返回后是否刷新父页面 |
| `options.delta` | Number | 返回层数，默认 `1` |
| `options.callback` | Function | 返回后的回调 |

#### `this.$reloadPage()`

刷新当前页面。

#### `this.$backRefeshPage(props?)`

返回上一页并刷新父页面，等同于 `$backPage({ reload: true })`。

#### `this.$createShortUrlPage(options)`

生成短链接并跳转。

| 参数 | 类型 | 说明 |
|------|------|------|
| `options.path` | String | 目标路径，不传则使用当前应用路径 |
| `options.params` | Object | 查询参数 |
| `options.type` | String | 路由跳转类型，默认 `'push'` |

---

### 权限校验

#### `this.$checkRight(rightCode)`

检查当前用户是否拥有指定权限码，无权限码时返回 `true`。

#### `this.$checkOperateRight({ action, rule, metaId })`

检查当前用户对指定对象是否拥有操作权限（API 权限或业务规则权限）。

---

### 参数格式化

#### `this.$formatParams(params, data?)`

格式化参数对象，支持以下占位符语法：

| 语法 | 说明 |
|------|------|
| `#[字段名]` | 取 `data`（选中行）中对应字段的值，多条记录用逗号拼接 |
| `$[变量名]` | 取当前组件实例、`$tab`、`$query`、`$pageParams`、`$compData` 中的值 |
| `#{表达式}` | 通过 `eval` 执行表达式，依次从 `this`、`$query`、`$tab` 取值 |

---

### 自定义 JS 执行

#### `this.executeCustomJs(functionName, ...args)`

执行页面配置中定义的自定义 JS 函数。函数从 `pageEvents` 中查找，不存在时返回 `true`。

#### `this.customJs({ function, ...otherConfigs }, row?)`

按钮配置中调用自定义 JS 的快捷方法。

---

### 其他

#### `this.$handler(buttonConfigs, row?, ...params)`

通用按钮处理器，支持 `beforeTrigger` 前置钩子、`limitCondition` / `limitConditionEl` 条件校验，校验通过后调用 `buttonConfigs.handler` 指定的方法。

#### `this.dispatch(componentName, eventName, ...params)`

`$dispatch` 的别名。

#### `this.broadcast(componentName, eventName, params)`

`$broadcast` 的别名。

#### `this.reloadPage()`

`$reloadPage` 的别名。

#### `this.backRefeshPage(props?)`

`$backRefeshPage` 的别名。

#### `this.commonRuleAction(config, ...props)`

`commonAction` 的快捷方式，自动将 `requestType` 设为 `'rule'`。

#### `this.getComponentById(id, parent?)`

`$getComponentById` 的别名，支持指定查找起点。

---

## 组件方法

以下方法由 `mixins.component` 提供，需要[混入 component](./mixin.md) 后才可使用。混入后还可访问的计算属性（组件变量）详见[组件变量](./variables.md#组件变量需混入-mixinscomponent)。

#### `this.$setPageConfig(page?)`

初始化页面配置，将 `$options` 和 `page.config` 合并到 `this.pageConfig`，并处理国际化。

#### `this.$setCompConfigs()`

初始化组件配置，将 `$options` 和 `compConfigs` 合并到 `this.configs`。

#### `this.$formatComponents(arr, component?)`

格式化子组件列表，处理迭代器（`iterator`）展开、`showIf` 条件过滤和终端（`showTerminal`）过滤，返回可渲染的组件数组。

#### `this.$formatContent(content, data?)`

格式化字符串内容，替换 `{{表达式}}` 和 `$[变量名]` 占位符。

#### `this.$formatScope(scopeParams, data?)`

格式化作用域参数，支持 `#{}`, `$[]`, `#[]`, `{{}}` 占位符语法。

---

### 页面与组件查找

#### `this.$getParentPage()`

向上查找最近的页面组件（`$componentType === 'page'`）并返回。

#### `this.$getPageComponent(id, current?, prefix?)`

在当前组件树中查找指定 `compId` 的子组件。

#### `this.$dispatchComponent(id, eventName, ...params)`

向父页面中指定 `compId` 的组件广播事件。

---

### 页面数据操作

#### `this.$setParentPageModel(model)`

修改父页面的 `model` 数据，通过 `$set` 响应式更新。

#### `this.$refesh()`

刷新当前组件（默认为空实现，可在子组件中重写）。

#### `this.$refeshPage()`

调用上级页面的 `$refesh` 方法。

---

### 事件

#### `this.$excuteEvent(key, ...args)`

执行组件配置 `componentEvents` 中指定 key 对应的自定义 JS 事件列表。

---

### 通用操作

#### `this.commonAction(config, row?)`

通用 HTTP 请求操作，支持选中记录校验、确认弹窗、loading 防重、成功/失败提示及后续触发。

| 参数 | 类型 | 说明 |
|------|------|------|
| `config.action` | String | 请求命令 |
| `config.rule` | String | 业务规则（`requestType: 'rule'` 时使用） |
| `config.metaId` | String | 请求对象，默认为当前页面对象 |
| `config.num` | Number/String | 选中记录数校验 |
| `config.confirm` | Boolean | 是否需要确认弹窗 |
| `config.confirmMsg` | String | 确认弹窗内容 |
| `config.params` | Object | 请求参数，支持占位符语法 |
| `config.successMsg` | String | 成功提示，默认 `'处理成功'` |
| `config.failMsg` | String | 失败提示，默认 `'处理失败'` |
| `config.mask` | Boolean | 是否显示全屏 loading |
| `config.afterTrigger` | String | 成功后调用的方法名 |
| `config.afterTriggerPage` | String | 成功后跳转的页面 ID |
| `config.afterTriggerParams` | Object | 后续触发的参数 |
| `row` | Object | 当前操作行数据 |

#### `this.downloadFile(config, row?)`

通用文件下载操作，参数与 `commonAction` 基本一致，成功后自动触发浏览器下载。

#### `this.print(config, row?)`

通用打印方法，支持自定义报表（`printWay: 'custom'`）和帆软报表（`printWay: 'fine'`）两种方式。

#### `this.goWebLink(config)`

打开外部链接，读取 `config.webLinkUrl` 并调用 `window.open`。

#### `this.goApp(config, item?)`

跳转到其他应用，根据 `config.serviceId` 查询服务信息后拼接 URL 并打开新窗口。
