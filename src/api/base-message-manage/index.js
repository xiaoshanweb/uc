import request from '@/utils/request'

// 查询商品列表
export function goodsList(data) {
  return request({
    url: '/goods',
    method: 'get',
    params: data
  })
}
// 查询商品详情
export function goodsDetails(data) {
  return request({
    url: 'goodsDetails',
    method: 'get',
    params: data
  })
}
// 查询订单列表
export function ordersList(data) {
  return request({
    url: '/orders',
    method: 'get',
    params: data
  })
}


