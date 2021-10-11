import Observer from './Observer.js'

/**
 * 通过 Observer 类为对象设置响应式能力
 * @returns Observer 实例
 */
export default function observe(value) {
	// 避免无限递归
	// 当 value 不是对象直接结束递归
	if (typeof value !== 'object') return

	// 返回 Observer 实例
	return new Observer(value)
}