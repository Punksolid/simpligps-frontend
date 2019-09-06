<template>
  <el-select
    v-model="selectedCarrier"
    filterable
    remote
    :remote-method="getPlaces"
    :loading="loading"
    @change="syncPlaceEvent"
    placeholder="No filter">
    <el-option
      v-for="carrier in carriers"
      :key="carrier.value"
      :label="carrier.label"
      :value="carrier.value">
    </el-option>
  </el-select>
</template>
<script>
  import { Select } from 'element-ui'
  import { fetchCarriers } from '../../api/carriers'

  export default {
    name: 'CarrierRemoteSearch',
    props: {
      value: {
        type: String
      }
    },
    components: {
      'el-select': Select
    },
    data() {
      return {
        selectedCarrier: null,
        carriers: [],
        loading: false
      }
    },
    methods: {
      getPlaces(search = null) {
        this.loading = false
        fetchCarriers({ carrier_name: search }).then((response) => {
          this.carriers = response.data.data.map((carrier) => {
            return {
              label: carrier.carrier_name,
              value: carrier.id
            }
          })
        }).finally(() => {
          this.loading = false
        })
      },
      syncPlaceEvent() {
        this.$emit('input',
          this.selectedCarrier
        )
      }
    },
    mounted() {
      this.getPlaces()
    }
  }
</script>
