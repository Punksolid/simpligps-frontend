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
        :data="unitsList"
        v-loading="listLoading"
        stripe
        :highlight-current-row=true
        height="610"
        :row-key="row => row.id"
        :expand-row-keys="expandRowKeys"
        @expand-change="handleExpandChange"
      >
        <el-table-column type="expand">

          <template slot-scope="props">
            <el-tabs>

              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> Map</span>

                <el-col>
                  <GmapMap
                    :center="deviceData.position"
                    :zoom="12"
                    map-type-id="roadmap"
                    style="width: 100%; height: 400px">
                    <GmapMarker
                      :position="deviceData.position"
                      :icon="require('@/assets/carmarker.svg')"
                      :title="'Unit: ' + deviceData.name"
                      :clickable="true"
                      :draggable="false"
                      @click="center=deviceData.position"
                    />
                  </GmapMap>
                </el-col>

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

  </el-row>
</template>

<script>
  import { getUnits } from '../../api/units.js'

  export default {
    data() {
      return {
        listLoading: false,
        expandRowKeys: [],
        search: '',
        unitsList: [{
          name: '',
          id: '',
          measure_units: 0,
          position: {
            lat: 0.0000000,
            lon: 0.000000
          }
        }],
        timeout: null,
        unitsListPage: {
          page: 0,
          per_page: 15,
          total: 30
        },
        deviceData: {
          position: {
            lat: 0,
            lng: 0
          }
        }
      }
    },
    methods: {
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
      handleExpandChange(row, expandedRows) {
        this.deviceDataUpdate(row)
        const id = row.id
        const lastId = this.expandRowKeys[0]
        // disable mutiple row expanded
        this.expandRowKeys = id === lastId ? [] : [id]
      },
      deviceDataUpdate(row) {
        this.deviceData.id = row.id
        this.deviceData.name = row.name
        this.deviceData.position = {
          lat: row.position.lat,
          lng: row.position.lon
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
      this.fetchUnitsList()

     setInterval(function() {
       this.fetchUnitsList()
       if (this.expandRowKeys >= 1) {
         var result = this.unitsList.find(item => item.id === this.expandRowKeys[0])
         this.deviceDataUpdate(result)
       }
      }.bind(this), 15 * 60 * 1000) // First number is equal to Minutes.
    }
  }
</script>
<style lang="scss" scoped>
</style>
