import observe from './observe.js';

// 劫持对象的单个属性，注意无法劫持对象的新属性
export default function defineReactive(target, key, val) {
  observe(val);
  Object.defineProperty(target, key, {
    get() {
      console.log('===get===', key, val);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      console.log('===set===', key, newVal);
      val = newVal;
      // 劫持新对象属性
      observe(val);
    }
  })
}

// 劫持对象的新属性
// function set(target, key, val) {
//   defineReactive(target, key, val);
// }