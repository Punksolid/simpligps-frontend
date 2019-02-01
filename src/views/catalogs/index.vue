<template>
  <el-row>
    <el-col>
      <el-button type="primary" @click="dialogVisible = true">Create Operator</el-button>
    </el-col>

    <el-dialog
      title="Create Operator"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
            <CreateOperator></CreateOperator>
      </span>

    </el-dialog>

    <el-col>
      <el-table
      :data="operatorsList"
      striped
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
       <el-table-column
        prop="carrier"
        label="Carrier"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone"
        width="180">
      </el-table-column>
      <el-table-column
      prop="active"
      label="Status"
      width="120"
      :filters="[{ text: 'Active', value: 'active' }, { text: 'Inactive', value: 'inactive' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === 'Active' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
      </el-table-column>
    </el-table>
  </el-col>

  </el-row>
</template>

<script>
  import CreateOperator from './create.vue'
  import { getOperators } from '../../api/catalogs'

  export default {
    name: 'OperatorsList',
    components: {
      CreateOperator
    },
    data() {
      return {
        operatorsList: [],
        dialogVisible: false
      }
    },
    params: {
      return: {
        getOperatorsList: []
      }
    },
    methods: {
      filterTag(value, row) {
        alert (value)
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      fetchOperatorsList() {
        this.listLoading = true
//        this.operatorsList = [{
//          id: 1,
//          carrier: 1,
//          tag: 'active'
//        }]
// codigo antes de TAG
        getOperators(this.operatorsListData).then(response => {
         console.log (response.data.data)
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      }
    },
    created() {
      this.fetchOperatorsList()
      },
    }
</script>

<style scoped>

</style>
