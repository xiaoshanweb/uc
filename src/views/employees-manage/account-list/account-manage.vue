<template>
  <div class="account-manage p-main">
    <v-card padding="30px">
      <v-title class="mb10">基础信息</v-title>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model="form.orderNo" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="下单时间" prop="pushTime">
              <el-input v-model="form.pushTime" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="付款时间" prop="pay_time">
              <el-input v-model="form.pay_time" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" :disabled="disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单代理人姓名" prop="memberNick">
              <el-input v-model="form.memberNick" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="订单代理人会员号" prop="delverID">
              <el-input v-model="form.delverID" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="邮编" prop="postcode">
              <el-input v-model="form.postcode" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="固定电话" prop="fixedphone">
              <el-input v-model="form.fixedphone" :disabled="disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人详细地址" prop="address">
              <el-input v-model="form.address" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="收件人姓名" prop="receiver">
              <el-input v-model="form.receiver" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="收件人手机号码" prop="cellphone">
              <el-input v-model="form.cellphone" :disabled="disabled" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button v-show="isView" type="primary" class="submit" @click="submitForm">提交</el-button>
      <v-title class="mb10">商品信息</v-title>
      <v-table
        :table-config="tableConfig"
        :table-data="tableData"
        @pagination="getList"
      />
      <v-title class="mb10">物流信息</v-title>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="物流公司"
          align="center"
          width="180"
        />
        <el-table-column
          prop="name"
          label="订单号"
          align="center"
          width="180"
        />
        <el-table-column
          label="物流信息"
          align="center"
        >
          <el-table-column
            prop="provinceMessage"
            label="省份"
            align="center"
            width="120"
          />
          <el-table-column
            prop="cityMessage"
            label="市区"
            align="center"
            width="120"
          />
          <el-table-column
            prop="countyMessage"
            label="县"
            align="center"
            width="120"
          />
          <el-table-column
            prop="address"
            label="地址"
            align="center"
            width="300"
          />
        </el-table-column>
      </el-table>
      </el-form>
    </v-card>
  </div>
</template>

<script>
import { mobile } from '@/utils/regConfig'
export default {
  name: 'AccountManage',
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      if (!mobile.test(value)) {
        return callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      tableConfig: [
        {
          prop: 'goodsSPU',
          label: '商品编号',
          width: 120
        },
        {
          prop: 'title',
          label: '标题'
        },
        {
          prop: 'describle',
          label: '描述',
          width: 150
        },
        {
          prop: 'price',
          label: '价格'
        }
      ],
      tableData: [{ goodsSPU: 'scd', title: 'sfvd', describle: 'scd', price: 'cdsv' }],
      form: {
        mobile: '',
        userName: '',
        roleName: ''
      }
    }
  },
  computed: {
    disabled() {
      return this.$route.params.status === 'info'
    },
    isView() {
      return this.$route.params.status !== 'info'
    }
  },
  mounted() {
    this.status = this.$route.params.status
    if (this.status == 'info') {
      this.accountBasic()
      this.roleDetails()
    } else if (this.status == 'edit') {
      this.accountBasic()
      this.roleDetails()
      this.accountRoles()
    } else {
      this.accountRoles()
    }
  },
  methods: {
    changeRole(val) {
      const roleCode = {
        roleCode: val
      }
      this.checkedKeys.push(val)
      this.roleDetails(roleCode)
    },
    // 获取角色列表
    accountRoles() {
      this.$http.accountRoles().then(res => {
        this.role = res.data || []
        this.role.forEach(item => {
          item.roleName = item.name
        })
      })
    },
    // 获取基本信息
    accountBasic() {
      const userCode = {
        userCode: this.$route.params.userCode
      }
      this.$http.accountBasic(userCode).then(res => {
        const data = res.data || {}
        this.form.userName = data.userName
        this.form.mobile = data.mobile
        this.form.roleName = data.roleName
      })
    },
    // 获取权限信息
    roleDetails(code) {
      if (code) {
        this.$http.roleDetails(code).then(res => {
          const resData = res.data.privilegeList || []
          if (resData && resData.length) {
            this.recursiveAllPrivilegeTrees(resData)
          }
          this.data = resData
        })
      } else {
        const roleCode = {
          roleCode: this.$route.params.roleCode
        }
        this.$http.roleDetails(roleCode).then(res => {
          const resData = res.data.privilegeList || []
          if (resData && resData.length) {
            this.recursiveAllPrivilegeTrees(resData)
          }
          this.data = resData
        })
      }
    },
    recursiveAllPrivilegeTrees(privilegeList) {
      privilegeList.forEach(v => {
        v.label = v.name
        v.disabled = !this.isView
        if (v.subGroupList || v.privileges) {
          const subGroupList = v.subClassification || []
          const privileges = v.privileges || []
          v.children = subGroupList.concat(privileges)
          this.recursiveAllPrivilegeTrees(v.children)
        }
      })
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.status) {
            const data = {
              ...this.form,
              userCode: this.$route.params.userCode,
              roleCode: this.checkedKeys
            }
            delete data.roleName
            this.$http.accountUpdate(data).then(res => {
              this.$router.go(-1)
            })
          } else {
            const data = {
              ...this.form,
              roleCode: this.checkedKeys
            }
            this.$http.accountAdd(data).then(res => {
              this.$router.go(-1)
            })
          }
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    const routeParams = to.params.status
    if (!routeParams) {
      to.meta.title = '添加账号'
    } else if (routeParams === 'info') {
      to.meta.title = '查看账号'
    } else if (routeParams === 'edit') {
      to.meta.title = '编辑账号'
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.account-manage {
    .submit {
        margin: 30px 0 ;
    }
}
.mb10 {
    margin: 20px 0;
}
</style>
