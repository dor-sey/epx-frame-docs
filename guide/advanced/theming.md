# 换肤功能

EPX-Frame 通过 SASS Mixin 的方式实现了灵活的换肤功能。开发者可以使用内置的混合指令快速将字体颜色、背景色、边框色等设置为当前主题色，实现品牌定制和多主题切换。

## Mixin 混合指令

### font_color_primary — 字体主题色

设置字体颜色为主题色。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `opacity` | Number | 否 | 1 | 颜色透明度（0-1） |

```scss
.title {
  @include font_color_primary;
}

.subtitle {
  @include font_color_primary(0.6);  // 60% 透明度
}
```

### font_color_primary_mixin — 字体主题色（混合）

设置字体颜色为主题色，并支持与其他颜色混合。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `opacity` | Number | 否 | 1 | 颜色透明度（0-1） |
| `color` | Color | 否 | 白色 | 混合颜色 |

```scss
.text {
  @include font_color_primary_mixin(0.8, #333333);
}
```

### bg_color_primary — 背景主题色

设置背景色为主题色。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `opacity` | Number | 否 | 1 | 颜色透明度（0-1） |

```scss
.header {
  @include bg_color_primary;
}

.badge {
  @include bg_color_primary(0.1);  // 10% 透明度的主题色背景
}
```

### bg_color_primary_mixin — 背景主题色（混合）

设置背景色为主题色，并支持与其他颜色混合。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `opacity` | Number | 否 | 1 | 颜色透明度（0-1） |
| `color` | Color | 否 | 白色 | 混合颜色 |

```scss
.card {
  @include bg_color_primary_mixin(0.15, #f5f5f5);
}
```

### border_color_primary — 边框主题色

设置边框颜色为主题色。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `opacity` | Number | 否 | 1 | 颜色透明度（0-1） |

```scss
.divider {
  @include border_color_primary;
}
```

### border_color_primary_mixin — 边框主题色（混合）

设置边框颜色为主题色，并支持与其他颜色混合。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `opacity` | Number | 否 | 1 | 颜色透明度（0-1） |
| `color` | Color | 否 | 白色 | 混合颜色 |

```scss
.input {
  @include border_color_primary_mixin(0.3);
}
```

### border_primary — 主题色边框

设置完整的边框（宽度、位置、类型、颜色）。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `width` | Number | 否 | 1px | 边框宽度 |
| `position` | String | 否 | 全部 | 边框位置（top / right / bottom / left） |
| `type` | String | 否 | solid | 边框类型（solid / dashed / dotted） |
| `opacity` | Number | 否 | 1 | 颜色透明度（0-1） |

```scss
.card {
  @include border_primary;  // 默认 1px solid 主题色
}

.bottom-line {
  @include border_primary(2px, bottom);  // 底部 2px 主题色边框
}
```

## 使用示例

```scss
// 设置字体主题色
@include font_color_primary;

// 设置背景颜色为主题色，并设置 0.1 的透明度
@include bg_color_primary(0.1);

// 设置边框颜色为主题色
@include border_color_primary;
```

::: tip 提示
使用 Mixin 指令后，当主题色发生变化时，所有使用了 Mixin 的样式会自动更新，无需手动修改每个组件的样式代码。
:::
