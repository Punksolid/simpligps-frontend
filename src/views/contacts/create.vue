<template>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Company">
    <el-input v-model="form.company"></el-input>
  </el-form-item>
  <el-form-item label="Phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
   <el-form-item label="E-mail">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
   <el-form-item label="Address">
    <el-input v-model="form.address"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button>Cancel</el-button>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  import { createContacts } from '@/api/general'
  import { Message } from 'element-ui'

export default {
  name: 'CreateContact',
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
  },
  methods: {
    onSubmit() {
      createContacts(this.form).then(response => {
        Message({
          message: 'Contact ' + response.data.data.name + ' created',
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
