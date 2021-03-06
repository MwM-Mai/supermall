import { request } from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    // url 的参数
    params: {
      type,
      page
    }
  })
}