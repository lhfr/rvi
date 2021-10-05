export default function setReplaceValue(exp, vm, value) {
	exp.trim().split('.').reduce((val, key) => typeof val[key] === 'object' ? val[key] : val[key] = value, vm)
}