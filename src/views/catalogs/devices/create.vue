<template>
  <el-form :model="formData">
    <el-form-item label="GPS">
      <el-input v-model="formData.gps"></el-input>
    </el-form-item>
    <el-form-item label="Plate">
      <el-input v-model="formData.plate"></el-input>
    </el-form-item>
    <el-form-item label="Internal Number">
      <el-input v-model="formData.internal_number"></el-input>
    </el-form-item>
    <el-form-item label="Carrier ID">
      <el-input v-model="formData.carrier_id"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleClose" aria-label="close">Cancel</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createDevice():editDevice()">Confirm</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { newDevice, updateDevice } from '../../../api/devices'
  import { Message } from 'element-ui'

  export default {
    name: 'RegisterDevice',
    props: [
      'form'
    ],
    data() {
      return {
        dialogStatus: '',
        formData: this.form
        }
      },
    methods: {
      createDevice() {
        newDevice(this.formData).then(response => {
          Message({
            message: 'Device ' + response.data.data.gps + ' registered',
            type: 'success',
            duration: 10 * 1000
          })
          this.resetForm('form')
          this.$emit('newdevice')
        })
      },
      editDevice() {
        updateDevice(this.formData.id, this.formData).then(response => {
          Message({
            message: 'Device ' + response.data.data.gps + ' updated',
            type: 'success',
            duration: 10 * 1000
          })
          this.dialogvisible = false
          this.$emit('closedialog')
        })
      },
      resetForm(formName) {
        this.$emit('resetdata')
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            this.resetForm('form')
            done(this.$emit('closedialog'))
          })
          .catch(_ => {})
      }
    },
    watch: {
      form() {
        this.formData = this.form
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
