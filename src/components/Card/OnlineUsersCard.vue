<template>
  <el-col class="panel" :xs="24" :sm="12">
    <el-col class="panel-header bg-orange">
      <h3><i class="fas fa-user-check"></i>Online<b> Users</b></h3>
    </el-col>
    <el-col class="panel-content number">
      <h1><span>{{ usersList.length }}</span> Users</h1>
      <el-table
        size="mini"
        cell-class-name="user-cell bd-6"
        :show-header="false"
        :border="false"
        height="120"
        max-height="300px"
        :data="usersList">
        <el-table-column
          prop="email">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col class="panel-footer bg-gray-light"><h3><router-link to="/users/">VIEW ALL</router-link></h3></el-col>
  </el-col>
</template>

<script>
  import { Col, Table, TableColumn } from 'element-ui'
  // import Pusher from 'pusher-js'
  // import Echo from 'laravel-echo'

  // https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13
  export default {
    name: 'OnlineUsersCard',
    components: {
      'el-table': Table,
      'el-col': Col,
      'el-table-column': TableColumn
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    computed: {
      usersList: function() {
        return this.$store.getters.usersOnline
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel {
    margin: 0px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .panel-footer a {
      color: inherit;
    }
    &:before, &:after {
      display: none !important;
    }
    .number h1 {
      font-size: 3em !important;
      line-height: 1em;
    }
  }
  .user-cell {
    font-weight: 300;
  }
  @media (max-width: 768px) {
    .panel {
      .el-col {
        text-align: center;
      }
      .panel-header, .panel-content, .panel-footer {
        text-align: center;
      }
      p {
        text-align: center;
      }
    }
    .el-row.el-row--flex {
      flex-direction: column;
    }
  }
</style>
