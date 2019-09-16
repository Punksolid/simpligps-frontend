<template>
  <div>
    <el-row>
      <el-col class="panel" :xs="24" :sm="12" :lg="12">

        <el-col class="panel-header"><h3><b>Dashboard</b></h3></el-col>
          <el-col class="panel-content">

          <el-col :xs="12" :sm="12" :lg="12">
            <img src="@/assets/dashboard.png" width="85%"/>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <h2 class="m-t-5"><b>First time here?</b></h2>
            <p>Congratulations! Please, let us tell you what can be done with TRM System. Sit comfy and check it out!</p>
          </el-col>

        </el-col>

      </el-col>
    </el-row>

    <el-row type="flex" class="active-panels">
      <el-col class="panel bg-red" :xs="24" :sm="12" :md="12" :lg="12">
          <OnlineUsersCard></OnlineUsersCard>

      </el-col>
      <el-col class="panel bg-blue" :xs="24" :sm="12" :md="12" :lg="12">
        <el-col class="panel-header"><h3><i data-v-3ece4f7e="" class="icon-cursor"></i>Active <b>Devices</b></h3></el-col>
        <el-col class="number"><h1><span>{{ total_devices }}</span> Devices</h1></el-col>
        <el-col class="panel-footer bg-gray-light"><h3><router-link to="/monitoring/">VIEW ALL</router-link></h3></el-col>
      </el-col>
      <el-col class="panel bg-red" :xs="24" :sm="12" :md="12" :lg="12">
        <el-col class="panel-header"><h3><i data-v-3ece4f7e="" class="icon-user"></i>Active <b>Users</b></h3></el-col>
        <el-col class="number"><h1><span>{{ total_users }}</span> Users</h1></el-col>
        <el-col class="panel-footer bg-gray-light"><h3><router-link to="/users/">VIEW ALL</router-link> </h3></el-col>
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
  .panel-footer a {
    color: inherit;
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
  .active-panels {
    flex-direction: column;
  }
}
  @media (max-width:768px) {
    .active-panels {
      flex-direction: column;
    }
  }
</style>
