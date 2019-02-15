<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">

      <el-col class="m-b-5" :xl="4" :sm="4" :xs="24">
        <el-button type="primary" @click="openDialog" icon="fas fa-user-plus p-r-10">Create user</el-button>
      </el-col>

      <el-col :xl="20" :sm="20" :xs="24">
        <el-form class="dis-flex" v-model="search">
          <el-form-item>
          <el-input placeholder="Name" v-model="search.name" @keyup.enter.native="handleFilter"/>
          </el-form-item>
          <el-form-item>
          <el-input placeholder="Lastname" v-model="search.lastname" @keyup.enter.native="handleFilter"/>
          </el-form-item>
          <el-form-item>
          <el-input placeholder="Email" v-model="search.email" @keyup.enter.native="handleFilter">
            <el-button slot="append" icon="fas fa-search" @click="handleFilter"></el-button>
          </el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="fas fa-trash-alt" plain @click="fetchUserPage"></el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>

      <el-dialog
        :title="titleDialog[dialogStatus]"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <create-user v-bind:form="elementToUpdate" @user_created="fetchUsersList" @closedialog="dialogVisible = false"></create-user>
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
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, usersListData)"
              icon="fas fa-edit">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, usersListData)"
              type="danger"
              size="mini"
              icon="fas fa-trash">
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
    data() {
      return {
        usersListData: null,
        search: {
          name: '',
          lastname: '',
          email: ''
        },
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
        this.form = {}
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
        this.search = {}
        usersList(this.usersListPage).then(response => {
          this.usersListPage = response.data.meta
          this.usersListPage.page = response.data.meta.current_page
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
      handleFilter() {
        this.listLoading = true
        usersList(this.search).then(response => {
          this.usersListPage = response.data.meta
          this.usersListPage.page = response.data.meta.current_page
          this.usersListData = response.data.data
          this.listLoading = false
        })
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
    }
  }
</script>
<style lang="scss" scoped>
  .searchBar .dis-flex {
    justify-content: flex-end;
    .el-form-item {
      margin-bottom: 5px;
      padding: 0px 5px;
    }
  }
  @media screen and (max-width: 468px) {
    .dis-flex {
      flex-direction: column;
    }
  }
</style>
