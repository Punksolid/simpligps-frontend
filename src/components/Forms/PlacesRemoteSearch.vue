<template>
  <el-select

    v-model="selectedPlace"
    filterable
    remote
    :remote-method="getPlaces"
    :loading="loading"
    @change="syncPlaceEvent"
    placeholder="No filter">
    <el-option
      v-for="place in places"
      :key="place.value"
      :label="place.label"
      :value="place.value">
    </el-option>
  </el-select>
</template>
<script>
  import { Select } from 'element-ui'
  import { fetchPlaces } from '../../api/places'

  export default {
    name: 'PlacesRemoteSearch',
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
        selectedPlace: null,
        places: [],
        loading: false
      }
    },
    methods: {
      getPlaces(search = null) {
        this.loading = false
        fetchPlaces({ name: search }).then((response) => {
          this.places = response.data.data.map((place) => {
            return {
              label: place.name,
              value: place.id
            }
          })
        }).finally(() => {
          this.loading = false
        })
      },
      syncPlaceEvent() {
        this.$emit('input',
          this.selectedPlace
        )
      }
    },
    mounted() {
      this.getPlaces()
    }
  }
</script>
