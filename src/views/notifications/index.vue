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

  </div>
</template>

<script>
  import CreateNotification from './create.vue'
  import { getWialonNotifications } from '../../api/general'

  export default {
    name: 'NotificationsList',
    components: {
      CreateNotification
    },
    data() {
      return {
        notifications_list: [],
        dialogVisible: false
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

