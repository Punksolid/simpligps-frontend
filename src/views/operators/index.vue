<template>
  <div>
    <el-button @click="showCreateOperator">Create Operator</el-button>

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

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
  </div>
</template>

<script>
  import CreateOperator from './create.vue'

  export default {
    name: 'OperatorsList',
    components: {
      CreateOperator
    },
    data() {
      return {
        operatorsList: [{
          'name': 'Prof. Mohammed Romaguera',
          'phone': '+1-652-821-7766',
          'active': true
        },
          {
            'name': 'Idella Yost IV',
            'phone': '615-361-0625 x38969',
            'active': false
          },
          {
            'name': 'Maxwell Jones',
            'phone': '+13376475107',
            'active': false
          }],
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style scoped>

</style>
