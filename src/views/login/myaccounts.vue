<template>
  <el-row class="m-0">
    <el-col>
      <p>Select account to Manage:</p>
    </el-col>
    <el-table
      :data="accounts"
      stripe
      class="f-15"
      highlight-current-row
      @row-click="setTenant"
      :show-header="false"
      height="370px"
      align="center"
      style="width: 100%">
      <el-table-column width="80" align="center" cell-class-name="t-center">
        <div class="t-center f-32" slot-scope="scope">
          <i class="fas fa-user-circle"></i>
        </div>
      </el-table-column>
      <el-table-column prop="easyname">
      </el-table-column>
    </el-table>

  </el-row>
</template>

<script>

    export default {
      name: 'MyAccounts',
      props: {
          accounts: {
            type: Array,
            required: true
          }
      },
      methods: {
          setTenant(account) {
            this.$emit('account', account)
          }
      }
    }
</script>

<style lang="scss">
#myaccounts {
  .el-dialog__body {
    padding-top: 5px;
  }
  p {
    text-align: center;
    color: #444444;
    font-size: 15px;
  }
  .el-dialog__header {
    text-align: center;

    .el-dialog__title {
      border-left: none;
      padding-bottom: 10px;
      border-bottom: 1px solid gainsboro;
    }
  }
}
</style>
