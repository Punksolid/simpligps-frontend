<template>
    <el-form ref="form" :model="form" label-width="200">
            <el-form-item label="Resource_id">
      <el-select v-model="value" placeholder="Select Geofence">
        <el-option
          v-for="name in resources"
          :key="name.value"
          :label="name.label"
          :value="name.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Latitude">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="Longitude">
        <el-input v-model="form.longitude"></el-input>
      </el-form-item>
      <el-form-item label="Radius">
        <el-input v-model="form.radius"></el-input>
      </el-form-item>
      <el-form-item label="Type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Create Geofence</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
  import { createGeofence, getResources } from '../../api/geofences'
  import { Message } from 'element-ui'

    export default {

      name: 'CreateGeofence',
      data() {
      return {
      form: {
      resources: '',
      name: '',
      latitude: '',
      longitude: '',
      radius: '',
      type: ''
      }
      }
    },
  methods: {
      onSubmit() {
        createGeofence(this.form).then(response => {
          console.log(response)
          Message({
            message: 'Geofence ' + response.data.data.name + ' created',
            type: 'success',
            duration: 10 * 1000
          })
        })
      },
      fillResourceList(){

      }
    },
     mounted() {
      getResources().then(response => {
          this.resources=response.data.data.map(item => {
        return { value: item, label: item }
        })
        })

    },
  }
</script>


<style scoped>
.user-form{
  width: 800px;
}
</style>
