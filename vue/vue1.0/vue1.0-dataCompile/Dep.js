// 发布订阅
export default function Dep() {
	this.watchers = [];
}

// 实例化 watcher 时会赋值 Dep.target = watcher
Dep.target = null;


// 依赖收集
Dep.prototype.depend = function(watcher) {
	this.watchers.push(Dep.target);
}

// 依赖通知
Dep.prototype.notify = function() {
	this.watchers.forEach(watcher => {
		watcher.update();
	})
}