<template>
  <el-form ref="form" :model="form">
    <el-form-item label="GPS">
      <el-input v-model="form.gps"></el-input>
    </el-form-item>
    <el-form-item label="Plate">
      <el-input v-model="form.plate"></el-input>
    </el-form-item>
    <el-form-item label="Internal Number">
      <el-input v-model="form.internal_number"></el-input>
    </el-form-item>
    <el-form-item label="Carrier ID">
      <el-input v-model="form.carrier_id"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleClose" aria-label="close">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Register</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { newDevice } from '../../../api/devices'
  import { Message } from 'element-ui'

  export default {
    name: 'RegisterDevice',
    data() {
      return {
        form: {
          gps: '',
          plate: '',
          internal_number: '',
          carrier_id: ''
        }
      }
    },
    methods: {
      onSubmit() {
        newDevice(this.form).then(response => {
          Message({
            message: 'Device ' + response.data.data.gps + ' registered',
            type: 'success',
            duration: 10 * 1000
          })
          this.resetForm('form')
          this.$emit('newdevice')
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            this.resetForm('form')
            done(this.$emit('closedialog'))
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style scoped>
  .user-form{
    width: 800px;
  }
</style>

<style scoped>

</style>
