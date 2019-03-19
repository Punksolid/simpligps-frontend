<template>
<el-row>
 <!-- <el-col class="m-l-20">
    <el-button type="danger" size="small" plain @click="dialogVisible = true" icon="fas fa-exclamation-triangle"> Test Alert</el-button>
  </el-col>-->

  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="30%"
    class="maxalerts"
    append-to-body
    :show-close="false"
    :before-close="handleClose">
    <h1 slot="title" class="title"></h1>
    <el-row>
    <i class="fas fa-exclamation-triangle"></i>
    <h1 class="title">{{ wialon.NOTIFICATION }}</h1>
    <el-col class="t-center"><h2 class="m-0 text-danger">{{ wialon.title |  capitalize }}</h2></el-col>
      <el-col class="t-center"><h3 class="m-0">{{ wialon.location }}</h3></el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button disabled @click="handleClose">Cancel</el-button>
    <el-button type="warning" @click="handleClose">Attended</el-button>
    </span>
  </el-dialog>

</el-row>
</template>

<script>
    export default {
        name: 'Alerts',
      data() {
        return { // para tener flexibilidad con los atributos rellenamos el atributo wialon, revisar si es posible pasarlos al primer nivel
          dialogVisible: false,
          title: '',
          message: '',
          // wialon attributes
          unit: '',
          timestamp: '',
          location: '',
          last_location: '',
          locator_link: '',
          smallest_geofence_inside: '',
          all_geofences_inside: '',
          UNIT_GROUP: '',
          SPEED: '/',
          POS_TIME: '',
          MSG_TIME: '',
          DRIVER: '',
          DRIVER_PHONE: '',
          TRAILER: '',
          SENSOR: '',
          ENGINE_HOURS: ':',
          MILEAGE: '',
          LAT: '',
          LON: '',
          LATD: '',
          LOND: '',
          GOOGLE_LINK: '',
          CUSTOM_FIELD: '',
          UNIT_ID: '',
          MSG_TIME_INT: '',
          NOTIFICATION: '',
          'X-Tenant-Id': '',
          wialon: ''
        }
      },
      methods: {
        handleClose(done) {
          this.$confirm('Are you sure to close this alert?')
            .then(_ => {
              done(this.dialogVisible = false)
            })
            .catch(_ => {})
        },
        activateAlert() {
          if (!this.dialogVisible) {
            this.dialogVisible = true
          }
        }
      },
      created: function() {
        event.$on('activate-alert', (data) => {
          // this.title = data.message
          // this.message = data.message
          this.wialon = data
          // console.log(data)
          return this.activateAlert()
        }) // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13
      }
    }
</script>

<style lang="scss">
  .maxalerts {
    .title {
      border: none !important;
    }
    .el-dialog__header {
      display: none;
    }
    h1.title {
      font-weight: 400;
      text-align: center;
    }
    .dialog-footer {
      display: block;
      text-align: center;
    }
    i.fa-exclamation-triangle {
      display: block;
      margin: auto;
      width: 84px;
      padding: 10px 0px 15px;
      margin: auto;
      border-radius: 50%;
      text-align: center;
      font-size: 50px;
      background: #D91443;
      color: #FFF;
      border: 4px solid #b3132e;
    }
  }
</style>
