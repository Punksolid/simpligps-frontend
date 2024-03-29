<template>
  <el-row class="panel p-10">
    <el-col class="bg-orange">
      <h3 class="m-10"><b>LOGS OF Trip ID:</b> {{ this.TripID }}</h3>
    </el-col>

    <el-col class="bg-gray-light p-10 m-b-5 bd-3">
      <el-button v-if="!editable" type="primary" icon="fas fa-plus" @click="editable = !editable" size="small"> Add Log</el-button>
      <el-input v-else v-model="message" placeholder="Please input your custom log/message." clearable @clear="editable = false">
        <el-button :disabled="message.length === 0" slot="append" icon="fas fa-check" @click="postLog" :loading="submiting"> Add log</el-button>
      </el-input>
    </el-col>

    <el-col>
      <el-table
        :data="logs"
        style="width: 100%"
        v-loading="loading"
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
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="message"
          label="Message"
          min-width="200"
        >
        </el-table-column>
        <el-table-column
          prop="data"
          label="Context"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Datetime"
          min-width="120">
        </el-table-column>
      </el-table>
    </el-col>

    <el-col class="m-t-10">
      <el-button type="primary" v-if="! lastPage" @click="loadMoreLogs(element)" :loading="loading">{{ this.loading ? 'Loading...' : 'Load more' }}</el-button>
    </el-col>

  </el-row>
</template>

<script>
  import { newLog, fetchLogs } from '../../../api/general'

  export default {
    name: 'TripLog',
      props: {
        element: Number
      },
    data() {
      return {
        loading: false,
        TripID: null,
        logs: [],
        paginationQuery: {},
        lastPage: false,
        message: '',
        editable: false,
        submiting: false
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
      getTripLogs(id) {
          this.loading = true
          fetchLogs('trips', id).then(response => {
              this.logs = response.data.data.map(function(record) {
                  record.data = JSON.stringify(record.data)
                  return record
              })
              this.paginationQuery = response.data.meta
              if (this.paginationQuery.current_page === this.paginationQuery.last_page) {
                  this.lastPage = true
              }
          }).catch(() => {
          }).finally(() => {
              this.loading = false
          })
      },
      loadMoreLogs(id) {
          this.loading = true
          var params = { page: this.paginationQuery.current_page + 1 }
          fetchLogs('trips', id, params).then(resp => {
              var newLogs = resp.data.data.map(function(record) {
                  record.data = JSON.stringify(record.data)
                  return record
              })
              this.logs = this.logs.concat(newLogs)
              this.paginationQuery = resp.data.meta
              if (this.paginationQuery.current_page === this.paginationQuery.last_page) {
                  this.lastPage = true
              }
          }).finally(() => {
              this.loading = false
          })
      },
      postLog() {
        this.submiting = true
        newLog('trips', this.TripID, this.message).then(resp => {
          this.$message({
            message: 'Custom log was submitted successfully',
            type: 'success'
          })
          this.message = ''
          this.editable = false
          this.getTripLogs(this.element)
        }).catch(() => {
        }).finally(() => {
          this.submiting = false
        })
      }
    },
    created() {
        this.TripID = this.element
      // this.TripID = this.$route.params.tripid
      this.getTripLogs(this.element)
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
