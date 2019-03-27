<template>
  <el-form
    v-loading="loading"
    ref="form"
    :model="form"
    label-width="150px">
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Resources">
      <el-select v-model="form.resource" placeholder="Select">
        <el-option
          v-for="resource_element in resources"
          :key="resource_element.id"
          :label="resource_element.name"
          :value="resource_element.id">
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
    <el-form-item>
      <el-row v-if="form.control_type === 'speed'">
        <el-col>
          <el-input-number v-model="form.params.min_speed" size="mini" :min="1" :max="150"></el-input-number>
        </el-col>
        <el-col>
        <el-input-number v-model="form.params.max_speed" size="mini" :min="1" :max="150"></el-input-number>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Units">
      <el-select v-model="form.units" multiple placeholder="Select">
        <el-option
          v-for="unit in units"
          :key="unit.value"
          :label="unit.label"
          :value="unit.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activate">
      <el-switch v-model="form.active"></el-switch>
    </el-form-item>
    <el-row>
    <el-col class="t-center">
    <el-form-item>
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </el-form-item>
    </el-col>
    </el-row>
  </el-form>
</template>

<script>

import { getWialonUnits, getResources, createWialonNotification } from '../../api/general'
import { Message } from 'element-ui'

  export default {
     name: 'CreateNotification',
    data() {
      return {
        loading: false,
        form: {
          resource: null,
          control_type: null,
          params: {
            min_speed: 0,
            max_speed: 0
          },
          units: [],
          activate: '',
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
          }],
        resources: '',
        units: ''
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        createWialonNotification(this.form).then(response => {
          Message('Successful')
          this.$emit('refreshlist')
          this.loading = false
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this alert?')
          .then(_ => {
            done(this.$emit('closedialog'))
          })
          .catch(_ => {})
      },
      setControlType(event) {
        this.options_control_type.value = event.target.value
      },
      fetchWialonResources() {
        getResources().then(response => {
          this.resources = response.data.data
        })
        getWialonUnits().then(response => {
          this.units = response.data.data.map(unit => {
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

