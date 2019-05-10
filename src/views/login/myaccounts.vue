<template>
  <div>
  <el-dialog
    title="My Accounts"
    id="myaccounts"
    :visible.sync="dialogVisible"
    width="45%"
    center
    :close-on-press-escape="false"
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
    <!--<div slot="footer" class="t-center">
      <el-button size="small" @click="defaultAccount">Load again</el-button>
    </div>-->
  </el-dialog>

  <NoAccounts :visible="noaccountDialog" @close="closeNoAccounts"/>

  </div>
</template>

<script>
  import NoAccounts from './noaccounts'
  import { setTenantID } from '@/utils/auth'
  import { getMyAccounts } from '@/api/me'

  export default {
    name: 'MyAccounts',
    components: { NoAccounts },
    data() {
      return {
        dialogVisible: false,
        noaccountDialog: false,
        my_accounts: [],
        loading: false
      }
    },
    methods: {
      defaultAccount() {
        this.loading = true
        getMyAccounts().then(response => {
          this.loading = false
          this.my_accounts = response.data.data
          if (this.my_accounts.length > 1) {
            this.dialogVisible = true
          } else if (this.my_accounts.length === 1) {
            this.setTenant(this.my_accounts[0])
          } else {
            this.$store.dispatch('LogOut')
            this.noaccountDialog = true
          }
        }).catch(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload()
          })
        })
      },
      setTenant(account) {
        this.$emit('bodyloading')
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
          this.$message.error('Error Fetching Accounts')
        })
      },
      closeNoAccounts() {
        this.noaccountDialog = false
        this.$emit('bodyloading')
      }
    },
    created() {
      if (this.$route.name === 'My Accounts') {
        this.defaultAccount()
      }
      event.$on('getaccounts', (data) => {
        this.defaultAccount()
      })
    }
  }
</script>

<style lang="scss">
  #myaccounts {
    .el-dialog__body {
      padding-top: 5px;
      padding-bottom: 0px;
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
    .el-loading-mask {
      background-color: #e8e8e880 !important;
    }
  }
</style>
