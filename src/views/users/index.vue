<template>
  <el-row class="panel p-10">

    <el-row type="flex" justify="space-between">

      <el-col :span="5">
        <el-button type="primary" @click="dialogVisible = true">Create user</el-button>
      </el-col>
      <el-col class="t-right" :span="14">
        <el-button-group>
          <el-button @click="resetDateFilter">Clear date filter</el-button>
          <el-button @click="clearFilter">Clear all filters</el-button>
        </el-button-group>
      </el-col>

    </el-row>

    <el-col class="m-t-10">

      <el-dialog
        title="Create user"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose">

      <span>
        <create-user></create-user>
      </span>

      </el-dialog>

      <el-table
        :data="usersListData"
        stripe
        border
        max-height="400"
      >
        <el-table-column
          prop="name"
          label="Name"
          width="280">
        </el-table-column>
        <el-table-column
          prop="lastname"
          label="Lastname"
          width="280">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          width="350">
        </el-table-column>
        <el-table-column
          prop="username"
          label="Username"
          width="180">
        </el-table-column>
        <el-table-column
          label="Operations"
          fixed="right"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, usersListData)"
              type="danger"
              size="mini">
              Remove
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

  </el-row>
</template>

<script>
  import CreateUser from './create.vue'
  import { usersList } from '../../api/users'
  import { deleteUser } from '../../api/general'

  export default {
    name: 'Users',
    components: {
      CreateUser
    },
    params: {
      return: {
        usersListData: []
      }
    },
    methods: {
      deleteRow(index, userListData) {
        deleteUser(userListData[index].id)
        this.fetchUsersList()
      },
      open() {
        this.$alert('This is a message', 'Title', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            })
          }
        })
      },
      handleClose(done) {
        this.$confirm('Are you sure to close? Not saved data will be lost!')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      fetchUsersList() {
        this.listLoading = true
        usersList(this.usersListData).then(response => {
          this.usersListData = response.data.data
          this.listLoading = false
        })
      }
    },
    created() {
      this.fetchUsersList()
    },
    data() {
      return {
        usersListData: null,
        dialogVisible: false
      }
    }
  }
</script>
