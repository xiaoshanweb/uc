import request from '@/utils/request'

export function memberList(data) {
  return request({
    url: '/member',
    method: 'get',
    params: data
  })
}

export function memberAdd(data) {
  return request({
    url: '/member/add',
    method: 'get',
    params: data
  })
}

export function memberUpdate(data) {
  return request({
    url: '/member/update',
    method: 'get',
    params: data
  })
}

export function memberOrder(data) {
  return request({
    url: '/memberOrder',
    method: 'get',
    params: data
  })
}
