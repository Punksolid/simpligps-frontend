<template>
  <el-row class="panel p-10">
    <el-col class="bg-orange">
      <h3 class="m-10"><b>LOGS OF Trip ID:</b> {{ this.$route.params.tripid }}</h3>
    </el-col>

    <el-col>
      <el-table
        :data="logs"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="level"
          label="Level"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="data"
          label="Context"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Datetime">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col> <!--Remove this Column after Real Response.-->
      <p>Real response: {{ log }}</p>
    </el-col>
  </el-row>
</template>

<script>
  import { fetchTripLog } from '../../../api/trips'

  export default {
    name: 'TripLog',
    data() {
      return {
        TripID: null,
        logs: [],
        tableMock: [
          { date: '2016-05-02', id: '2', action: 'Destination modified' },
          { date: '2019-04-01', id: '1', action: 'Trip created' }
        ],
      }
    },
    created() {
      this.TripID = this.$route.params.tripid
      fetchTripLog(this.TripID).then(resp => {
        this.logs = resp.data.data.map(function(registry){
          registy.data = JSON.stringify(registry.data)
          return registry
        })
      }).catch(() => {})
    }
  }
</script>

<style scoped>

</style>
