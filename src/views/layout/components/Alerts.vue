<template>
<el-row>

  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="75%"
    class="maxalerts"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
    :before-close="handleClose">
    <h1 slot="title" class="title"></h1>
    <el-row>
      <el-col class="text-center">
        <i class="fas fa-exclamation-triangle"></i>
        <h1 class="title">{{ wialon[0].NOTIFICATION }}</h1>
        <h3 class="message">{{ wialon[0].message }}</h3>
      </el-col>
      <el-col class="t-center m-t-20 m-b-15">
        <i class="fas fa-truck-moving p-r-10" title="Truck:"></i> {{ wialon[0].TRAILER }}
        <i class="fas fa-user p-l-10 p-r-10" title="Driver:"></i> {{ wialon[0].DRIVER }}
        <i class="fas fa-phone p-l-10 p-r-10" title="Driver:"></i> {{ wialon[0].DRIVER }}
        <i class="fas fa-battery-three-quarters p-l-10 p-r-10" title="Sensor"></i> {{ wialon[0].SENSOR }}
      </el-col>

        <el-table
          :data="wialon"
          fit
          align="center"
          style="width: 100%">
          <el-table-column
            prop="unit"
            label="Unit"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="UNIT_GROUP"
            label="Unit"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="SPEED"
            label="Speed"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="MSG_TIME"
            label="MSG TIME"
            min-width="100">
            <i class="el-icon-time"></i>
          </el-table-column>
          <el-table-column
            prop="location"
            label="Location"
            min-width="200">
          </el-table-column>
        </el-table>
      <el-col class="m-t-20 m-b-10 text-center">
          <el-button type="info" plain size="medium" :icon="viewMap ? 'fas fa-eye-slash':'far fa-eye'" @click="viewMap = !viewMap"> {{viewMap?'Hide':'View'}} Map</el-button>
          <a :href="wialon[0].GOOGLE_LINK" target="_blank"><el-button type="info" plain size="medium" icon="fas fa-external-link-alt"> Open on GMaps.</el-button></a>
      </el-col>
      <el-col v-if="viewMap">
        <GmapMap
          :center="unitPositions"
          :zoom="14"
          map-type-id="roadmap"
          style="width: 100%; height: 400px">
          <GmapMarker
            :position="unitPositions"
            :icon="require('@/assets/carmarker.svg')"
            :title="'Unit: ' + wialon[0].unit"
            :clickable="true"
            :draggable="false"
          />
        </GmapMap>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button type="warning" @click="attendAlert">Attend</el-button>
    </span>
  </el-dialog>

  <AttendAlerts :alertinfo="wialon" :notification_to_attend="notification" :position="unitPositions"/>

</el-row>
</template>

<script>
  import AttendAlerts from '@/views/layout/components/attend_alert'

    export default {
      name: 'Alerts',
      components: {
        AttendAlerts
      },
      data() {
        return { // para tener flexibilidad con los atributos rellenamos el atributo wialon, revisar si es posible pasarlos al primer nivel
          dialogVisible: false,
          wialon: [
            {
              NOTIFICATION: ''
            }
          ],
          viewMap: false,
          unitPositions: {
            lat: 0,
            lng: 0
          },
          notification: null
        }
      },
      methods: {
        handleClose() {
          this.dialogVisible = false
          event.$emit('attend-alert')
        },
        activateAlert() {
          if (!this.dialogVisible) {
            this.dialogVisible = true
          }
        },
        unitPosition() {
          this.unitPositions.lat = Number(this.wialon[0].LATD)
          this.unitPositions.lng = Number(this.wialon[0].LOND)
        },
        attendAlert() {
          this.dialogVisible = false
          event.$emit('attend-alert', this.notification)
        }
      },
      created() {
        event.$on('activate-alert', (data) => {
          this.notification = data
          this.wialon = []
          this.wialon.push(data)
          this.unitPosition()
          // this.wialon = data
          return this.activateAlert()
        }) // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13
      }
    }
</script>

<style lang="scss">
  .maxalerts {
    .el-dialog__header {
      display: none;
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
    .title {
      border: none !important;
    }
    h1.title {
      font-weight: 500;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 0px;
      line-height: 1em;
    }
    .message {
      display: inline;
      text-align: center;
      font-weight: 400;
      border-bottom: 2px solid #e6e6e6;
      color: #868686;
    }
    .dialog-footer {
      display: block;
      text-align: center;
      button {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 1.1em;
        border-radius: 0px;
        background: #ffffff61;
        border: 2px solid #FFF;
      }
      .el-button--warning:focus, .el-button--warning:hover {
        background: #7b1414;
        border-color: #ffffff;
        color: #fff;
      }
    }
    .el-dialog > div:last-child {
      background-color: #b41d2f;
    }
  }
</style>
