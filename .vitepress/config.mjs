import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'epx-Frame',
  base: '/epx-frame-docs/',
  description: '基于 Vue 的企业级低代码开发框架',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started/' },
      { text: '组件', link: '/guide/component/' },
      { text: '工具', link: '/guide/tools/http-entity' },
    ],
    sidebar: [
      {
        text: '入门',
        items: [
          { text: '快速上手', link: '/guide/getting-started/' },
          { text: '对外接口', link: '/guide/getting-started/api' },
        ],
      },
      {
        text: '页面',
        items: [
          { text: '页面概述', link: '/guide/page/' },
          { text: '页面模板', link: '/guide/page/template' },
        ],
      },
      {
        text: '组件开发',
        items: [
          { text: '组件概述', link: '/guide/component/' },
          { text: '组件开发', link: '/guide/component/development' },
          { text: '组件规范', link: '/guide/component/specification' },
          { text: '混入 component', link: '/guide/component/mixin' },
          { text: '组件变量', link: '/guide/component/variables' },
          { text: '组件方法', link: '/guide/component/methods' },
          { text: '组件继承', link: '/guide/component/inheritance' },
          { text: '可视化配置面板开发', link: '/guide/component/visual-config' },
        ],
      },
      {
        text: '内置组件',
        items: [
          { text: 'EntityList 对象列表', link: '/guide/component/entity-list' },
          { text: 'EntityListFind 对象选择列表', link: '/guide/component/entity-list-find' },
          { text: 'AddForm 新增编辑表单', link: '/guide/component/add-form' },
          { text: 'AddFormItem 表单分组', link: '/guide/component/add-form-item' },
          { text: 'MenuIndex 菜单导航页', link: '/guide/component/menu-index' },
          { text: 'AiChatPage AI 对话页面', link: '/guide/component/ai-chat-page' },
          { text: 'AiSession 对话会话', link: '/guide/component/ai-session' },
          { text: '...（更多组件待补充）', link: '/guide/component/' },
        ],
      },
      {
        text: '工具',
        items: [
          { text: 'HTTP 请求', link: '/guide/tools/http-entity' },
          { text: 'Cookie', link: '/guide/tools/cookie' },
          { text: '工具函数', link: '/guide/tools/util' },
          { text: 'Lodash', link: '/guide/tools/lodash' },
          { text: 'Moment 日期', link: '/guide/tools/moment' },
          { text: '图标', link: '/guide/tools/icon' },
        ],
      },
      {
        text: '进阶',
        items: [
          { text: '主题换肤', link: '/guide/advanced/theming' },
          { text: 'PDF 预览', link: '/guide/advanced/pdf-preview' },
          { text: '部署发布', link: '/guide/advanced/deployment' },
        ],
      },
    ],
    socialLinks: [],
    outline: { label: '本页目录' },
    docFooter: { prev: '上一页', next: '下一页' },
  },
})
