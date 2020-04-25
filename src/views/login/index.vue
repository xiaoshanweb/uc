<template>
  <div class="login-container">
    <el-card class="login-card" :body-style="{ padding: '0px' }" shadow="none">
      <div class="login-wrap">
        <div class="login-form-wrap">
          <!-- <img class="login-logo" src="@/assets/images/login-logo.png"> -->
          <div v-if="loginType !== 3" class="login-title">微商商品分销管理系统</div>
          <div v-else class="login-title">微商商品分销管理系统</div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-button-group v-if="loginType !== 3" class="mb10">
              <el-button
                type="text"
                :style="{ color: loginType == 1 ? '#1F2D3D' : '#999999' }"
                @click="togggleLoginType(1)"
              >密码登录</el-button>
              <el-button
                type="text"
                :style="{ color: loginType == 2 ? '#1F2D3D' : '#999999', marginLeft: '50px' }"
                @click="togggleLoginType(2)"
              >验证码登录</el-button>
            </el-button-group>

            <el-form-item prop="username" style="margin-bottom:30px">
              <el-input
                ref="username"
                v-model="loginForm.username"
                prefix-icon="el-icon-user-solid"
                :placeholder="loginType === 1 ? '请输入账号' : '请输入手机号码'"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item v-if="loginType === 1" :key="1" prop="password" style="margin-bottom:30px">
              <el-input
                ref="password"
                v-model="loginForm.password"
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                show-password
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>

            <el-form-item v-if="loginType === 2 || loginType ===3" :key="2" prop="code" style="margin-bottom:30px">
              <el-input
                ref="code"
                v-model="loginForm.code"
                prefix-icon="el-icon-unlock"
                placeholder="请输入验证码"
                name="code"
                tabindex="2"
                @keyup.enter.native="handleLogin"
              />
              <el-button type="text" :disabled="timeDown !== '获取验证码'" class="codeBtn" @click="timeDownUtil">
                {{ timeDown === '获取验证码' ? '获取验证码' : `${timeDown}s后重新获取` }}
              </el-button>
            </el-form-item>

            <el-form-item v-if="loginType === 3" :key="3" prop="password" style="margin-bottom:30px">
              <el-input
                ref="password"
                v-model="loginForm.password"
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请输入新密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                show-password
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>

            <el-form-item v-if="loginType == 1">
              <el-checkbox v-model="remberPwd" @change="togglePwd">记住密码</el-checkbox>
              <el-button type="text" style="font-size:14px" @click="reset">重置密码</el-button>
            </el-form-item>
            <el-form-item />
            <el-button v-if="loginType == 1 || loginType == 2" :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">登 录</el-button>
            <el-form-item v-else>
              <el-button :loading="loading" type="primary" class="reset-btn" @click.native.prevent="resetPwd">提 交</el-button>
              <el-button type="primary" class="reset-btn" @click="goBack">返回登录页</el-button>
            </el-form-item>
          </el-form>
        </div>
        <img style="height: 600px; width: 720px;" src="@/assets/images/login-picture.png" alt="">
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLoginCode } from '@/api/others/user'
import { regConfig } from '@/utils/regConfig'
export default {
  name: 'Login',
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      console.log(value, regConfig.mobile)
      if (!regConfig.mobile.test(value)) {
        return callback(new Error('请输入正确的手机号码'))
      }
      callback()
    }
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      type: 0,
      loginRules: {
        username: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', message: '密码' }],
        code: [{ required: true, trigger: 'blur', message: '验证码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      loginType: 1,
      timeDown: '获取验证码',
      remberPwd: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    const savePwd = localStorage.getItem('saveClintAdminPwd')
    if (savePwd) {
      this.loginForm = JSON.parse(savePwd)
      this.remberPwd = true
    }
  },
  methods: {
    goBack() {
      this.loginType = 1
    },
    reset() {
      this.loginType = 3
      this.loginForm.username = ''
      this.loginForm.code = ''
      this.loginForm.password = ''
    },
    togglePwd(val) {
      if (!val) {
        localStorage.removeItem('saveClintAdminPwd')
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 重置密码
    resetPwd() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            phone: this.loginForm.username,
            verifyCode: this.loginForm.code,
            password: this.loginForm.password
          }
          this.$http.resetPwd(data).then(res => {
            this.loginType = 1
            this.loading = false
            this.$message.success('重置密码成功！')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.remberPwd) {
            localStorage.setItem('saveClintAdminPwd', JSON.stringify(this.loginForm))
          }
          console.log(this.loginForm, 'loginForm')
          if (this.loginType == 2) {
            this.loginForm.password = this.loginForm.code
          }
          const data = {
            ...this.loginForm,
            type: this.type
          }
          this.$store.dispatch('user/login', data).then((res) => {
            // console.log(res, 'needChangePassword')
            if (res) {
              this.$message.error('系统检测到您首次登录，请先重置密码')
              this.loginType = 3
            } else {
              this.$router.push({ path: this.redirect || '/' })
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    timeDownUtil() {
      if (!this.loginForm.username || this.loginForm.username == '') {
        this.$message.warning('请输入手机号！')
      }
      getLoginCode({ phone: this.loginForm.username })
        .then(res => {
          this.$message.success('已发送验证码')
          clearInterval(this.timer)
          this.timeDown = 60
          this.timer = setInterval(() => {
            this.timeDown--
            if (this.timeDown <= 0) {
              this.timeDown = '获取验证码'
              clearInterval(this.timer)
            }
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    togggleLoginType(loginType) {
      this.loginType = loginType
      if (loginType == 1) {
        this.type = 0
      } else if (loginType == 2) {
        this.type = 1
        this.loginForm.password = ''
        this.loginForm.code = ''
        this.loginForm.username = ''
      }
      clearInterval(this.timer)
      this.timeDown = '获取验证码'
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    .el-input {
      display: inline-block;
      height: 40px;

      input {
        height: 40px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .login-container {
    align-items: center;
    background: url('~@/assets/images/bg.png') rgba(255, 251, 251, 1) center no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: center;
    min-height: 100%;
    overflow: hidden;
    width: 100%;

    .login-card {
      border: none;
      border-radius: 10px;
      box-shadow: 0 20px 40px 0 rgba(255, 178, 201, 0.2);
      box-sizing: border-box;
      height: 688px;
      max-width: 1280px;
      padding: 90px 0 50px 100px;
      width: 1150px;

      .login-wrap {
        display: flex;

        .login-form-wrap {
          flex: 1;

          .login {
            height: 40px;
            width: 55px;
          }

          .login-title {
            color: rgba(42, 44, 60, 1);
            font-family: PingFangSC-Medium;
            font-size: 30px;
            font-weight: 500;
            margin: 80px 0 40px;
            width: 300px;
          }

          .login-form {
            box-sizing: border-box;
            max-width: 400px;
            overflow: hidden;
            padding-right: 0px;
            position: relative;

            .codeBtn {
              position: absolute;
              right: 10px;
            }
          }
        }
      }
    }
    .flex{
        display: inline-block;
    }
    .login-btn {
        display: inline-block;
        background: rgba(89, 107, 208, 1);
        border-radius: 30px;
        box-shadow: 3px 5px 10px 0 rgba(88, 106, 203, 0.3);
        height: 40px;
        width: 160px;
    }
    .reset-btn{
        background: rgba(89, 107, 208, 1);
        border-radius: 30px;
        box-shadow: 3px 5px 10px 0 rgba(88, 106, 203, 0.3);
        height: 40px;
        width: 150px;
    }

    .tips {
      color: #999;

      img {
        cursor: pointer;
        margin-top: 20px;
      }
    }
  }

</style>
