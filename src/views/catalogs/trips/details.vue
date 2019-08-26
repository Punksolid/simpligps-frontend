<template>
    <div class="panel p-0 details" :v-loading="loading">

      <div>
        <!-- <div v-if="this.$route.meta.title === 'Trip Detail'"> -->
        <el-row>
          <el-col class="bg-orange m-b-10">
            <h3 class="m-10"><b>Details of Trip:</b> {{ this.element }}</h3>
          </el-col>
        </el-row>

        <div class="p-5">
          <el-row class="cards">
            <!-- OPERATOR PANEL -->
            <el-col :xs="24" :sm="5" class="panel p-5">
              <div class="panel-content">
                <el-col class="dis-flex align-center"><i class="fas fa-user-circle fa-5x"></i></el-col>
                <el-col>
                  <h4 class="bold m-b-0 text-center">Operator:</h4>
                    <h2 class="operator text-center">{{ details.operator.name || '' }}</h2>
                  <h4><b>Operator ID:</b>
                    {{ details.operator.id }}
                  </h4>
                  <h4><b>Phone:</b>
                    {{ details.operator.phone }}
                  </h4>
                </el-col>
              </div>
            </el-col>
            <!-- INFO -->
            <el-col :xs="12" :sm="4" class="panel">
              <h4 class="panel-header bg-light title"><b>INFO</b></h4>
              <el-col class="panel-content">
                <h4 class="title" v-if="details.origin"><b>{{ details.origin.name || '' }}</b></h4>
                <h4><b>RP:</b> {{ details.rp }}</h4>
                <h4><b>Trip ID:</b> {{ details.id }}</h4>
              </el-col>
            </el-col>
            <!-- TRAILER PANEL -->
            <el-col :xs="12" :sm="5" class="panel">
              <h4 class="panel-header bg-light title"><b>Trailer</b></h4>
              <el-col class="panel-content">
                <div v-if="details.trailers.length > 0">
                  <div v-for="trailer in details.trailers" v-bind:key="trailer.id">
                    <h4><b>ID:</b> {{ trailer.id }} </h4>
                    <h4><b>Plate:</b> {{ trailer.plate }} </h4>
                    <h4><b>GPS:</b> {{ trailer.gps }} </h4>
                  </div>
                </div>
                <div v-else>
                   No trailers assigned
                </div>
              </el-col>
            </el-col>
            <!-- TRUCK PANEL -->
            <el-col :xs="12" :sm="5" class="panel">
              <h4 class="panel-header bg-light title"><b>Truck</b></h4>
              <el-col class="panel-content">
                <h4><b>ID:</b> {{ details.truck.id }} </h4>
                <h4><b>Plate:</b> {{ details.truck.plate }} </h4>
                <h4><b>Brand:</b> {{ details.truck.brand }} </h4>
                <h4><b>Model:</b> {{ details.truck.model }} </h4>
                <h4><b>Color:</b> {{ details.truck.color }} </h4>
              </el-col>
            </el-col>
            <!-- CLIENT PANEL -->
            <el-col :xs="12" :sm="5" class="panel">
              <h4 class="panel-header bg-light title"><b>Client</b></h4>
              <el-col class="panel-content">
                <h4><b>Name:</b> {{ details.client.company_name }} </h4>
                <h4><b>Description:</b> {{ details.client.description }} </h4>
                <h4><b>ID:</b> {{ details.client.id }} </h4>
                <h4><b>Email:</b> {{ details.client.email }} </h4>
                <h4><b>Phone:</b> {{ details.client.phone }} </h4>
              </el-col>
            </el-col>
          </el-row>

          <Tripline :details="details"/>

        </div>

      </div>

    </div>
</template>

<script>
  import { fetchTripDetails } from '../../../api/trips'
  import Tripline from './Tripline'

  export default {
      name: 'TripDetails',
      components: { Tripline },
      props: {
        element: Number
      },
      data() {
          return {
            loading: false,
            TripID: null,
            details: {
                operator: { name: '' },
                origin: { name: '' },
                destination: {},
                trailers: [],
                truck: {},
                client: {},
                intermediates: []
            }
          }
      },
      methods: {
          fetchTripDetails() {
              this.loading = true
              fetchTripDetails(this.element).then(resp => {
                this.details = resp.data.data
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            }
        },
      created() {
        this.fetchTripDetails()
        // this.TripID = this.$route.params.tripid
        // this.tripType()
      }
    }
</script>

<style lang="scss" scoped>
  .panel.details {
    .cards {
      display: flex;
      flex-wrap: wrap;
    }
    .panel-content {
      padding: 10px;
    }
    h2.operator  {
      font-size: 1.5em;
      margin: 0px 0px 10px;
      font-weight: 400;
    }
    h4 {
      font-weight: 300;
      margin: 0px 0px 5px;
      &.title {
        font-size: 1.3em;
      }
      b {
        font-weight: 600;
      }
    }
    .align-center {
      vertical-align: center;
      justify-content: center;
      align-content: center;
      align-items: center;
    }
    .logs {
      margin-top: -30px;
    }
  }
</style>
