<template>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Carrier Name">
    <el-input v-model="form.carrier_name"></el-input>
  </el-form-item>
  <el-form-item label="Contact Name">
    <el-input v-model="form.contact_name"></el-input>
  </el-form-item>
  <el-form-item label="Phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
<el-form-item label="email">
<el-input
  v-model="form.email">
</el-input>
</el-form-item>
  <el-form-item>
    <el-button type="danger" aria-label="close">Cancel</el-button>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form-item>
</el-form>
</template>

<script>
 import { createCarrier } from '../../api/general'
  import { Message } from 'element-ui'

  export default {
    name: 'CreateCarrier',
    data() {
      return {
        form: {
          carrier_name: '',
          contact_name: '',
          phone: '',
          email: ''
          }
      }
    },

  methods: {
      onSubmit() {
        createCarrier(this.form).then(response => {
          Message({
            message: 'Carrier ' + response.data.data.name + ' created',
            type: 'success',
            duration: 10 * 1000
          })
        })
      }
    }

  }
</script>

<style scoped>
.user-form{
  width: 800px;
}
</style>

