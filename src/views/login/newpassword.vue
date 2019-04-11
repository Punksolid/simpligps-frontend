<template>
  <el-form
    ref="passwordForm"
    :model="passwordForm"
    class="login-form"
    auto-complete="on"
    label-position="left">

    <template v-if="(formtype.type === 'newuser')">
    <el-form-item prop="name" class="m-b-0">
      <el-input
        v-model="passwordForm.name"
        placeholder="Name"
        required>
      </el-input>
    </el-form-item>

      <el-form-item prop="lastname" class="m-b-0">
        <el-input
          v-model="passwordForm.lastname"
          placeholder="Lastname"
          required>
        </el-input>
      </el-form-item>
    </template>

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
    <el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="onSubmit">
        {{ formtype.type === 'reset' ? 'Reset Password' : 'Complete Registration' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { newPass, newUser } from '@/api/login'

  export default {
    name: 'NewPassword',
    props: [
      'formtype'
    ],
    data() {
      return {
        passwordForm: {
          email: '',
          name: '',
          lastname: '',
          password: '',
          password_confirmation: '',
          hash: '',
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
        this.loading = true
        if (this.formtype.type === 'newuser') {
          newUser(this.passwordForm).then(resp => {
            this.$message({
              message: 'User registration completed',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.passwordForm = {}
            this.$emit('pwd_changed')
          }).catch(this.loading = false)
        } else {
          newPass(this.passwordForm).then(response => {
            this.$message({
              message: 'Password Changed Successfully',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.passwordForm = {}
            this.$emit('pwd_changed')
          }).catch(() => {
            this.loading = false
          })
        }
      },
      hashOrToken() {
        if (this.formtype.type === 'newuser') {
          this.passwordForm.hash = this.$route.query.continue_registration
          this.passwordForm.email = this.$route.query.email
          this.passwordForm.token = this.$route.query.continue_registration
        } else {
          this.passwordForm.token = this.$route.query.token
        }
      }
    },
      created() {
       this.hashOrToken()
      }
  }
</script>

<style lang="scss">

</style>
