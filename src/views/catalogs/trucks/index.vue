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
        ref="truckTable"
        @expand-change="handleExpandChange"
        stripe>
        <el-table-column type="expand">

          <template slot-scope="details">
            <el-row :gutter="10" v-loading="truckLoading">
              <el-col class="panel" :span="24">
                <div class="panel-header bg-primary"><h3><i class="fas fa-truck"/><strong>Truck brand:</strong> {{truckData.brand}}</h3></div>
                <el-col class="panel-body p-10 bg-gray-light">
                  <el-col :xs="24" :sm="12">
                  <p><b>MODEL:</b> {{truckData.model}}</p>
                  <p><b>COLOR:</b> {{truckData.color}}</p>
                  <p><b>ID:</b> {{truckData.id}}</p>
                  <p><b>GPS:</b> {{truckData.gps}}</p>
                  </el-col>
                  <el-col :xs="12" :sm="12">
                    <p><b>PLATE:</b> {{truckData.plate}}</p>
                    <p><b>INT. NUMBER:</b> {{truckData.internal_number}}</p>
                  </el-col>
                </el-col>
              </el-col>

            </el-row>
          </template>
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
              @click="handleUpdate(scope.$index, trucksListData)"
              icon="fas fa-edit">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, trucksListData)"
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

  export default {
    name: 'Trucks',
    components: {
      CreateTruck
    },
    data() {
      return {
        expandRowKeys: [],
        trucksListData: [],
        truckData: {
          operator: {
            name: ''
          }
        },
        listLoading: false,
        truckLoading: false,
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
      deleteRow(index, truckData) {
        this.listLoading = true
        this.$confirm('This will permanently delete the truck with plate: ' + truckData[index].plate + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteTruck(truckData[index].id).then(response => {
            this.$message('Truck with plate: ' + truckData[index].plate + ' deleted.')
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
      handleExpandChange(row, expandedRows) {
        this.fetchTruckDetail(row.id)
        const id = row.id
        const lastId = this.expandRowKeys[0]
        // disable mutiple row expanded
        this.expandRowKeys = id === lastId ? [] : [id]
      },
      fetchTruckDetail(id) {
        // this.$refs.truckTable.toggleRowExpansion(row)
        this.truckLoading = true
        TruckDetail(id).then(resp => {
          this.truckData = resp.data.data
          this.truckLoading = false
        }).catch(() => {})
      },
      resetFilter() {
        this.search = {}
        this.fetchTrucksList()
      },
      handleUpdate(index, truckData) {
        this.listLoading = true
        this.formData = truckData[index]
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
<style lang="scss">
  .trucktable {
    .panel {
      box-shadow: none !important;
    }
    h3 {
      font-weight: 600;
      margin: 3px 0px 10px;
    }
    .name {
        background: #e5e5e5;
        padding: 10px;
        border-radius: 5px;
    }
    p {
      margin: 3px 0px;
      font-size: 1.1em;
      line-height: 1.3em;
    }
    .el-table__expanded-cell[class*=cell] {
      padding: 10px !important;
    }
  }
</style>
