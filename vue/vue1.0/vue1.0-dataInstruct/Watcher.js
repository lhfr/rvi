import Dep from './Dep.js'

// cb 负责更新 dom 节点
export default function Watcher(cb) {
	this._cb = cb
	Dep.target = this
	this._cb();
	// 只允许编译时一个属性多次绑定 watcher，防止打印时绑定 watcher
	// 但无法对对象本身进行响应式，所以应该在 Dep 内进行去重处理
	// Dep.target = null;
}

Watcher.prototype.update = function() {
	this._cb()
}