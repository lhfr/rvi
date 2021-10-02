import Dep from './Dep.js';

// cb 负责更新 dom 节点
export default function Watcher(cb) {
	this._cb = cb;
	Dep.target = this;
	// this._cb();
	// Dep.target = null;
}

Watcher.prototype.update = function() {
	this._cb();
}