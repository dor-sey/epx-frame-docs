# AI 对话页面

`epx-ai-chat-page` 是 EPX-Frame 内置的 AI 对话页面组件，提供完整的 AI 对话交互能力，支持流式输出、历史记录、文件上传、联网搜索、深度思考等功能，同时适配 PC 端和移动端。

## 组件注册名

```
epx-ai-chat-page
```

## 在页面模板中使用

通过页面配置的 `contentType` 指定使用该组件：

```js
items: [
  {
    title: 'AI 对话',
    id: 'ai-chat',
    contentType: 'ai-chat-page',
    configs: {
      appId: 'your-app-id'  // 可选，指定 AI 应用 ID
    }
  }
]
```

也可以直接作为 AI 应用类型的页面使用，此时 `appConfig` 中的 `TYPE` 为 `AI` 或 `agent`，组件会自动读取应用配置。

## 功能特性

| 功能 | 说明 |
|------|------|
| 流式输出 | 基于 SSE（Server-Sent Events）实时展示 AI 回复 |
| 历史记录 | 支持查看和恢复历史对话 |
| 文件上传 | 支持上传图片、PDF、Word、Excel 等文件 |
| 联网搜索 | 可开启联网搜索增强回答质量 |
| 深度思考 | 可开启深度思考模式，展示推理过程 |
| 模型切换 | 支持在多个 AI 模型之间切换 |
| 语音输入 | 移动端支持语音输入（需配置开启） |
| 智能查询 | 支持 AI 分析查询条件并展示结果页面 |
| 工具确认 | 支持 AI 调用工具前的用户确认交互 |
| 表单交互 | 支持 AI 返回表单并由用户填写提交 |

## 消息类型

对话中的消息支持多种类型，由后端 SSE 事件的 `type` 字段决定：

| type | 说明 |
|------|------|
| `text` | 普通文本，支持 Markdown 渲染 |
| `think` | 思考过程，可折叠展示 |
| `scope` | AI 分析出的查询条件 |
| `web_from` | 联网搜索来源 |
| `file_from` | 文件来源 |
| `tool_confirm` | 工具调用确认 |
| `form` | 表单交互 |
| `page` | 跳转页面 |

## 相关组件

- `epx-ai-session` — 对话会话组件，负责消息列表渲染和消息发送
- `epx-ai-agent-page` — Agent 模式对话页面，继承自 `epx-ai-chat-page`

## 注意事项

- 流式输出依赖后端 SSE 接口，`requestKey` 默认为 `stream`
- 文件上传、联网搜索、语音输入等功能需要在 AI 应用配置中开启（`IS_FILE`、`IS_NET_SEARCH`、`IS_VOICE` 字段控制）
- 历史记录功能需要配置 `appId`，或当前页面为 AI 应用类型
