<template>
  <el-row>
    <el-col :xs="24" :sm="17" class="panel p-15">
      <el-form v-model="form" label-width="140px">

        <el-form-item label="Date Range">
          <el-date-picker
            align="left"
            end-placeholder="End date"
            range-separator="To"
            start-placeholder="Start date"
            type="datetimerange"
            v-model="form.intervalTime"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
          />
        </el-form-item>

        <el-form-item id="monitoring-type" label="Monitoring Type">
          <TagsSelect v-model="form.monitoringType" placeholder="No filter"/>
        </el-form-item>

          <el-form-item id="origin-place" label="Origin">
            <PlacesRemoteSearch v-model="form.originPlaceId"/>
          </el-form-item>

          <el-form-item id="destination-place" label="Destination">
            <PlacesRemoteSearch v-model="form.destinationPlaceId"/>
          </el-form-item>

          <el-form-item id="carrier" label="Carrier">
            <CarrierRemoteSearch v-model="form.carrierId"></CarrierRemoteSearch>
          </el-form-item>

    </el-form>
      <div class="text-center">
        <el-button
          id="generate"
          type="success"
          :loading="loading"
          @click="getReport">Download</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { DatePicker, Button, Dropdown, Form, FormItem } from 'element-ui'
import TagsSelect from '../../components/Forms/TagsSelect'
import PlacesRemoteSearch from '../../components/Forms/PlacesRemoteSearch'
import CarrierRemoteSearch from '../../components/Forms/CarrierRemoteSearch'
import { fetchTripDetails, fetchTripList } from '../../api/trips'

export default {
  name: 'GeneralReportView',
  components: {
    CarrierRemoteSearch,
    PlacesRemoteSearch,
    TagsSelect
  },
  data() {
    return {
      form: {
        intervalTime: [
          new Date(2020, 9, 10, 8, 40),
          new Date(2021, 9, 10, 9, 40)], // start and date in the same field
        monitoringType: '',
        originPlaceId: '',
        destinationPlaceId: '',
        carrierId: ''
      },
      loading: false
    }
  },
  methods: {
    getReport() {
      this.loading = true
      fetchTripList(this.form).then(response => {
        console.log(this.form)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .el-select {
    width: 100%;
  }
</style>
