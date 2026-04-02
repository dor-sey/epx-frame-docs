# AiSession 对话会话

`epx-ai-session` 是 AI 对话的核心会话组件，负责消息列表的渲染、消息发送、流式输出处理等。通常由 `epx-ai-chat-page` 内部使用，也可以单独引入进行更灵活的定制。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `appId` | String | — | AI 应用 ID |
| `initId` | String | — | 初始化历史记录 ID |
| `initMessageId` | String | — | 初始化消息 ID |
| `modelId` | String | — | 当前选中的模型 ID（支持 `.sync`） |
| `enableInternet` | Boolean | `false` | 是否开启联网搜索（支持 `.sync`） |
| `enableThinking` | Boolean | `false` | 是否开启深度思考（支持 `.sync`） |
| `requestAction` | String | `'chat'` | 请求 action |
| `requestRule` | String | — | 请求业务规则 |
| `requestParams` | Object | `{}` | 附加请求参数 |
| `requestKey` | String | `'stream'` | 请求模式，`stream` 为流式输出 |
| `situation` | String | — | 使用场景标识 |
| `initMessage` | String | — | 初始化时自动发送的消息 |
| `showPageMessageId` | String | — | 当前展示页面对应的消息 ID |
| `isSelectModel` | String | — | 是否显示模型选择，`'0'` 为隐藏 |
| `isNetSearch` | String | — | 是否显示联网搜索，`'0'` 为隐藏 |
| `isUploadFile` | String | — | 是否显示文件上传，`'0'` 为隐藏 |
| `isInputVoice` | String | — | 是否显示语音输入，`'0'` 为隐藏 |
| `promptId` | String | — | 提示词 ID |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `reply` | `message` | AI 回复完成时触发，参数为最后一条消息 |
| `new-session` | — | 用户点击新建对话时触发 |
| `open-history` | — | 用户点击历史记录时触发 |
| `show-page` | `{ id, pageId, pageParams, data }` | AI 返回页面跳转时触发 |

## 方法

通过 `$refs` 调用：

| 方法 | 参数 | 说明 |
|------|------|------|
| `sendMessage(message, fileList, extraParams)` | `message`: 消息文本；`fileList`: 文件列表；`extraParams`: 额外参数 | 发送消息 |

```js
// 外部调用发送消息
this.$refs.session.sendMessage('你好')

// 带文件发送
this.$refs.session.sendMessage('分析这个文件', fileList)
```

## 滚动行为

消息列表的自动滚动遵循以下规则：
- 发送新消息时，强制滚动到底部
- 流式输出过程中，仅当用户距离底部 ≤ 30px 时才自动滚动，避免打断用户查看历史消息

## Slot

| 插槽名 | 作用域 | 说明 |
|--------|--------|------|
| `message-operate` | `{ message }` | 自定义每条 AI 消息的操作区域（如复制、点赞等） |

```vue
<ai-session ref="session" :appId="appId">
  <template #message-operate="{ message }">
    <el-button type="text" @click="copyMessage(message.text)">复制</el-button>
  </template>
</ai-session>
```
