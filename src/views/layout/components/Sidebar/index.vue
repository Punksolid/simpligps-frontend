<template>
  <div>
    <div class="sidebar-inner">
      <div class="logopanel">
        <h1>
          <router-link to="/"></router-link>
        </h1>
      </div>
      <ul
        class="nav nav-sidebar"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#ffffff"
        text-color="#282828"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    name: 'Sidebar',
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      routes() {
        console.log(this.$router.options.routes)
        return this.$router.options.routes.filter(function(route) {
          return !route.hidden
        })
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
