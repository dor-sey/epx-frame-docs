# 拖拽功能重构说明

## 概述

已将所有容器组件的拖拽逻辑统一到 `Mixin.js` 中，大幅减少代码重复。

## 重构内容

### 1. Mixin.js 新增的通用方法

所有混入了 `previewMixin` 的容器组件都自动获得以下方法：

#### 拖拽判断
- `isDraggingFromLibrary(e)` - 判断是否从组件库或模板库拖拽

#### 位置计算
- `getInsertIndex(evt, listEl)` - 计算插入位置索引
- `getInsertLineRect(evt, listEl)` - 计算插入线位置

#### 拖拽事件处理
- `onContainerDragEnter(e)` - 拖拽进入容器
- `onContainerDragOver(e)` - 拖拽在容器上悬停
- `onContainerDragLeave(e)` - 拖拽离开容器
- `onContainerDrop(e)` - 在容器中放置

#### 数据处理
- `handleTemplateDrop(raw, index)` - 处理模板拖拽放置
- `handleWidgetDrop(raw, index)` - 处理组件拖拽放置

### 2. 已简化的组件

以下组件已移除重复代码，直接使用 Mixin 的方法：

1. **Container.vue** - 标准容器组件（自动绑定）
2. **ColumnPreview.vue** - 布局列组件（自动绑定）
3. **add-form/Preview.vue** - 表单组件（自定义拖拽区域）
4. **grid/Preview.vue** - 栅格组件（自定义拖拽区域）
5. **card/Preview.vue** - 卡片组件（自动绑定）
6. **tabs/tab-pane/Preview.vue** - 标签页组件（自动绑定）
7. **carousel/CarouselItemPreview.vue** - 轮播项组件（自动绑定）
8. **collapse/CollapseItemPreview.vue** - 折叠面板项组件（支持主内容区和 header slot）

## 使用方法

### 标准容器组件（自动绑定）

对于大多数容器组件，只需：

1. 混入 `previewMixin`
2. 在根元素添加 `epx-page-designer-widget-preview__drop-zone` 类
3. 不需要在模板中添加任何拖拽事件
4. 不需要编写任何拖拽相关的 methods

Mixin 会在 `mounted` 钩子中自动检测容器组件并绑定拖拽事件。

```vue
<template>
  <div class="epx-page-designer-widget-preview__drop-zone">
    <!-- 子组件 -->
    <div class="epx-page-designer-widget-preview__no-widget" v-if="childWidgetList.length===0">
      拖拽组件到这里
    </div>
  </div>
</template>

<script>
import previewMixin from '@/frame/page-designer/widget-preview/Mixin'

export default {
  name: 'my-container-preview',
  mixins: [previewMixin]
  // 不需要编写任何拖拽相关的代码
}
</script>
```

### 特殊容器组件

#### 1. 使用 Vue 组件作为根元素（如 el-col）

如果根元素是 Vue 组件而不是原生 HTML 元素，Mixin 会自动绑定到 `this.$el`（组件渲染后的原生 DOM）：

```vue
<template>
  <el-col :span="12" class="epx-page-designer-widget-preview__drop-zone">
    <!-- 子组件 -->
  </el-col>
</template>

<script>
import previewMixin from '@/frame/page-designer/widget-preview/Mixin'

export default {
  mixins: [previewMixin]
  // 自动处理，无需额外代码
}
</script>
```

#### 2. 自定义拖拽区域（如表单、栅格）

如果拖拽区域不是根元素，需要覆盖 `mounted` 和 `beforeDestroy` 钩子：

```javascript
export default {
  mixins: [previewMixin],
  mounted () {
    // 手动绑定到特定元素
    this.$nextTick(() => {
      const dropZone = this.$refs.customDropZone
      if (dropZone) {
        this._dragEnterHandler = this.onContainerDragEnter.bind(this)
        this._dragOverHandler = (e) => {
          e.preventDefault()
          this.onContainerDragOver(e)
        }
        this._dragLeaveHandler = this.onContainerDragLeave.bind(this)
        this._dropHandler = (e) => {
          e.preventDefault()
          this.onContainerDrop(e)
        }

        dropZone.addEventListener('dragenter', this._dragEnterHandler)
        dropZone.addEventListener('dragover', this._dragOverHandler)
        dropZone.addEventListener('dragleave', this._dragLeaveHandler)
        dropZone.addEventListener('drop', this._dropHandler)
      }
    })
  },
  beforeDestroy () {
    const dropZone = this.$refs.customDropZone
    if (this._dragEnterHandler && dropZone) {
      dropZone.removeEventListener('dragenter', this._dragEnterHandler)
      dropZone.removeEventListener('dragover', this._dragOverHandler)
      dropZone.removeEventListener('dragleave', this._dragLeaveHandler)
      dropZone.removeEventListener('drop', this._dropHandler)
    }
  }
}
```

#### 3. 自定义列表元素（如表单组件）

如果需要自定义获取列表元素的逻辑：

```javascript
methods: {
  // 覆盖 Mixin 的方法，返回自定义的列表元素
  getDropListElement () {
    return this.$refs.addForm?.querySelector('.epx-page-designer-widget-preview__draggable')
  }
}
```

#### 4. 固定插入位置（如栅格组件）

```javascript
methods: {
  // 覆盖 Mixin 的方法，总是插入到末尾
  onContainerDragOver (e) {
    const isContainer = this.widgetInfo.CONTAINER === '1' || (this.widget.items !== undefined)
    if (!isContainer) return
    
    if (this.isDraggingFromLibrary(e)) {
      e.preventDefault()
      e.stopPropagation()
      e.dataTransfer.dropEffect = 'copy'
      
      const index = this.childWidgetList.length // 总是末尾
      this.designer.setPreviewDragTarget({
        widgetId: this.widget.id,
        index: index,
        position: 'inside'
      })
    }
  },
  
  onContainerDrop (e) {
    const isContainer = this.widgetInfo.CONTAINER === '1' || (this.widget.items !== undefined)
    if (!isContainer) return
    
    e.preventDefault()
    e.stopPropagation()
    this.designer.clearDragOverTarget()
    this.designer.clearDragInsertLine()
    this.designer.clearPreviewDragTarget()

    if (this.designer && this.designer.vueInstance) {
      this.designer.vueInstance.$emit('drag-end')
    }

    const raw = e.dataTransfer.getData('text/plain')
    if (!raw) return

    const index = this.childWidgetList.length // 总是末尾
    const TEMPLATE_PAYLOAD_PREFIX = 'page-designer-template:'
    
    if (raw.startsWith(TEMPLATE_PAYLOAD_PREFIX)) {
      this.handleTemplateDrop(raw, index)
    } else {
      this.handleWidgetDrop(raw, index)
    }
  }
}
```

## 关键特性

### 1. 自动处理

- ✅ 拖拽状态管理（dragOverTarget, dragInsertLine, previewDragTarget）
- ✅ 悬浮窗关闭（drag-end 事件）
- ✅ 响应式数组更新（确保容器有 items 数组）
- ✅ 模板 JS 合并
- ✅ 组件配置合并
- ✅ 历史记录更新

### 2. 事件冒泡控制

所有拖拽事件都会调用 `e.stopPropagation()`，防止事件冒泡导致重复插入。

### 3. 容器检查

Mixin 的方法会检查 `widgetInfo.CONTAINER` 属性或 `widget.items` 属性，只有容器组件才会响应拖拽。

## 改造完成

所有容器组件已完成改造，不再使用 draggable 插件，全部改用原生 HTML5 拖拽 API。

## 注意事项

1. **必须混入 previewMixin**：所有容器组件都必须混入 `previewMixin`
2. **必须添加样式类**：在拖拽目标元素上添加 `epx-page-designer-widget-preview__drop-zone` 类
3. **无需手动绑定事件**：Mixin 会自动检测容器组件并绑定拖拽事件
4. **空容器提示**：添加 `epx-page-designer-widget-preview__no-widget` 提示元素
5. **特殊元素需要手动绑定**：如果拖拽区域不是根元素（如表单、栅格），需要在 `mounted` 中手动绑定事件

## 自动检测逻辑

Mixin 通过以下条件判断是否为容器组件：
- `widgetInfo.CONTAINER === '1'` - 标准容器组件标记
- `widget.items !== undefined` - 组件有 items 属性（实际上能接受子组件）

满足任一条件即会自动绑定拖拽事件。

## 特殊案例

### CollapseItemPreview - 多拖拽区域

折叠面板项组件支持两个拖拽区域：
1. 主内容区 - 使用 Mixin 自动绑定
2. Header slot 区域 - 自定义绑定，只接受单个组件

这展示了如何在一个组件中处理多个拖拽区域的场景。
满足任一条件即会自动绑定拖拽事件。

## 优势

1. **代码复用**：所有容器组件共享同一套拖拽逻辑
2. **易于维护**：修改拖拽逻辑只需修改 Mixin.js
3. **一致性**：所有容器的拖拽行为保持一致
4. **可扩展**：特殊需求可以覆盖 Mixin 的方法
5. **减少错误**：统一的实现减少了重复代码带来的错误
