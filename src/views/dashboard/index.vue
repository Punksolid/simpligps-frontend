<template>
  <div>
    <el-row type="flex">
      <el-col class="panel" :xs="24" :sm="12">
        <el-col class="panel-header bg-primary"><h3><i class="fas fa-home"/><b>Dashboard</b></h3></el-col>
          <el-col class="panel-content">

          <el-col :xs="24" :sm="12">
            <img src="@/assets/dashboard.png" width="85%"/>
          </el-col>
          <el-col class="panel-content" :xs="24" :sm="12">
            <h2 class="m-t-5"><b>First time here?</b></h2>
            <p>Congratulations! Please, let us tell you what can be done with TRM System. Sit comfy and check it out!</p>
          </el-col>

        </el-col>
      </el-col>

      <el-col class="panel" :xs="24" :sm="12">
        <el-col class="panel-header bg-primary"><h3><i class="fas fa-user"></i>Active <b>Users</b></h3></el-col>
        <el-col class="panel-content number"><h1><span>{{ total_users }}</span> Users</h1></el-col>
        <el-col class="panel-footer bg-gray-light"><h3><router-link to="/users/">VIEW ALL</router-link></h3></el-col>
      </el-col>
    </el-row>

    <el-row type="flex">

      <OnlineUsersCard/>

      <el-col class="panel" :xs="24" :sm="12">
        <el-col class="panel-header bg-orange"><h3><i class="fas fa-location-arrow"></i>Active <b>Devices</b></h3></el-col>
        <el-col class="panel-content number"><h1><span>{{ total_devices }}</span> Devices</h1></el-col>
        <el-col class="panel-footer bg-gray-light"><h3><router-link to="/monitoring/">VIEW ALL</router-link></h3></el-col>
      </el-col>

    </el-row>

  </div>
</template>

  <script>
    import { mapGetters } from 'vuex'
    import { getDashboardElements } from '@/api/general'
    import OnlineUsersCard from '../../components/Card/OnlineUsersCard'

    export default {
      name: 'Dashboard',
      components: { OnlineUsersCard },
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
        fetchDashboardItems() {
          getDashboardElements().then(response => {
            this.total_users = response.data.data.users
            this.total_devices = response.data.data.devices
          })
        }
      },
      created() {
        this.fetchDashboardItems()
      }
    }
  </script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel {
  margin: 0px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .panel-footer a {
    color: inherit;
  }
  &:before, &:after {
    display: none !important;
  }
  .number h1 {
    font-size: 3em !important;
    line-height: 1em;
  }
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
  @media (max-width: 768px) {
    .panel {
      .el-col {
        text-align: center;
      }
      .panel-header, .panel-content, .panel-footer {
        text-align: center;
      }
      p {
        text-align: center;
      }
    }
    .el-row.el-row--flex {
      flex-direction: column;
    }
  }
</style>
