<template>
  <el-dialog
    :title="title"
    :visible="dialogvisible"
    width="30%"
    :before-close="handleClose">
        <el-form :model="form" label-width="100px">
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
        </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="sendForm">Update Trip</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchOperators, searchOperators } from '@/api/operators'
import { trucksList, searchTrucks } from '@/api/trucks'
import { trailerboxList } from '@/api/trailerbox'
// import { updateTrip } from '@/api/trips'

export default {
    name: 'EditTrip',
    props: [
      'title',
      'form',
      'dialogvisible'
    ],
    data() {
        return {
            loading: false,
            loadingOperators: false,
            loadingTrucks: false,
            loadingTrailerBoxes: false,
            operators: [],
            trucks: [],
            trailersbox: []
            /** form: {
                operator_id: null,
                truck_tract_id: null,
                trailers_ids: null
            } **/
        }
    },
    methods: {
      sendForm() {
        console.table(Object.values(this.form))
        // TEMP CLOSE AFTER SUBMIT
        this.$emit('created')
        /* updateTrip(this.form.id, this.form).then(response => {
          this.$message({
            message: 'Trip ID: ' + response.data.data.id + ' updated',
            type: 'success',
            duration: 10 * 1000
          })
          this.loading = false
          this.$emit('created')
        }).catch(() => {
          this.loading = false
        }) */
      },
      handleClose() {
        if (this.form.id) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              this.$emit('closedialog')
            }).catch(() => {
          })
        } else {
          this.$emit('closedialog')
        }
      },
      getOperators() {
          fetchOperators({ 'all': 1 }).then(response => {
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
    }
}
</script>
