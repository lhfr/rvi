import protoArgument from './protoArgument.js'
import defineReactive from './defineReactive.js';

// 劫持对象的所有属性，注意区分对象和数组的情况
export default function Observer(value) {
	if (Array.isArray(value)) {
		protoArgument(value);
	} else {
		this.walk(value);
	}
}

// 劫持对象
Observer.prototype.walk = function(obj) {
	for (let key in obj) {
		defineReactive(obj, key, obj[key]);
	}
}