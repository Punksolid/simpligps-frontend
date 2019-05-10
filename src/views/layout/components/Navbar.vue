<template>
<div>
  <div class="header-left">
    <div class="topnav" mode="horizontal">
      <router-link class="menutoggle" to="">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="menu__handle"/>
      </router-link>
    </div>
  </div>

  <div class="header-right">
    <ul class="header-menu nav navbar-nav">

      <notifications/>

      <li class="dropdown" id="user-header">
        <router-link to="/">

        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <span class="fa-stack fa-2x">
              <i class="fas fa-circle fa-stack-2x"></i>
              <i class="fas fa-user fa-stack-1x fa-inverse"></i>
            </span>
            <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
            <span class="username">Hi, {{ logged_user }}</span>
            <i class="el-icon-caret-bottom"/>
          </div>

          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/select_account' }">
              <el-dropdown-item divided>
              Select Account
              </el-dropdown-item>
            </router-link>
            <router-link to="/user_settings">
              <el-dropdown-item divided>
                <span>User Settings</span>
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
            <!--@TODO ACTIVAR LOGOUT PROPIO-->
              <span @click="logout">Logout</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        </router-link>
      </li>
    </ul>
  </div>

  <breadcrumb />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { loggedUser } from '../../../api/users'
import App from '../../../App'
import Notifications from '@/views/layout/components/Notifications'
import MyAccounts from '../../login/myaccounts'

export default {
  components: {
    MyAccounts,
    App,
    Breadcrumb,
    Hamburger,
    Notifications
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data() {
    return {
      logged_user: '',
      accountDialog: false
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    fetchName() {
      loggedUser().then(response => {
        this.logged_user = response.data.data.name
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  },
  created() {
    this.fetchName()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.topbar {
  .header-right .header-menu.navbar-nav {
    flex-direction: row;
  }
  #user-header img {
    background: #f7f7f7;
    text-indent: -20000px;
  }
  .el-menu {
    border: 0px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    margin-right: 20px;

    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      line-height: initial;

      .fa-stack {
        top: 2px;
        font-size: 1.6em;
        color: #ececec;
        .fa-user {
          font-size: 1.6em;
          top: 4px;
        }
      }

      .user-avatar {
        width: 40px !important;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
.el-popper .popper__arrow::after {
  display: none;
}
</style>

