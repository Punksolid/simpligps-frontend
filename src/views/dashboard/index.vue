<template>
  <div>

  <el-row>
    <el-col class="panel" :xs="24" :sm="12" :lg="12">

      <el-col class="panel-header"><h3><b>Dashboard</b></h3></el-col>

      <el-col :xs="12" :sm="12" :lg="12">
          <img src="@/assets/dashboard.png" width="85%"/>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="12">
        <h2><b>First time here?</b></h2>
        <p style="padding: 10px">Congratulations! Please, let us tell you what can be done with TRM System. Sit comfy and check it out!</p>
          <el-button style="padding: 10px" type="primary">Check more!</el-button>

      </el-col>

    </el-col>

    </el-row>

    <el-row type="flex">
      <el-col class="panel bg-blue" :xs="24" :sm="12" :md="12" :lg="12">
        <el-col class="panel-header"><h3><i data-v-3ece4f7e="" class="icon-cursor"></i>Active <b>Devices</b></h3></el-col>
        <el-col class="number"><h1><span>{{ total_devices }}</span> Devices</h1></el-col>
        <el-col class="panel-footer bg-gray-light"><h3>See all</h3></el-col>
      </el-col>
      <el-col class="panel bg-red" :xs="24" :sm="12" :md="12" :lg="12">
        <el-col class="panel-header"><h3><i data-v-3ece4f7e="" class="icon-user"></i>Active <b>Users</b></h3></el-col>
        <el-col class="number"><h1><span>{{ total_users }}</span> Users</h1></el-col>
        <el-col class="panel-footer bg-gray-light"><h3>See all</h3></el-col>
      </el-col>
    </el-row>

  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { getTotalDevices } from '../../api/general'
import { usersList } from '../../api/users'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      total_devices: 0,
      total_users: 0
    }
  },
  methods: {
      fetchTotalDevices() {
        getTotalDevices().then(response => {
          this.total_devices = response.data.meta.total
        })
      },
    fetchTotalUsers() {
      usersList().then(response => {
        this.total_users = response.data.meta.total
      })
    }
  },
  created() {
    this.fetchTotalDevices(),
    this.fetchTotalUsers()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel {
  margin: 0px 5px;
}
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
