<template>
  <el-form ref="form" :model="form">
    <el-form-item>
        <el-input type="password" placeholder="Password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
        <el-input type="password" placeholder="Repeat Password" v-model="form.password_confirmation"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save changes</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { changePassword } from '../../api/me'
  import { Message } from 'element-ui'

  export default {
    name: 'Password',
    props: [
      'password',
      'password_confirmation'
    ],
    data() {
      return {
        form: {
          password: '',
          password_confirmation: ''
        }
      }
    },
    methods: {
      onSubmit() {
        changePassword(this.form).then(response => {
          Message({
            // message: response.data.message, // Asignar mensaje via Response
            message: 'Password changed successfully',
            type: 'success',
            duration: 10 * 1000
          })
          this.form = {}
        })
      }
    }
  }
</script>

<style scoped>

</style>
