# PDF 预览

EPX-Frame 提供了 `pdf-dist` 插件来实现 PDF 文件的在线预览功能。该插件基于 PDF.js 封装，支持在浏览器中直接渲染和查看 PDF 文件。

## 使用方式

通过 `usePlugin` 方法加载 PDF 预览插件：

```js
import { usePlugin } from 'epx-frame'

usePlugin('pdf-dist')
  .then(pdf => {
    // 加载 PDF 文件
    pdfjs.getDocument({
      url: 'xxx'  // PDF 文件地址
    })
  })
```

## 加载远程 PDF

```js
import { usePlugin } from 'epx-frame'

async function previewPdf(fileUrl) {
  const pdf = await usePlugin('pdf-dist')

  const loadingTask = pdfjs.getDocument({
    url: fileUrl
  })

  loadingTask.promise.then(doc => {
    console.log(`PDF 加载成功，共 ${doc.numPages} 页`)

    // 获取第一页
    doc.getPage(1).then(page => {
      const scale = 1.5
      const viewport = page.getViewport({ scale })

      // 创建 canvas 进行渲染
      const canvas = document.getElementById('pdf-canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }

      page.render(renderContext)
    })
  })
}
```

## 加载本地 PDF

如果需要预览通过文件 ID 获取的 PDF 文件，可以结合 `util.getFileUrl` 使用：

```js
import { usePlugin } from 'epx-frame'

async function previewFile(fileId) {
  const fileUrl = this.$util.getFileUrl(fileId)
  const pdf = await usePlugin('pdf-dist')

  pdfjs.getDocument({
    url: fileUrl
  })
}
```

## 注意事项

- PDF 预览插件需要异步加载，请确保在 `usePlugin` 的 Promise 回调中使用 PDF.js API
- PDF 文件地址需要支持跨域访问（CORS），否则可能导致加载失败
- 对于大文件，建议使用分页加载以提升性能
- 移动端预览时建议适当降低渲染缩放比例以节省内存
