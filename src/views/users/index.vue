<template>
  <el-row class="panel p-10">

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <create-user :dialogform="form" @usercreated="fetchUsersList" @closedialog="cerrarDialogo"></create-user>
    </el-dialog>

    <el-row type="flex" justify="space-between">

      <el-col :span="5">
        <el-button type="primary" @click="createUsr" icon="fas fa-user-plus p-r-10">Create user</el-button>
      </el-col>
      <el-col class="t-right" :span="14">
        <!-- Disable while click functions are created
        <el-button-group>
          <el-button@click="resetDateFilter">Clear date filter</el-button>
          <el-button @click="clearFilter">Clear all filters</el-button>
        </el-button-group> -->
      </el-col>

    </el-row>

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
              @click="handleUpdate(scope.row)"
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

    <el-col class="m-t-5 t-center">
    <el-pagination
      class="dis-inline-b"
      layout="prev, pager, next, total"
      :current-page.sync="usersListPage.current_page"
      :page-size="usersListPage.per_page"
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
      createUsr() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      cerrarDialogo() {
        this.dialogVisible = false
      },
      handleUpdate(row) {
        this.form = Object.assign({}, row) // Copy Row
        this.dialogStatus = 'update'
        this.dialogVisible = true
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
          current_page: 0,
          from: 0,
          last_page: 0,
          per_page: 0,
          to: 0,
          total: 0
        },
        form: [],
        dialogStatus: '',
        textMap: {
          update: 'Edit User',
          create: 'Create User'
        },
        dialogVisible: false
      }
    }
  }
</script>
