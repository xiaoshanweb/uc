export const CONSTANTS_MAP = {
  account: {
    status: [
      { label: '全部', value: '' },
      { label: '停用', value: '0' },
      { label: '启用', value: '1' }
    ]
  },

  order: {
    status: [
      { label: '全部', value: '' },
      { label: '待处理', value: '1' },
      { label: '待推送', value: '2' },
      { label: '待发货', value: '3' },
      { label: '交易完成', value: '4' },
      { label: '交易关闭', value: '5' }
    ]

    // 1-待处理，2-待收货 ，3-已完成，4-已关闭
  }
}
