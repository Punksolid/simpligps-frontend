<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">

      <el-col class="m-b-5" :xl="4" :sm="4" :xs="24">
        <el-button type="primary" @click="openDialog" icon="fas fa-truck p-r-10">New truck</el-button>
      </el-col>

    </el-row>

    <create-truck
      v-if="dialogVisible"
      :title="titleDialog"
      :dialogvisible="dialogVisible"
      :form="formData"
      @truck_created="fetchTrucksList"
      @closedialog="closeDialog"/>

    <el-col class="m-t-10">

      <el-table
        v-loading="listLoading"
        :data="trucksListData"
        class="trucktable"
        :row-key="row => row.id"
        :expand-row-keys="expandRowKeys"
        @expand-change="showMoreDetails"
        stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">

            <TruckDetails :data="scope.row" :loading="scope.row.loading"/>

          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name"
          width="220">
        </el-table-column>
        <el-table-column
          prop="plate"
          label="Plate"
          width="220">
        </el-table-column>
        <el-table-column
          prop="brand"
          label="Brand"
          sortable
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="model"
          label="Model"
          sortable
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="color"
          label="Color"
          sortable
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="gps"
          label="GPS"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="internal_number"
          label="Int. Number"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="Operations"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.row)"
              icon="fas fa-edit">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row)"
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
        layout="total, prev, pager, next, jumper"
        :current-page.sync="trucksListPage.current_page"
        :page-size="trucksListPage.per_page"
        :total="trucksListPage.total"
        @current-change="handleCurrentChange"
        @pagination="fetchTrucksList" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateTruck from './create.vue'
  import { trucksList, deleteTruck, TruckDetail } from '../../../api/trucks'
  import TruckDetails from './details'

  export default {
    name: 'Trucks',
    components: {
      TruckDetails,
      CreateTruck
    },
    data() {
      return {
        expandRowKeys: [],
        trucksListData: [],
        listLoading: false,
        formData: null,
        trucksListPage: {
          page: 0,
          per_page: 15,
          total: 0
        },
        titleDialog: 'Create Truck',
        dialogVisible: false
      }
    },
    methods: {
      deleteRow(truckData) {
        this.listLoading = true
        this.$confirm('This will permanently delete the truck named: ' + truckData.name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteTruck(truckData.id).then(response => {
            this.$message('Truck named: ' + truckData.name + ' deleted.')
            this.fetchTrucksList()
          })
        })
      },
      openDialog() {
        this.titleDialog = 'Create Truck'
        this.listLoading = true
        this.formData = {}
        this.dialogVisible = true
      },
      closeDialog() {
        this.listLoading = false
        this.dialogVisible = false
      },
      fetchTrucksList() {
        this.dialogVisible = false
        this.listLoading = true
        const params = Object.assign(this.trucksListPage, this.search)

        trucksList(params).then(response => {
          this.trucksListData = response.data.data
          this.trucksListPage = response.data.meta
          this.trucksListPage.page = response.data.meta.current_page
          this.listLoading = false
        })
      },
      showMoreDetails(row, expandedRows) {
          this.truckLoading = true
          row.loading = true
          TruckDetail(row.id).then(response => {
              this.trucksListData = this.trucksListData.map(function(element) {
                  if (element.id === row.id) {
                      element = response.data.data
                      element.position = {
                          lat: element.position.lat,
                          lng: element.position.lon
                      }
                      element.loading = false
                      return element
                  }
                  return element
              })
          }).finally(res => {
              row.loading = false
          })
      },
      resetFilter() {
        this.search = {}
        this.fetchTrucksList()
      },
      handleUpdate(truckData) {
        this.listLoading = true
        this.formData = truckData
        this.titleDialog = 'Edit Truck'
        this.dialogVisible = true
      },
      handleCurrentChange(val) {
        this.trucksListPage.page = val
        this.fetchTrucksList()
      }
    },
    created() {
      this.fetchTrucksList()
    }
  }
</script>
<style>
  .el-table__expanded-cell[class*=cell] {
    padding: 10px 15px !important;
  }
</style>
