<template>
  <div class="sensortype">
    <el-form-item label="Sensor Type:" size="small">
      <el-select v-model="form.params.sensor_type" placeholder="Select Sensor Type">
        <el-option
          v-for="type in sensor_type"
          :key="type.id"
          :label="type.name"
          :value="type.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Sensor name:" size="small">
      <el-input v-model="form.params.sensor_name" placeholder="Sensor name"></el-input>
    </el-form-item>

    <el-form-item label="Similar Sensor:" size="small">
      <el-radio-group v-model="form.params.similar_sensor" class="nomargin">
        <el-radio :label=1>Sum up values</el-radio>
        <el-radio :label=0>Calculate separately</el-radio>
      </el-radio-group>
    </el-form-item>

    <div>
      <el-form-item label="Value from:" size="small">
          <el-col :span="10" class="p-r-5">
                <el-input-number v-model="form.params.value_from" placeholder="Value From"></el-input-number>
          </el-col>
          <el-col :span="14" class="dis-flex">
            <span class="p-r-5">To: </span>
                <el-input-number v-model="form.params.value_to" placeholder="Value To"></el-input-number>
          </el-col>
      </el-form-item>
    </div>

    <el-form-item label="Trigger when:" size="small">
      <el-radio-group v-model="form.params.trigger_when" class="nomargin">
        <el-radio :label=0>In range</el-radio>
        <el-radio :label=1>Out of range</el-radio>
      </el-radio-group>
    </el-form-item>

  </div>
</template>

<script>
    export default {
      name: 'SensorControlType',
      props: {
          form: {
            type: Object,
            required: true
          }
      },
      data() {
        return {
          sensor_type: [{
            name: 'Any',
            value: ""
          },
          {
            value:"mileage",
            name: "Mileage sensor"
          },
          {
            value:"odometer",
            name: "Relative odometer"
          },
          {
            value:"engine operation",
            name: "Engine ignition sensor"
          },
          {
            value:"alarm trigger",
            name: "Alarm trigger"
          },
          {
            value:"private mode",
            name: "Private mode"
          },
          {
            value:"real-time motion sensor",
            name: "Real-time motion sensor"
          },
          {
            value:"digital",
            name: "Custom digital sensor"
          },
          {
            value:"voltage",
            name: "Voltage sensor"
          },
          {
            value:"weight",
            name: "Weight sensor"
          },
          {
            value:"accelerometer",
            name: "Accelerometer"
          },
          {
            value:"temperature",
            name: "Temperature sensor"
          },
          {
            value:"temperature coefficient",
            name: "Temperature coefficient"
          },
          {
            value:"engine rpm",
            name: "Engine revs sensor"
          },
          {
            value:"engine efficiency",
            name: "Engine efficiency sensor"
          },
          {
            value:"engine hours",
            name: "Absolute engine hours"
          },
          {
            value:"relative engine hours",
            name: "Relative engine hours"
          },
          {
            value:"impulse fuel consumption",
            name: "Impulse fuel consumption sensor"
          },
          {
            value:"absolute fuel consumption",
            name: "Absolute fuel consumption sensor"
          },
          {
            value:"instant fuel consumption",
            name: "Instant fuel consumption sensor"
          },
          {
            value:"fuel level",
            name: "Fuel level sensor"
          },
          {
            value:"fuel level impulse sensor",
            name: "Fuel level impulse sensor"
          },
          {
            value:"counter",
            name: "Counter sensor"
          },
          {
            value:"custom",
            name: "Custom sensor"
          },
          {
            value:"driver",
            name: "Driver binding"
          },
          {
            value:"trailer",
            name: "Trailer binding"
          }   
          ],
          sensor_name: '*'
        }
      }
    }
</script>

<style scoped>
.sensortype {
  background: #f7f7f7;
  border-radius: 5px;
  padding: 10px 10px 10px 0px;
  margin-bottom: 10px;
}
  .sensortype .el-form-item {
    margin-bottom: 8px;
  }
  @media screen and (max-width: 480px) {
    .el-radio+.el-radio {
      margin: 5px 0px;
      margin-left: 0px;
    }
  }
</style>
