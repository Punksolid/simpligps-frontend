<template>
    <div class="dashboard-container">
    <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div>
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">

        <div class="card-panel-description">
          <h6>Operator</h6>
          <h6>Id:1111</h6>
          <p>Phone:6677 131415</p>

        </div>
      </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div>
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">

        <div class="card-panel-description">
          <h6>Truck</h6>
          <h6>Id:FL312</h6>
          <p>Model:Kenworth</p>
          <p>Color:White</p>
          <p>Economic:T-770</p>
          <p>Plate:LOM1512</p>
          <p>GPS:http://tlmt.com</p>

        </div>
      </div>
      </div>
    </el-col>

  </el-row>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 20px;
    line-height: 26px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 10px;
  .card-panel-col{
    margin-bottom: 12px;
  }
  .el-icon-info {
    font-size:10px;
  }
  .el-icon-loading {
    font-size:10px;
  }

  .el-icon-error {
    font-size:10px;
  }
  .el-icon-success {
    font-size:10px;
  }
  //COLOR DE LA CAJA CONTENEDORA

  .card-panel {
    height: 250px;
    width: 150px;
    cursor: pointer;
    font-size: 7px;
    position: relative;
    overflow: hidden;
    color: #666;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #76f2ff;
      }
      .icon-money {
        background: #68dda2;
      }
      .icon-shopping {
        background: #dd1919
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #76f2ff;
    }
    .icon-money {
      color: #68dda2;
    }
    .icon-shopping {
      color: #dd1919
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 24px 0 0 24px;
      padding: 26px;
      transition: all 0.38s ease-out;
      border-radius: 5px;
    }
    .card-panel-icon {
      float: left;
      font-size: 10px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 10px;
      }
    }
  }
}
</style>


<script>
export default {
  name: 'Card'
}
</script>
