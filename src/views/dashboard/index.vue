<template>
    <div class="dashboard-container">

    <el-row :gutter="40" class="panel-group">

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <i class="el-icon-error"></i>
          </div>
          <div class="card-panel-description">
            <h4>Attention required!</h4>
            <h6>Check Max alerts</h6>
            <el-button size="small" type="danger" @click="dialogVisible = true">view alerts</el-button>
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
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 20px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .el-icon-info {
    font-size:30px;
  }
  .el-icon-loading {
    font-size:30px;
  }

  .el-icon-error {
    font-size:30px;
  }
  .el-icon-success {
    font-size:30px;
  }
  //COLOR DE LA CAJA CONTENEDORA

  .card-panel {
    height: 190px;
    cursor: pointer;
    font-size: 11px;
    position: relative;
    overflow: hidden;
    color: #666;
    background-image: linear-gradient(#b0f8ff, #fafeff);
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
      font-size: 28px;
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
        font-size: 30px;
      }
    }
  }
}
</style>
