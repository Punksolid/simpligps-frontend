<template>
  <el-form
    ref="passwordForm"
    :model="passwordForm"
    class="login-form"
    auto-complete="on"
    label-position="left">
    <el-form-item prop="email" class="m-b-5">
      <el-input
        v-model="passwordForm.email"
        type="email"
        name="email"
        placeholder="Confirm your e-mail"
        required>
      </el-input>
    </el-form-item>
    <el-form-item prop="password" class="m-b-0">
      <el-input
        v-model="passwordForm.password"
        type="password"
        name="password"
        placeholder="New Password"
        required>
      </el-input>
    </el-form-item>
    <el-form-item prop="password" class="m-b-0">
      <el-input
        v-model="passwordForm.password_confirmation"
        type="password"
        name="password"
        placeholder="Confirm New Password"
        @keyup.enter.native="onSubmit"
        required>
      </el-input>
    </el-form-item>
    <el-input
      v-model="passwordForm.token"
      class=""
      type="hidden"
      name="token"
      placeholder="Token"
      required>
    </el-input>
    <el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="onSubmit">
        Change Password
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { newPass } from '@/api/login'
  import { Message } from 'element-ui'

  export default {
    name: 'NewPassword',
    data() {
      return {
        passwordForm: {
          email: '',
          password: '',
          password_confirmation: '',
          token: ''
        },
        loading: false,
        dialogVisible: '',
        rules: {
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }]
        }
      }
    },
    methods: {
      onSubmit() {
        newPass(this.passwordForm).then(response => {
          Message({
            message: 'Password Changed Successfully',
            type: 'success',
            duration: 10 * 1000
          })
          this.passwordForm = {}
          this.$emit('pwd_changed')
        })
      }
    },
    created() {
      this.passwordForm.token = this.$route.query.token
    }
  }
</script>

<style lang="scss">

</style>
