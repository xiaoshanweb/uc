<template>
  <div class="account-manage p-main">
    <v-card padding="30px">
      <v-title class="mb10">基础信息</v-title>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 300px">
        <el-form-item label="员工手机号" prop="mobile">
          <el-input v-model="form.mobile" :disabled="disabled" placeholder="请输入员工手机号" />
        </el-form-item>
        <el-form-item label="员工姓名" prop="userName">
          <el-input v-model="form.userName" :disabled="disabled" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleName">
          <el-select v-model="form.roleName" :disabled="disabled" placeholder="请选择角色" @change="changeRole">
            <el-option v-for="(item,i) of role" :key="i" :label="item.roleName" :value="item.code" />
          </el-select>
        </el-form-item>
      </el-form>
      <v-title class="mb10">权限信息</v-title>
      <el-tree ref="tree" accordion :data="data" node-key="code" :props="defaultProps" />
      <el-button v-show="isView" type="primary" class="submit" @click="submitForm">提交</el-button>
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
      data: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        mobile: '',
        userName: '',
        roleName: ''
      },
      role: [],
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      status: ''
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
.account-manage{
  .submit {
    margin: 30px 0 0 30px;
  }
}
</style>
