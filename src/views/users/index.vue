<template>
  <el-row class="panel p-10">

    <el-row type="flex" justify="space-between">

      <el-col :span="5">
        <el-button type="primary" @click="openDialog" icon="fas fa-user-plus p-r-10">Create user</el-button>
      </el-col>
      <el-col class="t-right" :span="14">
        <el-button-group>
          <el-button>Clear date filter</el-button>
          <el-button>Clear all filters</el-button>
        </el-button-group>
      </el-col>

    </el-row>

    <el-dialog
      :title="titleDialog[dialogStatus]"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <create-user @resetData="cleanFields" :form="elementToUpdate" @usercreated="fetchUsersList" @closedialog="dialogVisible = false"></create-user>
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
              size="mini"
              @click="handleUpdate(scope.$index, usersListData)">
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
        layout="total, prev, pager, next, jumper"
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
        this.$confirm('This will permanently delete the user: ' + userListData[index].username + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteUser(userListData[index].id)
          this.fetchUsersList()
          this.fetchUserPage()
          this.$message({
            type: 'success',
            message: 'Delete user completed'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete User canceled'
          })
        })
      },
      openDialog() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
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
      handleUpdate(index, userListData) {
        this.elementToUpdate = userListData[index]
        this.dialogStatus = 'update'
        this.dialogVisible = true
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
      },
      cleanFields() {
        this.elementToUpdate = {}
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
        elementToUpdate: {},
        usersListPage: {
          page: 0,
          from: 0,
          last_page: 0,
          per_page: 15,
          to: 0,
          total: 0
        },
        dialogStatus: '',
        titleDialog: {
          update: 'Edit User',
          create: 'Create User'
        },
        dialogVisible: false
      }
    }
  }
</script>
