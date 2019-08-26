<template>
    <TripForm
      mode="edit"
      :tripData="trip"
      @loading="loading = !loading"
    />
</template>

<script>

  import TripForm from './Form'
  import { fetchTripDetails } from '../../../api/trips'

  export default {
    name: 'EditTrip',
    components: { TripForm },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        loading: false,
        trip: {
          'id': 1,
          'rp': 'este es el rp',
          'invoice': 'bbb',
          'client_id': 'uuu',
          'intermediates': [
            {
              'place_id': 444, // number of a place
              'at_time': 'a timestamp',
              'exiting': 'another timestamps'
            }, {
              'place_id': 444, // number of a place
              'at_time': 'a timestamp',
              'exiting': 'another timestamps'
            }
          ],
          'origin_id': 111, // a number of a place,
          'destination_id': 222, // number of a place
          'mon_type': 231, // ni idea de que es esto aun
          'carrier_id': 221, // relacion
          'truck_tract_id': 222,
          'operator_id': 987,
          'trailers_ids': [
            546546 // arrays de ids de trailers boxes
          ],
          'scheduled_load': 'timestamps',
          'scheduled_departure': 'timestamps',
          'scheduled_arrival': 'timestamps',
          'scheduled_unload': 'timestamps'
        }
      }
    },
    methods: {
      prepareForm() {
        this.loading = false
      }
    },
    mounted() {
      this.prepareForm()
    }
  }
</script>
