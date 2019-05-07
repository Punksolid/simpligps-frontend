<template>
    <el-row class="panel timeline m-t-10 p-10">
        <el-col :xs="24" :sm="4" class="p-15">
          <h4 class="title"><b>{{ details.origin.name }}</b></h4>
          <h4><b>RP:</b> {{ details.rp }}</h4>
          <h4><b>Trip ID:</b> {{ details.id }}</h4>
        </el-col>
        <el-col :xs="24" :sm="20" class="p-15">
            <el-steps :active="1">
                <el-step title="Origin">
                  <template slot="icon">
                    <span class="fa-stack fa-2x">
                      <i class="far fa-circle fa-stack-2x"></i>
                      <i class="fas fa-map-marker-alt fa-stack-1x"></i>
                    </span>
                  </template>
                    <template slot="description">
                      <h4><b>{{ details.origin.name }}</b></h4>
                      <h4><i class="fas fa-user"/> {{ details.origin.person_in_charge }}</h4>
                      <h4><i class="fas fa-phone"/> {{ details.origin.phone }}</h4>
                      <h4><i class="fas fa-map-marker-alt"/> {{ details.origin.address }}</h4>
                    </template>
                </el-step>
                <el-step v-for="item in details.intermediates" :key="item.id" :title="item.name" icon="fas fa-map-pin">
                    <template slot="description">
                      <el-tooltip placement="top" class="tooltip-desc">
                      <p><i class="fas fa-map-marker-alt"/> {{ item.address }}</p>
                        <template slot="content">
                          <p><b>ID:</b> {{ item.id }}</p>
                          <p><b>Contact:</b> {{ item.person_in_charge }}</p>
                          <p><b>Phone:</b> {{ item.phone }}</p>
                        </template>
                      </el-tooltip>
                    </template>
                </el-step>
                <el-step title="Destination">
                  <template slot="icon">
                    <span class="fa-stack fa-2x">
                      <i class="far fa-circle fa-stack-2x"></i>
                      <i class="fas fa-flag fa-stack-1x"></i>
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
    </el-row>
</template>
<script>
    export default {
        name: 'Tripline',
        props: {
            details: {}
      }
    }
</script>
<style lang="scss">
  .timeline {
    p {
      margin: 2px;
    }
    .el-step__icon.is-text {
      border: none;
      width: 60px;
    }
  }
  .el-tooltip__popper p {
    margin: 2px
  }
</style>
