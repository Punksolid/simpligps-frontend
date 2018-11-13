<template>
    <el-form ref="form" :model="form" label-width="200">
      <label>Create user</label>
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
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create User</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: 'CreateUser',
    data() {
      return {
        form: {
          name: '',
          lastname: '',
          email: '',
          username: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>

<style scoped>
.user-form{
  width: 800px;
}
</style>
