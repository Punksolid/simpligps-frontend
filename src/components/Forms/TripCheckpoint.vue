<template>
    <el-form-item>
      <div class="inline-inputs dis-flex">
      <PlacesRemoteSearch v-model="form.place_id"/>
      <el-date-picker
        v-model="range"
        type="datetimerange"
        range-separator="To"
        @change="update"
        format="yyyy-MM-dd hh:mm"
        value-format="yyyy-MM-dd hh:mm"
        start-placeholder="Start date"
        end-placeholder="End date">
      </el-date-picker>
      </div>
    </el-form-item>
</template>

<script>
  import { DatePicker } from 'element-ui'
  import PlacesRemoteSearch from './PlacesRemoteSearch'

  export default {
    name: 'TripCheckpoint',
    props: {
      value: {
        type: Object
      }
    },
    components: {
      PlacesRemoteSearch,
      'el-date-picker': DatePicker
    },
    data() {
      return {
        loading: false,
        range: [],
        lock: false,
        form: {
          place_id: null,
          at_time: null,
          exiting: null,
          real_at_time: null,
          real_exiting: null
        }
      }
    },
    methods: {
      update(values) {
        console.log('values')
        this.form.at_time = values[0]
        this.form.exiting = values[1]
      }
    }
  }
</script>

<style lang="scss">
  .inline-inputs {
    span.el-range-separator {
      width: 7% !important;
    }
  }
</style>
