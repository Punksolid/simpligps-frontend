<template>
  <li class="dropdown" id="notifications-header">

    <router-link class="" to="">

      <el-dropdown trigger="click">
        <i class="icon-bell"></i>
        <span class="badge badge-danger badge-header">{{ notifications.length }}</span>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">

          <el-dropdown-item v-for="notification in notifications" :key="notification.text">
            {{ notification.text }}
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>

    </router-link>

  </li>
</template>

<script>
  import { loggedUser } from '../../../api/users'

  export default {
    name: 'Notifications',
    data() {
      return {
        user: '',
        notifications: [{
          text: 'Mi texto',
          id: 1
        }]
      }
    },
    methods: {
      fetchUser() {
        loggedUser().then(response => {
          this.user = response.data.data



          console.log('success')
          // console.log(response.data.data.id)
          // console.log(response.data.data)
        }).catch(e => {
          console.log(e)
        })
      }
    },
    computed: {},
    created() {
      window.Echo.channel('test')
        .listen('.unodostres', (e) => {
          console.log(e)
        })
      window.Echo.private('App.User.1')
        .notification((notification) => {
          console.log(notification)
          console.log('NOTIFICATION')
          this.notifications.push(notification)
        })
      this.fetchUser()

    }
  }
</script>

<style scoped>

</style>
