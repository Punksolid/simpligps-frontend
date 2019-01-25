<template>
  <div>

    <el-button type="primary" @click="dialogVisible = true">Create notification</el-button>
    <div style="margin-top: 30px">
      <el-dialog
        title="Create Notification"
        :visible.sync="dialogVisible"
        width="30%">
      <span>
            <CreateNotification></CreateNotification>
      </span>
        <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">Cancel</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>-->
        <!--</span>-->
      </el-dialog>
      <div style="margin-top: 30px">
        <el-table
          :data="notifications_list"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="control_type"
            label="Control Type"
            width="180">
          </el-table-column>
          <el-table-column
            prop="actions"
            label="Actions">
          </el-table-column>
        </el-table>
      </div>
    </div>

     <el-button type="warning" @click="centerDialogVisible = true">Span Alert</el-button>
    <el-dialog
  :visible.sync="centerDialogVisible"
  width="40%"
  center>
  <el-col class="panel bg-red">
        <el-col class="panel-header"><h3><i class="el-icon-warning"></i>MAX <b>ALERT</b></h3></el-col>
        <el-col class="number"><h1><b>Route deviation</b></h1></el-col>
        <el-col class="number"><h1>UNIT: FREIGHTLINER FL200 TECNOCOSAS 33</h1></el-col>

      </el-col>

  <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="centerDialogVisible = false">Ignore</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">Attend</el-button>
  </span>
      </el-dialog>

  </div>
</template>

<script>

  import AlertDialog from '../../components/Alert/index.vue'
  import CreateNotification from './create.vue'
  import { getWialonNotifications } from '../../api/general'

  export default {
    name: 'NotificationsList',
    components: {
      CreateNotification,
      AlertDialog
    },
    data() {
      return {
        notifications_list: [],
        dialogVisible: false,
        centerDialogVisible: false
      }
    },
    methods: {
      fetchWialonNotifications() {
        getWialonNotifications().then(response => {
          this.notifications_list = response.data.data
        })
      }
    },
    created() {
      this.fetchWialonNotifications()
    }
  }
</script>

