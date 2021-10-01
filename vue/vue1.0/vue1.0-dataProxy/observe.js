import Observer from './Observer.js';

// 递归劫持
export default function observe(value) {
	return typeof value !== 'object' ? '' : new Observer(value);
}