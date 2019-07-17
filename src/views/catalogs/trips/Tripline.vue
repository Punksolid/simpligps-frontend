<template>
    <el-row class="panel timeline m-t-10">
        <el-col class="p-30">
            <el-steps :direction="this.$store.state.app.device==='desktop'?'horizontal':'vertical'" :active="activePosition">
                <el-step title="Origin">
                  <template slot="icon">
                    <span class="fa-stack fa-2x">
                      <i class="far fa-circle fa-stack-2x"></i>
                      <i :class="'fas fa-stack-1x ' + originStatus()"></i>
                    </span>
                  </template>
                    <template slot="description">
                      <h4><b>{{ details.origin.name }}</b></h4>
                      <h4><i class="fas fa-user"/> {{ details.origin.person_in_charge }}</h4>
                      <h4><i class="fas fa-phone"/> {{ details.origin.phone }}</h4>
                      <h4><i class="fas fa-map-marker-alt"/> {{ details.origin.address }}</h4>
                    </template>
                </el-step>
                <el-step v-for="item in details.intermediates" :key="item.id" :title="item.name" :icon="currentStatus(item)">
                    <template slot="description">
                        <h4><i class="fas fas fa-map-marker-alt"/> {{ item.address }}</h4>
                        <el-tooltip placement="top" class="tooltip-desc">
                          <h4><b>{{ item.name }}</b></h4>

                        <template slot="content">
                          <p><b>ID:</b> {{ item.id }}</p>
                          <p><b>Contact:</b> {{ item.person_in_charge }}</p>
                          <p><b>Phone:</b> {{ item.phone }}</p>
                        </template>
                      </el-tooltip>
                        <h4>Programed Enter: {{ item.at_time }}</h4>
                        <h4><i class="fas fa-clock"/>Programed Departure {{ item.exiting }}</h4>
                        <h4><i class="fas fa-clock"/>Real Enter: {{ item.real_at_time }}</h4>
                        <h4><i class="fas fa-clock"/>Real Departure {{ item.real_exiting }}</h4>
                    </template>
                </el-step>
                <el-step title="Destination">
                  <template slot="icon">
                    <span class="fa-stack fa-2x">
                      <i class="far fa-circle fa-stack-2x"></i>
                      <i :class="'fas fa-stack-1x ' + destinationStatus()"></i>
                    </span>
                  </template>
                    <template slot="description">
                      <h4><b>{{ details.destination.name }}</b></h4>
                      <h4><i class="fas fa-user"/> {{ details.destination.person_in_charge }}</h4>
                      <h4><i class="fas fa-phone"/> {{ details.destination.phone }}</h4>
                      <h4><i class="fas fa-map-marker-alt"/> {{ details.destination.address }}</h4>
                    </template>
                </el-step>
            </el-steps>
        </el-col>
      <el-col :span="24" class="colours p-15">
        <el-col :xs="24" :sm="3"><div class="process-colour"></div><span>Current Position</span></el-col>
        <el-col :xs="24" :sm="3"><div class="finish-colour"></div><span>Past Position</span></el-col>
        <el-col :xs="24" :sm="5"><div class="waiting-colour"></div><span>Intermediate / Waiting</span></el-col>
      </el-col>
      <!-- <el-button type="primary" @click="currentPosition">Check Position</el-button> -->
    </el-row>
</template>
<script>
    export default {
      name: 'Tripline',
      props: {
        details: Object
      },
        data() {
          return {
              activePosition: 0
          }
        },
      methods: {
          currentPosition() {
              if (this.details.destination.status >= 1) {
                  this.activePosition = this.details.intermediates.length + 1
              } else {
                  this.details.intermediates.forEach((value, key) => {
                      if (value.status === 1) {
                          this.activePosition = key
                      }
                  })
              }
          },
          originStatus() {
              if (this.details.origin.status === 2) {
                  return 'fa-check'
              } else if (this.details.origin.status === 1) {
                  return 'fa-truck'
              } else {
                  return 'fa-map-marker-alt'
              }
          },
          currentStatus(item) {
              if (item.status === 2) {
                  return 'fas fa-check'
              } else if (item.status === 1) {
                  return 'fas fa-truck'
              } else {
                    return 'fas fa-map-pin'
              }
          },
          destinationStatus() {
              if (this.details.destination.status === 2) {
                  return 'fa-check'
              } else if (this.details.destination.status === 1) {
                  return 'fa-truck'
              } else {
                  return 'fa-flag'
              }
          }
      },
        created() {
          this.currentPosition()
        }
    }
</script>
<style lang="scss">
  $cActive: #fca803;
  $cFinished: #2a9cb6;
  $cWaiting: #C0C4CC;
  .timeline {
    margin-bottom: 0px !important;
    p {
      margin: 2px;
    }
    h4 {
      font-weight: 400;
    }
    .colours {
      width: 100%;
      background-color: #f9f9f9;
      > div {
        display: flex;
        align-items: center;
      }
      .el-col > div {
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 3px;
      }
      span {
        margin: 0 5px;
      }
    }
    .process-colour {
      background-color: $cActive;
    }
    .finish-colour {
      background-color: $cFinished;
    }
    .waiting-colour {
      background-color: $cWaiting;
    }
    .is-finish {
      color: $cFinished;
      border-color: $cFinished;
    }
    .is-process {
      color: #fca803;
      // color: #fca803;
    }
    .is-waiting {
      color: $cWaiting;
    }
    .el-step__title {
      font-weight: 700;
    }
    .el-step__icon.is-text {
      border-radius: 50%;
      border: none;
      width: 60px;
    }
    .el-step__description {
      line-height: 1.1em;
    }
    .el-step.is-vertical {
      .el-step__icon.is-text {
      border: none;
      width: 60px;
      background: white;
      height: 60px;
      }
      .el-step__main {
        padding-left: 25px;
      }
      .el-step__head {
        width: 60px;
        display: flex;
        justify-content: center;
      }
      .el-step__line {
        left: auto;
        right: auto;
      }
    }
  }
  .el-tooltip__popper p {
    margin: 2px
  }
</style>
