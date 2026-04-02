# Lodash 工具函数

EPX-Frame 内置了 [lodash-es](https://lodash.com/) 的常用方法子集，可在组件中通过 `this.$_` 直接使用，也可以从 `epx-frame` 包中引入 `lodash` 对象。

## 引入方式

### 在组件中使用

```js
// 通过 this.$_ 使用
this.$_.cloneDeep(obj)
this.$_.isEmpty(value)
```

### 单独引入

```js
import { lodash } from 'epx-frame'

const { cloneDeep, isEmpty, debounce } = lodash
```

## 可用方法

框架暴露了以下 lodash 方法：

| 方法名 | 说明 |
|--------|------|
| `isEmpty` | 判断值是否为空（空数组、空对象、空字符串、null、undefined 等） |
| `isObject` | 判断值是否为对象类型 |
| `isNil` | 判断值是否为 `null` 或 `undefined` |
| `isEqual` | 深比较两个值是否相等 |
| `isMatch` | 判断对象是否包含指定属性和值 |
| `cloneDeep` | 深拷贝一个值 |
| `debounce` | 创建防抖函数 |
| `throttle` | 创建节流函数 |
| `assignWith` | 自定义合并对象属性 |
| `mergeWith` | 自定义深度合并对象 |
| `findLastIndex` | 从右向左查找满足条件的元素索引 |

## 使用示例

### isEmpty — 判断空值

```js
this.$_.isEmpty([])        // true
this.$_.isEmpty({})        // true
this.$_.isEmpty('')        // true
this.$_.isEmpty(null)      // true
this.$_.isEmpty([1, 2])    // false
this.$_.isEmpty({ a: 1 }) // false
```

### cloneDeep — 深拷贝

```js
const original = { a: { b: 1 } }
const copy = this.$_.cloneDeep(original)
copy.a.b = 2
console.log(original.a.b) // 1，原对象不受影响
```

### isEqual — 深比较

```js
this.$_.isEqual({ a: 1 }, { a: 1 }) // true
this.$_.isEqual([1, 2], [1, 2])     // true
this.$_.isEqual({ a: 1 }, { a: 2 }) // false
```

### debounce — 防抖

```js
export default {
  methods: {
    // 搜索输入防抖，300ms 内只触发一次
    handleInput: debounce(function(val) {
      this.fetchData(val)
    }, 300)
  }
}
```

### throttle — 节流

```js
export default {
  methods: {
    // 滚动事件节流，每 200ms 最多触发一次
    handleScroll: throttle(function() {
      this.checkPosition()
    }, 200)
  }
}
```

### isMatch — 对象匹配

```js
const obj = { a: 1, b: 2, c: 3 }
this.$_.isMatch(obj, { a: 1, b: 2 }) // true，obj 包含 { a: 1, b: 2 }
this.$_.isMatch(obj, { a: 1, d: 4 }) // false
```

### findLastIndex — 从右查找索引

```js
const arr = [1, 2, 3, 2, 1]
this.$_.findLastIndex(arr, v => v === 2) // 3（从右找到的第一个 2 的索引）
```

::: tip 提示
框架只暴露了 lodash 的常用子集。如需使用其他 lodash 方法，可以在项目中单独安装 `lodash-es` 并按需引入。
:::
