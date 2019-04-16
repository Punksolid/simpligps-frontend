<template>
  <el-form-item label="Geofence">
    <el-select v-model="form.params.geofence_id" placeholder="Select">
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
        geofences: []
      }
    },
    methods: {
      getGeofences() {
        fetchGeofences({ 'all': 1 }).then(response => {
          this.geofences = response.data.data
        })
      }
    },
    created() {
      this.getGeofences()
    }
  }
</script>
