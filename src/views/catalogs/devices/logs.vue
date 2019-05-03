<template>
  <el-table
    :data="logs_list"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address">
    </el-table-column>
  </el-table>
</template>

<script>
  import { fetchLogsDevices } from '../../../api/general'

  export default {
    name: 'Logs',
    data() {
      return {
        loading: false,
        logs_list: []
      }
    },
    methods: {
      getDevicesLogs() {
        this.loading = true
        fetchLogsDevices(1).then(response => {
          this.logs_list = response.data.data
          this.loading = false
        })
      }
    },
    mounted() {
      this.getDevicesLogs()
    }

  }
</script>

<style scoped>

</style>
