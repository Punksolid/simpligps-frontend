<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="Resources">
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="resource in form.resources"
          :key="resource.value"
          :label="resource.name"
          :value="resource.name">
        </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="Geofence_id">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Units">
      <el-select v-model="form.unit_default" multiple placeholder="Select">
        <el-option
          v-for="unit in form.units"
          :key="unit.value"
          :label="unit.label"
          :value="unit.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activate">
      <el-switch v-model="form.active"></el-switch>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button>Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import { getWialonUnits, getResources } from '../../api/general'

  export default {
    name: 'CreateNotification',
    data() {
      return {
        form: {
          resources: [{
            value: '',
            label: ''
          }],
          geofence_id: '',
          unit_default: '',
          units: [],
          activate: '',
          name: ''

        }
      }
    },
    methods: {
      onSubmit() {
        this.$confirm('Are you sure you want save changes?', 'Save Changes', {
          cancelButtonText: 'Cancel',
          type: 'info'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Changes Saved'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Changes not saved'
          })
        })
      },
      fetchWialonResources() {
        getResources().then(response => {
          this.form.resources = response.data.data
        })
        getWialonUnits().then(response => {
          this.form.units = response.data.data.map(unit => {
            return { value: unit.id, label: unit.nm }
          })
        }).catch(e => {
          console.log(e)
        })
      }
    },
    created() {
      this.fetchWialonResources()
    }
  }
</script>

