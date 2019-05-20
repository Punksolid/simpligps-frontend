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
            <el-input placeholder="Brand" v-model="search.brand" @keyup.enter.native="handleFilter">
              <el-button slot="append" icon="fas fa-search" @click="handleFilter"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="fas fa-trash-alt" plain @click="getDevices"></el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>

    <RegisterDevice :form="formData" :title="titleDialog[dialogStatus]" :dialogvisible="dialogVisible" @newdevice="getDevices" @closedialog="closeDialog"/>

    <el-col>
      <el-table
        :data="devicesList"
        stripe
        v-loading="listLoading"
        style="width: 100%"
        :highlight-current-row="true"
        :row-key="row => row.id"
        @expand-change="showMoreDetails"
        >

        <el-table-column
          type="expand"
        >
          <template slot-scope="scope">
            <el-tabs v-loading="scope.row.loading">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i>Logs</span>
                <Logs v-bind:element="scope.row.id" />
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Truck</span>
                <div class="card-panel-icon-wrapper icon-people">

                  <div class="card-panel-icon-wrapper icon-people">
                    <i class="el-icon-info"></i>
                  </div>
                  <div v-if="scope.row.truck">
                      <h3>Truck: {{ scope.row.truck.name   || "default" }} </h3>
                      <h3>Plate: {{ scope.row.truck.plate  || "default" }}</h3>
                      <h3>Color: {{ scope.row.truck.color || "default" }}</h3>
                      <h3>Brand: {{ scope.row.truck.brand || "default" }}</h3>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-table-column>

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
          prop="brand"
          label="Brand"
          width="180"
          sortable>
        </el-table-column>
        <el-table-column
          prop="internal_number"
          label="Internal Number"
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
        <pagination
          v-show="paginationQuery.total"
          :total="paginationQuery.total"
          :page.sync="paginationQuery.page"
          :limit.sync="paginationQuery.limit"
          @pagination="getDevices"/>
    </el-col>

  </el-row>
</template>

<script>
  import { fetchDevices, deleteDevice, fetchDevice } from '../../../api/devices'
  import RegisterDevice from './create'
  import Logs from './logs'
  import Pagination from '../../../components/Pagination/index.vue'

  export default {
    name: 'DevicesList',
    components: {
      Logs,
      RegisterDevice,
      Pagination
    },
    data() {
      return {
        listLoading: false,
        search: {
          name: '',
          gps: '',
          brand: ''
        },
        devicesList: null,
        formData: {},
        paginationQuery: {
            limit: 15,
            total: 0
        },
        dialogStatus: '',
        titleDialog: {
          update: 'Edit Device',
          create: 'Register Device'
        },
        dialogVisible: false,
        detailsLoading: false
      }
    },
    methods: {
      pagination(val) {
        this.getNotifications()
      },
      showMoreDetails(row, expandedRows) {
        this.detailsLoading = true
        row.loading = true
        fetchDevice(row.id).then(response => {
          this.devicesList = this.devicesList.map(function(element) {
            if (element.id === row.id) {
              element = response.data.data
              element.loading = false
              return element
            }
            return element
          })
        }).finally(res => {
          this.detailsLoading = false
        })
      },
      getDevices() {
        this.listLoading = true
        this.dialogVisible = false
        this.search = {}
        fetchDevices(this.paginationQuery).then(response => {
          this.paginationQuery.total = response.data.meta.total
          this.devicesList = response.data.data.map(function(device) {
            device.loading = false
            return device
          })
        }).finally(res => {
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listLoading = true
        fetchDevices(this.search).then(response => {
          this.paginationQuery = response.data.meta
        }).finally(res => {
          this.listLoading = false
        })
      }, /** 206 **/
      openDialog() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      closeDialog() {
        this.formData = {}
        this.dialogVisible = false
      },
      deleteRow(index, deviceListData) {
        this.listLoading = true
        this.$confirm('This will permanently delete device: ' + deviceListData.gps + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteDevice(deviceListData.id).then(() => {
            this.getDevices()
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
      this.getDevices()
    }
  }
</script>
