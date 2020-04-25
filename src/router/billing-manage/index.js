import Empty from '@/layout/empty.vue'
import Layout from '@/layout'
export const billingManage = [
  {
    path: '/billing-manage',
    name: 'BillingManage',
    component: Layout,
    alwaysShow: true,
    meta: { title: '会员中心', icon: 'form', auth: '/billing-manage' },
    children: [
      {
        path: 'common-billing-list',
        name: 'CommonBillingList',
        component: () => import('@/views/billing-manage/common-billing-list.vue'),
        meta: { title: '会员中心列表', auth: '/billing-manage/common-billing-list' }
      },
      {
        path: 'custom-billing-list',
        name: 'CustomBillingList',
        hidden: true,
        component: () => import('@/views/billing-manage/custom-billing-list.vue'),
        meta: { title: '会员添加', auth: '/billing-manage/custom-billing-list' }
      }
    ]
  }
]
