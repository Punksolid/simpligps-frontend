<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create Operator</el-button>

    <el-dialog
      title="Create Operator"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
            <CreateOperator></CreateOperator>
      </span>
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">Cancel</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>-->
      <!--</span>-->

    </el-dialog>
<div style="margin-top: 30px">

      <el-table
      :data="operatorsList"
      stripe
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
  </div>
  </div>
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
        tableData4: []
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
