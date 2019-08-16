<template>
  <li class="dropdown" id="notifications-header">
    <router-link to class="dis-block">
      <el-dropdown trigger="click">
        <i class="icon-bell">
          <span
            v-if="pagination.total"
            class="badge badge-danger badge-header"
          >{{ pagination.total }}</span>
        </i>

        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <li class="dropdown-header bg-red">
            <p class="m-0 p-1">{{ pagination.total }} Pending Notifications</p>
          </li>

          <ul class="dropdown-menu-list" v-loading="this.loading">
            <el-dropdown-item v-for="notification in notifications" :key="notification.id">
              <span @click="handleAlert(notification)">
                <i class="fas fa-bell"/>{{ notification.message }} <label class="f-10">{{ notification.time_ago }}</label>
              </span>
            </el-dropdown-item>
          </ul>

          <li class="dropdown-footer text-center" @click="fetchNotifications" v-if="! this.last_page">
            <el-button type="text" :loading="this.loading">{{this.loading ? 'Loading..':'Load more'}}</el-button>
          </li>
        </el-dropdown-menu>
      </el-dropdown>
    </router-link>
  </li>
</template>

<script>
import { loggedUser } from '../../../api/users'
import { getMyNotifications, markNotificationAsRead } from '../../../api/me'
// import { fetchAccountDetails } from '@/api/me'

export default {
  name: 'Notifications',
  data() {
    return {
      user: '',
      loading: false,
      notifications: [],
      last_page: false,
      pagination: {
          current_page: 0,
          last_page: 0
      }
    }
  },
  methods: {
    fetchUser() {
      loggedUser()
        .then(response => {
          this.user = response.data.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    fetchNotifications() {
        this.loading = true
        const page = this.pagination.current_page
        const last_page = this.pagination.last_page
        let getPage = 0

        if (page < last_page) {
            getPage = { page: page + 1 }
        }
      getMyNotifications(getPage).then(resp => {
        this.notifications = this.notifications.concat(resp.data.data)
        this.pagination = resp.data.meta
          if (this.pagination.current_page === this.pagination.last_page) {
              this.last_page = true
          }
      }).finally(() => {
          this.loading = false
      })
    },
    notificationReaded(uuid) {
      markNotificationAsRead(uuid).then(resp => {
        this.discardNotificationByUuid(uuid)
      })
    },
    handleAlert(notification) {
      event.$emit('activate-alert', notification)
      // markNotificationAsRead(uuid) // todo, apply queue, get the catch and discard locally
      // this.discardNotificationByUuid(data.uuid)
    },
    discardNotificationByUuid(uuid) {
      this.notifications = this.notifications.filter(function(
        value,
        index,
        array
      ) {
        return uuid !== value.id
      })
    }
  },
  computed: {},
  created() {
    event.$on('notifications-refresh', params => {
      this.fetchNotifications()
    })

    this.fetchNotifications()

    // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13

    console.log('App.Account.' + this.$store.getters.account_id)
    window.Echo.private(
      'App.Account.' + this.$store.getters.account_id
    ).notification(notification => {
      console.log('NOTIFICATION')
      this.notifications.push({
        id: notification.id,
        message: notification.message,
        link: notification.link
      })
      event.$emit('activate-alert', notification)
      // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13
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
  content: "";
  position: absolute;
  z-index: 100;
  width: 10px;
  height: 10px;
  right: 5%;
  top: -9px;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #c9635f transparent;
}
.dropdown-header p {
  padding: 5px;
}
.dropdown-menu {
  display: block;
  max-height: 80%;
  list-style: none;
  border: none;
  padding: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
  div[x-arrow] {
    visibility: hidden;
    display: none !important;
  }
}
.dropdown-menu-list {
  max-height: 70vh;
  overflow-y: scroll;
  i {
    color: #efefef;
    padding-right: 10px;
  }
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #b8605d;
  color: #ffffff;
}
.dropdown-footer {
  background-color: #f4f4f4;
  .el-button--text {
    color: #777777;
  }
}
</style>
