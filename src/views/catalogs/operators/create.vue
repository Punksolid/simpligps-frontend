<template>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
<el-form-item label="Active">
<el-switch
  v-model="form.active"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-value="1"
  inactive-value="0">
</el-switch>
</el-form-item>
  <el-form-item>
    <el-button @click="handleClose" aria-label="close">Cancel</el-button>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form-item>
</el-form>
</template>

<script>
 import { createOperator } from '../../../api/catalogs'
  import { Message } from 'element-ui'

  export default {
    name: 'CreateOperator',
    data() {
      return {
        form: {
          name: '',
          phone: '',
          active: '1'
          }
      }
    },

  methods: {
      onSubmit() {
        createOperator(this.form).then(response => {
          Message({
            message: 'Operator ' + response.data.data.name + ' created',
            type: 'success',
            duration: 10 * 1000
          })
          this.resetForm('form')
          this.$emit('operatorcreated')
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
