# HTTP 请求

epx-frame 提供两层 HTTP 请求封装，均挂载在 `this.$http` 上：

- `$request` / `$get` / `$post` — 通用 HTTP 请求，直接发起任意接口调用
- `get` / `find` / `list` / `save` 等 — 针对平台实体数据模型的语义化业务请求

## 通用请求

### $post — 通用 POST

```js
// 参数对象作为请求体
this.$http.$post({ action: 'approve', entityId: 'FM_APPLY', id: 'apply001' })

// 指定 URL + 请求体
this.$http.$post('/custom/api', { name: '张三' })

// 请求体 + 额外配置（如 responseType）
this.$http.$post({ entityId: 'FM_FILE' }, { responseType: 'blob' })
```

### $get — 通用 GET

```js
// 参数对象作为 query 参数
this.$http.$get({ entityId: 'FM_EMPLOYEE', id: 'emp001' })

// 指定 URL + query 参数
this.$http.$get('/custom/api', { page: 1, size: 10 })
```

### $request — 完全自定义请求

```js
// 指定 URL，参数和配置项完全自定义
this.$http.$request('/custom/api', { name: '张三' }, { method: 'post' })
```

---

## 业务请求

以下方法基于平台实体数据模型封装，请求路径自动拼接为 `/api/v1/{client}/{system}/{entityId}/{action}`。

所有业务请求方法均支持以下通用参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| `entityId` | String | 实体 ID |
| `action` | String | 覆盖默认 action |
| `rule` | String | 指定业务规则，请求路径切换为 `/rule/v1` |
| `scope.*` | String | 查询条件，格式为 `scope.字段名`，空值自动忽略 |
| `scopeParams` | Array | 高级查询条件数组 |

### get — 查询详情

根据 ID 查询单条实体数据，返回 `data.data`。

```js
this.$http.get({
  entityId: 'FM_EMPLOYEE',
  id: 'emp001'
}).then(data => {
  console.log(data.data)
})
```

### find — 条件查询单条

POST 方式按条件查询单条数据。

```js
this.$http.find({
  entityId: 'FM_EMPLOYEE',
  'scope.CODE': 'zhangsan'
}).then(data => {
  console.log(data.data)
})
```

### list — 查询列表

POST 方式查询列表，支持分页、排序。

| 参数 | 类型 | 说明 |
|------|------|------|
| `limit` | Number | 每页条数 |
| `page` | Number | 页码（从 1 开始） |
| `orderBy` | String | 排序字段 |

```js
this.$http.list({
  entityId: 'FM_EMPLOYEE',
  'scope.DEPT_ID': '1001',
  limit: 20,
  page: 1,
  orderBy: 'CREATE_TIME'
}).then(data => {
  console.log(data.entitys)  // 数据列表
  console.log(data.total)    // 总条数
})
```

### getCount — 查询数量

POST 方式查询符合条件的记录数。

```js
this.$http.getCount({
  entityId: 'FM_EMPLOYEE',
  'scope.DEPT_ID': '1001'
}).then(data => {
  console.log(data.count)
})
```

### save — 新增/保存

POST 方式保存数据，有 `id` 则更新，无 `id` 则新增。返回值经过 `middleware` 处理，直接返回 `data.data`。

```js
this.$http.save({
  entityId: 'FM_EMPLOYEE',
  data: {
    NAME: '张三',
    DEPT_ID: '1001'
  }
}).then(record => {
  // record 即保存后的实体数据
  console.log(record.ID)
})
```

### update — 更新

POST 方式更新数据，返回值同 `save`，直接返回 `data.data`。

```js
this.$http.update({
  entityId: 'FM_EMPLOYEE',
  id: 'emp001',
  data: { NAME: '李四' }
}).then(record => {
  console.log(record)
})
```

### removeMulti — 批量删除

GET 方式批量删除，`ids` 为逗号分隔的 ID 字符串。

```js
this.$http.removeMulti({
  entityId: 'FM_EMPLOYEE',
  ids: 'emp001,emp002,emp003'
}).then(() => {
  this.$message.success('删除成功')
})
```

---

## 高级用法

### 指定服务域

通过第二个参数（options）传入 `domainContext`、`client`、`system` 可覆盖默认路由：

```js
this.$http.list({
  entityId: 'FM_ORDER'
}, {
  domainContext: 'order-service',  // 指定微服务域
  client: 'custom-client',
  system: 'custom-system'
})
```

### 业务规则请求

传入 `rule` 参数时，请求路径自动切换为 `/rule/v1`：

```js
this.$http.$post({
  entityId: 'FM_APPLY',
  rule: 'approveFlow',
  id: 'apply001'
})
```

### FormData 上传

通过 options 指定 `requestType: 'formData'`，请求体自动转换为 `FormData`：

```js
this.$http.$post({
  entityId: 'FM_FILE',
  file: fileObject
}, {
  requestType: 'formData'
})
```
