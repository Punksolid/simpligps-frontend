<template>
  <el-row :gutter="10" v-loading="loading">
  <el-tabs v-model="activeTab">

    <el-tab-pane label="Truck" name="truck">
      <el-col class="panel">
        <div class="panel-header bg-primary"><h3><i class="fas fa-truck"/><strong>Truck name:</strong> {{data.name}} / ID: {{data.id}}</h3></div>
        <el-col class="panel-body p-10 bg-gray-light">
          <el-col :xs="24" :sm="12">
            <p><b>BRAND:</b> {{data.brand}}</p>
            <p><b>MODEL:</b> {{data.model}}</p>
            <p><b>COLOR:</b> {{data.color}}</p>
            <p><b>GPS:</b> {{data.gps}}</p>
          </el-col>
          <el-col :xs="12" :sm="12">
            <p><b>PLATE:</b> {{data.plate}}</p>
            <p><b>INT. NUMBER:</b> {{data.internal_number}}</p>
          </el-col>
        </el-col>
      </el-col>
    </el-tab-pane>

    <el-tab-pane label="Operator" name="operator">
      <el-col class="panel operators" v-if="! loading">
        <div class="panel-header bg-orange">
          <h3><i class="fas fa-hard-hat"/><strong>{{data.current_operator.name ? 'Operator detail:':'No Operator assigned.'}}</strong></h3>
        </div>
        <el-col class="panel-body p-10 bg-gray-light" v-if="data.current_operator.name ">
          <el-col>
            <p><b>NAME:</b> {{data.current_operator.name}} (ID: {{data.current_operator.id}})</p>
            <p><b>PHONE:</b> {{data.current_operator.phone}}</p>
            <p><b>STATUS:</b> <el-tag :type="data.current_operator.active ? 'success':'info'" size="small">{{ data.current_operator.active ? 'Active':'Inactive' }}</el-tag></p>
          </el-col>
        </el-col>
      </el-col>
    </el-tab-pane>

    <el-tab-pane label="Carriers" name="carrier">
      <el-col class="panel carrier" v-if="! loading">
        <div class="panel-header bg-red">
          <h3><i class="fas fa-shipping-fast"/><strong>Carrier:</strong> {{data.carrier.carrier_name}} / ID: {{data.carrier.id}}</h3>
        </div>
        <el-col class="panel-body p-10 bg-gray-light">
          <el-col>
            <p><b>CONTACT:</b> {{data.carrier.contact_name}}</p>
            <p><b>PHONE:</b> {{data.carrier.phone}}</p>
            <p><b>EMAIL:</b> {{data.carrier.email}}</p>
          </el-col>
        </el-col>
      </el-col>
    </el-tab-pane>

    <el-tab-pane label="Device" name="device">
      <el-col class="panel device" v-if="data.device">
        <div class="panel-header bg-blue">
          <h3><i class="fas fa-mobile-alt"/><strong>Device:</strong> {{data.device.name}} / ID: {{data.device.id}}</h3>
        </div>
        <el-col class="panel-body p-10 bg-gray-light">
          <el-col>
            <p><b>BRAND:</b> {{data.device.brand}}</p>
            <p><b>MODEL:</b> {{data.device.model}}</p>
            <p><b>GPS:</b> {{data.device.gps}}</p>
            <p><b>INT. NUMBER:</b> {{data.device.internal_number}}</p>
          </el-col>
        </el-col>
      </el-col>
    </el-tab-pane>
  </el-tabs>

  </el-row>
</template>

<script>
    export default {
      name: 'TruckDetails',
      props: {
        data: {
          type: Object,
          required: true
          },
        loading: {
          type: Boolean,
          required: true
        }
      },
      data() {
          return {
            activeTab: 'truck'
          }
      }
    }
</script>

<style lang="scss" scoped>
  .panel {
    box-shadow: none !important;
    &.operators {
      .operator-card {
        background: #f1f1f1;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        padding: 10px !important;
      }
    }
  }
  h3 {
    font-weight: 600;
    margin: 3px 0px 10px;
  }
  p {
    color: #828282;
    margin: 5px 0px;
    line-height: 1.3em;
  }
</style>
