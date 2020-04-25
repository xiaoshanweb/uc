// store/permission.js
import { asyncRouterMap, constantRouterMap } from '@/router'

function hasPermission(resources, route) {
  // if (route.meta && route.meta.auth && route.meta.btnAuth) {
  //   const uri = resources.some(item => item.includes(route.meta.auth))
  //   return uri
  // } else {
  // 不配置auth默认所有人都有权限
  return true
  // }
}
export function filterAsyncRoutes(routes, resources) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(resources, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, resources)
      }
      res.push(tmp)
    }
  })

  return res
}
const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const resources = data.map(v => v.uri)
        console.log(resources, '2:resources')
        const accessedRoutes = filterAsyncRoutes(asyncRouterMap, resources)
        commit('SET_ROUTERS', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission

