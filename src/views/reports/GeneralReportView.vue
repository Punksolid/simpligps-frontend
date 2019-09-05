<template>
  <div class="block" style="background-color: #fff">
    <div style="padding: 30px">
      <el-form v-model="form">
        <div class="block">
          <span class="demonstration">Date Range</span>
          <el-date-picker
            align="right"
            end-placeholder="End date"
            range-separator="To"
            start-placeholder="Start date"
            type="datetimerange"
            v-model="form.intervalTime"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
          >
          </el-date-picker>
        </div>

        <div style="margin-top: 30px">
          <el-form-item id="monitoring-type" label="Monitoring Type">

            <TagsSelect v-model="form.monitoringType" placeholder="No filter"/>
          </el-form-item>
        </div>

        <div style="margin-top: 30px">
          <el-form-item id="origin-place" label="Origin">
            <PlacesRemoteSearch v-model="form.originPlaceId"/>
          </el-form-item>
        </div>
        <div style="margin-top: 30px">
          <el-form-item id="destination-place" label="Destination">
            <PlacesRemoteSearch v-model="form.destinationPlaceId"/>
          </el-form-item>
        </div>

        <div style="margin-top: 30px">
          <el-form-item id="carrier" label="Carrier">
            <CarrierRemoteSearch v-model="form.carrierId"></CarrierRemoteSearch>
          </el-form-item>
        </div>
        <div style="margin-top: 30px">

          <el-button
            id="generate"
            type="success"
            v-loading="loading"
            @click="getReport()">Download</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
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
    TagsSelect,
    'el-date-picker': DatePicker,
    'el-button': Button,
    'el-form': Form,
    'el-form-item': FormItem
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
