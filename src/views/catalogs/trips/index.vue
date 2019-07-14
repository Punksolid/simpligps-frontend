<template>
  <div>
    <el-row class="panel p-10">

      <el-row class="searchBar">
        <el-col :span="4" class="m-b-5">
          <el-button type="primary" @click="openDialog" icon="fas fa-route p-r-10">New Trip</el-button>
        </el-col>
        <el-col :xl="20" :sm="20" :xs="24">
        <!-- Right Side for Search Options -->
        </el-col>
      </el-row>

      <CreateTrip v-if="dialogVisible" :form="tripData" :title="titleDialog" :dialogvisible="dialogVisible" @created="fetchTrips" @closedialog="closeDialog"/>
      <EditTrip v-if="showEditTrip" :form="tripData" :title="titleDialog" :dialogvisible="showEditTrip" @created="fetchTrips" @closedialog="closeDialog"/>
      <TripTags v-if="tagsDialog" :visible.sync="tagsDialog" :data="tripData" @close="closeDialog"/>'

      <el-row>
       <el-col>
         <el-table
           :data="tripsList"
           :highlight-current-row="true"
           :row-key="row => row.id"
           @expand-change="showMoreDetails"
           class="triplist"
           v-loading="listLoading">

           <el-table-column type="expand">
             <template slot-scope="scope">
               <el-tabs v-loading="scope.row.loading">
                 <el-tab-pane>
                   <span slot="label"><i class="fas fa-info-circle"></i> Details</span>
                    <!-- <TripDetails v-if="this.$route.params.tripid" :element="scope.row.id"/> -->
                     <TripDetails :element="scope.row.id"/>
                 </el-tab-pane>
                 <el-tab-pane>
                   <span slot="label"><i class="fas fa-clipboard-list"></i> Logs</span>
                   <TripLog :element="scope.row.id"/>
                 </el-tab-pane>
               </el-tabs>
             </template>
           </el-table-column>

           <el-table-column
             prop="id"
             label="ID"
             width="50px">
           </el-table-column>
           <el-table-column
             prop="rp"
             label="RP"
             min-width="80px"
           >
           </el-table-column>
           <el-table-column
             prop="invoice"
             label="Invoice"
             min-width="70px"
           >
           </el-table-column>
           <el-table-column
             prop="client_name"
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
             label="Destination"
             min-width="100px">
           </el-table-column>
           <el-table-column
             prop="stops"
             label="Stops">
           </el-table-column>
           <el-table-column
             prop="truck_name"
             label="Truck">
           </el-table-column>
           <el-table-column
             prop="scheduled_load"
             label="Scheduled Load"
             min-width="140px"
           >
           </el-table-column>
           <el-table-column
             prop="scheduled_departure"
             label="Scheduled Departure"
             min-width="160px">
           </el-table-column>
           <el-table-column
             prop="scheduled_arrival"
             label="Scheduled Arrival"
             min-width="140px">
           </el-table-column>

           <el-table-column
             prop="tag"
             label="TAG"
             width="100px">
             <template slot-scope="scope" v-if="scope.row.tag">
               <template v-if="scope.row.tag.length > 1">
                 <el-tooltip effect="light" placement="top">
                   <template slot="content">
                     <el-tag v-for="tag in scope.row.tag" :key="tag.index" type="success" size="small" style="margin-right: 2px;">
                       {{ tag }}
                     </el-tag>
                   </template>
                   <el-button size="mini" type="success" plain>TAGS</el-button>
                 </el-tooltip>
               </template>

               <template v-else>
                 <el-tag type="success">{{ scope.row.tag[0] }}</el-tag>
               </template>

             </template>
           </el-table-column>

           <el-table-column
             label="Operations"
             width="150px">
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 @click="handleTags(scope.row)"
                 icon="fas fa-hashtag">
               </el-button>
               <el-button
                 size="mini"
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
          @pagination="tripsList"></el-pagination>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import CreateTrip from './newtrip'
  import TripDetails from './details'
  import { tripList, deleteTrip, tripDetails } from '@/api/trips'
  import TripTags from './tags'
  import EditTrip from './EditTrip'
  import TripLog from './logs'

    export default {
      name: 'TripList',
      components: {
          TripLog,
          TripTags,
          CreateTrip,
          TripDetails,
          EditTrip
      },
      data() {
          return {
            dialogVisible: false,
            showEditTrip: false,
            tagsDialog: false,
            listLoading: false,
            detailsLoading: false,
            titleDialog: 'New Trip',
            tripData: {},
            tripsList: [],
            tripsListPage: {}
          }
      },
      methods: {
        fetchTrips() {
          this.closeDialog()
          this.listLoading = true
          tripList(this.tripsList).then(response => {
            this.tripsList = response.data.data
            this.tripsListPage = response.data.meta
            this.tripsListPage.page = response.data.meta.current_page
            this.listLoading = false
          }).catch(() => {
            this.listLoading = false
          })
        },
        showMoreDetails(row, expandedRows) {
            /** this.$router.push({ name: 'Trip Details', params: { tripid: row.id }}) **/
            row.loading = true
            tripDetails(row.id).then(response => {
                this.tripsList = this.tripsList.map(function(element) {
                    if (element.id === row.id) {
                        element = response.data.data
                        element.loading = false
                        return element
                    }
                    return element
                })
            }).finally(res => {
                row.loading = false
            })
        },
        openDialog() {
          this.tripData = {
            intermediates: [],
            trailers_ids: []
          }
          this.titleDialog = 'New Trip'
          this.listLoading = true
          this.dialogVisible = true
        },
        handleUpdate(index, row) {
          this.tripData = row
          this.titleDialog = 'Edit Trip'
          this.listLoading = true
          this.showEditTrip = true
        },
        closeDialog() {
          this.listLoading = false
          this.dialogVisible = false
          this.showEditTrip = false
          this.tagsDialog = false
        },
        handleDetails(row) {
          // this.$router.push({ name: 'Trip Details', params: { tripid: row.id }})
        },
        handleTags(row) {
          this.listLoading = true
          this.tripData = row
          this.tagsDialog = true
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
              this.fetchTrips()
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
        /* if (this.$route.name === 'Trips') {
          this.fetchTrips()
        } */
      }
    }
</script>

<style lang="scss" scoped>
  .triplist {
    width: 100%;

    .el-button + .el-button {
      margin-left: 3px;
    }

    .el-button--mini, .el-button--mini.is-round {
      padding: 7px 10px;
    }
  }
</style>
