<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Plate" prop="plate">
      <el-input v-model="form.plate" clearable></el-input>
    </el-form-item>
    <el-form-item label="Model" prop="model">
      <el-input v-model="form.model" clearable></el-input>
    </el-form-item>
    <el-form-item label="Internal Number" prop="internal_number">
      <el-input v-model="form.internal_number" clearable></el-input>
    </el-form-item>
    <el-form-item label="Brand" prop="brand">
      <el-input v-model="form.brand" clearable></el-input>
    </el-form-item>
    <el-form-item label="GPS" prop="gps">
      <el-input v-model="form.gps" clearable></el-input>
    </el-form-item>
    <el-form-item label="Color" prop="color">
      <el-input v-model="form.color" clearable></el-input>
    </el-form-item>
    <el-form-item label="Device" prop="device">
      <el-select v-model="form.device_id" placeholder="Select Device">
        <el-option
          v-for="device in devices"
          :key="device.id"
          :label="device.name"
          :value="device.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Carrier" prop="carrier">
      <el-select v-model="form.carrier_id" placeholder="Select Carrier">
        <el-option
          v-for="carrier in carriers"
          :key="carrier.id"
          :label="selected_carrier?selected_carrier:carrier.carrier_name"
          :value="carrier.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Operator" prop="operator">
      <el-select v-model="form.operator_id" placeholder="Select Operator">
        <el-option
          v-for="operator in operators"
          :key="operator.id"
          :label="operator.name"
          :value="operator.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-row>
      <el-col class="t-center p-10">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" :loading="loading" @click="onSubmit">{{ this.form.id == null ? 'Create':'Update' }}</el-button>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
  import { createTruck, updateTruck } from '@/api/trucks'
  import { getDevices } from '@/api/devices'
  import { fetchCarriers } from '@/api/carriers'
  import { getOperators } from '@/api/operators'

  export default {
    name: 'CreateTruck',
    props: [
      'form'
    ],
    data() {
      return {
        selected_carrier: null,
        dialogVisible: false,
        loading: false,
        devices: [],
        carriers: [],
        operators: [],
        params: {
          all: true
        }
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        if (this.form.id) {
          updateTruck(this.form.id, this.form).then(response => {
            this.$message({
              message: 'Truck with plate: ' + response.data.data.plate + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('closedialog', false)
          }).catch(() => {
            this.$message.error('Error while updating truck, try again.')
            this.loading = false
          })
        } else {
          this.loading = true
          createTruck(this.form).then(response => {
            this.$message({
              message: 'Truck with plate: ' + response.data.data.plate + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('truck_created')
            this.$emit('closedialog', false)
          }).catch(() => {
            this.$message.error('Error while creating truck, try again.')
            this.loading = false
          })
        }
      },
      DevicesAndCarriers: function() {
        getDevices(this.params).then(resp => {
          this.devices = resp.data.data
        }).catch(() => {
          this.$message.error('Error fetching Devices List')
        })
        fetchCarriers(this.params).then(resp => {
          this.carriers = resp.data.data
          if (this.form.id) {
            const carrier = this.carriers.find(carrier => carrier.id === this.form.carrier_id)
            // Se busca 'carrier_id' en Carriers y se retorna el nombre
            this.selected_carrier = carrier.carrier_name
          }
        })
        getOperators(this.params).then(resp => {
          this.operators = resp.data.data
        })
      },
      closeDialog() {
        this.$emit('closedialog')
      }
    },
    created() {
      this.DevicesAndCarriers()
    },
    rules: {
      password: [
        { required: true, message: 'Please enter your password', trigger: 'blur' }
      ]
    }
  }
</script>

<style lang="scss">
  .truck-form {
    .el-form-item {
      margin-bottom: 5px;
    }
    .el-select {
      width: 100%;
    }
  }
  @media (max-width: 480px) {
    .truck-form {
      width: 90% !important;
    }
  }
</style>
