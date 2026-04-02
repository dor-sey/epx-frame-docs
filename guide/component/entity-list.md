# EntityList 对象列表

对象列表组件（`epx-entity-list`）是 EPX-Frame 中最核心的业务组件之一，用于展示和管理业务数据列表。它支持数据查询、筛选、分页、新增、编辑、删除、导入导出等常见操作。

## 静态配置项

以下配置项定义在组件选项对象上（非 `props`），用于控制组件的默认行为：

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `addPage` | `'entity-add-page'` | 新增页面组件名 |
| `editPage` | `'entity-edit-page'` | 编辑页面组件名 |
| `detailPage` | `'entity-detail-page'` | 详情页面组件名 |
| `searchFlag` | `true` | 是否显示搜索区域 |
| `showKeyword` | `true` | 是否显示关键字搜索框 |
| `searchMode` | `'keyword'` | 搜索模式，可选 `'keyword'` / `'field'` / `'filter'` |
| `showSearchLabel` | `false` | 搜索字段是否显示标签 |
| `showFilter` | `true` | 是否显示筛选按钮 |
| `flag` | `true` | 是否显示组件 |
| `locked` | `true` | 是否锁定列表 |
| `fixedTable` | `true` | 是否固定表格高度 |
| `isChangeListType` | `false` | 是否允许列表/卡片视图切换 |
| `border` | `false` | 表格是否显示边框 |
| `titleFlag` | `true` | 是否显示标题 |
| `queryParams` | `{}` | 默认查询参数 |
| `listFields` | `null` | 查询字段列表 |
| `fieldConfigs` | `{}` | 字段配置 |
| `pageFlag` | `true` | 是否启用分页 |
| `pageSize` | `20` | 每页记录数 |
| `operateFlag` | `true` | 是否显示工具栏操作按钮 |
| `operateEllipsis` | `2` | 工具栏按钮超出折叠数量 |
| `multiSelectColumnFlag` | `true` | 是否显示多选框列 |
| `serialColumnFlag` | `true` | 是否显示序号列 |
| `operateColumnFlag` | `true` | 是否显示操作列 |
| `totalFlag` | `true` | 是否显示总数 |
| `operateColumnWidth` | `100` | 操作列宽度（px） |
| `operateColumnPosition` | `'start'` | 操作列位置，可选 `'start'` / `'end'` |
| `operateColumnLocked` | `false` | 操作列是否固定 |
| `operateColumnEllipsis` | `2` | 行操作按钮超出折叠数量，`false` 不折叠 |
| `dragSort` | `false` | 是否启用拖拽排序 |
| `sortable` | `true` | 是否允许列排序 |
| `setField` | `false` | 是否显示字段设置入口 |
| `lazy` | `true` | 树形数据是否懒加载 |
| `treeExpandLevel` | `'level'` | 树形展开层级，可选 `'all'` / `'first'` / `'none'` |
| `detailFlag` | `true` | 是否有详情页 |

## 组件变量

| 变量名 | 说明 |
|--------|------|
| `data` | 表格数据 |
| `loading` | 加载状态 |
| `currentPage` | 当前页码 |
| `pageSize` | 每页记录数 |
| `total` | 总记录数 |
| `listFields` | 当前渲染的字段列表 |
| `selectionIds` | 选中行的主键 ID 数组 |
| `selection` | 选中行的完整数据对象数组（computed） |
| `searchScopeParams` | 搜索条件（scope 格式） |
| `searchKeyParams` | 关键字搜索参数 |
| `sortParams` | 当前排序参数 |
| `listType` | 当前视图类型，`'table'` 或 `'card'` |
| `expandRowKeys` | 树形表格展开行的 key 数组 |
| `categoryTreeData` | 分类导航树数据 |
| `showFieldSetting` | 是否显示字段设置面板 |

## 组件方法

### 数据操作

| 方法名 | 说明 |
|--------|------|
| `getData(current?, cb?)` | 获取列表数据，`current` 指定页码，`cb` 为数据加载后的回调 |
| `reloadData()` | 重新加载数据（同时刷新分类树） |
| `getFields(fields?, isGetData?)` | 初始化字段配置并加载数据 |
| `getTreeData(params, cb?)` | 获取树形结构数据 |
| `search(scopeParams)` | 设置 scope 查询条件并触发搜索 |
| `searchKeyword(searchKeyParams)` | 设置关键字查询条件 |
| `$refesh()` | 刷新列表（公开方法，供外部调用） |

### 行操作

| 方法名 | 说明 |
|--------|------|
| `addEntity(config?, item?)` | 新增记录，跳转到新增页面 |
| `editEntity(config?, item?)` | 编辑记录，跳转到编辑页面 |
| `addCategoryEntity(operate?, select?, isSibling?)` | 新增分类节点 |
| `editCategoryEntity(operate?, item?)` | 编辑分类节点 |
| `addCategorySiblingEntity(operate?, data?)` | 新增同级分类节点 |

### 选择操作

| 方法名 | 说明 |
|--------|------|
| `selectAll(v)` | 全选/取消全选当前页数据 |
| `getShowColumnOperates(row)` | 获取指定行可显示的操作按钮列表 |

### 分页与排序

| 方法名 | 说明 |
|--------|------|
| `currentChange(current)` | 页码变化回调 |
| `sizeChange(size)` | 每页条数变化回调 |
| `sortChange({ column, prop, order })` | 列排序变化回调 |

### 分类导航

| 方法名 | 说明 |
|--------|------|
| `getCategoryMeta()` | 初始化分类导航元数据 |
| `getCategoryTreeData(first?)` | 加载分类树数据 |
| `categoryTreeClick(item)` | 点击分类树节点 |
| `searchCategoryData()` | 搜索分类树节点 |

## 渲染方法

对象列表组件提供了可重写的渲染方法，方便子组件或继承组件进行自定义：

| 方法名 | 说明 |
|--------|------|
| `renderNote()` | 渲染顶部提示信息 |
| `renderSearch()` | 渲染搜索区域 |
| `renderButtons()` | 渲染工具栏（操作按钮、关键字搜索、筛选等） |
| `renderList()` | 渲染列表区域（根据 `listType` 分发到 `renderTable` 或 `renderCardList`） |
| `renderTable()` | 渲染表格视图 |
| `renderCardList()` | 渲染卡片视图 |
| `renderVerticalItem(item, index)` | 渲染单个卡片项 |
| `renderCardColumnOperates(item)` | 渲染卡片项的操作按钮 |
| `renderField(field, index)` | 渲染单个表格列的 slot 配置 |
| `renderColumnOperates()` | 渲染行操作列的 slot 配置 |
| `renderCheckOperates(operates)` | 渲染审核操作按钮组 |
| `renderCategory()` | 渲染左侧分类导航树 |
| `renderFieldSetting()` | 渲染字段设置面板 |
| `rendercheckDialog()` | 渲染审核对话框 |
| `renderSkipNodeDialog()` | 渲染跳转流程节点对话框 |
| `renderDownloadReportDialog()` | 渲染下载报告对话框 |
| `renderSendMessageDialog()` | 渲染发送消息对话框 |
| `renderMobile()` | 渲染移动端视图 |

## 使用示例

### 在页面模板中使用

```js
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
      pageSize: 20,
      operateColumnPosition: 'end',
      dragSort: false,
      multiSelectColumnFlag: true
    }
  }
]
```

### 通过继承自定义

```js
import ListVue from '@/frame/packages/entity-list'

export default {
  name: 'epx-my-list',
  extends: ListVue,
  methods: {
    // 重写渲染操作列
    renderColumnOperates () {
      const base = ListVue.options.methods.renderColumnOperates.call(this)
      // 在原有基础上扩展 scopedSlots
      return {
        ...base,
        scopedSlots: {
          ...base.scopedSlots,
          default: ({ row }) => (
            <div>
              <el-button type="text" onClick={() => this.handleCustomAction(row)}>自定义</el-button>
            </div>
          )
        }
      }
    },
    handleCustomAction (row) {
      // 自定义行为
    }
  }
}
```
