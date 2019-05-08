<template>
  <el-row class="panel p-10">
    <el-col class="bg-orange">
      <h3 class="m-10"><b>LOGS OF Trip ID:</b> {{ this.$route.params.tripid }}</h3>
    </el-col>

    <el-col>
      <el-table
        :data="logs"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        >
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="level"
          label="Level"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="data"
          label="Context"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Datetime">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import { fetchTripLog } from '../../../api/trips'

  export default {
    name: 'TripLog',
    data() {
      return {
        TripID: null,
        logs: []
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
      }
    },
    created() {
      this.TripID = this.$route.params.tripid
      fetchTripLog(this.TripID).then(response => {
        this.logs = response.data.data.map(function(record) {
                      record.data = JSON.stringify(record.data)
                      return record
                    })
      }).catch(() => {})
    }
  }
</script>

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
