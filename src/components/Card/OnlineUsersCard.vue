<template>
  <div class="card">
    <el-col class="panel-header">
      <h3><i class="icon-user"></i>Online<b>Users</b></h3>
    </el-col>
    <el-col class="number">
      <h1><span>{{ usersList.length }}</span> Users</h1>
      <el-table
        size="mini"
        cell-class-name="bg-red"
        :show-header="false"
        :border="false"
        :data="usersList">
        <el-table-column
          prop="email">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col class="panel-footer bg-gray-light"><h3><router-link to="/users/">VIEW ALL</router-link> </h3></el-col>
  </div>

</template>

<script>
  import { Col, Table, TableColumn } from 'element-ui'
  // import Pusher from 'pusher-js'
  // import Echo from 'laravel-echo'

  // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13
  export default {
    name: 'OnlineUsersCard',
    components: {
      'el-table': Table,
      'el-col': Col,
      'el-table-column': TableColumn
    },
    data() {
      return {
      }
    },
    mounted() {
      // this.usersList = this.$store.account.usersOnline

      // this.usersList = this.$store.getters.usersOnline
      // eslint-disable-next-line no-undef
      // window.Echo = new Echo({
      //   authEndpoint: process.env.VUE_APP_BASE + 'broadcasting/auth',
      //   broadcaster: 'pusher',
      //   key: '535c65dd1f4182513a5f',
      //   auth: {
      //     headers: {
      //       Authorization: 'Bearer ' + this.$store.getters.token
      //     }
      //   }
      //   // cluster: 'mt1'
      // })
    },
    computed: { 
      usersList: function() {
        return this.$store.getters.usersOnline
      }
    }
  }
</script>

<style scoped>

</style>
