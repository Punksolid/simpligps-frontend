<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogvisible"
            width="60%"
            custom-class="newtrip"
            :before-close="handleClose">

        <el-form ref="form" :model="form" label-width="155px">
          <el-form-item label="Payment Requirement">
              <el-input id="rp" v-model="form.rp" placeholder="RP"/>
          </el-form-item>
          <el-form-item label="Invoice">
              <el-input id="invoice" v-model="form.invoice" placeholder="Invoice"/>
          </el-form-item>
          <el-form-item label="Client *">
            <el-select
              v-model="form.client_id"
              filterable
              remote
              :remote-method="getSearchClients"
              :loading="loadingClients"
              placeholder="Select Client">
              <el-option
                v-for="client in clients"
                :key="client.id"
                :label="client.company_name"
                :value="client.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Operator" prop="operator">
            <el-select
            v-model="form.operator_id"
            filterable
            remote
            :remote-method="getSearchOperators"
            :loading="loadingOperators"
            placeholder="Select Operator">
              <el-option
                v-for="operator in operators"
                :key="operator.id"
                :label="operator.name"
                :value="operator.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Georoute *">
                <el-select v-model="form.georoute_ref" placeholder="Select Georute">
                    <el-option
                            v-for="geofence in geofences"
                            :key="geofence.id"
                            :label="geofence.name"
                            :value="geofence.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Origin *">
              <div class="inline-inputs dis-flex">
                <el-select
                  id="origin"
                v-model="form.origin_id"
                filterable
                remote
                :remote-method="getSearchOrigin"
                :loading="loadingOrigin"
                placeholder="Select Origin"
                :disabled="lockOrigin"
                >
                  <el-option
                          v-for="place in origins"
                          :key="place.id"
                          :label="place.name"
                          :value="place.id">
                  </el-option>
                </el-select>
              <datetime
                type="datetime"
                placeholder="Scheduled Load"
                v-model="form.scheduled_load"
                :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                auto>
              </datetime>
              <datetime
                type="datetime"
                placeholder="Scheduled Departure"
                v-model="form.scheduled_departure"
                :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                auto>
              </datetime>
              </div>
            </el-form-item>

            <el-divider>Intermediates</el-divider>
              <div v-for="(intermediate, index) in intermediates" :key="intermediate.id" >
                <el-form-item label="Intermediates" class="intermediates">
                  <div class="dis-flex">
                    <el-select
                    v-model="intermediate.place_id"
                    filterable
                    remote
                    :remote-method="getSearchIntermediates"
                    @change="restorePlaces()"
                    :loading="loadingIntermediates"
                    placeholder="Intermediates">
                        <el-option
                                v-for="place in places"
                                :key="place.id"
                                :label="place.name"
                                :value="place.id">
                        </el-option>
                    </el-select>
                    <datetime
                      type="datetime"
                      placeholder="Check in"
                      v-model="intermediate.at_time"
                      :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                      auto/>
                    <datetime
                      type="datetime"
                      placeholder="Departure Time"
                      v-model="intermediate.exiting"
                      :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                      auto/>
                    <el-button type="danger" plain @click="removeIntermediateBlock(index)" class="el-icon-remove" size="mini"/>
                    <el-button type="success" plain v-if="index == Object.keys(intermediates).length - 1" @click="addIntermediateBlock()" class="el-icon-circle-plus" size="mini"/>
                  </div>
            </el-form-item>
            </div>

            <el-divider></el-divider>
            <el-form-item label="Destination *">
              <div class="inline-inputs dis-flex">
                <el-select
                v-model="form.destination_id"
                filterable
                remote
                :remote-method="getSearchDestination"
                :loading="loadingDestination"
                placeholder="Destination">
                    <el-option
                            v-for="place in destinations"
                            :key="place.id"
                            :label="place.name"
                            :value="place.id">
                    </el-option>
                </el-select>
                <datetime
                  type="datetime"
                  placeholder="Scheduled Arrival"
                  v-model="form.scheduled_arrival"
                  :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                  auto/>
                <datetime
                  type="datetime"
                  placeholder="Scheduled Unload"
                  v-model="form.scheduled_unload"
                  :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                  auto/>
              </div>
            </el-form-item>

            <el-form-item label="Mon Type *">
                <el-input v-model="form.mon_type" placeholder="Mon Type"/>
            </el-form-item>

            <el-form-item label="Carrier *">
                <el-select
                v-model="form.carrier_id"
                filterable
                remote
                :remote-method="getSearchCarriers"
                :loading="loadingCarriers"
                placeholder="Select Carrier">
                    <el-option
                            v-for="carrier in carriers"
                            :key="carrier.id"
                            :label="carrier.carrier_name"
                            :value="carrier.id">
                    </el-option>
                </el-select>

            </el-form-item>
          <el-form-item label="Truck">
            <el-select
            v-model="form.truck_tract_id"
            filterable
            remote
            :remote-method="getSearchTrucks"
            :loading="loadingTrucks"
            placeholder="Select Truck">
              <el-option
                v-for="truck in trucks"
                :key="truck.id"
                :label="truck.name"
                :value="truck.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Trailersbox">
            <el-select v-model="form.trailers_ids" multiple placeholder="Select Trailersbox">
              <el-option
                v-for="trailerbox in trailersbox"
                :key="trailerbox.id"
                :label="trailerbox.plate"
                :value="trailerbox.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer text-center">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button id="submit" type="primary" :loading="loading" @click="onSubmit">{{ buttonText }}</el-button>
        </div>

    </el-dialog>

</template>

<script>
    import { createTrip, updateTrip } from '@/api/trips'
    import { clientsList, searchClients } from '@/api/clients'
    import { fetchGeofences, getPlaces, searchPlaces } from '../../../../api/general'
    import { getOperators, searchOperators } from '@/api/operators'
    import { fetchCarriers, searchCarriers } from '../../../../api/carriers'
    import { trucksList, searchTrucks } from '@/api/trucks'
    import { trailerboxList } from '@/api/trailerbox'
    import { Datetime } from 'vue-datetime'
    // import 'vue-datetime/dist/vue-datetime.css' //los import de css al parecer no van aquí
    import { Dialog, Button, Form, FormItem, Input, Select, Divider } from 'element-ui'

    export default {
        name: 'TripForm',
        props: {
          mode: {
            default: 'create',
            type: String
          },
          tripData: {
            type: Object
          }
        },
        components: {
          'el-dialog': Dialog,
          'el-button': Button,
          'el-form': Form,
          'el-form-item': FormItem,
          'el-input': Input,
          'el-select': Select,
          'el-divider': Divider,
          datetime: Datetime
        },
        data() {
            return {
              form: {
                rp: ''
              },
              lockOrigin: false,
              lockIntermediates: [],
              lockDestination: false,
              editMode: false,
              loading: false,
              loadingClients: false,
              loadingOperators: false,
              loadingOrigin: false,
              loadingIntermediates: false,
              loadingDestination: false,
              loadingCarriers: false,
              loadingTrucks: false,
              places: [],
              origins: [],
              // intermediates: '',
              destinations: '',
              clients: [],
              operators: [],
              geofences: [],
              trucks: [],
              carriers: [],
              trailersbox: [],
              intermediates: [{
                id: null,
                place_id: null,
                at_time: null,
                exiting: null
                }]
            }
        },
        methods: {
          onSubmit() {
              this.loading = true
              this.$emit('loading')

              this.form.intermediates = this.intermediates
                if (this.mode === 'edit') {
                    createTrip(this.form).then(response => {
                        this.$message.success('Trip ID: ' + response.data.data.id + ' created.')
                        this.$emit('created')
                    }).finally(() => {
                        this.loading = false
                    })
                } else {
                    updateTrip(this.form.id, this.form).then(response => {
                        this.$message.success('Trip ID: ' + response.data.data.id + ' updated.')
                        this.$emit('created')
                    }).finally(() => {
                        this.loading = false
                    })
                }
            },
          handleClose() {

          },
          fetchClients(params) {
            clientsList({ 1: 'all' }).then(response => {
              this.clients = response.data.data
            })
          },
          fetchOperators(params) {
            getOperators(params).then(response => {
              this.operators = response.data.data
            })
          },
          fetchPlaces(params) {
              params = { paginate: 50 }
              getPlaces(params).then(response => {
                  this.places = response.data.data
                  this.places_copy = response.data.data
                  // this.origins = Object.assign(this.origins, this.places)
                  // this.intermediates = Object.assign(this.intermediates, this.places) // todo lugar viene de places
                  // this.destinations = Object.assign(this.destinations, this.places)
                  this.origins = this.places
                  this.destinations = this.places
              })
          },
          restorePlaces() {
              // Restore Places from Backup
              this.places = this.places_copy
              // Or fetch places again.
              // this.fetchPlaces({ 'all': 1 })
          },
          getTrucks(params) {
            trucksList(params).then(response => {
              this.trucks = response.data.data
            })
          },
          getTrailersbox(params) {
            trailerboxList(params).then(response => {
              this.trailersbox = response.data.data
            })
          },
          getSearchClients(search) {
            this.loadingClients = true
            search = { company_name: search }
            searchClients(search).then(response => {
              this.clients = response.data.data
              this.loadingClients = false
            })
          },
          getSearchOperators(search) {
            this.loadingOperators = true
            search = { name: search }
            searchOperators(search).then(response => {
              this.operators = response.data.data
              this.loadingOperators = false
            })
          },
          getSearchOrigin(search) {
            this.loadingOrigin = true
            search = { name: search }
            searchPlaces(search).then(response => {
              this.origins = response.data.data
              this.loadingOrigin = false
            })
          },
          getSearchDestination(search) {
            this.loadingDestination = true
            search = { name: search }
            searchPlaces(search).then(response => {
              this.destinations = response.data.data
              this.loadingDestination = false
            })
          },
          getSearchIntermediates(search) {
            this.loadingIntermediates = true
            search = { name: search }
            searchPlaces(search).then(response => {
              this.places = response.data.data
              this.loadingIntermediates = false
            })
          },
          getSearchCarriers(search) {
            this.loadingCarriers = true
            search = { carrier_name: search }
            searchCarriers(search).then(response => {
              this.carriers = response.data.data
              this.loadingCarriers = false
            })
          },
          getSearchTrucks(search) {
            this.loadingTrucks = true
            search = { name: search }
            searchTrucks(search).then(response => {
              this.trucks = response.data.data
              this.loadingTrucks = false
            })
          },
          addIntermediateBlock() {
            this.intermediates.push({
              place_id: null,
              at_time: null
            })
          },
          removeIntermediateBlock(id) {
            this.intermediates.splice(id, 1)
          },
          checkEditMode() {
              if (this.form.id) {
                  this.editMode = true
                  this.form.origin_id = this.form.origin.id
                  this.form.scheduled_load = this.dateFormat(this.form.origin.at_time)
                  this.form.scheduled_departure = this.dateFormat(this.form.origin.exiting)
                  this.form.destination_id = this.form.destination.id
                  this.form.scheduled_arrival = this.dateFormat(this.form.destination.at_time)
                  this.form.scheduled_unload = this.dateFormat(this.form.destination.exiting)
                  this.intermediates = this.form.intermediates
                  this.form.intermediates = this.form.intermediates.map(item => {
                      item.place_id = item.id
                      item.at_time = this.dateFormat(item.at_time)
                      item.exiting = this.dateFormat(item.at_time)
                      return item
                  })
              }
          },
          dateFormat(time) {
              var newTime = time.slice(0, 10) + 'T' + time.slice(11, 19) + '.000Z'
              return newTime
          },
          disableCheckpointsDefined() {
              console.log(this.form)
              if (this.form.origin !== null ){
                if (this.form.origin.real_at_time !== null) {
                  this.lockOrigin = true
                }
              }
          },
          populateForm() {

              this.form = this.tripData.data
          }
        },
        mounted() {
          this.fetchClients({ 'all': 1 })
          this.fetchOperators({ 'all': 1 })
          this.fetchPlaces({ 'all': 1 })
          this.getTrucks({ 'all': 1 })
          this.getTrailersbox({ 'all': 1 })
          fetchGeofences().then(response => {
              this.geofences = response.data.data
          })
          fetchCarriers({ 'all': 1 }).then(response => {
              this.carriers = response.data.data
          })
          this.checkEditMode()
          this.populateForm()
        },
        computed: {
          // buttonText() {
          //   if (this.mode === 'edit') {
          //     this.editMode = true
          //     return 'Update Trip'
          //   }
          //
          //   this.editMode = false
          //   return 'Create Trip Planification'
          // }
        }
    }
</script>

<style lang="scss">
  /*@import 'vue-datetime/dist/vue-datetime.css'; los imports van aquí pero no sé como comprobar si funciona*/
  .newtrip {
    .el-form-item {
      margin-bottom: 5px;
    }
    .inline-inputs.dis-flex {
      > div:nth-child(2) {
        margin: 0px 3px;
      }
      > div {
        width: auto;
      }
    }
    .el-select {
      width: 100%;
    }
    .vdatetime-input {
      -webkit-appearance: none;
      background-color: #FFF;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 36px;
      line-height: 36px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    .intermediates {
      .dis-flex > div {
        margin: 0 2px;
        flex: 1;
      }
      .el-button--mini {
        padding: 0px 9px;
        font-size: 1.1em;
      }
      .el-button+.el-button {
        margin: 0px 2px;
      }
    }
  }
</style>
