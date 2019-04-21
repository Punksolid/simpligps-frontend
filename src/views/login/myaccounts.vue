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

<script>/**
 * Todo este componente debe hacer su propia petición y seleccion de la cuenta, la logica debe ir aquí, no en el parent
 */
import * as Message from 'element-ui'
// import { VueRouter as router } from 'vue-router/types/router'

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
      console.log(account)
      // this.$store.commit('SET_TENANT', account)
      this.$store.dispatch('SelectAccount', account.uuid)
        .then(() => {
          this.$router.push({ path: '/'})
          // this.$router.push('/users')
          console.log('selected')
        }).catch(() => {
        this.loading = false
        Message.error('AccountError')
      })
      // this.$emit('account', account)
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
