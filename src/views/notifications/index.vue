<template>
  <el-row class="panel p-10 p-t-0">

    <el-row type="flex" justify="space-between">
      <el-button type="primary" class="m-10 m-l-0" @click="dialogVisible = true" icon="fas fa-bell p-r-10">Create notification</el-button>
    </el-row>

      <el-dialog
        title="Create Notification"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
          <CreateNotification @creted="fetchWialonNotifications()" @closedialog="dialogVisible = false"></CreateNotification>
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

  </el-row>
</template>

<script>

  import CreateNotification from '@/views/notifications/create.vue'
  import { destroyNotification, getWialonNotifications } from '../../api/general'

  export default {
    name: 'NotificationsList',
    components: {
      CreateNotification
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
        this.dialogVisible = false
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
</style>
