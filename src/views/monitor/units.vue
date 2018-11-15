<template>
<div>
<el-autocomplete
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="Please input"
  @select="handleSelect"
></el-autocomplete>
  </div>
</template>

<template>

  <el-table
    :data="tableUnits"
    stripe="true"
    style="width: 100%">
    <el-table-column
      width="40"
      type="expand">
      <!--<Details></Details> if possible pass to a subcomponent-->
      <template slot-scope="props">
        <el-table
          :data="props.row.details"
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
    </el-table-column>
    <el-table-column
      prop="unit_name"
      label="Units"
      width="220">
    </el-table-column>
    <el-table-column
      prop="location"
      label="Location"
      width="220">
    </el-table-column>
    <el-table-column
      prop="one"
      width="0">
      <template slot="header" slot-scope="slot">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>      </template>

    </el-table-column>
    <el-table-column
      prop="two"
      label="Two"
      width="70"
    >
    </el-table-column>
    <el-table-column
      prop="three"
      label="Three"
      width="70"
    >
    </el-table-column>
    <el-table-column
      prop="four"
      label="Four"
      width="70"
    >
    </el-table-column>
    <el-table-column
      prop="five"
      label="Five"
      width="70"
    >
    </el-table-column>
  </el-table>

</template>


<script>
  // import Details from './unit_details.vue'

  export default {
    name: 'UnitsVue',
    components: {
      // Details
    },
    data() {
      return {
        tableUnits: [
          {
            unit_name: 'Cosas imposibles A.C',
            location: 'Localizacion',
            one: 'ONE',
            two: 'ONE2',
            three: 'ONE3',
            four: 'ONE4',
            five: 'ONE5',
            details: [{
              id: '11111',
              trip: '1231',
              monitor: '1231',
              observation: '1231',
              location: '1231',
              status: '1231',
              situation: '102830'
            }]
          },
          {
            unit_name: 'Nombre2',
            location: 'Localizacion2',
            one: 'ONE',
            two: 'ONE2',
            three: 'ONE3',
            four: 'ONE4',
            five: 'ONE5',
            details: [{
              id: '2222',
              trip: '1231',
              monitor: '2222',
              observation: '1231',
              location: '22',
              status: '22',
              situation: '22222'
            }]
          },
           {
            unit_name: 'Nombre3',
            location: 'Localizacion',
            one: 'ONE',
            two: 'ONE2',
            three: 'ONE3',
            four: 'ONE4',
            five: 'ONE5',
            details: [{
              id: '11111',
              trip: '1231',
              monitor: '1231',
              observation: '1231',
              location: '1231',
              status: '1231',
              situation: '102830'
            }]
          },
           {
            unit_name: 'Nombre4',
            location: 'Localizacion',
            one: 'ONE',
            two: 'ONE2',
            three: 'ONE3',
            four: 'ONE4',
            five: 'ONE5',
            details: [{
              id: '11111',
              trip: '1231',
              monitor: '1231',
              observation: '1231',
              location: '1231',
              status: '1231',
              situation: '102830'
            }]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>


