<template>
<div>

  <el-dialog
    title="Warning"
    :visible.sync="centerDialogVisible"
    width="40%"
    center>
    <h3>Warning!</h3>
    <span>THIS IS AN ALERT</span>

    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="centerDialogVisible = false">Ignore</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">Attend</el-button>
    </span>
  </el-dialog>

</div>

</template>

<script>
  export default {
    name: 'AlertDialog',
    data() {
      return {
        centerDialogVisible: false
      }
    }
  }
</script>
