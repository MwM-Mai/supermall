import Toast from './Toast'

const obj = {}

// 在执行 install 函数的过程中 还会传入 Vue
obj.install = function (Vue) {
  
  // document.body.appendChild(Toast.$el)

  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2. 通过 new 的方式， 根据组件构造器，可以创建处理一个组件对象
  const toast = new toastContrustor()

  // 3. 将组件对象, 手动挂载倒某个元素上
  toast.$mount(document.createElement('div'))

  // 4. toast.$el 对应的就是上面创建的div(document.createElement('div'))
  document.body.appendChild(toast.$el)

  // 给原型添加一个toast属性
  Vue.prototype.$toast = toast;
}

export default obj