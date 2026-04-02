# Icon 图标

EPX-Frame 提供了丰富的图标库支持，包括 Element UI 图标、Vant 图标以及自定义的 epx 图标库。

## Element UI 图标

EPX-Frame 全局注册了 Element UI 的图标组件，可以直接在模板中使用：

```vue
<template>
  <div>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
  </div>
</template>
```

详细的图标列表请参考 [Element UI Icon 文档](https://element.eleme.io/#/zh-CN/component/icon)。

## Vant 图标

Vant 图标主要用于移动端场景，同样可以直接使用：

```vue
<template>
  <div>
    <van-icon name="chat-o" />
    <van-icon name="like-o" />
    <van-icon name="star-o" />
  </div>
</template>
```

详细的图标列表请参考 [Vant Icon 文档](https://vant-contrib.gitee.io/vant/#/zh-CN/icon)。

## epx 图标库

结合人事、招聘等业务场景，EPX-Frame 还提供了一些常用的自定义图标库，分为以下两类：

### 单色图标库

适用于一般的 UI 场景，支持通过 CSS 修改颜色：

```vue
<template>
  <epx-icon name="user" />
  <epx-icon name="department" />
</template>
```

### 多色图标库

适用于需要丰富色彩表现力的场景，如图标导航、功能入口等：

```vue
<template>
  <epx-icon name="dashboard" type="colorful" />
  <epx-icon name="analytics" type="colorful" />
</template>
```

## 使用建议

| 场景 | 推荐图标库 |
|------|-----------|
| PC 端通用 | Element UI 图标 |
| 移动端通用 | Vant 图标 |
| 业务场景（人事、招聘等） | epx 图标库 |
| 需要多色效果 | epx 多色图标库 |

::: tip 提示
使用图标时请保持风格统一，同一页面中建议使用同一套图标库，避免视觉风格混乱。
:::
