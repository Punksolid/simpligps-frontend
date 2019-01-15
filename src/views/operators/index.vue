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
      border
      style="width: 80%">
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone"
        width="180">
      </el-table-column>
      <el-table-column
        prop="active"
        label="Active">
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
      fetchOperatorsList() {
        this.listLoading = true
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
