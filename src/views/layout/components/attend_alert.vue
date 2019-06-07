<template>
  <el-dialog
    title
    :visible.sync="dialogAlert"
    custom-class="attendalert"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
    width="75%"
    :before-close="handleClose"
  >
    <!-- Dialog's Title -->
    <el-row slot="title" class="dialog-title">
      <el-col :span="13" class="text-center">
        <h2>Attended Notification Confirmation</h2>
      </el-col>
      <el-col :span="11">
        <p>
          <i class="fas fa-user"/>
          <b>Account:</b> Acc_Name
        </p>
        <p>
          <i class="fas fa-truck"/>
          <b>Unit:</b>
          {{ alertinfo[0].unit }}
        </p>
      </el-col>
    </el-row>
    <!-- Dialog's Body -->
    <el-row :gutter="10">
      <!-- Body Left Side / Events-message -->
      <el-col :span="12">
        <el-table
          :data="getPreviousNotifications()"
          stripe
          max-height="250"
          style="width: 100%"
        >
          <el-table-column type="index" width="30"></el-table-column>
          <el-table-column prop="events" label="Events" header-align="center" min-width="180"></el-table-column>
          <el-table-column prop="date" label="Date" min-width="150"></el-table-column>
          <el-table-column label="Hour" min-width="120">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.hour }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-form :model="form" label-width="120px">
          <p class="m-b-5">
            <i class="fas fa-message-dots"/> messages:
          </p>
          <el-input type="textarea" :rows="4" placeholder="message" v-model="form.message"></el-input>
          <!-- message Box -->
          <el-col class="m-t-10 p-10 border-gray d-flex rounded">
            <span class="p-r-10">
              <b>Status:</b>
            </span>

            <el-radio-group v-model="form.solved">
              <el-radio label="1">Attended</el-radio>
              <el-radio label="0">Pending</el-radio>
            </el-radio-group>
          </el-col>
          <!-- Alert Status -->
        </el-form>
      </el-col>
      <!-- Body Right Side / Map -->
      <el-col :span="12">
        <GmapMap
          :center="position"
          :zoom="14"
          map-type-id="roadmap"
          style="width: 100%; height: 350px"
        >
          <GmapMarker
            :position="position"
            :icon="require('@/assets/carmarker.svg')"
            :title="'Unit: ' + alertinfo.unit"
            :clickable="true"
            :draggable="false"
          />
        </GmapMap>
      </el-col>
    </el-row>
    <span slot="footer" class="dis-block text-center">
      <el-button type="info" plain @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="resolveNotification()">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createNotificationResolution } from "@/api/general.js";
import AlertsVue from "./Alerts.vue";

export default {
  name: "AttendAlerts",
  props: ["alertinfo", "position", "notification_to_attend"],
  data() {
    return {
      dialogAlert: false,
      notification: "",
      form: {
        message: "",
        solved: "1",
        notifications_ids: []
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("Are you sure to close this alert?", "Confirm").then(_ => {
        done((this.dialogAlert = false));
      });
    },
    resolveNotification() {
      console.log("sending form");
      this.form.notifications_ids.push(this.notification.id);
      console.log(this.form);
      createNotificationResolution(this.form)
        .then(response => {
          // this.$alert('Waaa', 'title')
          event.$emit("notifications-refresh")
        })
        .finally(() => {
          this.form.message = ""
          this.form.solve = 1
          this.dialogAlert = false;
        });
    },
    activateAlert() {
      if (!this.dialogVisible) {
        this.dialogAlert = true;
      }
    },
    getPreviousNotifications() {
      return [{
        date: this.notification_to_attend.time_ago,
        events: this.notification_to_attend.NOTIFICATION
      }]
      // return [{ date: '2019-05-02', events: 'Panic button', hour: '16:53:27' }, { date: '2019-05-04', events: 'Speed', hour: '14:53:27' }]
    }
  },
  created() {
    event.$on("attend-alert", data => {
      console.log("revisa notification en attendaler");
      this.notification = data;
      this.alert = data;
      this.activateAlert();
    });
  }
};
</script>

<style lang="scss">
.attendalert {
  .el-dialog__header {
    color: #fff;
    background-color: #2a9cb6;
    padding: 5px;
    h2 {
      font-weight: 400;
    }
    p {
      margin: 8px 0px;
    }
  }
  .el-dialog__footer {
    background: #f3f3f3;
    padding-bottom: 10px;
  }
}
</style>
