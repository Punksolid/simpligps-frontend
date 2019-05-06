<template>
    <el-row class="panel p-10 details" v-loading="loading">
      <el-col class="bg-orange m-b-10">
        <h3 class="m-10 dis-inline-b"><b>Details of Trip:</b> {{ this.$route.params.tripid }}</h3>
      </el-col>

      <el-row>
        <!-- OPERATOR PANEL -->
        <el-col :span="10" class="panel p-5 dis-flex">
          <el-col :xs="2" :sm="3" class="dis-flex align-center"><i class="fas fa-hard-hat fa-3x"></i></el-col>
          <el-col :span="23">
            <h4 class=""><b>Operator:</b> {{ details.operator.name }}</h4>
            <h4><b>Operator phone:</b> {{ details.operator.phone }}</h4>
          </el-col>
        </el-col>
        <!-- CLIENT PANEL -->
        <el-col :span="12" class="panel p-5 dis-flex">
          <el-col :xs="2" :sm="3" class="dis-flex align-center"><i class="fas fa-user fa-2x"></i></el-col>
          <el-col :span="23">
            <h4 class=""><b>Client:</b> {{ details.client.company_name }}</h4>
            <h4><b>Client Description:</b> {{ details.client.description }}</h4>
          </el-col>
        </el-col>
        <el-col :span="2" class="panel p-5 bg-gray-light text-center">
            <i class="fas fa-list-alt fa-2x"></i>
            <h4>Logs</h4>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <!-- ORIGIN PANEL -->
        <el-col :span="8" class="panel p-5 dis-flex">
         <el-col :xs="2" :sm="3" class="dis-flex align-center"><i class="fas fa-map-marker-alt fa-2x"></i></el-col>
         <el-col :span="23">
           <h4 class=""><b>Origin name:</b> {{ details.origin.name }}</h4>
           <h4><b>Origin Address:</b> {{ details.origin.address }}</h4>
         </el-col>
        </el-col>
        <!-- INTERMEDIATES PANEL -->
        <el-col :span="8" class="panel p-5 bg-gray-light dis-flex">
          <el-col :xs="2" :sm="3" class="dis-flex align-center"><i class="fas fa-map-signs fa-2x"></i></el-col>
          <el-col :span="23">
            <h4 class=""><b>Intermediates name:</b> {{ details.origin.name }}</h4>
            <h4><b>Origin Address:</b> {{ details.origin.address }}</h4>
          </el-col>
        </el-col>
        <!-- DESTINATION PANEL -->
        <el-col :span="8" class="panel p-5 bg-blue dis-flex">
          <el-col :xs="2" :sm="3" class="dis-flex align-center"><i class="fas fa-flag fa-2x"></i></el-col>
          <el-col :span="23">
            <h4 class=""><b>Origin name:</b> {{ details.destination.name }}</h4>
            <h4><b>Origin Address:</b> {{ details.destination.address }}</h4>
          </el-col>
        </el-col>

      </el-row>

    </el-row>
</template>

<script>
  import { tripDetails } from '../../../api/trips'

    export default {
        name: 'TripDetails',
      data() {
          return {
            loading: false,
            TripID: null,
            details: {
              operator: {
                name: ''
              },
              client: {
                name: ''
              }
            }
          }
      },
      methods: {
        viewLogs() {
          this.$router.push({ name: 'Trip Log', params: { tripid: this.tripID }})
        }
      },
      created() {
        this.loading = true
        this.TripID = this.$route.params.tripid
        tripDetails(this.TripID).then(resp => {
          this.details = resp.data.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
</script>

<style lang="scss">
  .panel.details {
    h4 {
      font-weight: 300;
      margin: 5px 0px;
    }
    .align-center {
      vertical-align: center;
      justify-content: center;
      align-content: center;
      align-items: center;
    }
  }
</style>
