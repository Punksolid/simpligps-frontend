<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create Geofence</el-button>

    <el-dialog
      title="Create Geofence"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
  <span>
    <create-geofence></create-geofence>
  </span>

    </el-dialog>

    <el-table
      :data="geofenceListData"
      style="width: 100%"
      max-height="250">
      <el-table-column
        fixed
        prop="resource_id"
        label="resource_id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="150">
      </el-table-column>
      <el-table-column
        prop="latitude"
        label="Latitude"
        width="400">
      </el-table-column>
      <el-table-column
        prop="longitude"
        label="Longitude"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Radius"
        width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import CreateGeofence from './create.vue'
  import { getGeofence } from '../../api/geofences'

  export default {
    name: 'Geofences',
    components: {
      CreateGeofence
    },
    params: {
      return: {
        tableData4: []
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      open() {
        this.$alert('This is a message', 'Title', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            })
          }
        })
      },
      handleClose(done) {
        this.$confirm('Are you sure to close? Not saved data will be lost!')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      fetchGeofencesList() {
        this.listLoading = true
        getGeofence(this.geofenceListData).then(response => {
          this.geofenceListData = response.data.data
          this.listLoading = false
        })
      }
    },
    created() {
      this.fetchGeofencesList()
    },
    data() {
      return {
        geofenceListData: null,
        dialogVisible: false
      }
    }
  }
</script>
