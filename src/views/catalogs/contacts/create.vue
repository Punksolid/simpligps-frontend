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
      <el-button @click="handleClose" aria-label="close">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">{{this.form.id?'Update':'Create'}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { createContact, updateContact } from '@/api/contacts'

export default {
  name: 'CreateContact',
  props: [
    'form'
  ],
  data() {
    return {
    }
  },
  methods: {
    onSubmit() {
      if (this.form.id) {
        updateContact(this.form.id, this.form).then(response => {
          this.$message({
            message: 'Contact ' + response.data.data.name + ' updated',
            type: 'success',
            duration: 10 * 1000
          })
          this.$emit('created')
        })
      } else {
        createContact(this.form).then(response => {
          this.$message({
            message: 'Contact ' + response.data.data.name + ' created',
            type: 'success',
            duration: 10 * 1000
          })
          this.$emit('created')
        })
      }
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done(this.$emit('closedialog'))
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
