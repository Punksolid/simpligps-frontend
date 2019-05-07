<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogvisible"
    :show-close="false"
    :before-close="handleClose"
    width="40%">
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
    inactive-color="#ff4949">
  </el-switch>
  </el-form-item>
  <el-form-item>
    <el-col class="text-center">
      <el-button @click="handleClose" aria-label="close">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">{{this.form.id ? 'Update Operator':'Create Operator'}}</el-button>
    </el-col>
  </el-form-item>
  </el-form>
  </el-dialog>
</template>

<script>
 import { createOperator, updateOperator } from '../../../api/operators'
 import { Message } from 'element-ui'

  export default {
    name: 'CreateOperator',
    props: [
      'title',
      'dialogvisible',
      'form'
    ],
    data() {
      return {
        loading: false
      }
    },
    mounted() {
      // this.$refs.operatorData.model.active = '1'
    },
  methods: {
      onSubmit() {
        this.loading = true
        if (this.form.id) {
          updateOperator(this.form.id, this.form).then(response => {
            Message({
              message: 'User ' + response.data.data.name + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('closedialog')
          }).catch(() => {
            this.loading = false
          })
        } else {
          createOperator(this.form).then(response => {
            Message({
              message: 'Operator ' + response.data.name + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('operatorcreated')
          }).catch(() => {
            this.loading = false
          })
        }
      },
    handleClose() {
        if (this.form.name) {
          this.$confirm('Are you sure to close this dialog?')
            .then(_ => {
              this.$emit('closedialog')
            })
            .catch(_ => {})
        } else {
          this.$emit('closedialog')
        }
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
