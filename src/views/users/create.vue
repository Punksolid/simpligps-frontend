<template>
    <el-form ref="form" :model="form" label-width="200">
            <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input v-model="form.lastname"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Create User</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
  import { createUser } from '../../api/users'
  import { Message } from 'element-ui'


  export default {
    name: 'CreateUser',
    data() {
      return {
        form: {
          name: '',
          lastname: '',
          email: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        createUser(this.form).then(response => {
          Message({
            message: 'User ' + response.data.data.name + ' created',
            type: 'success',
            duration: 10 * 1000
          })
        })
      }
    },
    rules: {

          password: [
            { required: true, message: 'Please enter your password', trigger: 'blur' },
            { min: 6, message: 'Your password is too short!' },
          ]
  }
  }
</script>

<style scoped>
.user-form{
  width: 800px;
}
</style>
