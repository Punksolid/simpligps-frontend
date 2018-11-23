<template>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="E-Mail">
    <el-input v-model="form.company"></el-input>
  </el-form-item>
  <el-form-item label="Phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
   <el-form-item label="Time Unattended">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
   <el-form-item label="Action">
    <el-input v-model="form.address"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button>Cancel</el-button>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    name: 'notifdataok',
    data() {
      return {
        form: {
          name: '',
          phone: '',
          company: '',
          email: '',
          address: ''

        }
      }
    }
  }
</script>

<style scoped>

</style>
