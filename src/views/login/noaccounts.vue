<template>
  <el-dialog
    custom-class="noaccounts"
    :visible.sync="visible"
    center
    :before-close="handleClose"
    :fullscreen="true"
    width="40%"
    :close-on-press-escape="false"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div class="t-center">
      <i class="fas fa-user-slash fa-3x"/>
      <h2>You don't have any account associated</h2>
      <h5>Please try another user.</h5>
    </div>
    <div slot="footer" class="t-center">
      <el-button type="primary" plain @click="$emit('close')">Return to login</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
      name: 'NoAccounts',
      props: {
          visible: Boolean
      },
      methods: {
        handleClose() {
          this.$emit('close')
        }
      }
    }
</script>

<style lang="scss">
  .noaccounts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(6,78,137);
    background: -moz-linear-gradient(0deg, rgba(6,78,137,1) 0%, rgba(3,41,73,1) 100%);
    background: -webkit-linear-gradient(0deg, rgba(6,78,137,1) 0%, rgba(3,41,73,1) 100%);
    background: linear-gradient(0deg, rgba(6,78,137,1) 0%, rgba(3,41,73,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#064e89",endColorstr="#032949",GradientType=1);
    .el-dialog__title {
      display: none;
    }
    h2, i {
      color: #FFF;
      margin-bottom: 0px;
    }
    h5 {
      color: #2981c9;
    }
  }
</style>
