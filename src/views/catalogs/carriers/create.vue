<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogvisible"
    :before-close="handleClose"
    width="40%">
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
      <el-form-item label="Email">
      <el-input
        v-model="form.email">
      </el-input>
      </el-form-item>

        <el-row>
          <el-col class="text-center">
            <el-button aria-label="close" @click="handleClose">Cancel</el-button>
            <el-button type="primary" @click="onSubmit">{{this.form.id?'Update':'Create'}}</el-button>
          </el-col>
        </el-row>

      </el-form>
    </el-dialog>
</template>

<script>
  import { createCarrier, updateCarrier } from '@/api/carriers'

  export default {
    name: 'CreateCarrier',
    props: [
      'title',
      'form',
      'dialogvisible'
    ],
  methods: {
    onSubmit() {
      if (this.form.id) {
        updateCarrier(this.form.id, this.form).then(response => {
          this.$message({
            message: 'Carrier: ' + response.data.data.carrier_name + ' updated',
            type: 'success',
            duration: 10 * 1000
          })
          this.$emit('created')
        })
      } else {
        createCarrier(this.form).then(response => {
          this.$message({
            message: 'Carrier: ' + response.data.data.carrier_name + ' created',
            type: 'success',
            duration: 10 * 1000
          })
          this.$emit('created')
        })
      }
    },
    handleClose() {
      if (this.form.carrier_name) {
        this.$confirm('Are you sure to close? Not saved data will be lost!')
          .then(_ => {
            this.$emit('closedialog')
          }).catch(() => {})
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

