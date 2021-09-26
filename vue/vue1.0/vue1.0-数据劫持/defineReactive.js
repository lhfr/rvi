// 劫持对象的单个属性，注意无法劫持对象的新属性
function defineReactive(target, key, val) {
  observer(val);
  Object.defineProperty(target, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 劫持新对象属性
      observer(val);
    }
  })
}

// 劫持对象的所有属性，注意区分对象和数组的情况
function Observer(value) {
  if (Array.isArray(value)) {
    //
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

// 递归劫持
function observer(value) {
  if (typeof value !== 'object') return;
  const obj = new Observer(value);
}

// 劫持对象的新属性
function set(target, key, val) {
  defineReactive(target, key, val);
}

const obj = {
  t: 't value',
  t1: {
    tt1: 'tt1 value'
  },
  arr: [1, 2, 3]
}

new Observer(obj);
set(obj, 't2', 't2 value');
console.log(obj);