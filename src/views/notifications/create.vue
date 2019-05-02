<template>
  <el-dialog
    title="Create Notification"
    :visible.sync="dialogvisible"
    width="40%"
    :before-close="handleClose">
      <el-form
        ref="form"
        :model="form"
        label-width="150px">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Level">
          <el-select v-model="form.level" placeholder="Select">
            <el-option
              v-for="level in levels"
              :class="level.id"
              :key="level.id"
              :label="level.name"
              :value="level.id">
                <span style="float: left">{{ level.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"><el-tag :type="level.id">{{ level.name }}</el-tag></span>
            </el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="Control Type By">
          <el-select v-model="form.control_type" placeholder="Select">
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

        <el-form-item label="Units">
          <el-select v-model="form.devices_ids" multiple placeholder="Select">
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
import { postNotificationTrigger } from '../../api/notifications'
import { fetchDevices } from '../../api/devices'

  export default {
     name: 'CreateNotification',
    components: {
       SpeedControlType,
       GeofenceControlType
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
        levels: [
            { name: 'Good', id: 'good' },
            { name: 'Success', id: 'success' },
            { name: 'Info', id: 'info' },
            { name: 'Warning', id: 'warning' },
            { name: 'Danger', id: 'danger' }
        ],
        devices: [],
        form: {
          control_type: null,
          devices_ids: [],
          params: {
            min_speed: 0,
            max_speed: 0
          },
          active: 0,
          name: ''
        },
        options_control_type: [{
          label: 'Speed',
          value: 'speed',
          params: {
            min_speed: '',
            max_speed: ''
          }
        },
          {
            label: 'Panic Button',
            value: 'panic_button'
          },
          {
            label: 'Geofence',
            value: 'geofence'
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
      handleClose(done) {
        this.$confirm('Are you sure to close this alert?')
          .then(_ => {
            this.$emit('closedialog')
            done()
          })
          .catch(_ => {})
      },
      setControlType(event) {
        this.options_control_type.value = event.target.value
      },
      getDevices() {
          fetchDevices({ 'all': 1 }).then(response => {
              this.devices = response.data.data
          })
      }
    },
    created() {
        // this.fetchWialonResources()
        this.getDevices()
    }
  }
</script>

