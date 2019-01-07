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
  data="operatorsList"
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
    :options="options"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
  </div>
<div style="margin-top: 10px"> Operator 2
    <el-cascader
    :options="options"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
  </div>
  <div style="margin-top: 10px"> Trailer 1
    <el-cascader
    :options="options"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
  </div>
  <div style="margin-top: 10px"> Trailer 2
    <el-cascader
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
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"/>
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
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"/>
        </div>
  </el-tab-pane>

</el-tabs>

      </template>
    </el-table-column>
    <el-table-column
      label="Fecha"
      prop="date">
    </el-table-column>
    <el-table-column
      label="Nombre"
      prop="name">
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


<div style="margin-top: 30px">

                    <div style="background-color: #fff">
                    <table class="table table-hover dataTable no-footer" id="table-editable" role="grid" aria-describedby="table-editable_info">
                    <thead>
                      <tr role="row">
                        <th class="sorting_asc" rowspan="1" colspan="1" aria-label="First Name" style="width: 254px;">Units</th>
                        <th class="sorting" tabindex="0" aria-controls="table-editable" rowspan="1" colspan="1" aria-label="Last Name: activate to sort column ascending" style="width: 331px;">Location</th>
                        <th class="text-right sorting" tabindex="0" aria-controls="table-editable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 266px;">Action</th>
                        </tr>
                    </thead>


                    <!--TABLA interior -->
                    <tbody>
                      <tr role="row" class="even">
                        <td class="sorting_1">Ramirez trucking</td>


                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Sanchez trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Viajes imposibles</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Fresh Fruit Co.</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Panzer trailers Co.</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Jager trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Sanchez trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                        </td>
                      </tr><tr role="row" class="even">
                        <td class="sorting_1">Sanchez trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                        <el-row>
                            <el-button type="info" disabled icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="success" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>

                        </td>
                      </tr>



                      </tbody>
                  </table>
              </div>
</div>



                  <div class="row"><div class="col-md-6"></div><div class="col-md-6"></div></div><div style="margin-top: 20px" >
                    <el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="100">
</el-pagination>
                    </div></div>
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
        timeout:  null
      };
    },
    methods: {
      loadAll() {
        return [
          { "value": "Sanchez Trucking", "link": "https://github.com/vuejs/vue" },
          { "value": "element Trucking", "link": "https://github.com/ElemeFE/element" },
          { "value": "Cosas imposibles", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "Tecnocosas", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "Jager Trucking", "link": "https://github.com/vuejs/vuex" },
          { "value": "Fresh Fruit co.", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel Trucking", "link": "https://github.com/babel/babel" }
         ];
      },
      fetchUnitsList() {
        this.listLoading = true
        getUnits(this.unitsListData).then(response => {
          this.unitsListData = response.data.data
          this.listLoading = false
        })

    },


      querySearchAsync(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.links = this.loadAll();
      this.fetchUnitsList ();
    }
  };
</script>
