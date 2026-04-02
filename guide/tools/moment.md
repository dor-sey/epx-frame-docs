# Moment 日期处理

EPX-Frame 集成了 [Moment.js](https://momentjs.com/) 日期处理库，可以在组件中通过 `this.$moment` 直接使用。Moment.js 提供了强大的日期解析、格式化、计算和显示功能。

## 使用方式

```js
// 在组件中使用
const now = this.$moment()
const formatted = this.$moment().format('YYYY-MM-DD HH:mm:ss')
```

## 常用方法

### 格式化日期

将日期对象或字符串格式化为指定格式的字符串。

```js
// 当前时间
this.$moment().format('YYYY-MM-DD')           // 2024-01-15
this.$moment().format('YYYY-MM-DD HH:mm:ss')  // 2024-01-15 14:30:00
this.$moment().format('YYYY年MM月DD日')        // 2024年01月15日

// 格式化指定日期
this.$moment('2024-01-15').format('MM/DD/YYYY')  // 01/15/2024
```

### 相对时间

将日期转换为相对于当前时间的描述。

```js
this.$moment('2024-01-10').fromNow()   // 5 天前
this.$moment('2024-01-20').fromNow()   // 5 天内
this.$moment().startOf('day').fromNow() // 14 小时前
```

### 日历时间

以日历格式显示日期，自动根据日期与当前时间的关系选择合适的显示格式。

```js
// 今天的日期
this.$moment().calendar()
// 今天 14:30

// 昨天的日期
this.$moment().subtract(1, 'days').calendar()
// 昨天 14:30

// 一周内的日期
this.$moment().subtract(3, 'days').calendar()
// 上周日 14:30

// 更早的日期
this.$moment().subtract(10, 'days').calendar()
// 2024/01/05
```

### 日期计算

支持日期的加减运算。

```js
// 加减天数
this.$moment().add(7, 'days').format('YYYY-MM-DD')    // 加 7 天
this.$moment().subtract(3, 'months').format('YYYY-MM-DD')  // 减 3 个月

// 获取日期范围
const start = this.$moment().startOf('month').format('YYYY-MM-DD')
const end = this.$moment().endOf('month').format('YYYY-MM-DD')
```

### 日期比较

```js
const date1 = this.$moment('2024-01-15')
const date2 = this.$moment('2024-01-20')

date1.isBefore(date2)    // true
date1.isAfter(date2)     // false
date1.isSame(date2, 'month')  // true
```

## 常用格式

| 格式 | 说明 | 示例 |
|------|------|------|
| `YYYY` | 四位年份 | 2024 |
| `MM` | 两位月份 | 01-12 |
| `DD` | 两位日期 | 01-31 |
| `HH` | 两位小时（24小时制） | 00-23 |
| `mm` | 两位分钟 | 00-59 |
| `ss` | 两位秒数 | 00-59 |

::: tip 提示
Moment.js 已进入维护模式，对于新项目建议考虑使用 [Day.js](https://day.js.org/) 或 [date-fns](https://date-fns.org/) 作为替代。但在 EPX-Frame 中，Moment.js 仍然是默认的日期处理库。
:::
