<template>
  <div class="form-body" v-loading="bodyLoading">
    <div class="row">
      <div class="img-holder">
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
                <img class="logo-size" src="src/assets/trm-home.png" alt="TRM">
              </div>
              <div class="status">
                <span class="label">STATUS:</span>
                <span class="dot" v-bind:class="{ 'btn-success':apiPingSuccess, 'btn-danger':!apiPingSuccess}"></span>
              </div>
            </div>
            <div class="page-links">
              <a href="#" class="active">{{ this.formType.name }}</a>
            </div>

            <template v-if="formType.type === 'login'">
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
                  required
                  @keyup.enter.native="handleLogin"
                ></el-input>
                <el-form-item>
                  <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                    Sign in
                  </el-button>
                </el-form-item>
              </el-form>

              <MyAccounts @bodyloading="bodyLoading = false"/>

              <el-row>
                <el-col class="t-right float-right">
                  <template>
                    <el-button type="text" class="dis-inline-b c-light f-12" @click="dialogVisible = true">Forgot my
                      password
                    </el-button>
                  </template>
                  <el-dialog
                    title="Reset Password"
                    :visible.sync="dialogVisible"
                    id="forgotpsw"
                    width="35%"
                    center
                    :show-close="false"
                    :before-close="handleClose">

                    <ResetPassword @closedialog="dialogVisible = false"/>

                  </el-dialog>
                </el-col>
              </el-row>
            </template>

            <template v-else>
              <NewPassword :formtype="formType" @pwd_changed="resetFormType()"/>
              <el-col>
                <el-button
                  type="text"
                  icon="fas fa-chevron-left"
                  class="dis-inline-b c-light f-12"
                  @click="resetFormType()"> Return to Login
                </el-button>
              </el-col>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import '@/styles/bootstrap.min.css'
  // import { login } from '@/api/login'
  import MyAccounts from '../login/myaccounts'
  import ResetPassword from '../login/resetpassword'
  import NewPassword from '../login/newpassword'
  import { checkStatus } from '../../api/general'

  export default {
    name: 'LoginView',
    components: {
      MyAccounts,
      ResetPassword,
      NewPassword
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        callback()
      }
      const validatePassword = (rule, value, callback) => {
        callback()
      }
      return {
        loginForm: {
          email: '',
          password: ''
        },
        loginRules: {
          email: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        formType: {
          type: 'login',
          name: 'Login'
        },
        redirect: undefined,
        dialogVisible: false,
        loading: false,
        bodyLoading: false,
        pwdType: 'password',
        apiPingSuccess: false
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          if (route.params.mode === 'select_account') {
            event.$emit('getaccounts')
          }
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done()
          })
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
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.bodyLoading = true
              event.$emit('getaccounts')
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      resetFormType() {
        this.formType = {
          type: 'login',
          name: 'Login'
        }
      },
      checkFormType() {
        if (this.$route.query.token) {
          this.formType = {
            type: 'reset',
            name: 'New Password'
          }
        } else if (this.$route.query.continue_registration) {
          this.formType = {
            type: 'newuser',
            name: 'Continue Registration'
          }
        } else {
          this.formType = {
            type: 'login',
            name: 'Login'
          }
        }
      }
    },
    created() {
      this.checkFormType()
      this.backendStatus()
      if (this.$route.params.mode === 'select_account') {
        event.$emit('getaccounts')
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  .form-body {
    .img-holder {
      min-height: unset;
    }
    .el-loading-mask {
      background-color: #00000080 !important;
    }

  .form-content {
    padding: 20px;
    .form-items {
      display: block;
    }
    form {
      margin-bottom: 15px;
    }
  }

  .website-logo-inside {
    margin-bottom: 20px;
    display: flex;
    .logo {
      margin-right: 5px;
      background-position: center;
      min-width: 250px;
      width: 100%;
      height: 75px;
      img {
        width: 250px;
        margin-right: 5px;
        height: 75px;
        order: 1;
      }
    }
  }

  .status {
    margin: 6px;
    order: 2;
    border: 1px solid #ffffff80;
    padding: 0px 5px;
    .label {
      font-size: 10px;
      color: #fff;
      background: #074e88;
      padding: 0px 10px;
      vertical-align: top;
      position: relative;
      top: -5px;
    }
  }

  .el-form-item {
    margin-bottom: 0px;
  }

  .dot {
    height: 20px;
    width: 35px;
    margin: auto;
    border-radius: 0px;
    display: block;
  }
  }
  @media (max-width: 480px) {
    .form-body {
      .form-holder .form-content {
        padding: 100px 45px 45px;
      }
      .status {
        margin-top: 25px;
      }
      .dot {
        height: 10px;
        width: 80%;
        margin: auto;
        margin-bottom: 20px;
      }
      .website-logo-inside {
        flex-direction: column;
      }
    }
  }
</style>
