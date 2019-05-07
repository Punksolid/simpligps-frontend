<template>
    <div class="panel p-0 details" v-loading="loading">

      <div v-if="this.$route.meta.title === 'Trip Detail'">

        <el-row>
          <el-col class="bg-orange m-b-10">
            <h3 class="m-10"><b>Details of Trip:</b> {{ this.$route.params.tripid }}</h3>
          </el-col>
        </el-row>

        <div class="p-10">
          <el-row type="flex">
            <!-- OPERATOR PANEL -->
            <el-col :xs="12" :sm="6" class="panel p-5">
              <div class="panel-content">
                <el-col class="dis-flex align-center"><i class="fas fa-user-circle fa-5x"></i></el-col>
                <el-col>
                  <h4 class="bold m-b-0 text-center">Operator:</h4>
                    <h2 class="operator text-center">{{ details.operator.name }}</h2>
                  <h4><b>Operator ID:</b>
                    {{ details.operator.id }}
                  </h4>
                  <h4><b>Phone:</b>
                    {{ details.operator.phone }}
                  </h4>
                </el-col>
              </div>
            </el-col>
            <!-- TRAILER PANEL -->
            <el-col :xs="12" :sm="6" class="panel">
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
            <el-col :xs="12" :sm="6" class="panel">
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
            <el-col :xs="12" :sm="6" class="panel">
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

        <div class="panel-footer t-right">
          <router-link :to="{name: 'Trip Log', params: this.TripID}">
            <span class="fa-stack fa-2x logs">
              <i class="fas fa-circle fa-stack-2x"></i>
              <i class="fas fa-clipboard-list fa-inverse fa-stack-1x"></i>
            </span>
          </router-link>
        </div>
      </div> <!-- View if Details Finish -->

      <TripLog v-else/>

    </div>
</template>

<script>
  import { tripDetails } from '../../../api/trips'
  import Tripline from './Tripline'
  import TripLog from './logs'

  export default {
      name: 'TripDetails',
      components: { TripLog, Tripline },
      data() {
          return {
            loading: false,
            TripID: null,
            mode: '',
            details: null
          }
      },
      methods: {
        tripType() {
          if (this.$route.meta.title === 'Trip Log') {
            this.mode = 'log'
          } else {
            this.mode = 'details'
              this.loading = true
              tripDetails(this.TripID).then(resp => {
                this.details = resp.data.data
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            }
        }
      },
      created() {
        this.TripID = this.$route.params.tripid
        this.tripType()
      }
    }
</script>

<style lang="scss">
  .panel.details {
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
      margin: 5px 0px;
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
