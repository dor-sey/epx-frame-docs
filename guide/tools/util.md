# Util 工具类

`util` 是框架内置的通用工具类，涵盖 URL 参数解析、Token 管理、文件地址生成、插件按需加载、加密解密等能力。可在组件中通过 `this.$util` 使用，也可从 `epx-frame` 包中引入。

## 引入方式

```js
// 组件内
this.$util.search('id')

// 模块内
import { util } from 'epx-frame'
util.getFileUrl('abc123')
```

## URL 与路由

### search — 获取 URL 参数

解析当前地址（或指定地址）的查询参数。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | String | 否 | 参数名。不传则返回所有参数组成的对象 |
| `path` | String | 否 | 指定要解析的 URL，默认取当前地址的 hash 或 search |

**返回值：** `String | null`（传 name）或 `Object`（不传 name）

```js
// 获取单个参数
const id = this.$util.search('id')

// 获取所有参数
const params = this.$util.search()
// { id: '123', type: 'edit' }

// 解析指定 URL
const val = this.$util.search('token', 'https://example.com?token=abc')
```

### getRoutePath — 获取当前路由路径

返回当前 Vue Router 的完整路径，兼容 history 和 hash 两种路由模式。

```js
const path = this.$util.getRoutePath()
```

### getClientCode — 获取当前客户编码

从路由参数或应用配置中获取当前客户编码（clientCode）。

```js
const clientCode = this.$util.getClientCode()
```

### getPublicPath — 获取静态资源根路径

根据路由模式返回静态资源的根路径，history 模式返回 `BASE_URL`，hash 模式返回 `'./'`。

```js
const publicPath = this.$util.getPublicPath()
```

### getRootPath — 获取应用根路径

返回当前应用的根路径（不含路由部分），用于拼接绝对路径。

```js
const rootPath = this.$util.getRootPath()
```

### toLogin — 跳转登录页

清除 Token 和用户状态，跳转到登录页，并携带当前路径作为登录后的回跳地址。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `clearPath` | Boolean | 否 | 是否清除回跳路径，默认保留 |

```js
// 跳转登录页，登录后回跳当前页
this.$util.toLogin()

// 跳转登录页，不保留回跳路径
this.$util.toLogin(true)
```

## Token 管理

框架将 Token 存储在 `localStorage` 中，key 为 `{clientCode}-token`。

### setToken — 存储 Token

```js
this.$util.setToken('your-token-value')
```

### getToken — 读取 Token

```js
const token = this.$util.getToken()
```

### removeToken — 删除 Token

```js
this.$util.removeToken()
```

## 文件与地址

### getFileUrl — 获取文件下载地址

根据文件 ID 生成带鉴权参数的文件访问地址。支持 MinIO 路径、完整 URL、base64 图片的透传。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | String | 是 | 文件 ID 或路径 |
| `client` | String | 否 | 客户编码，默认取当前客户 |
| `flag` | Boolean | 否 | 是否附加 token 参数，默认 `true` |

```js
// 获取文件地址
const url = this.$util.getFileUrl('abc123')

// 不附加 token（用于公开资源）
const url = this.$util.getFileUrl('abc123', null, false)
```

### getOfficeFileUrl — 获取 Office 文件在线预览地址

生成 Office 文件（Word、Excel 等）的在线预览地址。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | String | 是 | 文件 ID |
| `client` | String | 否 | 客户编码 |
| `flag` | Boolean | 否 | 是否附加 token，默认 `true` |

```js
const previewUrl = this.$util.getOfficeFileUrl('doc001')
```

### getAbsPath — 获取绝对接口路径

拼接带客户编码和 xsrf_token 的绝对接口地址。

```js
const url = this.$util.getAbsPath('/api/export', { type: 'excel' })
```

### getRequestUrl — 获取标准接口地址

生成平台标准格式的接口地址：`{baseUrl}/{requestKey}/v1/{client}/{system}/{entityId}/{action}`。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `params.entityId` | String | 是 | 实体 ID |
| `params.action` | String | 是 | 操作名 |
| `params.*` | Any | 否 | 其他参数会拼接到 query string |
| `options.requestKey` | String | 否 | 接口前缀，默认 `'api'`，流式接口传 `'stream'` |

```js
const url = this.$util.getRequestUrl(
  { entityId: 'FM_EMPLOYEE', action: 'list', page: 1 },
  { requestKey: 'api' }
)
```

### getPlatformRequestUrl — 获取平台级接口地址

使用平台基础客户和系统（`BASE_CLIENT_ID` / `BASE_SYSTEM_ID`）生成接口地址，带 token 鉴权。

```js
const url = this.$util.getPlatformRequestUrl({
  entityId: 'FM_CONFIG',
  action: 'get'
})
```

### getSystemMeta — 获取系统元数据标识

生成 `{metaCode}@{system}@{client}` 格式的元数据标识字符串。

```js
const metaKey = this.$util.getSystemMeta('FM_EMPLOYEE')
// 'FM_EMPLOYEE@hr@client001'
```

### urlToBase64 — 图片 URL 转 Base64

将图片 URL 转换为 base64 字符串，返回 Promise。

**返回值：** `Promise<{ data: string, width: number, height: number }>`

```js
const result = await this.$util.urlToBase64('https://example.com/img.png')
console.log(result.data)   // data:image/png;base64,...
console.log(result.width)  // 图片宽度
```

## 插件按需加载

### usePlugin — 异步加载插件

按需异步加载大型第三方库，已加载过的插件会被缓存，不会重复加载。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `plugin` | String | 是 | 插件名称，见下表 |

**支持的插件：**

| plugin 值 | 说明 | 返回值 |
|-----------|------|--------|
| `'echarts'` | ECharts 图表库 | `window.echarts` |
| `'pdf'` | PDF.js，自动适配浏览器版本 | `pdfjsLib` |
| `'luckysheet'` | 在线表格 | `window.luckysheet` |
| `'tinymce'` | 富文本编辑器 | `window.tinymce` |
| `'BMap'` | 百度地图 | `window.BMap` |
| `'TMap'` | 天地图 | `window.T` |
| 其他 | 加载 `public/js/{plugin}.min.js` | `window[plugin]` |

```js
// 加载 ECharts
const echarts = await this.$util.usePlugin('echarts')
const chart = echarts.init(document.getElementById('chart'))

// 加载 PDF.js
const pdfjs = await this.$util.usePlugin('pdf')
const doc = await pdfjs.getDocument({ url: fileUrl }).promise
console.log(`共 ${doc.numPages} 页`)

// 加载百度地图
const BMap = await this.$util.usePlugin('BMap')
const map = new BMap.Map('container')
```

::: tip 提示
`usePlugin` 返回 Promise，同一插件多次调用会复用同一个 Promise，不会重复加载资源。
:::

### loadJS — 动态加载 JS 文件

动态向页面插入 `<script>` 标签加载 JS 文件。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `options.url` | String | 是 | JS 文件地址 |
| `options.callback` | Function | 否 | 加载完成回调 |

```js
this.$util.loadJS({
  url: 'https://cdn.example.com/sdk.js',
  callback() {
    console.log('加载完成')
  }
})
```

### loadCss — 动态加载 CSS 文件

动态向页面插入 `<link>` 标签加载 CSS 文件，兼容旧版 WebKit。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `options.url` | String | 是 | CSS 文件地址 |
| `options.callback` | Function | 否 | 加载完成回调 |
| `options.id` | String | 否 | link 标签的 id |

```js
this.$util.loadCss({
  url: 'https://cdn.example.com/theme.css',
  callback() {
    console.log('样式加载完成')
  }
})
```

### appendCss — 注入内联样式

将 CSS 字符串注入到页面 `<head>` 中，`:current` 选择器会被替换为唯一 class，`url()` 中的文件 ID 会自动转换为完整地址。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | String | 是 | 样式标签唯一标识 |
| `css` | String | 是 | CSS 字符串 |

```js
this.$util.appendCss('my-theme', ':current { color: red; }')
```

### removeCss — 移除内联样式

移除通过 `appendCss` 注入的样式标签。

```js
this.$util.removeCss('my-theme')
```

## 环境检测

### isWeiXin — 判断微信浏览器

```js
if (this.$util.isWeiXin()) {
  // 微信内置浏览器专属逻辑
}
```

### isFeishu — 判断飞书浏览器

```js
if (this.$util.isFeishu()) {
  // 飞书内置浏览器专属逻辑
}
```

### isDingTalk — 判断钉钉浏览器

```js
if (this.$util.isDingTalk()) {
  // 钉钉内置浏览器专属逻辑
}
```

### isIos — 判断 iOS 设备

```js
if (this.$util.isIos()) {
  // iOS 专属逻辑
}
```

### getBrowserVersion — 获取浏览器信息

返回当前浏览器名称和版本号。

**返回值：** `{ brower: string, version: string }`

```js
const { brower, version } = this.$util.getBrowserVersion()
// { brower: 'chrome', version: '120.0.0.0' }
```

### getCurrentLanguage — 获取当前语言

按优先级返回当前语言设置：localStorage > 用户设置 > 客户默认语言。

```js
const lang = this.$util.getCurrentLanguage()
// 'zh-CN'
```

## 数据处理

### getQueryValue — 按点路径取值（空值安全）

通过 `.` 分隔的路径从对象中取值，值为 `null` 或 `undefined` 时返回空字符串。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `path` | String | 是 | 点分隔路径，如 `'user.name'` |
| `obj` | Object | 是 | 数据对象 |

```js
const name = this.$util.getQueryValue('user.name', data)
// data.user.name 不存在时返回 ''，而非报错
```

### getValueByPath — 按路径取值（支持括号语法）

支持 `.` 和 `[]` 两种路径语法从对象中取值。

```js
const val = this.$util.getValueByPath('list[0].name', data)
const val2 = this.$util.getValueByPath("map['key'].value", data)
```

### evalExpression — 执行表达式

在给定数据上下文中执行表达式字符串，内置公式库可直接在表达式中使用。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `el` | String | 是 | 表达式字符串 |
| `data` | Object | 是 | 数据上下文 |

```js
const result = this.$util.evalExpression('age > 18', { age: 20 })
// true
```

### runExp — 在对象上执行表达式

将表达式中的变量自动绑定到指定对象（`point`）上执行。

```js
const result = this.$util.runExp('name + " " + age', { name: '张三', age: 25 })
// '张三 25'
```

### runExpByScope — 按高级查询条件求值

将平台高级查询的 scope 条件列表转换为 JS 表达式并求值，返回 `true`/`false`。

```js
const match = this.$util.runExpByScope(scopeList, rowData)
```

### toPx — 数值转 px 字符串

将数字或不含单位的字符串转换为带 `px` 的字符串。

```js
this.$util.toPx(16)     // '16px'
this.$util.toPx('16')   // '16px'
this.$util.toPx('16px') // '16px'
this.$util.toPx(null)   // ''
```

## 数据转换

### dataURLtoBlob — base64 转 Blob

将 base64 Data URL 转换为 Blob 对象。

```js
const blob = this.$util.dataURLtoBlob('data:image/png;base64,...')
```

### dataURLtoFile — base64 转 File

将 base64 Data URL 转换为 File 对象。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `dataurl` | String | 是 | base64 Data URL |
| `filename` | String | 是 | 文件名 |

```js
const file = this.$util.dataURLtoFile('data:image/png;base64,...', 'avatar.png')
```

### utf8to16 — UTF-8 转 UTF-16

将 UTF-8 编码字符串转换为 UTF-16 字符串，用于特定编码场景。

```js
const str = this.$util.utf8to16(utf8Str)
```

## 加密解密

### encrypt — 加密

支持 RSA（默认）和 AES-CBC 两种加密方式，返回 Promise。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `content` | String | 是 | 待加密内容 |
| `key` | String | 是 | 密钥（RSA 公钥或 AES base64 密钥） |
| `options.type` | String | 否 | `'aes'` 使用 AES，不传则使用 RSA |

```js
// RSA 加密
const encrypted = await this.$util.encrypt('hello', rsaPublicKey)

// AES 加密
const encrypted = await this.$util.encrypt('hello', aesBase64Key, { type: 'aes' })
```

### decrypt — 解密

支持 RSA 和 AES-CBC 解密，返回 Promise。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `content` | String | 是 | 待解密内容 |
| `options.type` | String | 否 | `'aes'` 使用 AES，不传则使用 RSA |
| `options.key` | String | 是 | 密钥 |

```js
const decrypted = await this.$util.decrypt(encryptedStr, { type: 'aes', key: aesBase64Key })
```

## 其他工具

### genId — 生成短 ID

生成一个基于随机数和时间戳的短 ID（36 进制字符串）。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `length` | Number | 否 | 随机数截取位数，默认 `3` |

```js
const id = this.$util.genId()     // 如 'k7f2m'
const id = this.$util.genId(6)    // 更长的 ID
```

### uuid — 生成 UUID

优先使用 `crypto.randomUUID()`，不支持时降级为手动拼接。

```js
const id = this.$util.uuid()
// 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
```

### copyToClipboard — 复制到剪贴板

将文本复制到系统剪贴板，优先使用 Clipboard API，降级使用 `execCommand`。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | String | 是 | 要复制的文本 |
| `callback` | Function | 否 | 复制完成回调，参数为 `true` |

```js
this.$util.copyToClipboard('复制这段文字', (success) => {
  if (success) this.$message.success('已复制')
})
```

### openWindow — 新窗口打开链接

通过创建 `<a>` 标签模拟点击，在新标签页中打开指定 URL。

```js
this.$util.openWindow('https://example.com')
```

### awaitWrap — Promise 错误包装

将 Promise 包装为 `{ error, data }` 结构，避免 try/catch 嵌套。

```js
const { error, data } = await this.$util.awaitWrap(somePromise)
if (error) {
  console.error('请求失败', error)
} else {
  console.log('数据', data)
}
```
