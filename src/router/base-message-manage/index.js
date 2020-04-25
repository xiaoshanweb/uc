import Empty from '@/layout/empty.vue'
import Layout from '@/layout'
export const baseMessageManage = [
  {
    path: '/base-message-manage',
    name: 'BaseMessageManage',
    component: Layout,
    alwaysShow: true,
    meta: { title: '商品管理', icon: 'form', auth: '/base-message-manage' },
    children: [
      {
        path: 'goods-list',
        name: 'RegionList',
        component: () => import('@/views/base-message-manage/region-list.vue'),
        meta: { title: '商品列表', auth: '/base-message-manage/region-list' }
      },
      {
        path: 'goods-list-empty',
        name: 'goodsListEmpty',
        component: Empty,
        redirect: '/base-message-manage/goods-list',
        hidden: true,
        meta: { title: '商品列表' },
        children: [
          {
            path: 'goods-manage',
            name: 'GoodsManage',
            hidden: true,
            component: () => import('@/views/base-message-manage/logistics-company-list.vue'),
            meta: { title: '编辑商品' }
          }
        ]
      }
    ]
  }
]
