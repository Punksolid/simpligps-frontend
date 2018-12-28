<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="WIALON ACCESS KEY" name="1">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Wialon Key">
          <el-input v-model="formInline.wialon_key" placeholder="Wialon Key">{{ formInline.wialon_key }}</el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Update Key</el-button>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import { getSettings, updateAccessKey } from '../../api/settings'
  import { Message } from 'element-ui'

  export default {
    name: 'Settings',
    data() {
      return {
        activeName: '1',
        formInline: {
          wialon_key: ''
        }
      }
    },
    methods: {
      onSubmit() {
        updateAccessKey(this.formInline).then(response => {
          console.log(this.formInline)
          Message({
            message: response.data.data.message,
            type: 'success',
            duration: 10 * 1000
          })
        })
        console.log('submit!')
      },
      fillSettings() {
        getSettings().then(response => {
          this.formInline.wialon_key = response.data.data.wialon_key
        })
      }
    },
    created() {
      this.fillSettings()
    }
  }
</script>

<style scoped>

</style>
