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
// 启用，停用地区
export function sysAreaUpdata(data) {
  return request({
    url: '/operation/sys-area/update',
    method: 'get',
    params: data
  })
}
// 展开地区列表
export function subArea(data) {
  return request({
    url: '/operation/sys-area/subArea',
    method: 'get',
    params: data
  })
}
// 分页查询物流公司列表
export function companyList(data) {
  return request({
    url: '/operation/express-company/list',
    method: 'post',
    data
  })
}
// 添加物流公司
export function companyAdd(data) {
  return request({
    url: '/operation/express-company/add',
    method: 'post',
    data
  })
}
// 编辑物流信息
export function companyUpdate(data) {
  return request({
    url: '/operation/express-company/update',
    method: 'post',
    data
  })
}

// 查询仓库列表
export function warehouseList(data) {
  return request({
    url: '/operation/warehouse/list',
    method: 'post',
    data
  })
}
// 编辑仓库
export function warehouseUpdate(data) {
  return request({
    url: '/operation/warehouse/update',
    method: 'post',
    data
  })
}
// 添加仓库
export function warehouseAdd(data) {
  return request({
    url: '/operation/warehouse/add',
    method: 'post',
    data
  })
}

export function getWarehouseSystem(data) {
  return request({
    url: '/operation/warehouse/getWarehouseSystem',
    method: 'get',
    params: data
  })
}
