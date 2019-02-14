<template>
  <el-row>
    <el-form :model="formData">
      <el-form-item label="Name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
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

      <el-col class="dis-inline-b t-center">
        <el-button @click="handleClose" aria-label="close">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">{{ this.form.id == null ? 'Create' : 'Update' }}</el-button>
      </el-col>
    </el-form>
  </el-row>
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
        formData: this.form,
        dialogVisible: false
        }
      },
    methods: {
      onSubmit() {
        if (this.form.id == null) {
          newDevice(this.formData).then(response => {
            Message({
              message: 'Device ' + response.data.data.gps + ' registered',
              type: 'success',
              duration: 10 * 1000
            })
            this.resetForm('form')
            this.$emit('newdevice')
          })
        } else {
          updateDevice(this.formData.id, this.formData).then(response => {
            Message({
              message: 'Device ' + response.data.data.gps + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.dialogvisible = false
            this.$emit('closedialog')
          })
        }
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
