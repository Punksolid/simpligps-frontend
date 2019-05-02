<template>
  <div class="sensortype">
    <el-form-item label="Sensor Type:" size="small">
      <el-select v-model="form.params.sensor_type" placeholder="Select Sensor Type">
        <el-option
          v-for="type in sensor_type"
          :key="type.id"
          :label="type.name"
          :value="type.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Sensor name:" size="small">
      <el-input v-model="form.params.sensor_name" placeholder="Sensor name"></el-input>
    </el-form-item>

    <el-form-item label="Similar Sensor:" size="small">
      <el-radio-group v-model="form.params.similar_sensor" class="nomargin">
        <el-radio label="0">Sum up values</el-radio>
        <el-radio label="1">Calculate separately</el-radio>
      </el-radio-group>
    </el-form-item>

    <div>
      <el-form-item label="Value from:" size="small">
          <el-col :span="10" class="p-r-5">
            <el-input type="number" v-model="form.params.value_from" placeholder="From"></el-input>
          </el-col>
          <el-col :span="14" class="dis-flex">
            <span class="p-r-5">To: </span>
            <el-input type="number" v-model="form.params.value_to" placeholder="To"></el-input>
          </el-col>
      </el-form-item>
    </div>

    <el-form-item label="Trigger when:" size="small">
      <el-radio-group v-model="form.params.trigger_when" class="nomargin">
        <el-radio label="0">In range</el-radio>
        <el-radio label="1">Out of range</el-radio>
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
            name: 'Any'
          }],
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
