<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogvisible"
    :show-close="false"
    :before-close="handleClose"
    width="40%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
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
        <el-select v-model="form.carrier_id" placeholder="Select Carrier">
          <el-option
            v-for="carrier in carriers"
            :key="carrier.id"
            :label="carrier.carrier_name"
            :value="carrier.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="t-center">
      <el-button @click="handleClose" aria-label="close">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">{{ this.form.id == null ? 'Create' : 'Update' }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { newDevice, updateDevice } from '@/api/devices'
  import { fetchCarriers } from '@/api/carriers'

  export default {
    name: 'RegisterDevice',
    props: [
      'form',
      'title',
      'dialogvisible'
    ],
    data() {
      return {
        loading: false,
        carriers: []
        }
      },
    methods: {
      getCarriers() {
        fetchCarriers().then(resp => {
          this.carriers = resp.data.data
        }).catch(() => {})
      },
      onSubmit() {
        this.loading = true
        if (this.form.id == null) {
          newDevice(this.form).then(response => {
            this.$message({
              message: 'Device: ' + response.data.data.name + ' registered',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('newdevice')
          }).catch(() => {
            this.loading = false
          })
        } else {
          updateDevice(this.form.id, this.form).then(response => {
            this.$message({
              message: 'Device ' + response.data.data.gps + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('newdevice')
          }).catch(resp => {
            this.$message.error(resp)
            this.loading = false
          })
        }
      },
      handleClose() {
        var formData = Object.keys(this.form).length
        if (formData === 0) {
          this.$emit('closedialog')
        } else {
          this.$confirm('Are you sure to close this dialog?')
            .then(_ => {
              this.$emit('closedialog')
            }).catch(_ => {})
        }
      }
    },
    created() {
      this.getCarriers()
    }
  }
</script>

<style scoped>

</style>
