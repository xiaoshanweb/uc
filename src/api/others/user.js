import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'get',
    params: data
  })
}

export function getInfo(data) {
  return request({
    url: '/getInfo',
    method: 'get',
    params: data
  })
}

export function getLoginCode(data) {
  return request({
    url: '/operation/user/sendMsg',
    method: 'get',
    params: data
  })
}

export function resetPwd(data) {
  return request({
    url: '/operation/user/reset',
    method: 'post',
    data
  })
}

// 退出
export function logout(data) {
  return request({
    url: '/operation/user/logout',
    method: 'get',
    params: data
  })
}

