import initData from './initData.js';
import mount from './compiler/index.js';

export default function Vue(options) {
	this._init(options);
}

Vue.prototype._init = function(options) {
	this.$options = options;
	initData(this);
	// 如果存在 el 配置项，则调用 $mount 方法编译模版
	if (this.$options.el) {
		this.$mount()
	}
}

Vue.prototype.$mount = function() {
	mount(this);
}