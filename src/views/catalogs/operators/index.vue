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
            <CreateOperator @usercreated="fetchOperatorsList" @closedialog="dialogVisible = false"></CreateOperator>
    </el-dialog>

    <el-col class="panel-body m-t-10">
      <el-table
        :data="operatorsList"
        border
        style="width: 100%">
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
    </el-col>

  </el-row>
</template>

<script>
  import CreateOperator from './create.vue'
  import { getOperators } from '../../../api/catalogs'

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
          console.log(response.data.data)
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      }
    },
    created() {
      this.fetchOperatorsList()
    }
  }

</script>

<style scoped>

</style>
