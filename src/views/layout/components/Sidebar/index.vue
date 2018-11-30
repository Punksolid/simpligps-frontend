<template>
  <div>
  <div class="sidebar-inner">
      <div class="logopanel">
          <h1>
            <a href="dashboard.html"></a>
          </h1>
  </div>
    <ul
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#ffffff"
      text-color="#282828"
      active-text-color="#409EFF"
      class="nav nav-sidebar"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </ul>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      routes() {
        return this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
