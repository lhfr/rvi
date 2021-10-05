export default function getReplaceValue(exp, vm) {
	const res = exp.trim().split('.').reduce((val, key) => val[key], vm)
	return typeof res === 'object' ? JSON.stringify(res) : res
}