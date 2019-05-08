<template>
  <el-table
    :data="logs_list"
    border
    style="width: 100%"
    :row-class-name="tableRowClassName"
    >
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="LEVEL"
      width="180">
    </el-table-column>
    <el-table-column
      prop="data"
      label="DATA">
    </el-table-column>
  </el-table>
</template>

<style>
  .el-table .generic {
    background: "#409EFF"
  }
  .el-table .warning {
    background: "#E6A23C"
  }
  .el-table .danger {
    background: "#F56C6C"
  }

</style>

<script>
  import { fetchLogsDevices } from '../../../api/general'

  export default {
    name: 'Logs',
    props: {
      element: Number
    },
    data() {
      return {
        loading: false,
        logs_list: []
      }
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (row.level === 'danger') {
          return 'bg-red'
        } else if (row.level === 'warning') {
          return 'bg-yellow'
        }
        return ''
      },
      getDevicesLogs(param) {
        this.loading = true
        fetchLogsDevices(param).then(response => {
          this.logs_list = response.data.data.map(function(record) {
            record.data = JSON.stringify(record.data)
            return record
          })
          // this.logs_list = response.data.data
          this.loading = false
        })
      }
    },
    mounted() {
      this.getDevicesLogs(this.element)
    },
    created() {

    }

  }
</script>

