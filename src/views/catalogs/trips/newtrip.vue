<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogvisible"
            width="40%"
            custom-class="newtrip"
            :before-close="handleClose">

        <el-form ref="form" :model="form" label-width="155px">
          <el-form-item label="Payment Requirement">
              <el-input v-model="form.rp" placeholder="RP"/>
          </el-form-item>
          <el-form-item label="Invoice">
              <el-input v-model="form.invoice" placeholder="Invoice"/>
          </el-form-item>
          <el-form-item label="Client">
            <el-select v-model="form.client_id" placeholder="Select Client">
              <el-option
                v-for="client in clients"
                :key="client.id"
                :label="client.company_name"
                :value="client.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Operator" prop="operator">
            <el-select v-model="form.operator_id" placeholder="Select Operator">
              <el-option
                v-for="operator in operators"
                :key="operator.id"
                :label="operator.name"
                :value="operator.id">
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="Georoute">
                <el-select v-model="form.georoute_ref" placeholder="Select Georute">
                    <el-option
                            v-for="geofence in geofences"
                            :key="geofence.id"
                            :label="geofence.name"
                            :value="geofence.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Origin">
                <el-select v-model="form.origin_id" placeholder="Select Origin">
                    <el-option
                            v-for="place in places"
                            :key="place.id"
                            :label="place.name"
                            :value="place.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Intermediates">
                <el-select v-model="form.intermediates" multiple placeholder="Intermediates">
                    <el-option
                            v-for="place in places"
                            :key="place.id"
                            :label="place.name"
                            :value="place.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Destination">
                <el-select v-model="form.destination_id" placeholder="Destination">
                    <el-option
                            v-for="place in places"
                            :key="place.id"
                            :label="place.name"
                            :value="place.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Mon Type">
                <el-input v-model="form.mon_type" placeholder="Mon Type"/>
            </el-form-item>

            <el-form-item label="Carrier">
                <el-select v-model="form.carrier_id" placeholder="Select Carrier">
                    <el-option
                            v-for="carrier in carriers"
                            :key="carrier.id"
                            :label="carrier.carrier_name"
                            :value="carrier.id">
                    </el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="Trucks">
            <el-select v-model="form.truck_tract_id" placeholder="Select Truck">
              <el-option
                v-for="truck in trucks"
                :key="truck.id"
                :label="truck.plate"
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

            <el-form-item label="Schedule Load">
                <el-date-picker
                        v-model="form.scheduled_load"
                        type="date"
                        format="dd-MM-yyyy"
                        value-format="yyyy-MM-dd"

                        placeholder="Select Load's date">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Departure Date">
                <el-date-picker
                        v-model="form.scheduled_departure"
                        type="date"
                        format="dd-MM-yyyy"
                        value-format="yyyy-MM-dd"

                        placeholder="Select Depature's date">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Scheduled Arrival">
                <el-date-picker
                        v-model="form.scheduled_arrival"
                        type="date"
                        format="dd-MM-yyyy"
                        value-format="yyyy-MM-dd"
                        placeholder="Select Arrival's Date">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Scheduled Unload">
                <el-date-picker
                        v-model="form.scheduled_unload"
                        type="date"
                        format="dd-MM-yyyy"
                        value-format="yyyy-MM-dd"
                        placeholder="Select Unload's date">
                </el-date-picker>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer text-center">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="onSubmit">{{form.id?'Update':'Create'}}</el-button>
        </div>

    </el-dialog>
</template>

<script>
    import { createTrip, updateTrip } from '@/api/trips'
    import { clientsList } from '@/api/clients'
    import { fetchGeofences, getPlaces } from '../../../api/general'
    import { getOperators } from '@/api/operators'
    import { fetchCarriers } from '../../../api/carriers'
    import { trucksList } from '@/api/trucks'
    import { trailerboxList } from '@/api/trailerbox'

    export default {
        name: 'CreateTrip',
        props: [
          'title',
          'form',
          'dialogvisible'
        ],
        data() {
            return {
              loading: false,
              places: '',
              clients: [],
              operators: [],
              geofences: [],
              trucks: [],
              carriers: [],
              trailersbox: []
            }
        },
        methods: {
            onSubmit() {
              this.loading = true
                if (this.form.id) {
                    updateTrip(this.form.id, this.form).then(response => {
                        this.$message({
                          message: 'Trip ID: ' + response.data.data.id + ' updated',
                          type: 'success',
                          duration: 10 * 1000
                        })
                      this.loading = false
                      this.$emit('created')
                    }).catch(() => {
                      this.loading = false
                    })
                } else {
                    createTrip(this.form).then(response => {
                        this.$message({
                          message: 'Trip ID: ' + response.data.data.id + ' created',
                          type: 'success',
                          duration: 10 * 1000
                        })
                      this.loading = false
                      this.$emit('created')
                    }).catch(() => {
                      this.loading = false
                    })
                }
            },
          handleClose() {
            if (this.form.rp || this.form.invoice) {
              this.$confirm('Are you sure to close? Not saved data will be lost!')
                .then(_ => {
                  this.$emit('closedialog')
                }).catch(() => {
              })
            } else {
              this.$emit('closedialog')
            }
          },
          fetchClients(params) {
            clientsList(params).then(response => {
              this.clients = response.data.data
            })
          },
          fetchOperators(params) {
            getOperators(params).then(response => {
              this.operators = response.data.data
            })
          },
          fetchPlaces(params) {
              getPlaces(params).then(response => {
                  this.places = response.data.data
              })
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
        }
    }
</script>

<style lang="scss" scoped>
  .newtrip {
    .el-form-item {
      margin-bottom: 5px;
    }
    .el-select {
      width: 100%;
    }
  }
</style>
