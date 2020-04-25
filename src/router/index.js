import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Empty from '@/layout/empty.vue'

import { baseMessageManage } from './base-message-manage'
import { billingManage } from './billing-manage'
import { employeesManage } from './employees-manage'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    auth: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/base-message-manage/goods-list'
  }
]
// 异步路由，需要权限控制的路由
export const asyncRouterMap = [
  ...baseMessageManage,
  ...billingManage,
  ...employeesManage,
  { path: '*', redirect: '/404', hidden: true }
]
const Route = new Router({
  routes: constantRouterMap
})
// 解决使用name跳转，无权限时手动跳到404
Route.beforeEach((to, from, next) => {
  if (to.name && to.path === '/') {
    next({ path: '/404' })
  } else {
    next()
  }
})
export default Route
