<template>
  <section>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>

      <sidebar>
        <div class="sidebar-container">
        <div class="logopanel">
          <h1>
            <a href="dashboard.html"></a>
          </h1>
        </div>
        </div>
      </sidebar>

    <div class="main-container main-content">
      <navbar class="topbar"/>

      <app-main class="page-content"/>

      <alerts/>

    </div>
  </div>
</section>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import Alerts from './components/Alerts'
import ResizeMixin from './mixin/ResizeHandler'
import Echo from 'laravel-echo'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Alerts
  },
  data() {
    return {
      timeout: 0
    }
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    refresh() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        event.$emit('wasInactive')
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }, 5 * 60 * 1000) // El primer numero equivale a minutos, para convertir a milisegundos.
    }
  },
  created() {
    document.body.classList.add('sidebar-show')

    window.Pusher = require('pusher-js')
    window.Echo = new Echo({
      authEndpoint: process.env.VUE_APP_BASE + 'broadcasting/auth',
      broadcaster: 'pusher',
      key: '535c65dd1f4182513a5f',
      auth: {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.token
        }
      }
      // cluster: 'mt1'
    })
    

      window.Echo.join(`App.Account.${this.$store.getters.account_id}`)
      .here((users) => {
        // console.log('usuarios presentes')
        // console.log(users)
        console.log('usuarios')
        console.table(users)
        console.log(users)
        this.$store.dispatch('SetUsersOnline', users)
      })
      .joining((user) => {
        this.$store.dispatch('AddUserOnline', user)
      })
      .leaving((user) => {
          this.$store.dispatch('RemoveUserOnline', user)
      })
    // this.refresh()
    // document.addEventListener('click', this.refresh)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
</style>
