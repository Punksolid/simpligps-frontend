<template>
  <el-row class="panel p-10">
    <el-row>
      <el-col>
        <el-button type="primary" @click="openDialog" icon="fas fa-mobile-alt p-r-10">Register Device</el-button>
      </el-col>
    </el-row>

    <el-dialog
      :title="titleDialog[dialogStatus]"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="40%">
      <RegisterDevice :form="elementToUpdate" @newdevice="fetchDevicesPage" @closedialog="dialogVisible = false"></RegisterDevice>
    </el-dialog>

    <el-col>
      <el-table
        :data="devicesList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="gps"
          label="GPS"
          sortable>
        </el-table-column>
        <el-table-column
          prop="plate"
          label="Plate"
          width="180"
          sortable>
        </el-table-column>
        <el-table-column
          prop="internal_number"
          label="Internal Number"
          width="180">
        </el-table-column>
        <el-table-column
          prop="carrier_id"
          label="Carrier ID"
          width="180">
        </el-table-column>
        <el-table-column
          label="Operations"
          fixed="right"
          width="190">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, devicesList)">
              Edit
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, devicesList)"
              type="danger"
              size="mini">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col class="m-t-5 t-center">
      <el-pagination
        class="dis-inline-b"
        :current-page.sync="devicesListPage.current_page"
        :total="devicesListPage.total"
        :page-size="devicesListPage.per_page"
        @current-change="handleCurrentChange"
        @pagination="fetchDevicesPage" />
    </el-col>

  </el-row>
</template>

<script>
  import { getDevices, deleteDevice } from '../../../api/devices'
  import RegisterDevice from './create'

  export default {
    name: 'DevicesList',
    components: {
      RegisterDevice
    },
    data() {
      return {
        listLoading: true,
        devicesList: null,
        elementToUpdate: {},
        devicesListPage: {
          page: 0,
          from: 0,
          last_page: 0,
          per_page: 15,
          to: 0,
          total: 0
        },
        dialogStatus: '',
        titleDialog: {
          update: 'Edit Device',
          create: 'Register Device'
        },
        dialogVisible: false
      }
    },
    methods: {
      fetchDevicesPage() {
        this.listLoading = true
        getDevices(this.devicesListPage).then(response => {
          this.devicesListPage = response.data.meta
          this.devicesList = response.data.data
          this.dialogVisible = false
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.devicesListPage.page = val
        this.fetchDevicesPage()
      },
      fetchDevicesList() {
        this.listLoading = true
        getDevices(this.devicesList).then(response => {
          this.devicesList = response.data.data
          this.listLoading = false
        })
      },
      openDialog() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      deleteRow(index, deviceListData) {
        this.$confirm('This will permanently delete device: ' + deviceListData[index].gps + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteDevice(deviceListData[index].id)
          this.$message({
            type: 'success',
            message: 'Device deleted successfully'
          })
          this.fetchDevicesPage()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Device delete canceled'
          })
        })
      },
      handleUpdate(index, deviceListData) {
        this.elementToUpdate = deviceListData[index]
        this.dialogStatus = 'update'
        this.dialogVisible = true
      }
    },
    created() {
      this.fetchDevicesList()
      this.fetchDevicesPage()
    }
  }
</script>

<style scoped>

</style>
