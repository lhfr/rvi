import getReplaceValue from './getReplaceValue.js'
import Watcher from '../Watcher.js'

export default function compileTextNode(node, vm, reg) {
	// {{xxx}}
	const txt = node.textContent

	function cb() {
		node.textContent = txt.replace(reg, (matched, placeholder) => {
			const res = getReplaceValue(placeholder, vm)
			return typeof res === 'object' ? JSON.stringify(res) : res
		})
	}
	new Watcher(cb);
}