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

        <el-form-item id="monitoring-type" label="Tag">
          <TagsSelect v-model="form.tag" placeholder="No filter"/>
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
import {fetchTripDetails, fetchTripList, fetchTripsReport} from '../../api/trips'

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
          '',
          ''
        ], // start and date in the same field
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

      fetchTripsReport({
          start_date: (0 in this.form.intervalTime)? this.form.intervalTime[0] : null,
          end_date: (1 in this.form.intervalTime)? this.form.intervalTime[1] : null,
          origin_id: this.form.originPlaceId,
          destination_id: this.form.destinationPlaceId,
          carrier_id: this.form.carrierId,
          tag: this.form.tag
      }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.xls'); //or any other extension
          document.body.appendChild(link);
          link.click();
      }).catch((error) => {
          this.$message.error('There are no trips with the given criteria');
      })
          .finally(() => {
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
