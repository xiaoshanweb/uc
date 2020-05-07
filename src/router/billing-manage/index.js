import Empty from '@/layout/empty.vue'
import Layout from '@/layout'
export const billingManage = [
  {
    path: '/billing-manage',
    name: 'BillingManage',
    component: Layout,
    alwaysShow: true,
    meta: { title: '会员中心', icon: 'form' },
    children: [
      {
        path: 'member-list',
        name: 'MemberList',
        component: () => import('@/views/billing-manage/common-billing-list.vue'),
        meta: { title: '会员中心列表' }
      },
      {
        path: 'member-list-empty',
        name: 'memberListEmpty',
        component: Empty,
        redirect: '/billing-manage/member-list',
        hidden: true,
        meta: { title: '会员列表' },
        children: [
          {
            path: 'member-manage',
            name: 'MemberManage',
            hidden: true,
            component: () => import('@/views/billing-manage/custom-billing-list.vue'),
            meta: { title: '会员添加' }
          }
        ]
      }
    ]
  }
]
