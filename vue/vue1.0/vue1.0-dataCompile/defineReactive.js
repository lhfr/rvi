import observe from './observe.js';
import Dep from './Dep.js';

// 劫持对象的单个属性，注意无法劫持对象的新属性
export default function defineReactive(target, key, val) {
  observe(val);
  const dep = new Dep();
  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) dep.depend();
      console.log('===get===', key, val);
      console.log(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      console.log('===set===', key, newVal);
      console.log('===dep===', dep);
      val = newVal;
      // 劫持新对象属性
      observe(val);
      dep.notify();
    }
  })
}

// 劫持对象的新属性
// function set(target, key, val) {
//   defineReactive(target, key, val);
// }