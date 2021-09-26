## 目标

下面的示例代码就是今天的目标，用我们自己手写的 Vue 框架把这个示例跑起来。

我们需要实现以下能力：

- 数据响应式拦截
  - 原始值
  - 普通对象
  - 数组

- 数据响应式更新
  - 依赖收集，Dep
  - 依赖通知 Watcher 更新
  - 编译器，compiler
  
- methods + 事件 + 数据响应式更新
- v-bind 指令
- v-model 双向绑定
  - input 输入框
  - checkbox
  - select