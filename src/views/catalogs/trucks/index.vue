<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">

      <el-col class="m-b-5" :xl="4" :sm="4" :xs="24">
        <el-button type="primary" @click="openDialog" icon="fas fa-truck p-r-10">New truck</el-button>
      </el-col>
      <!--<el-col :xl="20" :sm="20" :xs="24">
        <el-form class="dis-flex" v-model="search">
          <el-form-item>
            <el-input placeholder="Name" v-model="search.name" @keyup.enter.native="fetchTrucksList"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Lastname" v-model="search.lastname" @keyup.enter.native="fetchTrucksList"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Email" v-model="search.email" @keyup.enter.native="fetchTrucksList">
              <el-button slot="append" icon="fas fa-search" @click="fetchTrucksList"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="fas fa-trash-alt" plain @click="resetFilter"></el-button>
          </el-form-item>
        </el-form>
      </el-col>-->

    </el-row>

    <el-dialog
      :title="titleDialog"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <create-truck :form="elementToUpdate" @truck_created="fetchTrucksList" @closedialog="handleClose"></create-truck>
    </el-dialog>

    <el-col class="m-t-10">

      <el-table
        v-loading="listLoading"
        :data="trucksListData"
        stripe
        border>
        <el-table-column
          prop="plate"
          label="Plate"
          width="250">
        </el-table-column>
        <el-table-column
          prop="brand"
          label="brand"
          sortable
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="model"
          label="Model"
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
          fixed="right"
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
  import { trucksList, deleteTruck } from '../../../api/trucks'

  export default {
    name: 'Trucks',
    components: {
      CreateTruck
    },
    data() {
      return {
        trucksListData: [],
        search: {
          name: '',
          lastname: '',
          email: ''
        },
        listLoading: false,
        elementToUpdate: null,
        trucksListPage: {
          page: 0,
          per_page: 15,
          total: 0
        },
        dialogStatus: '',
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
            this.$message.error('Truck with plate: ' + truckData[index].plate + ' deleted.')
            this.fetchTrucksList()
          })
        })
      },
      openDialog() {
        this.titleDialog = 'Create Truck'
        this.listLoading = true
        this.elementToUpdate = {}
        this.dialogVisible = true
      },
      handleClose() {
        this.listLoading = true
        if (this.elementToUpdate.name) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              this.listLoading = false
              this.dialogVisible = false
              this.elementToUpdate = {}
            })
        } else {
          this.listLoading = false
          this.dialogVisible = false
          this.elementToUpdate = {}
        }
      },
      fetchTrucksList() {
        this.listLoading = true
        const params = Object.assign(this.trucksListData, this.search)

        trucksList(params).then(response => {
          this.trucksListData = response.data.data
          this.trucksListPage = response.data.meta
          this.trucksListPage.page = response.data.meta.current_page
          this.listLoading = false
        })
      },
      resetFilter() {
        this.search = {}
        this.fetchTrucksList()
      },
      handleUpdate(index, truckData) {
        this.listLoading = true
        this.elementToUpdate = truckData[index]
        this.titleDialog = 'Edit Truck'
        this.dialogVisible = true
      },
      handleCurrentChange(val) {
        this.usersListPage.page = val
        this.fetchTrucksList()
      }
    },
    created() {
      this.fetchTrucksList()
    }
  }
</script>
<style lang="scss" scoped>

</style>
