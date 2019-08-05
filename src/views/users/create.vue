<template>
  <el-dialog
    title="Create User"
    :visible="dialogvisible"
    width="60%"
    :before-close="handleClose"
  >
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

      <el-row>
        <el-col class="t-center">
          <el-form-item  class="dis-inline-b t-center">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="onSubmit">Create user</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>
</template>

<script>
  import { createUser } from '../../api/users'

  export default {
    name: 'CreateUser',
    props: [
      'dialogvisible'
    ],
    data() {
      return {
          form: {},
          dialogVisible: false,
          loading: false
      }
    },
    methods: {
      onSubmit() {
          this.loading = true
          createUser(this.form).then(response => {
            this.$message({
              message: 'User: ' + response.data.data.name + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.$emit('created')
          }).catch(() => {
          }).finally(() => {
              this.loading = false
          })
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
