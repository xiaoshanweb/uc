import request from '@/utils/request'

// 查询常规计费列表
export function commonList(data) {
  return request({
    url: '/operation/cost/common/list',
    method: 'post',
    data
  })
}
// 修改常规计费列表
export function commonListUpdate(data) {
  return request({
    url: '/operation/cost/common/update',
    method: 'post',
    data
  })
}
// 查询自定义计费列表
export function specialList(data) {
  return request({
    url: '/operation/cost/special/list',
    method: 'post',
    data
  })
}
// 修改自定义计费列表
export function specialListUpdate(data) {
  return request({
    url: '/operation/cost/special/update',
    method: 'post',
    data
  })
}

export function memberList(data) {
  return request({
    url: '/member',
    method: 'get',
    params: data
  })
}
