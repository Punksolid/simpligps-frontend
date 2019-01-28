<template>
  <div>

       <el-button type="warning" @click="centerDialogVisible = true">Span Alert</el-button>
          <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
                    <el-col class="panel bg-red">
                          <i class="el-icon-warning"></i>
                          <el-col class="panel-header"><h1>MAX <b>ALERT</b></h1></el-col>
                          <el-col class="number"><h2><b>Route deviation</b></h2></el-col>
                          <el-col class="number"><h1>UNIT: FREIGHTLINER FL200 TECNOCOSAS 33</h1></el-col>

                        </el-col>

                    <span slot="footer" class="dialog-footer">
                      <el-button type="danger" @click="centerDialogVisible = false">Ignore</el-button>
                      <el-button type="primary" @click="centerDialogVisible = false">Attend</el-button>
                    </span>
            </el-dialog>

  </div>

</template>

<style scoped>
h1{
  text-align: center;
}
.dialog-footer {
  display: block;
  text-align: center;
}
i.el-icon-warning {
  display: block;
  margin: auto;
  width: 84px;
  padding: 10px;
  margin: auto;
  border-radius: 50%;
  text-align: center;
  font-size: 50px;

}
</style>

<script>
    export default {
        name: 'Alerts',
      data() {
        return {
          centerdialogVisible: false
        };
      },
      methods: {
        handleClose(done) {
          this.$confirm('Are you sure to close this alert?')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      }
    }
</script>
