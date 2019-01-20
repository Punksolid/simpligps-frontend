<template>
  <div>
    <el-autocomplete v-model="search" :fetch-suggestions="querySearchAsync" placeholder="Search unit" @select="handleSelect"></el-autocomplete>

    <div style="margin-top: 30px">
      <el-table
      :data="unitsList"
          style="width: 100%">
        <el-table-column type="expand">

          <template slot-scope="props">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Details</span>
                  <div class="card-panel-icon-wrapper icon-people">
                    <i class="el-icon-info"></i>
                  </div>
                  <div class="card-panel-description">
                      <h3>Truck: Freightliner FL 200</h3>
                      <el-button type="success" @click="dialogVisible = true">View details</el-button>
                  </div>
              </el-tab-pane>
              <el-tab-pane>
                          <span slot="label"><i class="el-icon-date"></i> Monitoring Route</span>
                <div>
                      <div class="block">
                        <div style="margin-top: 10px"> Operator 1
                          <el-cascader
style="padding: 10px"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                          </el-cascader>
                        </div>
                      <div style="margin-top: 10px"> Operator 2
                          <el-cascader
style="padding: 10px"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                          </el-cascader>
                        </div>
                        <div style="margin-top: 10px"> Trailer 1
                          <el-cascader
style="padding: 10px"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                          </el-cascader>
                        </div>
                        <div style="margin-top: 10px"> Trailer 2
                          <el-cascader
style="padding: 10px"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                          </el-cascader>
                        </div>

                  </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Truck and operator</span>
                <div class="card-panel-icon-wrapper icon-people">
                      <i class="el-icon-info"></i>
                    </div>
                    <div class="card-panel-description">
                      <h3>First time here?</h3>
                      <el-button type="success" @click="dialogVisible = true">Check more!</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Route</span>
                <div class="card-panel-icon-wrapper icon-people">
                      <i class="el-icon-info"></i>
                    </div>
                    <div class="card-panel-description">
                      <h3>First time here?</h3>
                      <el-button type="success" @click="dialogVisible = true">Check more!</el-button>
                    </div>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Add group risk</span>
                <div class="card-panel-icon-wrapper icon-people">

                    </div>
                    <div class="card-panel-description">
                      <template>
                          <el-table
                            ref="multipleTable"
                            :data="mockTable"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                              type="selection"
                              width="55">
                            </el-table-column>
                            <el-table-column
                              property="id_group"
                              label="ID group"
                              width="120">
                              <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                              property="hour"
                              label="Hour"
                              width="120">
                            </el-table-column>
                            <el-table-column
                              property="extern_monitor"
                              label="Extern Monitor"
                              show-overflow-tooltip>
                            </el-table-column>
                          </el-table>
                          <div style="margin-top: 20px">
                            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">Apply</el-button>
                            <el-button @click="toggleSelection()">Clean Selection</el-button>
                          </div>
                        </template>
                    </div>
              </el-tab-pane>

            </el-tabs>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="measure_units"
          label="Measure Units"
          width="180">
        </el-table-column>
        <el-table-column
          prop="position.lat"
          label="Latitude">
        </el-table-column>
        <el-table-column
          prop="position.lon"
          label="Longitude">
        </el-table-column>
        <el-table-column
      label="Action">
              <template slot-scope="scope">

          <el-button type="info" disabled icon="el-icon-edit" size="mini" circle></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" circle></el-button>
          <el-button type="success" icon="el-icon-star-off" size="mini" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" circle ></el-button>
          </template>
        </el-table-column>
    </el-table>

    </div>

    <!--Wraper -->

    <div id="table-editable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
      <div class="row">
        <div class="col-md-6 filter-left">
          <div id="table-editable_filter" class="dataTables_filter">

          </div>
        </div>
        <div class="col-md-6">
        </div>
      </div>
      <!--TABLAS -->

      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6"></div>
      </div>

  </div>

    <!--PAGER-->

  <div style="margin-top: 20px">
        <el-pagination
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </div>

</template>

<script>
  import { getUnits } from '../../api/units.js'

  export default {
    data() {
      return {
        mockTable: [{
          id_group: '2016-05-03',
          hour: 'Tom',
          extern_monitor: 'No. 189, Grove St, Los Angeles'
        },
        {
          id_group: '2016-05-03',
          hour: 'Tom',
          extern_monitor: 'No. 189, Grove St, Los Angeles'
        },
        {
          id_group: '2016-05-03',
          hour: 'Tom',
          extern_monitor: 'No. 189, Grove St, Los Angeles'
        }],
        unitsList: [{
          name: '',
          id: '',
          measure_units: 0,
          position: {
            lat: 0.0000000,
            lon: 0.000000
          }
        }],
        search: '',
        timeout: null
      }
    },
    methods: {
      loadAll() {
        return [
          { 'value': 'Sanchez Trucking', 'link': 'https://github.com/vuejs/vue' },
          { 'value': 'element Trucking', 'link': 'https://github.com/ElemeFE/element' },
          { 'value': 'Cosas imposibles', 'link': 'https://github.com/ElemeFE/cooking' },
          { 'value': 'Tecnocosas', 'link': 'https://github.com/ElemeFE/mint-ui' },
          { 'value': 'Jager Trucking', 'link': 'https://github.com/vuejs/vuex' },
          { 'value': 'Fresh Fruit co.', 'link': 'https://github.com/vuejs/vue-router' },
          { 'value': 'babel Trucking', 'link': 'https://github.com/babel/babel' }
         ]
      },
      fetchUnitsList() {
        this.listLoading = true
        getUnits(this.unitsListData).then(response => {
          this.unitsList = response.data.data
          this.listLoading = false
        })
      },

      querySearchAsync(queryString, cb) {
        var links = this.links
        var results = queryString ? links.filter(this.createFilter(queryString)) : links

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect(item) {
      }
    },
    mounted() {
      this.links = this.loadAll()
      this.fetchUnitsList()

      setInterval(function() {
        this.fetchUnitsList()
      }.bind(this), 30000) // milisegundos
    }
  }
</script>
