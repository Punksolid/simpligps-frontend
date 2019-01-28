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

    export default {
        name: 'Notifications',
      data() {
          return {
            notifications:[{
              text: 'Mi texto',
              id: 1
            },{
              text: 'Linea Texto 02',
              id: 2
            }]
          }
      },
      created() {
          console.log(this.$store.user)
        // Echo.private('App.User.' + userId)
        //   .notification((notification) => {
        //     console.log(notification.type);
        //   });
      }
    }
</script>

<style scoped>

</style>
