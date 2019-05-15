<template>
  <el-form-item label="Geofence">
    <el-select v-model="form.params.geofence_id" placeholder="Select Geofence" :loading="loading">
      <el-option
        v-for="geofence in geofences"
        :key="geofence.id"
        :label="geofence.name"
        :value="geofence.id">
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script>
  import { fetchGeofences } from '../../../api/general'

  export default {
    name: 'GeofenceControlType',
    props: [
      'form'
    ],
    data() {
      return {
        loading: false,
        geofences: []
      }
    },
    methods: {
      getGeofences() {
        this.loading = true
        fetchGeofences({ 'all': 1 }).then(response => {
          this.loading = false
          this.geofences = response.data.data
        }).catch(() => {
          this.loading = false
        })
      }
    },
    created() {
      this.getGeofences()
    }
  }
</script>
