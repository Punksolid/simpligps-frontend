<template>
  <el-form ref="operatorData" :model="form">
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
    <el-col class="text-center">
      <el-button @click="handleClose" aria-label="close">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">{{this.form.id ? 'Update Operator':'Create Operator'}}</el-button>
    </el-col>
  </el-form-item>
  </el-form>
</template>

<script>
 import { createOperator, updateOperator } from '../../../api/operators'
 import { Message } from 'element-ui'

  export default {
    name: 'CreateOperator',
    props: [
      'form'
    ],
    mounted() {
      // this.$refs.operatorData.model.active = '1'
    },
  methods: {
      onSubmit() {
        if (this.form.id) {
          updateOperator(this.form.id, this.form).then(response => {
            Message({
              message: 'User ' + response.data.data.name + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.$emit('closedialog')
          })
        } else {
          createOperator(this.form).then(response => {
            Message({
              message: 'Operator ' + response.data.name + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.$emit('operatorcreated')
          })
        }
      },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          this.$refs['form'] = {}
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
