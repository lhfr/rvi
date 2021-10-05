/**
 * 通过 Object.defineProperty 为 obj.key 设置 getter、setter 拦截
 */
import observe from './observe.js'
import Dep from './Dep.js'

// 劫持对象的单个属性，注意无法劫持对象的新属性
// 还需要给对象本身添加响应，所以需要对 observe 的返回值进行处理
export default function defineReactive(target, key, val) {
  const childOb = observe(val)
  const dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      console.log(`===get ${key}===`, Dep.target)
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      // 劫持新对象属性
      observe(val)
      console.log(`===set ${key}===`, dep)
      dep.notify()
    }
  })
}