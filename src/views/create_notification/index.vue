<template>
  <div style="background-color: #fff">

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

    <el-table
      :data="NotificationList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Notification"
        width="180">
      </el-table-column>
      <el-table-column
        prop="active"
        label="Active">
      </el-table-column>
    </el-table>

    </div>

  </div>
</template>


<script>
  import CreateNotification from './create.vue'

  export default {
    name: 'NotificationList',
    components: {
      CreateNotification
    },
    data() {
      return {
        NotificationList: [{
            "name": "Tecnocosas",
            "company": "Kerluke Group",
            "phone": "Max Alert",
            "email": "hessel.selina@murphy.org",
            "address": "457 Little Rue\nKadehaven, NH 67106",
            "created_at": "2 weeks ago"
        },
        {
            "name": "Sanchez Trucking",
            "company": "Dooley PLC",
            "phone": "Max Alert",
            "email": "alphonso06@yahoo.com",
            "address": "46393 Deckow Views Apt. 033\nKamillechester, WV 53976",
            "created_at": "2 weeks ago"
        },
        {
            "name": "Pelado Trucks",
            "company": "Sr. Pelo PLC",
            "phone": "Max Alert",
            "email": "giacomoxd@yahoo.com",
            "address": "46393 Deckow Views Apt. 033\nKamillechester, WV 53976",
            "created_at": "1 week ago"
        },
        {
            "name": "Big old fashioned enterprisse del Noroeste",
            "company": "Maggie's",
            "phone": "Max Alert",
            "email": "rooster@yahoo.com",
            "address": "Iron River Ranch 1-A\nGarrison, CO 53976",
            "created_at": "2 weeks ago"
        }],
        dialogVisible: false
      }
    },
    methods: {
    }
  }
  </script>

<style scoped>

</style>



