<template>
<el-row>
  <el-col class="m-l-20">
    <el-button type="danger" size="small" plain @click="dialogVisible = true" icon="fas fa-exclamation-triangle"> Test Alert</el-button>
  </el-col>

  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="30%"
    class="maxalerts"
    append-to-body
    :show-close="false"
    :before-close="handleClose">
    <h1 slot="title" class="title"></h1>
    <el-row>
    <i class="fas fa-exclamation-triangle"></i>
    <h1 class="title">MAX ALERT!</h1>
    <el-col class="t-center"><h2 class="m-0 text-danger">Route Deviation</h2></el-col>
      <el-col class="t-center"><h3 class="m-0">This is an example of alert list</h3></el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button disabled @click="handleClose">Cancel</el-button>
    <el-button type="warning" @click="handleClose">Attended</el-button>
    </span>
  </el-dialog>

</el-row>
</template>

<script>
    export default {
        name: 'Alerts',
      data() {
        return {
          dialogVisible: false
        }
      },
      methods: {
        handleClose(done) {
          this.$confirm('Are you sure to close this alert?')
            .then(_ => {
              done(this.dialogVisible = false)
            })
            .catch(_ => {})
        },
        activateAlert() {
          if (!this.dialogVisible) {
            this.dialogVisible = true
          }
        }
      },
      created() {
        event.$on('activate-alert', () => this.activateAlert())
      }
    }
</script>

<style lang="scss">
  .maxalerts {
    .title {
      border: none !important;
    }
    .el-dialog__header {
      display: none;
    }
    h1.title {
      font-weight: 400;
      text-align: center;
    }
    .dialog-footer {
      display: block;
      text-align: center;
    }
    i.fa-exclamation-triangle {
      display: block;
      margin: auto;
      width: 84px;
      padding: 10px 0px 15px;
      margin: auto;
      border-radius: 50%;
      text-align: center;
      font-size: 50px;
      background: #D91443;
      color: #FFF;
      border: 4px solid #b3132e;
    }
  }
</style>
