<template>
  <el-row class="panel p-10">
    <el-row class="searchBar">
      <el-col class="m-b-5" :xl="4" :sm="4" :xs="24">
        <el-button type="primary" @click="openDialog" icon="fas fa-mobile-alt p-r-10">Register Device</el-button>
      </el-col>

      <el-col :xl="20" :sm="20" :xs="24">
        <el-form class="dis-flex" v-model="search">
          <el-form-item>
            <el-input placeholder="Name" v-model="search.name" @keyup.enter.native="handleFilter"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="GPS" v-model="search.gps" @keyup.enter.native="handleFilter"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Plate" v-model="search.plate" @keyup.enter.native="handleFilter">
              <el-button slot="append" icon="fas fa-search" @click="handleFilter"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="fas fa-trash-alt" plain @click="fetchDevicesPage"></el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>

    <RegisterDevice :form="formData" :title="titleDialog[dialogStatus]" :dialogvisible="dialogVisible" @newdevice="fetchDevicesPage" @closedialog="closeDialog"/>

    <el-col>
      <el-table
        :data="devicesList"
        stripe
        v-loading="listLoading"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name"
          min-width="120px"
          sortable>
        </el-table-column>
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
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              icon="fas fa-edit">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="danger"
              size="mini"
              icon="fas fa-trash">
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
  import { fetchDevices, deleteDevice } from '../../../api/devices'
  import RegisterDevice from './create'

  export default {
    name: 'DevicesList',
    components: {
      RegisterDevice
    },
    data() {
      return {
        listLoading: false,
        search: {
          name: '',
          gps: '',
          plate: ''
        },
        devicesList: null,
        formData: {},
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
        this.dialogVisible = false
        this.search = {}
        fetchDevices(this.devicesListPage).then(response => {
          this.devicesList = response.data.data
          this.devicesListPage = response.data.meta
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listLoading = true
        fetchDevices(this.search).then(response => {
          this.devicesListPage = response.data.meta
          this.devicesListPage.page = response.data.meta.current_page
          this.devicesList = response.data.data
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.devicesListPage.page = val
        this.fetchDevicesPage()
      },
      openDialog() {
        this.listLoading = true
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      closeDialog() {
        this.listLoading = false
        this.formData = {}
        this.dialogVisible = false
      },
      deleteRow(index, deviceListData) {
        this.listLoading = true
        this.$confirm('This will permanently delete device: ' + deviceListData[index].gps + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteDevice(deviceListData[index].id).then(() => {
            this.fetchDevicesPage()
            this.$message({
              type: 'success',
              message: 'Device deleted successfully'
            })
          }).catch(() => {
            this.$message.error('Error deleting device')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Device delete canceled'
          })
          this.listLoading = false
        })
      },
      handleUpdate(index, row) {
        this.listLoading = true
        this.formData = row
        this.dialogStatus = 'update'
        this.dialogVisible = true
      }
    },
    created() {
      this.fetchDevicesPage()
    }
  }
</script>

<style scoped>

</style>
