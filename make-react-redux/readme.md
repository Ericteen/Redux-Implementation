 React 组件可划分为 *展示组件（Presentational Component）* 和 *容器组件（Contatiner Component）*

展示组件的渲染只与从外部接收到的 props 和自身的 state 相关，便于复用。而容器组件则主要处理外部操作。

`connect` 方法是其实一个高阶组件，用于将展示组件和共享的 `context` 连接起来。

`provider` 则是将 `context` 抽出进行封装