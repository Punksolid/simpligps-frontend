<template>
  <el-row class="panel p-10">
    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="dialogVisible = true" icon="fas fa-user-plus p-r-10">Create Operator</el-button>
      </el-col>
      <el-col :xl="20" :sm="20" :xs="24">
        <el-form class="dis-flex" v-model="search">
          <el-form-item>
            <el-input placeholder="Name" v-model="search.name" @keyup.enter.native="handleFilter"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Carrier" v-model="search.carrier" @keyup.enter.native="handleFilter"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Phone" v-model="search.phone" @keyup.enter.native="handleFilter">
              <el-button slot="append" icon="fas fa-search" @click="handleFilter"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip :content="'Operator Status'" placement="top">
              <el-switch
                v-model="search.active"
                active-color="#13ce66"
                inactive-color="#909399"
                active-value="true"
                inactive-value="false">
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button icon="fas fa-trash-alt" plain @click="fetchOperatorsPage"></el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog
      title="Create Operator"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="40%">
      <CreateOperator @operatorcreated="fetchOperatorsList" @closedialog="dialogVisible = false"></CreateOperator>
    </el-dialog>

    <el-col>
      <el-table
      :data="operatorsList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        sortable>
      </el-table-column>
       <el-table-column
        prop="carrier"
        label="Carrier"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone"
        width="180">
      </el-table-column>
      <el-table-column
      prop="active"
      label="Status"
      fixed="right"
      width="120">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.active ? 'success' : 'info' "
          disable-transitions>
          {{ scope.row.active ? 'Active' : 'Inactive' }}
        </el-tag>
      </template>
      </el-table-column>

    </el-table>
  </el-col>

    <el-col class="m-t-5 t-center">
      <el-pagination
        class="dis-inline-b"
        :current-page.sync="operatorsListPage.current_page"
        :total="operatorsListPage.total"
        :page-size="operatorsListPage.per_page"
        @current-change="handleCurrentChange"
        @pagination="fetchOperatorsPage" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateOperator from './operators/create.vue'
  import { getOperators } from '../../api/catalogs'

  export default {
    name: 'OperatorsList',
    components: {
      CreateOperator
    },
    data() {
      return {
        listLoading: true,
        search: {
          name: '',
          carrier: '',
          phone: ''
        },
        operatorsList: [],
        operatorsListPage: {
          page: 0,
          from: 0,
          last_page: 0,
          per_page: 15,
          to: 0,
          total: 0
        },
        dialogVisible: false
      }
    },
    methods: {
      filterTag(value, row) {
        alert(value)
        return row.tag === value
      },
      handleFilter() {
        this.listLoading = true
        getOperators(this.search).then(response => {
          this.operatorsListPage = response.data.meta
          this.operatorsListPage.page = response.data.meta.current_page
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      },
      fetchOperatorsPage() {
        this.listLoading = true
        this.search = {}
        getOperators(this.operatorsListPage).then(response => {
          this.operatorsListPage = response.data.meta
          this.operatorsListPage.page = response.data.meta.current_page
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.operatorsListPage.page = val
        this.fetchOperatorsPage()
      },
      fetchOperatorsList() {
        this.listLoading = true
        getOperators(this.operatorsList).then(response => {
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      }
    },
    created() {
      this.fetchOperatorsList()
      this.fetchOperatorsPage()
      }
    }
</script>

<style scoped>

</style>
