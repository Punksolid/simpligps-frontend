<template>
    <div>
        <el-form :model="form">
            <el-form-item label="Operator">
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
            <el-form-item label="Trucks">
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
                <el-select 
                v-model="form.trailers_ids" 
                multiple 
                :loading="loadingTrailerBoxes"
                placeholder="Select Trailersbox">
                <el-option
                    v-for="trailerbox in trailersbox"
                    :key="trailerbox.id"
                    :label="trailerbox.plate"
                    :value="trailerbox.id">
                </el-option>
                </el-select>
            </el-form-item>
            
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" :loading="formLoading" @click="sendForm">Update Trip</el-button>
            
        </el-form>
    </div>
</template>

<script>
import { fetchOperators, searchOperators } from '@/api/operators'
import { trucksList, searchTrucks } from '@/api/trucks'
import { trailerboxList } from '@/api/trailerbox'
import { updateTrip } from '@/api/trips'



export default {
    name: 'EditTrip',
    
    data() {
        return {
            formLoading:false,
            loadingOperators:false,
            loadingTrucks:false,
            loadingTrailerBoxes: false,
            operators:[],
            trucks:[],
            trailersbox:[],
            form:{
                operator_id:null,
                truck_tract_id:null,
                trailers_ids:null
            }
        }
    },
    methods: {
        sendForm(){

            console.table(this.form)
            // updateTrip()
        },
        getOperators(){
            fetchOperators({'all':1}).then(response => {
                this.operators = response.data.data
                this.loadingOperators = false     
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
        getTrucks(params) {
            trucksList(params).then(response => {
              this.trucks = response.data.data
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
        getTrailersbox(params) {
            trailerboxList(params).then(response => {
              this.trailersbox = response.data.data
            })
        }
    },
    mounted() {
        this.getOperators()
        this.getTrailersbox()
        this.getTrucks()
    },
}
</script>