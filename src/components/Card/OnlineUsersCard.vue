<template>
  <div class="card">
    <el-col class="panel-header">
      <h3><i class="icon-user"></i>Online<b>Users</b></h3>
    </el-col>
    <el-col class="number">
      <h1><span>{{ usersList.length }}</span> Users</h1>
      <el-table
        size="mini"
        cell-class-name="bg-red"
        :show-header="false"
        :border="false"
        :data="usersList">
        <el-table-column
          prop="email">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col class="panel-footer bg-gray-light"><h3><router-link to="/users/">VIEW ALL</router-link> </h3></el-col>
  </div>

</template>

<script>
  import { Col, Table, TableColumn } from 'element-ui'
  // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13
  export default {
    name: 'OnlineUsersCard',
    components: {
      'el-table': Table,
      'el-col': Col,
      'el-table-column': TableColumn
    },
    props: {
      usersCount: {
        type: Number,
        required: false
      }
    },
    data() {
      return {
        usersList: []
      }
    },
    mounted() {
      // eslint-disable-next-line no-undef

      window.Echo.join(`chat.${this.$store.getters.account_id}`)
        .joining((user) => {
          console.log('JOINING')
          console.log(user.name)
          this.usersList.push({
            id: user.id,
            email: user.email
          })
        }).here((users) => {
        console.log('usuarios presentes')
        console.log(users)
        this.usersList = users
      })
        .leaving((user) => {
          console.log('leaving')
          this.usersList = this.usersList.filter(function(user_element) {
            return user_element.id !== user.id
          })

        })
    }
  }
</script>

<style scoped>

</style>
