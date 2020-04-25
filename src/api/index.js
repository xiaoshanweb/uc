import * as user from './others/user.js'
import * as baseMessageManage from './base-message-manage'
import * as billingManage from './billing-manage'
import * as employeesManage from './employees-manage'

export const api = {
  ...user,
  ...baseMessageManage,
  ...billingManage,
  ...employeesManage
}
