<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="openDialog()" icon="fas fa-route p-r-10">New Trip</el-button>
      </el-col>
      <el-col :xl="20" :sm="20" :xs="24">
      <!-- Right Side for Search Options -->
      </el-col>
    </el-row>

  <CreateTrip :form="tripData" @created="fetchTrips" :dialogvisible="dialogVisible" @closeDialog="dialogVisible = false"></CreateTrip>

  <el-row>
   <el-col>
     <el-table
       :data="tripsList"
       v-loading="listLoading"
       style="width: 100%">
       <el-table-column
         prop="id"
         label="ID"
         width="50">
       </el-table-column>
       <el-table-column
         prop="rp"
         label="RP">
       </el-table-column>
       <el-table-column
         prop="folio"
         label="Folio">
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
         prop="status"
         label="Status">
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
  import { tripList } from '@/api/trips'

    export default {
      name: 'TripList',
      components: {
        CreateTrip
      },
      data() {
          return {
            dialogVisible: false,
            listLoading: false,
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
          this.dialogVisible = true
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
