<template>
  <div>
    <el-col class="bg-gray-light p-10 m-b-5 bd-3">
      <el-button v-if="!editable" type="primary" icon="fas fa-plus" @click="editable = !editable" size="small"> Add Log</el-button>
      <el-input v-else v-model="message" placeholder="Please input your custom log/message." clearable @clear="editable = false">
        <el-button :disabled="message.length === 0" slot="append" icon="fas fa-check" @click="postLog" :loading="submiting"> Add log</el-button>
      </el-input>
    </el-col>

    <el-table
    :data="logs_list"
    border
    id="logs"
    v-loading="loading"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    >
      <el-table-column
        align="center"
        prop="id"
        label="ID"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="level_name"
        label="Level"
        width="180">
      </el-table-column>
      <el-table-column
        prop="message"
        label="Message">
      </el-table-column>
      <el-table-column
        prop="data"
        class-name="alerts"
        label="Data">
        <template slot-scope="{row}">
          <template v-for="(value, name, index) in row.context">
            <div :key="index.id">{{ name }}: {{value}}</div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchLogs, newLog } from '../../../api/general'

  export default {
    name: 'Logs',
    props: {
      element: Number
    },
    data() {
      return {
        loading: false,
        logs_list: [],
        message: '',
        editable: false,
        submiting: false
      }
    },
    methods: {
      tableRowClassName({ row }) {
        if (row.level_name['danger']) {
          console.log('Danger Row')
        }
        if (row.level_name === 'danger') {
          return 'bg-red'
        } else if (row.level_name === 'warning') {
          return 'bg-yellow'
        }
        return ''
      },
      getDevicesLogs(id) {
        this.loading = true
        fetchLogs('devices', id).then(response => {
          this.logs_list = response.data.data.map(function(record) {
            record.data = JSON.stringify(record.data)
            return record
          })
          // this.logs_list = response.data.data
        }).catch(() => {
        }).finally(() => {
          this.loading = false
        })
      },
      postLog() {
        this.submiting = true
        newLog('devices', this.element, this.message).then(resp => {
          this.$message({
            message: 'Custom log was submitted successfully',
            type: 'success'
          })
          this.message = ''
          this.editable = false
          this.getDevicesLogs(this.element)
        }).catch(() => {
        }).finally(() => {
          this.submiting = false
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

<style lang="scss">
  #logs {
    .generic {
      background: "#409EFF"
    }
    .warning {
      background: "#E6A23C"
    }
    .danger {
      background: "#F56C6C"
    }
    tr:hover>td {
      background-color: #00000030;
    }
    td.alerts .cell {
      max-height: 100px;
      overflow-y: scroll;
    }
    .is-center > * {
      text-align: center;
    }
  }
</style>
