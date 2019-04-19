<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="openDialog" icon="fas fa-route p-r-10">New Trip</el-button>
      </el-col>
      <el-col :xl="20" :sm="20" :xs="24">
      <!-- Right Side for Search Options -->
      </el-col>
    </el-row>

  <CreateTrip :form="tripData" :title="titleDialog" :dialogvisible="dialogVisible" @created="fetchTrips" @closedialog="closeDialog"></CreateTrip>

  <el-row>
   <el-col>
     <el-table
       :data="tripsList"
       v-loading="listLoading"
       style="width: 100%">
       <el-table-column
         prop="id"
         label="ID"
         width="50px">
       </el-table-column>
       <el-table-column
         prop="rp"
         label="RP"
         min-width="50px"
       >
       </el-table-column>
       <el-table-column
         prop="client"
         label="Client"
         min-width="80px"
       >
       </el-table-column>
       <el-table-column
         prop="origin_name"
         label="Origin">
       </el-table-column>
       <el-table-column
         prop="destination_name"
         label="Destination">
       </el-table-column>
       <el-table-column
         prop="tag"
         label="TAG"
         width="100px"
       >
       </el-table-column>
       <el-table-column
         label="Operations"
         fixed="right"
         width="130">
         <template slot-scope="scope">
           <el-button
             size="mini"
             disabled
             icon="fas fa-edit"
             @click="handleUpdate(scope.$index, scope.row)">
           </el-button>
           <el-button
             size="mini"
             type="danger"
             disabled
             icon="fas fa-trash"
             @click.native.prevent="deleteRow(scope.$index, scope.row)">
           </el-button>
         </template>
       </el-table-column>
     </el-table>
   </el-col>
  </el-row>

    <el-col class="m-t-5 t-center">
      <el-pagination
        class="dis-inline-b"
        layout="total, prev, pager, next, jumper"
        :current-page.sync="tripsListPage.current_page"
        :page-size="tripsListPage.per_page"
        :total="tripsListPage.total"
        @current-change="handleCurrentChange"
        @pagination="tripsList" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateTrip from './newtrip'
  import { tripList, deleteTrip } from '@/api/trips'

    export default {
      name: 'TripList',
      components: {
        CreateTrip
      },
      data() {
          return {
            dialogVisible: false,
            listLoading: false,
            titleDialog: 'New Trip',
            tripData: {},
            tripsList: [],
            tripsListPage: {}
          }
      },
      methods: {
        fetchTrips() {
          this.dialogVisible = false
          this.listLoading = true

          tripList(this.tripsList).then(response => {
            this.tripsList = response.data.data
            this.tripsListPage = response.data.meta
            this.tripsListPage.page = response.data.meta.current_page
            this.listLoading = false
          })
          this.listLoading = false
        },
        openDialog() {
          this.tripData = {}
          this.titleDialog = 'New Trip'
          this.listLoading = true
          this.dialogVisible = true
        },
        closeDialog() {
          this.listLoading = false
          this.dialogVisible = false
        },
        handleUpdate(index, row) {
          this.tripData = row
          this.titleDialog = 'Edit Trip'
          this.dialogVisible = true
        },
        deleteRow(index, tripData) {
          this.listLoading = true
          this.$confirm('This will permanently delete Trip ID: ' + tripData.id + ' are you sure to Continue?', 'Warning', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn-danger',
            type: 'warning'
          }).then(() => {
            deleteTrip(tripData.id).then(response => {
              this.$message.error('Trip ID: ' + tripData.id + ' deleted.')
              this.fetchUsersList()
            }).catch(() => {
              this.listLoading = false
            })
          }).catch(() => {
            this.listLoading = false
          })
        },
        handleCurrentChange(val) {
          this.tripsListPage.page = val
          this.fetchTrips()
        }
      },
      created() {
        this.fetchTrips()
      }
    }
</script>

<style scoped>

</style>
