<template>
  <el-form :model="formData" label-width="200" class="user-form">
    <el-form-item label="Name" prop="name">
      <el-input v-model="formData.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="Last Name" prop="lastname">
      <el-input v-model="formData.lastname" clearable></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="formData.email"></el-input>
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input v-model="formData.username" clearable></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="formData.password" type="password" clearable></el-input>
    </el-form-item>
    <el-row>
      <el-col class="t-center">
        <el-form-item  class="dis-inline-b t-center">
          <el-button @click="resetForm">Reset</el-button>
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createUsr():updateUsr()">Confirm</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
  import { createUser, updateUser } from '../../api/users'
  import { Message } from 'element-ui'

  export default {
    name: 'CreateUser',
    props: [
      'form'
    ],
    data() {
      return {
        formData: this.form,
        dialogVisible: false
      }
    },
    methods: {
      createUsr() {
        createUser(this.formData).then(response => {
          Message({
            message: 'User ' + response.data.data.name + ' created',
            type: 'success',
            duration: 10 * 1000
          })
          this.resetForm()
          this.$emit('usercreated')
        })
      },
      updateUsr() {
        updateUser(this.formData).then(response => {
          Message({
            message: 'User ' + response.data.data.name + ' updated',
            type: 'success',
            duration: 10 * 1000
          })
          this.resetForm()
          this.$emit('usercreated')
        })
      },
      resetForm() {
        this.$emit('resetData')
        // this.$refs[formName].resetFields()
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?.') // Se muestra texto al intentar cerrar el Dialogo desde Cancel - Cerrar
          .then(_ => {
            this.resetForm()
            done(this.$emit('closedialog'))
          })
          .catch(_ => {})
      }
    },
    watch: {
      form() {
        this.formData = this.form
      }
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
