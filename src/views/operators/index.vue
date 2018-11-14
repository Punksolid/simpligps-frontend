<template>
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
</template>

<script>
  export default {
    name: 'OperatorsList',
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
          }]
      }
    }
  }
</script>

<style scoped>

</style>
