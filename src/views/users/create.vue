<template>
  <el-form ref="form" :model="form" label-width="200" class="user-form">
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="Last Name" prop="lastname">
      <el-input v-model="form.lastname" clearable></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input v-model="form.username" clearable></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password" type="password" clearable></el-input>
    </el-form-item>
    <el-row>
      <el-col class="t-center">
        <el-form-item  class="dis-inline-b t-center">
          <el-button @click="resetForm('form')">Reset</el-button>
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Confirm</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
  import { createUser } from '../../api/users'
  import { Message } from 'element-ui'

  export default {
    name: 'CreateUser',
    props: [
      'form'
    ],
    data() {
      return {
        dialogVisible: false
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
          this.resetForm('form')
          this.$emit('usercreated')
        })
      },
      resetForm(formName) {
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?.') // a donde va este texto? borrar si no es necesario
          .then(_ => {
            this.resetForm('form')
            done(this.$emit('closedialog'))
          })
          .catch(_ => {})
      }
    },
    created() {
    },
    rules: {
      password: [
        { required: true, message: 'Please enter your password', trigger: 'blur' }
      ]
    }
  }
</script>

<style lang="scss" scoped>
  .user-form {
    min-width: 200px;
  }
  @media (max-width: 480px) {
    .user-form button {
      margin: 5px;
    }
  }
</style>
