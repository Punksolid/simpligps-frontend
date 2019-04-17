<template>
    <el-dialog
            title="New Trip"
            :visible.sync="dialogvisible"
            width="40%"
            :before-close="handleClose()">

        <el-form ref="form" :model="form">
            <el-form-item label="Payment Requirement">
                <el-input v-model="form.rp" placeholder="RP"/>
            </el-form-item>
            <el-form-item label="Invoice">
                <el-input v-model="form.invoice" placeholder="Invoice"/>
            </el-form-item>
            <el-form-item label="Client">
                <el-input v-model="form.client" placeholder="Client"/>
            </el-form-item>
            <el-form-item label="Georoute">
                <el-select v-model="form.georoute_ref" placeholder="Select">
                    <el-option
                            v-for="geofence in geofences"
                            :key="geofence.id"
                            :label="geofence.name"
                            :value="geofence.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Origin">
                <el-select v-model="form.origin_id" placeholder="Origin">
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
                <el-select v-model="form.carrier_id" placeholder="Carrier">
                    <el-option
                            v-for="carrier in carriers"
                            :key="carrier.id"
                            :label="carrier.carrier_name"
                            :value="carrier.id">
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
            <el-button @click="handleClose()">Cancel</el-button>
            <el-button type="primary" @click="onSubmit">Create</el-button>
        </div>

    </el-dialog>
</template>

<script>
    import { createTrip, updateTrip } from '@/api/trips'
    import { fetchGeofences, getPlaces } from '../../../api/general'
    import { fetchCarriers } from '../../../api/carriers'

    export default {
        name: 'CreateTrip',
        props: [
            'dialogvisible'
        ],
        data() {
            return {
                form: {
                    rp: '',
                    invoice: '',
                    client: '',
                    georoute_ref: null,
                    origin_id: '',
                    intermediates: [],
                    destination_id: '',
                    mon_type: '',
                    carrier_id: '',
                    scheduled_load: '',
                    scheduled_departure: '',
                    scheduled_arrival: '',
                    scheduled_unload: ''
                },
                places: '',
                geofences: [],
                carriers: []
            }
        },
        methods: {
            onSubmit() {
                if (this.form.id) {
                    updateTrip(this.form.id, this.form).then(response => {
                        console.log(response)
                        /* this.$message({
                          message: 'User ' + response.data.data. + ' updated',
                          type: 'success',
                          duration: 10 * 1000
                        }) */
                        this.form = {}
                        this.$emit('created')
                    })
                } else {
                    createTrip(this.form).then(response => {
                        console.log(response)
                        /* this.$message({
                          message: 'Trip ' + response.data.data + ' created',
                          type: 'success',
                          duration: 10 * 1000
                        }) */
                        this.form = []
                        this.$emit('created')
                    })
                }
            },
            handleClose() {
                /* this.$emit('closeDialog') */
            },
            fetchPlaces(params) {
                getPlaces(params).then(response => {
                    this.places = response.data.data
                })
            }

        },
        mounted() {
            this.fetchPlaces({ 'all': 1 })
            fetchGeofences().then(response => {
                this.geofences = response.data.data
            })
            fetchCarriers({ 'all': 1 }).then(response => {
                this.carriers = response.data.data
            })
        }
    }
</script>

<style scoped>

</style>
