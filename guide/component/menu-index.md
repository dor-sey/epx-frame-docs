# MenuIndex 菜单导航页

菜单导航页组件（`epx-menu-index`）是模块级页面的容器组件，负责加载左侧菜单、管理路由栈，并渲染对应的内容页面。

## 静态配置项

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `$componentType` | `'page'` | 组件类型标识 |
| `backButton` | `false` | 是否在菜单底部显示返回按钮 |
| `backTitle` | `'退出当前模块'` | 返回按钮文字 |
| `showMenuNav` | `true` | 是否显示菜单导航 |
| `showFirstModule` | `false` | 是否默认跳转到第一个子模块的首页 |
| `navConfigs` | `{ flag: false }` | 顶部导航栏配置 |

## Props

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `routeKey` | `String \| Number` | 当前路由标识，用于匹配路由树中的菜单节点 |
| `router` | `Object` | 当前路由配置对象 |

## 组件变量

| 变量名 | 说明 |
|--------|------|
| `module` | 当前模块信息对象（含 `ID`、`NAME` 等） |
| `modules` | 当前模块的子模块列表 |
| `menu` | 当前模块的菜单树数据 |
| `menuRouters` | 当前路由栈（二级路由历史） |
| `menuRoute` | 当前激活的路由（路由栈最后一项） |
| `moduleId` | 当前模块 ID |
| `showPage` | 是否显示内容页（用于强制重载） |
| `toPages` | 跳转页面的配置 |
| `initRoute` | 初始路由配置（传给 `epx-router-view`） |

## 计算属性

| 属性名 | 说明 |
|--------|------|
| `moduleName` | 当前模块名称 |
| `metaId` | 当前路由对应的对象 ID |
| `flag` | 当前路由对应的页面标识 |
| `pageId` | 当前路由的页面 ID |
| `component` | 当前路由的组件名 |
| `showIndex` | 当前路由在路由栈中的索引 |
| `initRoute` | 初始路由配置 |

## 组件方法

| 方法名 | 说明 |
|--------|------|
| `getMenu(moduleId)` | 根据模块 ID 加载菜单树数据 |
| `getModule()` | 获取当前模块详情信息 |
| `getModules(moduleId)` | 获取当前模块的子模块列表 |
| `reloadPage()` | 强制重载内容页（通过销毁重建实现） |
| `getMainPage()` | 初始化主页路由 |
| `changeRouter(v)` | 切换路由 |
| `addListenerRouter()` | 注册路由事件监听（`push` / `pop` / `reload`） |
| `removeListenerRouter()` | 移除路由事件监听，切换为模块级路由监听 |
| `getShowMenuData(menu)` | 过滤隐藏的菜单项（`HIDDEN_MENU` / `HIDDEN_SUB_MENU`） |
| `getFirstPage(menu)` | 递归获取菜单树中第一个有效页面 ID |
| `getMenuInfo()` | 返回当前模块和菜单信息（通过 `provide` 注入给子组件） |

## Provide

组件通过 `provide` 向子组件注入以下方法：

| 注入键 | 说明 |
|--------|------|
| `$changeRouter` | 切换路由 |
| `$reloadPage` | 重载当前页面 |
| `getMenuInfo` | 获取当前模块和菜单信息 |

## 使用示例

### 在页面配置中使用

```js
{
  contentType: 'menu-index',
  configs: {
    showMenuNav: true,
    backButton: false,
    showFirstModule: false
  }
}
```

### 通过继承自定义菜单加载逻辑

```js
import { MenuIndex } from 'epx-frame'

export default {
  name: 'epx-my-menu-index',
  extends: MenuIndex,
  methods: {
    // 自定义菜单数据处理
    getMenu (moduleId) {
      MenuIndex.options.methods.getMenu.call(this, moduleId)
      // 加载完成后追加自定义菜单项
    },
    // 自定义菜单显示过滤
    getShowMenuData (menu) {
      MenuIndex.options.methods.getShowMenuData.call(this, menu)
      // 额外过滤逻辑
    }
  }
}
```
