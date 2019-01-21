<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create user</el-button>

    <el-dialog
      title="Create user"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
  <span>
    <create-user></create-user>
  </span>

    </el-dialog>
    <div style="margin-top: 30px">
      <div style="margin-bottom: 30px">
      <el-button @click="resetDateFilter">Clear date filter</el-button>
  <el-button @click="clearFilter">Clear all filters</el-button>
        </div>

      <el-table
        :data="usersListData"
        stripe
        style="width: 100%"
        max-height="100%">
        <el-table-column
          prop="name"
          label="Name"
          width="180">
        </el-table-column>
        <el-table-column
          fixed
          prop="lastname"
          label="Lastname"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          width="350">
        </el-table-column>
        <el-table-column
          prop="username"
          label="User name"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations"
          width="100">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, usersListData)"
              type="text"
              size="small">
              Remove
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
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
