<template>
<div>
  <el-button type="danger" plain @click="dialogVisible = true" icon="fas fa-exclamation-triangle"> Test Alert</el-button>

  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="30%"
    class="maxalerts"
    :before-close="handleClose">
    <i class="fas fa-exclamation-triangle"></i>
    <h1 class="title">MAX ALERT!</h1>
    <h3>Route Deviation</h3>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogVisible = false">Attended</el-button>
    </span>
  </el-dialog>

</div>
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
          this.$confirm('Are you sure to close this dialog?')
            .then(_ => {
              done()
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

<style scoped>
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
</style>
