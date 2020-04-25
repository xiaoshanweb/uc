import request from '@/utils/request'

// 分页查询账号列表
export function accountList(data) {
  return request({
    url: '/operation/account/list',
    method: 'post',
    data
  })
}

// 查询账户基础信息
export function accountBasic(data) {
  return request({
    url: '/operation/account/basic',
    methods: 'get',
    params: data
  })
}

// 添加账户信息
export function accountAdd(data) {
  return request({
    url: '/operation/account/add',
    method: 'post',
    data
  })
}

// 编辑账户信息
export function accountUpdate(data) {
  return request({
    url: '/operation/account/update',
    method: 'post',
    data
  })
}

// 查询账户列表所有角色
export function accountRoles(data) {
  return request({
    url: '/operation/account/roles',
    method: 'get',
    params: data
  })
}
// 查看角色列表
export function roleList(data) {
  return request({
    url: '/operation/role/list',
    method: 'post',
    data
  })
}

// 查询角色信息
export function roleDetails(data) {
  return request({
    url: '/operation/role/detail',
    method: 'get',
    params: data
  })
}

// 获取角色权限列表
export function rolePrivileges(data) {
  return request({
    url: '/operation/role/privileges',
    method: 'get',
    params: data
  })
}

// 添加角色
export function roleAdd(data) {
  return request({
    url: '/operation/role/add',
    method: 'post',
    data
  })
}
// 编辑角色
export function roleUpdate(data) {
  return request({
    url: '/operation/role/update',
    method: 'post',
    data
  })
}
// 查看操作日志
export function logList(data) {
  return request({
    url: '/operation/log/list',
    method: 'post',
    data
  })
}
