<template>
  <div class="form-body">
    <div class="row">
      <div class="img-holder">
        <blockquote>&nbsp;</blockquote>
        <div class="bg"/>
        <div class="info-holder">
          <h3>Welcome to TRM System.</h3>
          <p>Access to the most powerfull tool of unit monitoring by exception.</p>
        </div>
      </div>
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <div class="website-logo-inside">
                <div class="logo">
                  <img class="logo-size" src="src/assets/t2-blanco.png" alt="TRM"><span class="dot" v-bind:class="{ 'btn-success':apiPingSuccess, 'btn-danger':!apiPingSuccess}"></span>
                </div>
            </div>
            <div class="page-links">
              <a href="#" class="active">Login</a>
            </div>

            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left">
              <el-form-item prop="email">
                <el-input
                  v-model="loginForm.email"
                  class=""
                  type="text"
                  name="email"
                  placeholder="E-mail Address"
                  auto-complete="on"
                  required></el-input>
              </el-form-item>
              <el-input
                v-model="loginForm.password"
                class=""
                type="password"
                name="password"
                placeholder="Password"
                required></el-input>
              <el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                  Sign in
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/styles/bootstrap.min.css' // make
  // import { login } from '@/api/login'
  import { checkStatus } from '../../api/general'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        callback()
      }
      const validatePassword = (rule, value, callback) => {
        callback()
      }
      return {
        loginForm: {
          email: 'test@test.com',
          password: '12345678'
        },
        loginRules: {
          email: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined,
        apiPingSuccess: false
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
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      backendStatus() {
        checkStatus().then(() => {
          this.apiPingSuccess = true
        }).catch(() => {
          this.apiPingSuccess = false
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            // this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created() {
      this.backendStatus()
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px;
}
.dot {
  height: 25px;
  width: 25px;
  /*background-color: RED;*/
  border-radius: 50%;
  display: inline-block;
}
</style>
