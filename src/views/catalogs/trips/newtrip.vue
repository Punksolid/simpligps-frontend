<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisibility"
    width="60%"
    custom-class="newtrip"
    :before-close="handleClose">

    <el-form
      :loading="loadings.general"
      ref="form"
      :model="form"
      label-width="155px">
      <el-form-item label="Payment Requirement">
        <el-input id="rp" v-model="form.rp" placeholder="RP"></el-input>
      </el-form-item>
      <el-form-item label="Invoice">
        <el-input v-model="form.invoice" placeholder="Invoice"></el-input>
      </el-form-item>
      <el-form-item label="Client *">
        <el-select
          v-model="form.client_id"
          filterable
          remote
          :remote-method="getSearchClients"
          :loading="loadings.clients"
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
          :loading="loadings.operators"
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
        <TripCheckpoint v-model="form.origin"></TripCheckpoint>
      </el-form-item>

      <el-divider>Intermediates</el-divider>
      <template v-if="form.intermediates.length > 0">
        <div class="intermediates-fields" v-for="(intermediate, index) in form.intermediates" :key="intermediate.id">
          <el-form-item label="Intermediates" class="intermediates">
            <div class="dis-flex">
              <el-select
                :disabled="locks.intermediates.includes(intermediate.checkpoint_id)"
                v-model="intermediate.place_id"
                filterable
                remote
                :remote-method="getSearchIntermediates"
                @change="restorePlaces()"
                :loading="loadings.intermediates"
                placeholder="Intermediates">
                <el-option
                  v-for="(place, index) in places"
                  :key="`${index}-${place.id}`"
                  :label="place.name"
                  :value="place.id">
                </el-option>
              </el-select>

              <el-button
                :disabled="locks.intermediates.includes(intermediate.checkpoint_id)"
                type="danger"
                plain
                @click="removeIntermediateBlock(index)"
                class="el-icon-remove"
                size="mini"></el-button>
              <el-button
                type="success"
                plain
                v-if="index == Object.keys(form.intermediates).length - 1"
                @click="addIntermediateBlock()"
                class="el-icon-circle-plus"
                size="mini"></el-button>
            </div>
          </el-form-item>
        </div>
      </template>

      <div v-if="form.intermediates.length === 0" class="text-center">
          <el-button
            icon="el-icon-plus"
            type="primary"
            :plain="true"
            :circle="true"
            id="add-intermediate"
            @click="addIntermediateBlock"
          ></el-button>
        </div>
      <el-divider></el-divider>
      <el-form-item label="Destination *">
        <div class="inline-inputs dis-flex">
          <el-date-picker
            type="datetimerange"
          ></el-date-picker>
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
          :loading="loadings.carriers"
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
          :loading="loadings.trucks"
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
            v-for="trailerbox in trailers"
            :key="trailerbox.id"
            :label="trailerbox.plate"
            :value="trailerbox.id">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button
              id="submit"
              type="primary"
              :loading="loadings.general"
              @click="onSubmit">
        {{ this.editMode ? 'Update Trip' : 'Create Trip Planification'}}
      </el-button>
    </div>

  </el-dialog>

</template>

<script>
  import { createTrip, updateTrip } from '@/api/trips'
  import { clientsList, searchClients } from '@/api/clients'
  import { fetchGeofences, getPlaces, searchPlaces } from '../../../api/general'
  import { getOperators, searchOperators } from '@/api/operators'
  import { fetchCarriers, searchCarriers } from '../../../api/carriers'
  import { trucksList, searchTrucks } from '@/api/trucks'
  import { trailerboxList } from '@/api/trailerbox'
  // import { Datetime } from 'vue-datetime'
  import { Dialog, Button, Form, FormItem, Input, Select, Divider, Option, DatePicker } from 'element-ui'
  import { fetchTripDetails } from '../../../api/trips'
  import TripCheckpoint from '../../../components/Forms/TripCheckpoint'
  import PlacesRemoteSearch from '@/components/Forms/PlacesRemoteSearch'
  // import 'vue-datetime/dist/vue-datetime.css'

  export default {
    name: 'CreateTrip',
    props: {
      title: {
        type: String
      },
      trip: {
        default: null
      },
      dialogVisibility: {
        type: Boolean
      }
    },
    components: {
      TripCheckpoint,
      PlacesRemoteSearch,
      'el-dialog': Dialog,
      'el-button': Button,
      'el-form': Form,
      'el-form-item': FormItem,
      'el-input': Input,
      'el-select': Select,
      'el-divider': Divider,
      'el-option': Option,
      'el-date-picker': DatePicker
    },
    data() {
      return {
        resource: {
          carrier: {
            id: '',
            name: ''
          },
          truck: {
            id: '',
            name: ''
          },
          origin: {
            id: '',
            name: '',
            at_time: '',
            exiting: '',
            real_at_time: '',
            real_exiting: ''
          },
          destination: {
            id: '',
            name: '',
            at_time: '',
            exiting: '',
            real_at_time: '',
            real_exiting: ''
          },
          client: {
            id: '',
            company_name: ''
          },
          intermediates: [],
          trailers: []
        },
        mode: 'create',
        locks: {
          origin: false,
          intermediates: [],
          destination: false
        },
        editMode: false,
        loadings: {
          general: false,
          origin: false,
          clients: false,
          operators: false,
          intermediates: false,
          destination: false,
          carriers: false,
          trucks: false
        },
        places: [{}],
        destinations: [],
        clients: [],
        operators: [],
        geofences: [],
        trucks: [],
        carriers: [],
        trailers: [],
        form: {
          carrier_id: '',
          client_id: '',
          destination_id: '',
          georoute_ref: '',
          intermediates: [],
          invoice: '',
          mon_type: '',
          operator_id: '',
          origin_id: null,
          rp: '',
          scheduled_arrival: '',
          scheduled_departure: '',
          scheduled_load: '',
          scheduled_unload: '',
          trailers_ids: [],
          truck_id: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.loadings.general = true

        if (!this.editMode) {
          createTrip(this.form).then(response => {
            this.$message.success('Trip ID: ' + response.data.data.id + ' created.')
            this.$emit('created')
          }).finally(() => {
            this.loadings.general = false
          })
        } else {
          updateTrip(this.form.id, this.form).then(response => {
            this.$message.success('Trip ID: ' + response.data.data.id + ' updated.')
            this.$emit('created')
          }).finally(() => {
            this.loadings.general = false
          })
        }
      },
      handleClose() {
        this.$emit('close-dialog')
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
          this.trailers = response.data.data
        })
      },
      getSearchClients(search) {
        this.loadings.clients = true
        search = { company_name: search }
        searchClients(search).then(response => {
          this.clients = response.data.data
          this.loadings.clients = false
        })
      },
      getSearchOperators(search) {
        this.loadings.operators = true
        search = { name: search }
        searchOperators(search).then(response => {
          this.operators = response.data.data
          this.loadings.operators = false
        })
      },
      getSearchPlaces(search) {
        this.loadings.origin = true
        search = { name: search }
        searchPlaces(search).then(response => {
          this.places = response.data.data
          this.loadings.origin = false
        })
      },
      getSearchDestination(search) {
        this.loadings.destination = true
        search = { name: search }
        searchPlaces(search).then(response => {
          this.destinations = response.data.data
          this.places = response.data.data
          this.loadings.destination = false
        })
      },
      getSearchIntermediates(search) {
        this.loadings.intermediates = true
        search = { name: search }
        searchPlaces(search).then(response => {
          this.places = response.data.data
          this.loadings.intermediates = false
        })
      },
      getSearchCarriers(search) {
        this.loadings.carriers = true
        search = { carrier_name: search }
        searchCarriers(search).then(response => {
          this.carriers = response.data.data
          this.loadings.carriers = false
        })
      },
      getSearchTrucks(search) {
        this.loadings.trucks = true
        search = { name: search }
        searchTrucks(search).then(response => {
          this.trucks = response.data.data
          this.loadings.trucks = false
        })
      },
      addIntermediateBlock() {
        if (this.form.intermediates.length === 0) {
          this.form.intermediates = Object.assign([], this.form.intermediates, [{
            id: null,
            place_id: null,
            at_time: null,
            exiting: null
          }])
        } else {
          this.form.intermediates.push({
            id: null,
            place_id: null,
            at_time: null,
            exiting: null
          })
        }
      },
      removeIntermediateBlock(id) {
        this.form.intermediates.splice(id, 1)
      },
      isCreation() {
        if (this.trip === null) {
          return true
        }
        return false
      },
      lockCheckpoints: function() {
        try {
          if (this.resource.origin.real_at_time !== null) {
            this.locks.origin = true
          }
          if (this.resource.destination.real_at_time !== null) {
            this.locks.destination = true
          }

          this.resource.intermediates.forEach(place => {
            if (place.real_at_time !== null) {
              this.locks.intermediates.push(place.checkpoint_id)
            }
          })
        } catch (e) {
          this.locks.origin = false
        }
      },
      prepareFormData: function() {
        this.form.id = this.resource.id
        this.form.rp = this.resource.rp
        this.form.invoice = this.resource.invoice
        this.form.client_id = this.resource.client_id
        this.form.operator_id = this.resource.operator_id
        this.form.georoute_ref = this.resource.georoute_ref
        this.clients.push({
          id: this.resource.client_id,
          company_name: this.resource.client.company_name
        })
        this.form.origin_id = this.resource.origin.id
        this.places.push({
          id: this.resource.origin.id,
          name: this.resource.origin.name
        })
        this.places.push({
          id: this.resource.destination.id,
          name: this.resource.destination.name
        })
        this.form.scheduled_load = this.dateFormat(this.resource.origin.at_time)
        this.form.scheduled_departure = this.dateFormat(this.resource.origin.exiting)
        this.form.destination_id = this.resource.destination.id
        this.form.scheduled_arrival = this.dateFormat(this.resource.destination.at_time)
        this.form.scheduled_unload = this.dateFormat(this.resource.destination.exiting)

        // this.form.intermediates.push(this.resource.intermediates)

        this.form.intermediates = Object.assign(this.form.intermediates, this.resource.intermediates)

        this.form.intermediates = this.form.intermediates.map(item => {
          this.places.push({
            id: item.id,
            name: item.name
          })
          item.place_id = item.id
          item.at_time = this.dateFormat(item.at_time)
          item.exiting = this.dateFormat(item.at_time)
          return item
        })
        this.form.mon_type = this.resource.mon_type
        this.form.carrier_id = this.resource.carrier_id
        this.form.truck_id = this.resource.truck.id
        this.carriers.push({
          id: this.resource.carrier.id,
          carrier_name: this.resource.carrier.carrier_name
        })
        this.trucks.push({
          id: this.resource.truck_id,
          name: this.resource.truck.name
        })
        this.form.trailers_ids = this.resource.trailers.map((trailer) => {
          return trailer.id
        })
      },
      prepareEditMode: function() {
        if (this.isCreation()) {
          return
        }

        this.editMode = true
        if (typeof this.trip === 'number') {
          this.loadings.general = true

          fetchTripDetails(this.trip).then(response => {
            this.resource = response.data.data

            this.prepareFormData()
            this.lockCheckpoints()
          }).catch(() => this.$emit('close-form'))
            .finally(() => {
              this.loadings.general = false
            })
        } else {
          this.resource = this.trip
          this.prepareFormData()
          this.lockCheckpoints()
        }
      },
      dateFormat(time) {
        var newTime = time.slice(0, 10) + 'T' + time.slice(11, 19) + '.000Z'
        return newTime
      }
    },

    mounted() {
      this.prepareEditMode()

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
      -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
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

      .el-button + .el-button {
        margin: 0px 2px;
      }
    }
  }
</style>
