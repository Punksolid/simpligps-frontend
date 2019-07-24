<template>
  <el-dialog
    :title="title"
    :visible="dialogvisible"
    width="60%"
    :before-close="handleClose">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Plate" prop="plate">
        <el-input v-model="form.plate" clearable></el-input>
      </el-form-item>
      <el-form-item label="Internal Number" prop="internal_number">
        <el-input v-model="form.internal_number" clearable></el-input>
      </el-form-item>
      <el-form-item label="Carrier" prop="carrier">
        <el-select v-model="form.carrier_id" placeholder="Select Carrier" class="width-100p">
          <el-option
            v-for="carrier in carriers"
            :key="carrier.id"
            :label="carrier.carrier_name"
            :value="carrier.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Device" prop="gps">
        <el-select
          v-model="form.device_id"
          filterable
          remote
          :remote-method="SearchDevices"
          :loading="loadingDevices"
          placeholder="Select Device"
          class="width-100p">
          <el-option
            v-for="device in devices"
            :key="device.id"
            :label="device.name"
            :value="device.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-row>
        <el-col class="t-center p-10">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" :loading="loading" @click="onSubmit">{{ this.form.id == null ? 'Create':'Update' }}</el-button>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>
</template>

<script>
  import { createTrailerBox, updateTrailerBox } from '@/api/trailerbox'
  import { fetchCarriers } from '@/api/carriers'
  import { fetchDevices, searchDevices } from '../../../api/devices'

  export default {
    name: 'CreateTrailerbox',
    props: [
      'title',
      'form',
      'dialogvisible'
    ],
    data() {
      return {
        selected_carrier: null,
        dialogVisible: false,
        loading: false,
        loadingDevices: false,
        carriers: [],
        devices: [],
        params: {
          all: true
        }
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        if (this.form.id) {
          updateTrailerBox(this.form.id, this.form).then(response => {
            this.$message({
              message: 'Trailerbox with plate: ' + response.data.data.plate + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.$emit('closedialog')
          }).catch(() => {
            this.$message.error('Error while updating Trailerbox, try again.')
          }).finally(() => {
              this.loading = false
          })
        } else {
          createTrailerBox(this.form).then(response => {
            this.$message({
              message: 'Trailerbox with plate: ' + response.data.data.plate + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.$emit('created')
          }).catch(() => {
            this.$message.error('Error while creating Trialerbox, try again.')
          }).finally(() => {
              this.loading = false
          })
        }
      },
      getCarriers() {
        fetchCarriers(this.params).then(resp => {
          this.carriers = resp.data.data
          if (this.form.id) {
            const carrier = this.carriers.find(carrier => carrier.id === this.form.carrier_id)
            this.selected_carrier = carrier.carrier_name
          }
        })
      },
        getDevices() {
          this.loadingDevices = true
          fetchDevices().then(resp => {
              this.devices = resp.data.data
          }).finally(() => {
              this.loadingDevices = true
          })
        },
        SearchDevices(search) {
            this.loadingDevices = true
            search = { name: search }
            searchDevices(search).then(response => {
                this.devices = response.data.data
                this.loadingDevices = false
            })
        },
      handleClose() {
        if (this.form.plate) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              this.$emit('closedialog')
            }).catch(() => {})
        } else {
          this.$emit('closedialog')
        }
      }
    },
    created() {
        this.getCarriers()
        this.getDevices()
    }
  }
</script>

<style lang="scss">

</style>
