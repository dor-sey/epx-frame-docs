# Cookie

EPX-Frame 封装了 Cookie 操作工具，支持 Cookie 的读取、设置和删除操作。可以在组件中通过 `this.$cookie` 直接使用。

## 使用方式

```js
// 在组件中使用
this.$cookie.set('token', 'abc123')
const token = this.$cookie.get('token')
this.$cookie.remove('token')
```

## 方法列表

### set — 设置 Cookie

设置一个 Cookie 值。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | String | 是 | Cookie 名称 |
| `value` | String | 是 | Cookie 值 |
| `options` | Object | 否 | 配置选项 |

**options 配置：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `expires` | Number / Date | 过期时间（天数为数字，或指定日期） |
| `path` | String | Cookie 路径，默认为 `/` |
| `domain` | String | Cookie 域名 |
| `secure` | Boolean | 是否仅 HTTPS 传输 |

```js
// 设置 Cookie，7 天后过期
this.$cookie.set('username', '张三', { expires: 7 })

// 设置 Cookie，指定路径
this.$cookie.set('token', 'abc123', { path: '/admin' })

// 设置 Session Cookie（关闭浏览器后失效）
this.$cookie.set('sessionId', 'xyz789')
```

### get — 读取 Cookie

获取指定名称的 Cookie 值。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | String | 是 | Cookie 名称 |

**返回值：** `String | undefined`

```js
const token = this.$cookie.get('token')
if (token) {
  console.log('Token:', token)
}
```

### remove — 删除 Cookie

删除指定名称的 Cookie。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | String | 是 | Cookie 名称 |
| `options` | Object | 否 | 配置选项（需与设置时的 path/domain 一致） |

```js
// 删除 Cookie
this.$cookie.remove('token')

// 删除指定路径下的 Cookie
this.$cookie.remove('token', { path: '/admin' })
```

## 使用场景

### 存储用户 Token

```js
// 登录成功后存储 Token
loginSuccess(token) {
  this.$cookie.set('auth_token', token, { expires: 7 })
}

// 退出登录时清除 Token
logout() {
  this.$cookie.remove('auth_token')
}
```

### 记住用户偏好

```js
// 保存用户选择的语言
this.$cookie.set('language', 'zh-CN', { expires: 365 })

// 读取用户语言偏好
const lang = this.$cookie.get('language') || 'zh-CN'
```

::: warning 注意
Cookie 有大小限制（通常为 4KB），不适合存储大量数据。如需存储大量数据，请使用 `localStorage` 或 `sessionStorage`。
:::
