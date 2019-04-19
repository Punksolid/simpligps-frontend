<template>
  <el-dialog
    :title="title"
    :visible="dialogvisible"
    :before-close="handleClose"
    width="40%">

    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.name" placeholder="Place Name"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.person_in_charge" placeholder="Person in charge"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.address" placeholder="Address"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.phone" placeholder="Phone"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="selected_geofence" placeholder="Select Geofence" style="width: 100%">
          <el-option
            v-for="geofence in geofences"
            :key="geofence.id"
            :label="geofence.name"
            :value="geofence.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="dialog-footer text-center">
      <el-button @click="handleClose()">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">{{this.form.id?'Update':'Create'}}</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import { createPlace, updatePlace } from '@/api/places'
  import { fetchGeofences } from '../../../api/general'

  export default {
    name: 'NewPlace',
    props: [
      'dialogvisible',
      'title',
      'form'
    ],
    data() {
      return {
        loading: false,
        selected_geofence: null,
        geofences: []
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        if (this.form.id) {
          updatePlace(this.form.id, this.form).then(response => {
            this.$message({
              message: 'Place: ' + response.data.data.name + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('created')
          }).catch(() => {
            this.loading = false
          })
        } else {
          createPlace(this.form).then(response => {
            this.$message({
              message: 'New Place ' + response.data.data.name + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('created')
          }).catch(() => {
            this.loading = false
          })
        }
      },
      handleClose(done) {
        if (this.form.name) {
          this.$confirm('Are you sure to close this dialog?')
            .then(_ => {
              this.$emit('closedialog')
              done()
            }).catch(_ => {})
        } else {
          this.$emit('closedialog')
        }
      }
    },
    created() {
      fetchGeofences().then(response => {
          this.geofences = response.data.data
      })
    }
  }
</script>

<style scoped>

</style>
