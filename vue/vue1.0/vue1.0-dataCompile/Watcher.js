import Dep from './Dep.js';

// cb 负责更新 dom 节点
export default function Watcher(cb) {
	this._cb = cb;
	Dep.target = this;
	this._cb();
	// 只允许编译时一个属性多次绑定 watcher，防止打印时绑定 watcher
	Dep.target = null;
}

Watcher.prototype.update = function() {
	this._cb();
}