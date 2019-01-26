<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
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
    <el-form-item label="Control Type By">
      <el-input v-model="form.control_type_by" ></el-input>
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
          resources: [{
            value: '',
            label: ''
          }],
          control_type_by: 'panic_button',
          unit_default: '',
          units: [],
          activate: '',
          name: ''

        }
      }
    },
    methods: {
      onSubmit() {
        createWialonNotification(this.form).then(response => {
          Message('Successful')
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

