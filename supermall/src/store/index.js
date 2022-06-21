import { _ } from 'core-js'
import Vue from 'vue' 
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建Store 对象
const store = new Vuex.Store({
  // state 存放的是全局共享的数据
  state: {
    Cartlist: [],    // 搞个数组 添加商品

    
  },
  // mutations  用于修改 store 中的数据
  // mutations 中的每个方法尽可能完成的事情简单些
  mutations: {
    addCounter(state, payload) {
      payload.count ++
    },
    addToCart(state, payload) {
      state.Cartlist.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {    // payload 外界传过来的值 detail.vue 传过来的是 product
      // payload新添加的商品 
      // 判断商品是否存在
      // let oldProduct = null;   // 用于记录 payload 是否在 state.list 里面
      // for (let item of state.Cartlist) {
      //   if (item.idd === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      
      // find() 查询方法 数组中的每个元素都调用一次函数执行：
      // 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
      // 1. 查找数组是否有该商品
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.Cartlist.find(item => item.iid === payload.iid)

        // 判断 oldProduct
        if (oldProduct) { // 数量 + 1
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1')
        } else { // 添加新的商品
          payload.count = 1
          // context.state.Cartlist.push(payload)
          payload.checked = true
          context.commit('addToCart', payload)
          resolve('添加新的商品')
        }
      }) 
    }
  },
  getters: {
    cartLength(state) {
      return state.Cartlist.length
    },
    cartList(state) {
      return state.Cartlist
    }
  }
  }
)
 
// 3. 挂载Vue实例上
export default store