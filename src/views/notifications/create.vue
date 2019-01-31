<template>
  <el-form ref="form" :model="form" label-width="100px">
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
      <el-input v-model="form.control_type" ></el-input>
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
    <el-form-item>
      <el-button>Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import { getWialonUnits, getResources, createWialonNotification } from '../../api/general'
import { Message } from 'element-ui'

  export default {
    name: 'CreateNotification',
    data() {
      return {
        form: {
          resource: null,
          control_type: 'panic_button',
          units: [],
          activate: '',
          name: ''

        },
        resources: '',
        units: ''
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form)
        createWialonNotification(this.form).then(response => {
          Message('Successful')
        })
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

