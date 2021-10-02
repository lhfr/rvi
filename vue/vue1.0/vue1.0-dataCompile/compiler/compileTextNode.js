import Watcher from '../Watcher.js';

export default function compileTextNode(node, vm, reg) {
	// {{a}}
	const txt = node.textContent;

	function cb() {
		node.textContent = txt.replace(reg, (matched, placeholder) => {
			return placeholder.trim().split('.').reduce((val, key) => {
				return val[key];
			}, vm);
		})
	}
	new Watcher(cb);
}