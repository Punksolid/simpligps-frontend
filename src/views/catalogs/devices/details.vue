<template>
  <el-tabs v-loading="scope.loading">
    <el-tab-pane>
      <span slot="label"><i class="fas fa-plus-circle"></i> Details</span>
      <el-col class="panel" v-if="! scope.loading">
        <div class="panel-header bg-primary"><h3><i class="fas fa-search-plus"/><strong>Device:</strong> {{scope.name}} (ID: {{scope.id}})</h3></div>
        <el-col class="panel-body p-5 bg-gray-light">
          <el-col :span="12">
            <p><b>GPS:</b> {{scope.gps}}</p>
            <p><b>BRAND:</b> {{scope.brand}}</p>
          </el-col>
          <el-col :span="12">
            <p><b>MODEL:</b> {{scope.model}}</p>
            <p><b>INT. NUMBER:</b> {{scope.internal_number}}</p>
          </el-col>
        </el-col>
      </el-col>
    </el-tab-pane>

    <el-tab-pane>
      <span slot="label"><i class="fas fa-map-marker-alt"/> Map</span>
        <el-col class="panel" v-if="! scope.loading">
          <div class="panel-header bg-primary dis-flex">
            <h3><i class="fas fa-map-marker-alt"/>
              <span v-if="scope.position.lat"><strong>Position of Device:</strong> {{scope.name}} (ID: {{scope.id}})</span>
              <span v-else>Device Not Assigned</span>
            </h3>
          </div>
        <el-col class="panel-body bg-gray-light">
          <el-col v-if="scope.position.lat">
            <GmapMap
              :center="scope.position"
              :zoom="12"
              map-type-id="roadmap"
              style="width: 100%; height: 400px">
              <GmapMarker
                :position="scope.position"
                :icon="require('@/assets/carmarker.svg')"
                :title="`Truck: ${scope.name}`"
                :clickable="true"
                :draggable="false"
                @click="center=scope.position"
              />
            </GmapMap>
          </el-col>
        </el-col>
      </el-col>
    </el-tab-pane>

    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> Logs</span>
      <Logs :element="scope.id" />
    </el-tab-pane>
    <el-tab-pane v-if="scope.truck">
      <span slot="label"><i class="fas fa-truck"></i> Truck</span>
      <el-col class="panel" v-if="! scope.loading">
        <div class="panel-header bg-primary">
          <h3><i class="fas fa-truck"/>
            <span v-if="scope.truck"><strong>Truck plate:</strong> {{scope.truck.plate || ''}} (ID: {{scope.truck.id}})</span>
            <span v-else>No Truck Data</span>
          </h3>
        </div>
        <el-col class="panel-body p-10 bg-gray-light">
          <el-col :xs="24" :sm="12">
            <p><b>BRAND:</b> {{scope.truck.brand}}</p>
            <p><b>MODEL:</b> {{scope.truck.model}}</p>
            <p><b>COLOR:</b> {{scope.truck.color || ''}}</p>
            <p><b>GPS:</b> {{scope.truck.gps || ''}}</p>
          </el-col>
          <el-col :xs="12" :sm="12">
            <p><b>PLATE:</b> {{scope.truck.plate || ''}}</p>
            <p><b>INT. NUMBER:</b> {{scope.truck.internal_number}}</p>
          </el-col>
        </el-col>
      </el-col>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import Logs from '../../users/logs'
    export default {
        name: 'DeviceDetails',
        components: { Logs },
        props: {
            scope: Object
        }
    }
</script>

<style lang="scss" scoped>
  .panel {
  .panel-header {
    padding: 5px !important;
    h3 {
      margin: 5px !important;
      }
    }
    .panel-body p {
      margin: 5px;
    }
  }
</style>
