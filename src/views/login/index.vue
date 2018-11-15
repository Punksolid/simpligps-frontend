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
              <a href="index.html">
                <div class="logo">
                  <img class="logo-size" src="assets/t2-blanco.png" alt="">
                </div>
              </a>
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
                  class="form-control"
                  type="text"
                  name="email"
                  placeholder="E-mail Address"
                  auto-complete="on"
                  required></el-input>
              </el-form-item>
              <el-input
                v-model="loginForm.password"
                class="form-control"
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
  // import { login } from '@/api/login'

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
          password: 'testtest'
        },
        loginRules: {
          email: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
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
    }
  }
</script>
