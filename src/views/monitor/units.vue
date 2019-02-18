<template>
  <el-row class="panel p-10">

    <el-row>
      <el-col>
        <el-autocomplete
          v-model="search"
          :fetch-suggestions="querySearchAsync"
          prefix-icon="fas fa-search"
          placeholder="Search unit"
          @select="handleSelect"/>
        </el-col>
    </el-row>

    <div class="m-t-20">
      <el-table
        stripe
        :highlight-current-row=true
        height="610"
        :data="unitsList">
        <el-table-column type="expand" @row-click="deviceLocation(props.$index)">

          <template slot-scope="props">
            <el-tabs type="border-card">

              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Map</span>

                <el-col>
                  <GmapMap
                    :center="{lat:24.791999, lng:-107.404263}"
                    :zoom="12"
                    map-type-id="roadmap"
                    style="width: 100%; height: 400px">
                    <GmapMarker
                      :position="{
                      lat: unitsList[props.$index].position.lat,
                      lng: unitsList[props.$index].position.lon,
                      }"
                      :icon="{ url: 'src/assets/carmarker.svg' }"
                      :title="'Unit: ' + unitsList[props.$index].name"
                      :clickable="true"
                      :draggable="false"
                      @click="center=deviceMarker.position"
                    />
                  </GmapMap>
                </el-col>

              </el-tab-pane>

              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Details</span>

                <el-col class="panel" :xs="24" :sm="12" :lg="12">
                  <div class="panel-header bg-primary"><h3>Operator</h3></div>
                  <div class="panel-body p-10 bg-gray-light">
                    <h3><b>José Ramón Ontiveros</b></h3>
                    <p>ID: 1476</p>
                    <p>Phone: 665-147-9136</p>
                  </div>
                </el-col>

                <el-col class="panel" :xs="24" :sm="12" :lg="12">
                  <div class="panel-header bg-primary"><h3>Truck</h3></div>
                  <div class="panel-body p-10 bg-gray-light">
                    <h3><b>Freightliner Columbia</b></h3>
                    <p>ID: 5346</p>
                    <p>GPS: 41°24’12.2″N - 2°10’26.5″E</p>
                  </div>
                </el-col>

                <el-col class="panel" :xs="24" :sm="12" :lg="12">
                  <div class="panel-header bg-orange"><h3>Trailer</h3></div>
                  <div class="panel-body p-10 bg-gray-light">
                    <h3><b>Utility #556</b></h3>
                    <p>ID: 1476</p>
                    <p>Plate: E67-KLM-3</p>
                    <p>GPS: 41°24’12.2″N 2°10’26.5″E</p>
                  </div>
                </el-col>

                <el-col class="panel" :xs="24" :sm="12" :lg="12">
                  <div class="panel-header bg-orange"><h3><b>Carrier</b></h3></div>
                  <div class="panel-body p-10 bg-gray-light">
                    <h3><b>Frutas interactivas S.A.</b></h3>
                    <p>ID: 1476</p>
                    <p>Phone: 665-147-9136</p>
                    <p>Contact: Pedro Páramo</p>
                  </div>
                </el-col> <!-- Detail Tab Finish -->

              </el-tab-pane>

              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> New Monitoring</span>

                <el-col :span="24">
                  <el-col class="p-10">
                    <span>Location: </span>
                    <el-input style="width: 30%" placeholder="Location" v-model="input"/>
                    <span>Observations: </span>
                    <el-input style="width: 30%" placeholder="Observations" v-model="input"></el-input>
                  </el-col>

                  <div style="padding: 10px">
                        <el-select v-model="value" placeholder="Status">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-select style="margin-left: 10px" v-model="value" placeholder="Situation">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      <div class="m-t-20">
                        <el-checkbox label="Send notification to Transport Carrier" border></el-checkbox>
                        <el-checkbox label="Send notification to Cooled traffic" border></el-checkbox>
                        <el-checkbox label="Send notification to Traffic Cattle/Leather/Autoservice" border></el-checkbox>
                      </div>
                  </div>

                  <div style="padding: 10px">

                    <el-button type="primary">Save</el-button>
                    <el-button type="danger">Cancel</el-button>

                  </div>

                </el-col>

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
                <span slot="label"><i class="el-icon-date"></i> Monitoring log</span>
                <div>
                  <template>
                    <el-table
                      :data="monitoringLog"
                      stripe
                      style="width: 100%">
                      <el-table-column
                        prop="log_id"
                        label="ID"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="trip"
                        label="Trip"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="date"
                        label="Date"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="monitor"
                        label="Monitor"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="location"
                        label="Location"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="observations"
                        label="Observations"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="Status"
                        width="180">
                      </el-table-column>
                    </el-table>
                  </template>

                </div>
              </el-tab-pane>

              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Truck and operator</span>
                <div class="card-panel-icon-wrapper icon-people">

                  <div class="card-panel-icon-wrapper icon-people">
                    <i class="el-icon-info"></i>
                  </div>
                  <div>
                    <h3>operator:</h3>
                    <h4>Juan Burgos</h4>
                    <h3>Id: #6664</h3>
                    <h3>Phone: 55-567-7654</h3>
                    <div>

                      <el-popover
                        placement="right"
                        width="400"
                        trigger="click">
                        <el-table :data="truckData">
                          <el-table-column width="100" property="id_number" label="Id"></el-table-column>
                          <el-table-column width="100" property="number" label="Truck #"></el-table-column>
                          <el-table-column width="150" property="brand" label="Brand"></el-table-column>
                          <el-table-column width="200" property="model" label="Model"></el-table-column>
                          <el-table-column width="200" property="gps" label="GPS"></el-table-column>

                        </el-table>
                        <el-button style="margin-right: 10px" type="success" slot="reference">Truck</el-button>
                      </el-popover>

                      <el-popover
                        placement="right"
                        width="400"
                        trigger="click">
                        <el-table :data="trailerData">
                          <el-table-column width="150" property="id_number" label="Id"></el-table-column>
                          <el-table-column width="100" property="number" label="Economic number"></el-table-column>
                          <el-table-column width="200" property="brand" label="Brand"></el-table-column>
                          <el-table-column width="200" property="plate" label="plate"></el-table-column>
                          <el-table-column width="200" property="gps" label="GPS"></el-table-column>

                        </el-table>
                        <el-button style="margin-right: 10px" type="success" slot="reference">Trailer</el-button>
                      </el-popover>

                      <el-popover
                        placement="right"
                        width="400"
                        trigger="click">
                        <el-table :data="carrierData">
                          <el-table-column width="150" property="id_number" label="Id"></el-table-column>
                          <el-table-column width="100" property="name" label="Name"></el-table-column>
                          <el-table-column width="200" property="contact" label="contact"></el-table-column>
                          <el-table-column width="200" property="phone" label="Phone"></el-table-column>

                        </el-table>
                        <el-button type="success" slot="reference">Carrier</el-button>
                      </el-popover>

                    </div>

                  </div>

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
                      <el-button type="success" @click="toggleSelection([tableData3[1], tableData3[2]])">Apply
                      </el-button>
                      <el-button type="danger" @click="toggleSelection()">Clean Selection</el-button>
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
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="measure_units"
          label="Measure Units"
          width="110">
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
          label="Actions"
          min-width="180">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" size="mini" circle></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" circle></el-button>
            <el-button type="success" icon="el-icon-star-off" size="mini" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-col class="m-t-5 t-center">
      <el-pagination
        class="dis-inline-b"
        layout="total, prev, pager, next, jumper"
        :current-page.sync="unitsListPage.current_page"
        :page-size="unitsListPage.per_page"
        :total="unitsListPage.total"
        @current-change="handleCurrentChange"
        @pagination="fetchUnitsList"/>
    </el-col>

    <!-- <el-col>
      <el-col class="t-center"><h3>Realtime Monitoring for: <b>PTS003</b></h3></el-col>
      <el-col>
        <GmapMap
          :center="{lat:24.791999, lng:-107.404263}"
          :zoom="12"
          map-type-id="roadmap"
          style="width: 100%; height: 400px">
          <GmapMarker
            v-if="marker.position"
            :position="marker.position"
            :clickable="true"
            :draggable="false"
            @click="center=m.position"
          />
        </GmapMap>
      </el-col>
    </el-col> -->

  </el-row>
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
        monitoringLog: [{
          log_id: '671345',
          trip: '193003',
          date: '2019-01-23',
          monitor: 'Alan',
          location: 'No. 1389, Grove St, Los Angeles, US',
          observations: 'Travel load via Layout',
          status: 'operator logged out'
        }, {
          log_id: '678765',
          trip: '1930523',
          date: '2019-01-24',
          monitor: 'Pedro',
          location: 'No. 1389, Grove St, Los Angeles, US',
          observations: 'Travel load via Layout',
          status: 'operator logged out'
        }, {
          log_id: '671771',
          trip: '193298',
          date: '2019-01-23',
          monitor: 'Pedro',
          location: 'No. 1389, Grove St, Los Angeles, US',
          observations: 'Travel load via Layout',
          status: 'operator logged out'
        }, {
          log_id: '671512',
          trip: '192982',
          date: '2019-01-21',
          monitor: 'Alan',
          location: 'No. 1389, Grove St, Los Angeles, US',
          observations: 'Travel load via Layout',
          status: 'operator logged out'

        }],
        input: '',
        value: {},
        truckData: [],
        trailerData: [],
        carrierData: [],
        search: '',
        timeout: null,
        unitsListPage: {
          page: 0,
          per_page: 15,
          total: 30
        },
        options: [],
        selectedOptions: [],
        deviceMarker: {
          position: {
            lat: 0,
            lng: 0
          }
        }
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
      handleCurrentChange(val) {
        this.unitsListPage.page = val
        this.fetchUnitsList()
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
      deviceLocation(index) {
        console.log(index)
        this.deviceMarker.position = {
          lat: this.unitsList[index].position.lat,
          lng: this.unitsList[index].position.lon
        }
      },
      handleSelectionChange() {
      },
      handleChange() {
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
