<template>
<div>

  <el-autocomplete
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="Search unit"
  @select="handleSelect"
></el-autocomplete>

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
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Sanchez trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Viajes imposibles</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Fresh Fruit Co.</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Panzer trailers Co.</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Jager trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
                        </td>
                      </tr>

                      <tr role="row" class="even">
                        <td class="sorting_1">Sanchez trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
                        </td>
                      </tr><tr role="row" class="even">
                        <td class="sorting_1">Sanchez trucking</td>
                        <td>Parque El Trebol 1512 Culiacán, SIN. MEX.</td>

                        <td class="text-right">

                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="edit btn btn-sm btn-default" href="javascript:;"><i class="icon-note"></i></a>
                          <a class="delete btn btn-sm btn-danger" href="javascript:;"><i class="icons-office-52"></i></a>
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
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" }
         ];
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
    }
  };
</script>


<el-table-column type="expand">
      <template slot-scope="props">
        <p>Estado: {{ props.row.state }}</p>
        <p>Ciudad: {{ props.row.city }}</p>
        <p>Dirección: {{ props.row.address }}</p>
        <p>Código postal: {{ props.row.zip }}</p>
      </template>
    </el-table-column>
