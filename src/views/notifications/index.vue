<template>
  <el-row class="panel p-10">

    <el-button type="primary" class="m-10" @click="dialogVisible = true">Create notification</el-button>
    <el-col>
      <el-dialog
        title="Create Notification"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div>
            <CreateNotification @refreshlist="fetchWialonNotifications()" @closedialog="dialogVisible = false"></CreateNotification>
      </div>
      </el-dialog>

      <div>
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
    </el-col>

     <el-button type="warning" @click="centerDialogVisible = true">Span Alert</el-button>
       <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="40%"
                    center>
                    <el-col class="panel bg-red">
                          <i class="el-icon-warning"></i>
                        <el-col class="panel-header"><h1>MAX <b>ALERT!</b></h1></el-col>
                          <el-col class="number"><h2><b>Route deviation</b></h2></el-col>
                          <el-col class="number"><h1>UNIT: FREIGHTLINER FL200 TECNOCOSAS 33</h1></el-col>

                        </el-col>

                    <span slot="footer" class="dialog-footer">
                      <el-button type="danger" @click="centerDialogVisible = false">Ignore</el-button>
                      <el-button type="primary" @click="centerDialogVisible = false">Attend</el-button>
                    </span>
                    <el-alert
    title="success alert"
    type="success"
    center
    show-icon> </el-alert>
            </el-dialog>

  </el-row>
</template>

<style scoped>
h1,h2 {
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
  padding: 20px;
  margin: auto;
  border-radius: 50%;
  text-align: center;
  font-size: 50px;

}
</style>

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
