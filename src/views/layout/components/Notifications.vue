<template>
  <li class="dropdown" id="notifications-header">

    <router-link class="" to="">

      <el-dropdown trigger="click">
        <i class="icon-bell"></i>
        <span class="badge badge-danger badge-header">6</span>
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
  import Echo from 'laravel-echo'
  import { loggedUser } from '../../../api/users'
  import { Pusher } from 'pusher-js'

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
        var pusher = new Pusher('535c65dd1f4182513a5f', {
          cluster: 'mt1',
          forceTLS: true
        })

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
          alert(JSON.stringify(data));
        })
        loggedUser().then(response => {
          this.user = response.data.data
          // window.Echo.private('App.User.' + this.user.id)
          //   .notification((notification) => {
          //     console.log(notification.type)
          //     console.log('WORKING')
          //   })
          // window.Echo.channel('my-channel').listen('MyChannel', mychannel => {
          //   alert(mychannel.message)
          // })

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
      this.fetchUser()
      console.log('^')
    }
  }
</script>

<style scoped>

</style>
