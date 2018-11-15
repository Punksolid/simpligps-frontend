<template>

  <el-table
    :data="tableUnits"
    stripe="true"
    style="width: 100%">
    <el-table-column
      width="60"
      type="expand">
      <!--<Details></Details> if possible pass to a subcomponent-->
      <template slot-scope="props">
  <el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-date"></i> Details</span>
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
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-document"></i> Monitoring Log</span>
    <card></card>
    </el-tab-pane>
    <el-tab-pane>
    <span slot="label"><i class="el-icon-view"></i> New Monitoring</span>
    </el-tab-pane>
    <el-tab-pane>
    <span slot="label"><i class="el-icon-info"></i> Truck & operator</span>
    </el-tab-pane>
    <el-tab-pane>
    <span slot="label"><i class="el-icon-circle-plus"></i> Add Group Risk</span>
    </el-tab-pane>
</el-tabs>
</template>
    </el-table-column>
    <el-table-column
      prop="unit_name"
      label="Units"
      width="230"
      i class="el-icon-date">
    </el-table-column>
    <el-table-column
      prop="location"
      label="Location"
      width="230">
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
import Card from '@/components/Card/card.vue'

  export default {
    name: 'UnitsVue',
    components: {
      Card
    },
    data() {
      return {
        tableUnits: [
          {
            unit_name: 'Cosas imposibles A.C',
            location: 'Av. Progreso 1512 Culiacán, SIN, MX',
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
            unit_name: 'Tecnocosas',
            location: 'Av. Progreso 1512 Culiacán, SIN, MX',
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
            unit_name: 'Sanchez Trucking',
            location: 'Av. Progreso 1512 Culiacán, SIN, MX',
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
            unit_name: 'Cucurucho y asociados',
            location: 'Av. Progreso 1512 Culiacán, SIN, MX',
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


