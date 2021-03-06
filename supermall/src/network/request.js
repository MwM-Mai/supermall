import axios from 'axios'

export function request(config) {
     // 1. 创建 axios 实例
  const instance1 = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 5000
    })

    // 2. axios 拦截器
    // 2.1 请求拦截的作用
  instance1.interceptors.request.use(config => {
    return config 
  }, err => {
  })   //  拦截请求 us 两个参数 都是函数 函数本身也有参数

  // 2.2 响应拦截的作用
  instance1.interceptors.response.use(res => {

    return res.data
  }, err => {
    console.log(err);
    })  //  拦截响应 也是两个参数
  
    // 3. 发送真正的网络请求
    return instance1(config)   // 源码表示 最终的返回值是 Promise
}