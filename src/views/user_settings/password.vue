<template>
  <el-form ref="form" :model="form">
    <div>
      <el-input placeholder="Password" v-model="password"></el-input>
    </div>
    <div style="margin-top: 30px">
      <el-input placeholder="Repeat Password" v-model="password_repeat"></el-input>
    </div>
    <el-form-item>
      <el-button>Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Create User</el-button>

      <!--<el-button style="margin-top: 30px" type="primary" @click="onSubmit">Save changes</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import { changePassword } from '../../api/me'
  import { Message } from 'element-ui'

  export default {
    name: 'Password',
    methods: {
      onSubmit() {
        changePassword(this.form).then(response => {
          Message({
            type: 'success',
            message: response.data.data.message,
            duration: 10 * 1000
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
