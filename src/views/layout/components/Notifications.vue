<template>
  <li class="dropdown" id="notifications-header">

    <router-link to="" class="dis-block">
      <el-dropdown trigger="click" @command="handleAlert">

        <i class="icon-bell">
          <span v-if="notifications.length" class="badge badge-danger badge-header">{{ notifications.length }}</span>
        </i>

        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <li class="dropdown-header bg-red">
            <p class="m-0 p-1">{{ notifications.length }} Pending Notifications</p>
          </li>

          <ul class="dropdown-menu-list">
            <el-dropdown-item v-for="notification in notifications" :key="notification.id" :command="notification.id">
              <i class="far fa-bell"></i>
              {{ notification.message }}
            </el-dropdown-item>
          </ul>

        </el-dropdown-menu>
      </el-dropdown>
    </router-link>

  </li>
</template>

<script>
  import { loggedUser } from '../../../api/users'
  import { getMyNotifications, markNotificationAsRead } from '../../../api/me'

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
      },
      handleAlert(uuid) {
        // this.$message('Command: ' + command + ' executed')
        markNotificationAsRead(uuid) // todo, apply queue, get the catch and discard locally

        this.discardNotificationByUuid(uuid)

      },
      discardNotificationByUuid(uuid) {
        this.notifications = this.notifications.filter(function(value, index, array) {
              return uuid !== value.id
        })
      }
    },
    computed: {},
    created() {
/*      window.Echo.channel('orders')
        .listen('OrderShipped', function(ooo) {
          console.log('ooo')
        })*/
      this.fetchNotifications()

      window.Echo.private('App.User.' + this.$store.state.user.id)
        .notification((notification) => {
          console.log('NOTIFICATION')
          this.notifications.push({
            id: notification.id,
            message: notification.message,
            link: notification.link
          })

          event.$emit('activate-alert', notification ) // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13

        })
      this.fetchUser()
    }
  }
</script>

<style lang="scss" scoped>
#notifications-header span.el-dropdown-link {
  line-height: 50px;
  display: block;
}
.dropdown-menu::before {
  content: '';
  position: absolute;
  z-index: 100;
  width: 10px;
  height: 10px;
  right: 20px;
  top: -9px;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #c9635f transparent;
}
.dropdown-header p {
    padding: 5px;
}
  .dropdown-menu {
    max-height: 80%;
    list-style: none;
    border: none;
    padding: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
  }
  div[x-arrow] {
    display: none !important;
  }
  .dropdown-menu-list {
    height: 70vh;
    overflow-y: scroll;
    i {
      color: #efefef;
      padding-right: 10px;
    }
  }
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #b8605d;
  color: #ffffff;
}
.popper__arrow {
  display: none;
}

</style>
