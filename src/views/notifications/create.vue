<template>
  <el-dialog
    title="Create Notification"
    :visible.sync="dialogvisible"
    width="45%"
    :before-close="handleClose">
      <el-form
        ref="form"
        :model="form"
        label-width="120px">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Level">
          <el-select v-model="form.level" placeholder="Select Level">
            <el-option
              v-for="level in levels"
              :key="level.id"
              :label="level.name"
              :value="level.id">
                <span style="float: left">{{ level.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"><el-tag :type="level.type" :color=" level.color ">{{ level.name }}</el-tag></span>
            </el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="Control Type By">
          <el-select v-model="form.control_type" placeholder="Select Type">
            <el-option
              v-for="type in options_control_type"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            ></el-option>
          </el-select>
          </el-form-item>
        <div v-if="form.control_type === 'speed'">
          <SpeedControlType :form="form"/>
        </div>
        <div v-if="form.control_type === 'geofence'">
          <GeofenceControlType :form="form"/>
        </div>

        <SensorControlType v-if="form.control_type === 'sensor'" :form="form"/>

        <el-form-item label="Units">
          <el-select v-model="form.devices_ids" multiple placeholder="Select Unit" :loading="devicesLoading">
            <el-option
              v-for="device in devices"
              :key="device.id"
              :label="device.name"
              :value="device.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Activate">
          <el-switch v-model="form.active"/>
        </el-form-item>
        <el-row>
          <el-col class="t-center">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="onSubmit">Create</el-button>
          </el-col>
        </el-row>
      </el-form>
  </el-dialog>
</template>

<script>

// import { getWialonUnits } from '../../api/general'
import SpeedControlType from './control_types/SpeedControlType'
import GeofenceControlType from './control_types/GeofenceControlType'
import SensorControlType from './control_types/SensorControlType'
import { postNotificationTrigger } from '../../api/notifications'
import { fetchDevices } from '../../api/devices'

  export default {
     name: 'CreateNotification',
    components: {
      SpeedControlType,
      GeofenceControlType,
      SensorControlType
    },
    props: {
      dialogvisible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        loading: false,
        devicesLoading: false,
        levels: [
          // success, info, warning, danger, 'empty'
            { name: 'Emergency', id: 'emergency', color: '#dc3545', type: 'success' },
            { name: 'Alert', id: 'alert', color: '#8492a6', type: '' },
            { name: 'Critical', id: 'critical', color: '#F56C6C', type: 'success' },
            { name: 'Error ', id: 'error', color: '#A50203', type: 'success' },
            { name: 'Warning', id: 'warning', color: '#E6A23C', type: 'success' },
            { name: 'Notice', id: 'notice', color: '#f8f9fa', type: 'info' },
            { name: 'Info', id: 'info', color: '#909399', type: 'success' },
            { name: 'Debug', id: 'debug', color: '#67C23A', type: 'danger' }
        ],
        devices: [],
        form: {
          params: {
            sensor_name: '*'
          },
          active: true
        },
        options_control_type: [{
          label: 'Speed',
          value: 'speed'
        },
          {
            label: 'Panic Button',
            value: 'panic_button'
          },
          {
            label: 'Geofence',
            value: 'geofence'
          },
          {
            label: 'Sensor',
            value: 'sensor'
          }]
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        postNotificationTrigger(this.form).then(response => {
          this.$message({
            message: 'Notification created successfully',
            duration: 3000,
            type: 'success'
          })
          this.$emit('created')
          this.loading = false
        }).catch(_ => {
          this.loading = false
        })
      },
      handleClose() {
        if (this.form.name) {
        this.$confirm('Are you sure to close this alert?')
          .then(_ => {
            this.$emit('closedialog')
          })
          .catch(_ => {})
        } else {
          this.$emit('closedialog')
        }
      },
      setControlType(event) {
        this.options_control_type.value = event.target.value
      },
      getDevices() {
        this.devicesLoading = true
          fetchDevices({ 'all': 1 }).then(response => {
            this.devices = response.data.data
            this.devicesLoading = false
          }).catch(() => {
            this.devicesLoading = false
          })
      }
    },
    created() {
        // this.fetchWialonResources()
        this.getDevices()
    },
    beforeDestroy() {
      this.form = { params: { sensor_name: '*' }, active: true }
    }
  }
</script>
