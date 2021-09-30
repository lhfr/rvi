const arrayProto = Array.prototype;
const arrMethods = Object.create(arrayProto);
const methodsToPatch = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'];
methodsToPatch.forEach(method => {
	Object.defineProperty(arrMethods, method, {
		value(...args) {
			const res = arrayProto[method].apply(this, args);
			console.log('===arr===', args);
			return res;
		}
	})
})

// 劫持数组
export default function protoArgument(array) {
	array.__proto__ = arrMethods;
}