<template>
  <el-form ref="form" :model="form">
    <el-form-item>
        <el-input placeholder="Password" v-model="password"></el-input>
    </el-form-item>
    <el-form-item>
        <el-input placeholder="Repeat Password" v-model="password_confirm"></el-input>
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
      'password_confirm'
    ],
    methods: {
      onSubmit() {
        changePassword(this.form).then(response => {
          Message({
            message: response.data.data.message,
            type: 'success',
            duration: 10 * 1000
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
