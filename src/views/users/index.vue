<template>
  <el-row class="panel p-10">

    <el-row type="flex" justify="space-between">

      <el-col :span="5">
        <el-button type="primary" @click="dialogVisible = true" icon="fas fa-user-plus p-r-10">Create user</el-button>
      </el-col>
      <el-col class="t-right" :span="14">
        <!-- Disable while click functions are created
        <el-button-group>
          <el-button@click="resetDateFilter">Clear date filter</el-button>
          <el-button @click="clearFilter">Clear all filters</el-button>
        </el-button-group> -->
      </el-col>

    </el-row>

      <el-dialog
        title="Create user"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <create-user @usercreated="fetchUsersList" @closedialog="dialogVisible = false"></create-user>
      </el-dialog>

    <el-col class="m-t-10">

      <el-table
        :data="usersListData"
        stripe
        border>
        <el-table-column
          prop="name"
          label="Name"
          sortable
          width="280">
        </el-table-column>
        <el-table-column
          prop="lastname"
          label="Lastname"
          sortable
          width="280">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          sortable
          width="350">
        </el-table-column>
        <el-table-column
          prop="username"
          label="Username"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          label="Operations"
          fixed="right"
          width="190">
          <template slot-scope="scope">
            <el-button
              size="mini">
              Edit
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, usersListData)"
              type="danger"
              size="mini">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
      <!-- layout="prev, pager, next" -->
    <el-col class="m-t-5 t-center">
    <el-pagination
      class="dis-inline-b"
      :current-page.sync="usersListPage.page"
      :total="usersListPage.total"
      @current-change="handleCurrentChange"
      @pagination="fetchUserPage" />
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
      fetchUserPage() {
        this.listLoading = true
        usersList(this.usersListPage).then(response => {
          this.usersListPage = response.data.meta
          this.usersListData = response.data.data
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.usersListPage.page = val
        this.fetchUserPage()
      },
      fetchUsersList() {
        this.listLoading = true
        usersList(this.usersListData).then(response => {
          this.usersListData = response.data.data
          this.listLoading = false
          this.dialogVisible = false
        })
      }
    },
    created() {
      this.fetchUsersList()
      this.fetchUserPage()
    },
    data() {
      return {
        usersListData: null,
        listLoading: true,
        usersListPage: {
          page: 0,
          from: 0,
          last_page: 0,
          per_page: 10,
          to: 0,
          total: 0
        },
        dialogVisible: false
      }
    }
  }
</script>
