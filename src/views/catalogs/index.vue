<template>
  <el-row class="panel p-10">
    <el-row>
      <el-col>
        <el-button type="primary" @click="dialogVisible = true" icon="fas fa-user-plus p-r-10">Create Operator</el-button>
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
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      fetchOperatorsPage() {
        this.listLoading = true
        getOperators(this.operatorsListPage).then(response => {
          this.operatorsListPage = response.data.meta
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
