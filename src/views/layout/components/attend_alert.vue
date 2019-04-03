<template>
  <el-dialog
    title=""
    :visible.sync="dialogAlert"
    custom-class="attendalert"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
    width="75%"
    :before-close="handleClose">
    <!-- Dialog's Title -->
    <el-row slot="title" class="dialog-title">
     <el-col :span="13" class="text-center"><h2>Attended Notification Confirmation</h2></el-col>
      <el-col :span="11">
        <p><i class="fas fa-user"/> <b>Account:</b> Acc_Name</p>
        <p><i class="fas fa-truck"/> <b>Unit:</b> {{ alertinfo[0].unit }}</p>
      </el-col>
    </el-row>
    <!-- Dialog's Body -->
    <el-row :gutter="10">
      <!-- Body Left Side / Events-Comment -->
      <el-col :span="12">
        <el-table
          :data="[{ date: '2019-05-02', events: 'Panic button', hour: '16:53:27' }, { date: '2019-05-04', events: 'Speed', hour: '14:53:27' }]"
          stripe
          max-height="250"
          style="width: 100%">
          <el-table-column
            type="index"
            width="30">
          </el-table-column>
          <el-table-column
            prop="events"
            label="Events"
            header-align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            min-width="150">
          </el-table-column>
          <el-table-column
            label="Hour"
          min-width="120">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.hour }}</span>
            </template>
          </el-table-column>
        </el-table>
        <p class="m-b-5"><i class="fas fa-comment-dots"/> Comments:</p>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Comment"
          v-model="comments">
        </el-input> <!-- Comment Box -->
        <el-col class="m-t-10 p-10 border-gray d-flex rounded">
          <span class="p-r-10"><b>Status:</b></span>
          <el-radio-group v-model="alertStatus">
            <el-radio label="attended">Attended</el-radio>
            <el-radio label="pending">Pending</el-radio>
          </el-radio-group>
        </el-col> <!-- Alert Status -->
      </el-col>
      <!-- Body Right Side / Map -->
      <el-col :span="12">
        <GmapMap
          :center="position"
          :zoom="14"
          map-type-id="roadmap"
          style="width: 100%; height: 350px">
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
      <el-button type="primary" @click="handleClose">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
      name: 'AttendAlerts',
      props: [
        'alertinfo',
        'position'
      ],
      data() {
          return {
            comments: '',
            alertStatus: 'attended',
            dialogAlert: false
          }
      },
      methods: {
        handleClose(done) {
          this.$confirm('Are you sure to close this alert?', 'Confirm')
            .then(_ => {
              done(this.dialogAlert = false)
            })
            .catch(_ => {
            })
        },
        activateAlert() {
          if (!this.dialogVisible) {
            this.dialogAlert = true
          }
        }
      },
      created() {
          event.$on('attend-alert', (data) => {
            this.alert = data
            this.activateAlert()
          })
      }
    }
</script>

<style lang="scss">
  .attendalert {
    .el-dialog__header {
      color: #FFF;
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
