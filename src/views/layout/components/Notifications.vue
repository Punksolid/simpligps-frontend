<template>
  <li class="dropdown" id="notifications-header">

    <router-link to="">
      <el-dropdown trigger="click">
        <i class="icon-bell"></i>
        <span v-if="notifications.length" class="badge badge-danger badge-header">{{ notifications.length }}</span>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">

          <el-dropdown-item v-for="notification in notifications" :key="notification.id">
            {{ notification.message }}
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </router-link>

  </li>
</template>

<script>
  import { loggedUser } from '../../../api/users'
  import { getMyNotifications } from '../../../api/me'

  export default {
    name: 'Notifications',
    data() {
      return {
        user: '',
        notifications: []
      }
    },
    methods: {
      fetchUser() {
        loggedUser().then(response => {
          this.user = response.data.data
        }).catch(e => {
          console.log(e)
        })
      },
      fetchNotifications() {
        getMyNotifications().then(response => {
          this.notifications = response.data.data
        })
      }
    },
    computed: {},
    created() {
      window.Echo.channel('orders')
        .listen('OrderShipped', (e) => {
          console.log(e.order.name)
        })
      this.fetchNotifications()
      window.Echo.private('App.User.' + this.$store.state.user.id)
        .notification((notification) => {
          console.log('NOTIFICATION')
          this.notifications.push({
            id: notification.id,
            message: notification.message,
            link: notification.link
          })
        })
      this.fetchUser()
    }
  }
</script>

<style scoped>
#notifications-header span.el-dropdown-link {
  line-height: 50px;
  display: block;
}
</style>
