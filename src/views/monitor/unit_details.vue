<template slot-scope="props">
  <el-table
    :data="details"
    style="width: auto"
  >
    <el-table-column
      prop="id"
      label="ID"
    ></el-table-column>
    <el-table-column
      prop="trip"
      label="Trip"
    ></el-table-column>
    <el-table-column
      prop="monitor"
      label="Monitor"
    ></el-table-column>
    <el-table-column
      prop="location"
      label="Location"
    ></el-table-column>
    <el-table-column
      prop="observations"
      label="Observations"
    ></el-table-column>
    <el-table-column
      prop="status"
      label="Status"
    ></el-table-column>
    <el-table-column
      prop="situation"
      label="Situation"
    ></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'Details',
    props: [
      'details'
    ],
    // props: [
    //   'id',
    //   'trip',
    //   'monitor',
    //   'location',
    //   'status',
    //   'observations',
    //   'situation'
    // ],
    data() {
      return {
        // details: [{
          // id: 'asdfad',
          // trip: 'asdfad',
          // monitor: 'asdfad',
          // location: 'asdfad',
          // status: 'status',
          // observations: 'asdfad',
          // situation: 'situacion'
        // }]
      }
    }
  }
</script>

<style scoped>

</style>
