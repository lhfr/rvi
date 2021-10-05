import getReplaceValue from './getReplaceValue.js'
import setReplaceValue from './setReplaceValue.js'
import Watcher from '../Watcher.js'

/**
 * 编译属性节点
 * @param {*} node 节点
 * @param {*} vm Vue 实例
 */
export default function compileAttribute(node, vm) {
	// 将类数组格式的属性节点转换为数组
	const attrs = Array.from(node.attributes)
	// 遍历属性数组
	for (let attr of attrs) {
		// 属性名称、属性值
		const {
			name,
			value
		} = attr
		if (name.match(/v-on:click/)) {
			// 编译 v-on:click 指令
			compileVOnClick(node, value, vm)
		} else if (name.match(/v-bind:(.*)/)) {
			// v-bind
			compileVBind(node, value, vm)
		} else if (name.match(/v-model/)) {
			// v-model
			compileVModel(node, value, vm)
		}
	}
}

/**
 * 编译 v-on:click 指令
 * @param {*} node 节点
 * @param {*} method 方法名
 * @param {*} vm Vue 实例
 */
function compileVOnClick(node, method, vm) {
	// 给节点添加一个 click 事件，回调函数是对应的 method
	node.addEventListener('click', function(...args) {
		// 给 method 绑定 this 上下文
		vm.$options.methods[method].apply(vm, args)
	})
	// 移除模版中的 v-on 属性
	node.removeAttribute('v-on:click')
}

/**
 * 编译 v-bind 指令
 * @param {*} node 节点
 * @param {*} attrValue 属性值
 * @param {*} vm Vue 实例
 */
function compileVBind(node, attrValue, vm) {
	// 属性名称
	const attrName = RegExp.$1
	// 当属性值发生变化时，重新执行回调函数
	function cb() {
		node.setAttribute(attrName, getReplaceValue(attrValue, vm))
	}
	// 实例化 Watcher，当属性值发生变化时，dep 通知 watcher 执行 update 方法，cb 被执行，重新更新属性
	new Watcher(cb)
	// 移除模版中的 v-bind 属性
	node.removeAttribute(`v-bind:${attrName}`)
}

/**
 * 编译 v-model 指令
 * @param {*} node 节点 
 * @param {*} key v-model 的属性值
 * @param {*} vm Vue 实例
 */
function compileVModel(node, key, vm) {
	// 节点标签名、类型
	let {
		tagName,
		type
	} = node
	// 标签名转换为小写
	tagName = tagName.toLowerCase()
	if (tagName === 'input' && type === 'text') {
		// <input type="text" v-model="inputVal" />

		// 设置 input 输入框的初始值
		function cb() {
			node.value = getReplaceValue(key, vm)
		}
		// 实例化 Watcher，当属性值发生变化时，dep 通知 watcher 执行 update 方法，cb 被执行，重新更新属性
		new Watcher(cb)

		// 给节点添加 input 事件，当事件发生时更改响应式数据
		node.addEventListener('input', function() {
			setReplaceValue(key, vm, node.value)
		})
	} else if (tagName === 'input' && type === 'checkbox') {
		// <input type="checkbox" v-model="isChecked" />

		// 设置选择框的初始状态
		function cb() {
			node.checked = getReplaceValue(key, vm)
		}
		// 实例化 Watcher，当属性值发生变化时，dep 通知 watcher 执行 update 方法，cb 被执行，重新更新属性
		new Watcher(cb)

		// 给节点添加 change 事件，当事件发生时更改响应式数据
		node.addEventListener('change', function() {
			setReplaceValue(key, vm, node.checked)
		})
	} else if (tagName === 'select') {
		// <select v-model="selectedValue"></select>

		// 设置 input 输入框的初始值
		function cb() {
			node.value = getReplaceValue(key, vm)
		}
		// 实例化 Watcher，当属性值发生变化时，dep 通知 watcher 执行 update 方法，cb 被执行，重新更新属性
		new Watcher(cb)

		// 添加 change 事件，当事件发生时更改响应式数据
		node.addEventListener('change', function() {
			setReplaceValue(key, vm, node.value)
		})
	}
	// 移除模版中的 v-model 属性
	node.removeAttribute('v-model')
}