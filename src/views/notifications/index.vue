<template>
  <el-row class="panel p-10 p-t-0">

    <el-row type="flex" justify="space-between">
      <el-button type="primary" class="m-10 m-l-0" @click="dialogVisible = true" icon="fas fa-bell p-r-10">Create notification</el-button>
      <el-button type="danger" class="m-10" @click="centerDialogVisible = true" icon="fas fa-bell p-r-10">Span Alert</el-button>
    </el-row>

      <el-dialog
        title="Create Notification"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
          <CreateNotification @refreshlist="fetchWialonNotifications()" @closedialog="dialogVisible = false"></CreateNotification>
      </el-dialog>

    <el-col>
        <el-table
          v-loading="loading"
          :data="notifications_list"
          stripe
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
          <el-table-column
            label="Operations"
            width="150"
            fixed="right">
            <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="deleteNotification(scope.$index, scope.row)"
              icon="fas fa-trash">
              Delete
            </el-button>
            </template>
          </el-table-column>
        </el-table>

    </el-col>

       <el-dialog
         :visible.sync="centerDialogVisible"
         width="40%"
         center>
          <el-col class="panel bg-red">
            <i class="el-icon-warning"></i>
            <el-col class="panel-header"><h1>MAX <b>ALERT!</b></h1></el-col>
            <el-col class="number"><h2><b>Route deviation</b></h2></el-col>
            <el-col class="t-center"><h4>UNIT: FREIGHTLINER FL200 TECNOCOSAS 33</h4></el-col>
          </el-col>

          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="centerDialogVisible = false">Ignore</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">Attend</el-button>
          </div>

          <el-alert
          title="Success Alert"
          type="success"
          center
          show-icon>
          </el-alert>
        </el-dialog>

  </el-row>
</template>

<script>

  import AlertDialog from '../../components/Alert/index.vue'
  import CreateNotification from '@/views/notifications/create.vue'
  // import CreateNotification './create.vue'
  import { destroyNotification, getWialonNotifications } from '../../api/general'

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
        centerDialogVisible: false,
        loading: false
      }
    },
    methods: {
      fetchWialonNotifications() {
        this.loading = true
        getWialonNotifications().then(response => {
          this.notifications_list = response.data.data
          this.loading = false
        })
      },
      handleClose(done) {
        this.$confirm('Are you sure to close? Not saved data will be lost!')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      deleteNotification(index, row) {
        this.loading = true
        destroyNotification(row.id).then(response => {
          this.fetchWialonNotifications()
        }).catch(response => {
          console.log(response.data)
          this.loading = false
        })
        // this.deleteNotification()
      }

    },
    created() {
      this.fetchWialonNotifications()
    }
  }
</script>

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
