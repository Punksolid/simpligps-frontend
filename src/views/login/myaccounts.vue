<template>
  <el-dialog
    title="My Accounts"
    id="myaccounts"
    :visible.sync="dialogVisible"
    width="45%"
    center
    :show-close="false"
    :close-on-click-modal="false">

  <el-row class="m-0">
    <el-col>
      <p>Select account to Manage:</p>
    </el-col>
    <el-table
      :data="my_accounts"
      v-loading="loading"
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

  </el-dialog>
</template>

<script>
// import { VueRouter as router } from 'vue-router/types/router'
import { setTenantID } from '@/utils/auth'
import { getMyAccounts } from '@/api/me'

export default {
  name: 'MyAccounts',
  data() {
    return {
      dialogVisible: false,
      my_accounts: [],
      loading: true
    }
  },
  methods: {
    defaultAccount() {
      getMyAccounts().then(response => {
        this.loading = false
        this.my_accounts = response.data.data
        if (this.my_accounts.length <= 1) {
          this.setTenant(this.my_accounts[0])
        }
      }).catch(() => {})
    },
    setTenant(account) {
      this.$store.dispatch('SelectAccount', account.uuid).then(() => {
        this.$store.commit('SET_TENANT', account.uuid)
        setTenantID(account.uuid)
        this.$router.push('/')
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Account: ' + account.easyname + ' Selected.'
        })
        this.my_accounts = []
        this.dialogVisible = false
      }).catch(() => {
        this.loading = false
        this.$message.error('AccountError')
      })
    }
  },
  created() {
    event.$on('getaccounts', (data) => {
      this.dialogVisible = true
      this.defaultAccount()
    })
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
