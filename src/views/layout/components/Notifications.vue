<template>
  <li class="dropdown" id="notifications-header">

    <router-link class="" to="">

      <el-dropdown trigger="click">
        <i class="icon-bell"></i>
        <span class="badge badge-danger badge-header">6</span>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">

          <el-dropdown-item v-for="notification in notifications" :key="notification.text">
            {{ notification.text.message }}
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>

    </router-link>

  </li>
</template>

<script>
  import { getDatabaseNotifications } from '../../../api/general'

  export default {
    name: 'Notifications',
    data() {
      return {
        notifications: [{
          text: 'Mi texto',
          id: 1
        }, {
          text: 'Linea Texto 02',
          id: 2
        }]
      }
    },
    methods: {
      getNotifications() {
        getDatabaseNotifications().then(response => {
          this.notifications = response.data.data
        })
      }

    },
    created() {
      this.getNotifications()

      // setInterval(function() {
      //   this.getNotifications()
      // }.bind(this), 10000) // milisegundos
    }
  }

</script>

<style scoped>

</style>
