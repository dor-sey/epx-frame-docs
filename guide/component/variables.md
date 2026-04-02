# 组件变量

框架通过全局混入和 `mixins.component` 两层机制向组件注入变量。

- **全局变量**：无需任何混入，所有组件均可直接访问
- **组件变量**：需要混入 `mixins.component` 后才可访问

## 全局变量（所有组件可用）

### 应用配置

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `clientConfig` | Object | 当前客户配置信息 |
| `appConfig` | Object | 当前应用配置信息 |
| `appMenus` | Array | 当前应用的菜单列表 |
| `currentMenu` | Object | 当前激活的导航菜单 |

### 用户信息

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `user` | Object | 当前登录用户信息，含 `NAME`、`ID`、`roleRightCodes`、`serviceRoles` 等 |
| `userInfo` | Object | 用户扩展信息 |

### 屏幕与设备

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$screen` | Object | 屏幕信息，含宽高、设备类型等 |
| `$isMobile` | Boolean | 是否为移动端 |

### 路由与参数

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$query` | Object | 综合参数，合并路由 query/params、`currentQuery`、上级页面 `pageParams` |
| `$tab` | Object | 当前所属标签页数据 |
| `$tabs` | Array | 所有标签页列表 |
| `$activeTab` | Object | 当前激活的标签页 |
| `CLIENT` | String | 当前客户 ID，从 `$query`、`$tab`、路由、用户、应用配置中按优先级取值 |
| `SYSTEM` | String | 当前系统 ID，取值逻辑同 `CLIENT` |
| `APP` | String | 当前应用 ID，从 `$query` 和 `$tab` 中取值 |
| `$metaId` | String | 当前页面绑定的对象元数据 ID，从 `page.metaId` 或 `meta.id` 取值 |

### 全局混入注入的 Props

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `page` | Object | 当前页面信息 |
| `meta` | Object | 当前对象元数据信息 |
| `currentQuery` | Object | 当前页面的查询参数，会合并到 `$query` 中 |

---

## 组件变量（需混入 mixins.component）

混入 `mixins.component` 后可访问以下额外变量。详见 [混入 component](/guide/component/mixin)。

### 组件自身信息

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$component` | Object | 当前组件的完整信息对象，见下方结构说明 |
| `$configs` | Object | 当前组件的配置项，字符串值中的 `{{}}` 和 `$[]` 插值会被自动解析 |
| `$subcomponents` | Array | 当前组件的子组件列表（经过 `showIf`、`showTerminal`、迭代器处理后的结果） |
| `$compData` | Object | 当前组件的迭代器数据和模板变量 |

#### $component 对象结构

```js
{
  id: 'list',                    // 组件 ID（compId）
  title: '员工列表',              // 组件标题
  contentType: 'entity-list',    // 组件模板名称
  style: { height: '400px' },    // 合并后的组件样式
  configs: { ... },              // 组件配置
  flex: false,                   // 是否 flex 布局
  items: [ ... ],                // 子组件配置
  metaId: 'FM_EMPLOYEE',         // 绑定的对象元数据 ID
  meta: { ... },                 // 对象元数据实例
  parentPage: { ... }            // 父级页面实例
}
```

### 对象元数据

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$metaId` | String | 组件级 metaId，优先级：`metaId` prop > `$configs.metaId` > 页面 metaId > `$query.metaId` |
| `$meta` | Object | 当前对象元数据实例，`$metaId` 不存在时为 `null` |
| `$metaKey` | String | 当前对象的主键字段名，默认为 `'ID'` |

### 页面信息

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$pageId` | String | 当前所属页面的 ID |
| `$pageInfo` | Object | 当前页面的完整信息（含配置、itemConfigs 等） |
| `$pageParams` | Object | 当前页面的参数（页面组件取自身 `pageParams`，子组件取 `upPage.pageParams`） |
| `$parentPage` | Object | 父级页面实例 |
| `$parentPageModel` | Object | 父级页面的 model 数据 |
| `isPage` | Boolean | 当前组件是否为页面组件（`$componentType === 'page'`） |

### 角色信息

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$currentRole` | Object | 当前用户在本应用中的角色信息 |
| `$currentRoleId` | String | 当前角色 ID |

### 事件总线

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$event` | Object | 页面级事件总线，用于同一页面内组件间通信 |

`$event` 会自动向上查找到最近的页面组件作为事件中心：

```js
// 发送事件
this.$event.emit('refresh', { id: '123' })

// 监听事件（组件销毁时自动解绑）
this.$event.on('refresh', (data) => {
  this.loadData(data)
})
```

### 模板变量

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `$templateVariables` | Object | 当前模板定义的变量，来自 `template.variables` |

## 使用示例

```js
import { mixins } from 'epx-frame'

export default {
  mixins: [mixins.component],
  initComponent() {
    console.log(this.user.NAME)        // 全局变量：当前用户
    console.log(this.$query.id)        // 全局变量：路由参数
    console.log(this.$configs.pageSize) // 组件变量：组件配置
    console.log(this.$metaKey)          // 组件变量：主键字段名

    this.$event.on('search', (params) => {
      this.loadData(params)
    })
  }
}
```
