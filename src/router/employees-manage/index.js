import Empty from '@/layout/empty.vue'
import Layout from '@/layout'
export const employeesManage = [
  {
    path: '/employees-manage',
    name: 'EmployeesManage',
    component: Layout,
    alwaysShow: true,
    meta: { title: '订单模块', icon: 'form', auth: '/employees-manage' },
    children: [
      {
        path: 'account-list',
        name: 'AccountList',
        component: () => import('@/views/employees-manage/account-list/account-list.vue'),
        meta: { title: '订单列表', auth: '/employees-manage/account-list' }
      },
      {
        path: 'account-list-empty',
        name: 'AccountListEmpty',
        component: Empty,
        redirect: '/employees-manage/account-list',
        hidden: true,
        meta: { title: '订单详情', auth: '/employees-manage/account-list' },
        children: [
          {
            path: 'account-manage',
            name: 'AccountManage',
            hidden: true,
            component: () => import('@/views/employees-manage/account-list/account-manage.vue'),
            meta: { title: '账号管理', auth: '/employees-manage/account-list-empty/account-manage' }
          }
        ]
      }
    ]
  }
]
