<template>
  <el-dialog
    :title="title"
    :visible="dialogvisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="200" class="user-form">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastname">
        <el-input v-model="form.lastname" clearable></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" clearable></el-input>
      </el-form-item>

      <el-row>
        <el-col class="t-center">
          <el-form-item  class="dis-inline-b t-center">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="onSubmit">{{ this.form.id == null ? 'Create':'Update' }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>
</template>

<script>
  import { createUser, updateUser } from '../../api/users'

  export default {
    name: 'CreateUser',
    props: [
      'title',
      'form',
      'dialogvisible'
    ],
    data() {
      return {
        dialogVisible: false,
        loading: false
      }
    },
    methods: {
      onSubmit() {
        if (this.form.id) {
          this.loading = true
          updateUser(this.form.id, this.form).then(response => {
            this.$message({
              message: 'User: ' + response.data.data.name + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('closedialog')
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = true
          createUser(this.form).then(response => {
            this.$message({
              message: 'User: ' + response.data.data.name + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('created')
          }).catch(() => {
            this.loading = false
          })
        }
      },
      handleClose() {
        if (this.form.name) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              this.$emit('closedialog')
            }).catch(() => {
          })
        } else {
          this.$emit('closedialog')
        }
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
