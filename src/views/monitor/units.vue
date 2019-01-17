<template>
<div>
<el-autocomplete
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="Search unit"
  @select="handleSelect"
></el-autocomplete>

<div style="margin-top: 30px">

  <el-table
  data="operatorsList" style="width: 100%">

    <el-table-column data="NotificationList" type="expand">


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


</div>
    </div>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-date"></i> Truck and operator</span>
    <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-info"></i>
        </div>
        <div class="card-panel-description">
          <h1>this is another tab!</h1>
          <el-button type="success" @click="dialogVisible = true">Check stats!</el-button>
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

</el-tabs>

      </template>
    </el-table-column>
    <el-table-column
      label="Units"
      prop="units"
      >
    </el-table-column>
    <el-table-column
      label="Location"
      prop="location">
    </el-table-column>
    <el-table-column
      label="Action"
      prop="action"
      width="100">
    </el-table-column>
  </el-table>

</div>



                  <div class="row"><div class="col-md-6"></div><div class="col-md-6"></div></div><div style="margin-top: 20px" >
                    <el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="100">
</el-pagination>
                    </div>
                    </div>
</div>

</template>

<script>
import { getUnits } from '../../api/units.js'

  export default {
    data() {
      return {
        links: [],
        state4: '',
        timeout: null
      }
    },
    methods: {
      loadAll() {
        return [
          { 'value': 'Sanchez Trucking', 'link': 'http://localhost:9528/#/monitor' },
          { 'value': 'element Trucking', 'link': 'http://localhost:9528/#/monitor' },
          { 'value': 'Cosas imposibles', 'link': 'http://localhost:9528/#/monitor' },
          { 'value': 'Tecnocosas', 'link': 'http://localhost:9528/#/monitor' },
          { 'value': 'Jager Trucking', 'link': 'http://localhost:9528/#/monitor' },
          { 'value': 'Fresh Fruit co.', 'link': 'http://localhost:9528/#/monitor' },
          { 'value': 'babel Trucking', 'link': 'http://localhost:9528/#/monitor' }
         ]
      },
      fetchUnitsList() {
        this.listLoading = true
        getUnits(this.unitsListData).then(response => {
          this.unitsListData = response.data.data
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
        console.log(item)
      }
    },
    mounted() {
      this.links = this.loadAll()
      this.fetchUnitsList()
    }
  }
</script>
