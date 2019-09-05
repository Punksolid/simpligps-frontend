<template>
  <div>
    <el-row class="panel p-10">

      <el-row class="searchBar">
        <el-col :span="4" class="m-b-5">
          <el-button type="primary" @click="newTrip" icon="fas fa-route p-r-10">New Trip</el-button>
        </el-col>
        <el-col :span="20" style="text-align: right">
          <el-select
            v-model="filterTags"
            :loading="fetching"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Filter by Tags">
            <el-option
              v-for="tag in tagList"
              :key="tag.id"
              :label="tag.name.en"
              :value="tag.name.en">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <CreateTrip
        v-if="dialogVisible"
        :trip="tripId"
        :title="titleDialog"
        :dialog-visibility="dialogVisible"
        @created="fetchTrips"
        @close-dialog="closeDialog"></CreateTrip>
      <TripTags v-if="tagsDialog" :visible.sync="tagsDialog" :data="tripData" :tags="tagList" @close="fetchTrips"/>

      <el-dialog
        title="Closing Trip"
        :visible.sync="closingTripDialog"
        width="30%"
        :before-close="handleCloseTripDialog">
        <span>Please Set Time for Destination Arrival</span>

        <el-form :model="closeTripForm">
          <el-form-item label="Closing Trip" >
            <!-- <el-input v-model="closeTripForm.real_at_time" autocomplete="off"></el-input> -->
            <datetime
              type="datetime"
              placeholder="Destination Arrival"
              v-model="closeTripForm.real_at_time"
              :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
              auto>
            </datetime>
          </el-form-item>
          <el-form-item label="Destination Departure">
            <!-- <el-input v-model="closeTripForm.exiting" placeholder="Please select a zone"></el-input> -->
            <datetime
                type="datetime"
                placeholder="Destination Departure"
                v-model="closeTripForm.real_exiting"
                :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                auto>
            </datetime>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closingTripDialog = false">Cancel</el-button>
          <el-button type="primary" @click="setTimesAndCloseTrip">Close Trip</el-button>
        </span>

      </el-dialog>

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
              min-width="120px"
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
              min-width="160px"
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
              min-width="160px">
            </el-table-column>

            <el-table-column
              prop="tag"
              label="TAG"
              width="100px">
              <template slot-scope="scope" v-if="scope.row.tags">
                <template v-if="scope.row.tags.length > 1">
                  <el-tooltip effect="light" placement="top">
                    <template slot="content">
                      <el-tag
                    v-for="tag in scope.row.tags"
                    :key="tag.index"
                    type="success"
                    size="small"
                              style="margin-right: 2px;">
                        {{ tag.slug }}
                      </el-tag>
                    </template>
                    <el-button size="mini" type="success" plain>TAGS</el-button>
                  </el-tooltip>
                </template>

                <template v-else-if="scope.row.tags[0]">
                  <el-tag type="success">{{ scope.row.tags[0].slug }}</el-tag>
                </template>

              </template>
            </el-table-column>

            <el-table-column
              label="Operations"
              width="180px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  plain
                  @click="handleStart(scope.row.id)"
                  icon="fas fa-shipping-fast">
                </el-button>
                <el-button
                  size="mini"
                  @click="handleTags(scope.row)"
                  icon="fas fa-hashtag">
                </el-button>
                <el-button
                  size="mini"
                  icon="fas fa-edit"
                  @click="handleUpdate(scope.row)">
                </el-button>
                <el-button
                  size="mini"
                  icon="fas fa-times"
                  @click="handleCloseTrip(scope.row)">
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  icon="fas fa-sync-alt"
                  @click="handleAutoUpdates(scope.row.id)">
                </el-button>
                <!-- <el-button
                  size="mini"
                  type="danger"
                  disabled
                  icon="fas fa-trash"
                  @click.native.prevent="deleteRow(scope.$index, scope.row)">
                </el-button> -->
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
  import { tripList, deleteTrip, updateCheckpoint } from '@/api/trips'
  import TripTags from './tags'
  import { fetchCreatedTags } from '../../../api/general'
  // import EditTrip from './EditTrip'
  import TripLog from './logs'
  import { fetchTripDetails, startTrip, tripAutoUpdates } from '../../../api/trips'
  import { Datetime } from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'

  export default {
    name: 'TripList',
    components: {
      TripLog,
      TripTags,
      CreateTrip,
      TripDetails,
      datetime: Datetime
    },
    data() {
      return {
        updateTripId: null,
        dialogVisible: false,
        tagsDialog: false,
        listLoading: false,
        detailsLoading: false,
        titleDialog: 'New Trip',
        tripId: null,
        tripsList: [],
        tagList: [],
            filterTags: [],
            tripsListPage: {},
        closingTripDialog: false,
        checkpointToUpdateId: 0,
        closeTripForm: {
          real_at_time: '',
          real_exiting: ''
        }
      }
    },
    methods: {
      handleCloseTrip(trip) {
        console.table(this.isTripCompleted(trip.destination))
        this.checkpointToUpdateId = trip.destination.checkpoint_id
        this.open()
      },
      setTimesAndCloseTrip() {
        console.log('setTimesAndCloseTrip')
        updateCheckpoint(this.checkpointToUpdateId, this.closeTripForm).then(response => {
          console.log('Done')
          console.log(response)
        }).catch((err) => {
            console.log('an error ocurred')
            console.log(err)
        })
          this.closingTripDialog = false
      },
      open() {
        this.closingTripDialog = true
      },
      handleCloseTripDialog() {
        this.closingTripDialog = false
      },
      isTripCompleted(checkpoint) {
          if (!checkpoint.real_at_time) {
              return false
          }

        return true
      },
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
      getTags() {
            this.fetching = true
            fetchCreatedTags().then(resp => {
                this.tagList = resp.data.data
            }).catch(() => {})
                .finally(() => {
                    this.fetching = false
                })
          },handleStart(id) {
        this.listLoading = true
        const updates = { enable_automatic_updates: true }
        startTrip(id, updates).then(resp => {
          this.$message.success('Trip ID: ' + id + ' started successfully')
          // Disabled Response while Message is detailed.
          // this.$message.success(resp.data.message)
        }).catch(() => {
          this.$message.error('Trip ID: ' + id + " Trip couldn't be initialized")
        }).finally(() => {
          this.listLoading = false
        })
      },
      handleAutoUpdates(id) {
        this.listLoading = true
        tripAutoUpdates(id).then(resp => {
          this.$message.success(resp.data.message)
        }).catch(resp => {
          this.$message.error(resp.data.message)
        }).finally(() => {
          this.listLoading = false
        })
      },
      showMoreDetails(row, expandedRows) {
        // this.$router.push({ name: 'Trip Details', params: { tripid: row.id }})
        row.loading = true
        fetchTripDetails(row.id).then(response => {
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
      newTrip() {
        this.tripId = null
        this.titleDialog = 'New Trip'
        this.listLoading = true
        this.dialogVisible = true
      },
      handleUpdate(row) {
        this.tripData = row
        this.tripId = row.id
        this.titleDialog = 'Edit Trip'
        this.dialogVisible = true
      },
      closeDialog() {
        this.listLoading = false
        this.dialogVisible = false
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
      this.getTags()
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
