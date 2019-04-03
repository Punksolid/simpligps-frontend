<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">

      <el-col class="m-b-5" :xl="4" :sm="4" :xs="24">
        <el-button type="primary" @click="openDialog" icon="fas fa-user-plus p-r-10">Create user</el-button>
      </el-col>

      <el-col :xl="20" :sm="20" :xs="24">
        <el-form class="dis-flex" v-model="search">
          <el-form-item>
          <el-input placeholder="Name" v-model="search.name" @keyup.enter.native="fetchUsersList"/>
          </el-form-item>
          <el-form-item>
          <el-input placeholder="Lastname" v-model="search.lastname" @keyup.enter.native="fetchUsersList"/>
          </el-form-item>
          <el-form-item>
          <el-input placeholder="Email" v-model="search.email" @keyup.enter.native="fetchUsersList">
            <el-button slot="append" icon="fas fa-search" @click="fetchUsersList"></el-button>
          </el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="fas fa-trash-alt" plain @click="resetFilter"></el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>

      <el-dialog
        :title="titleDialog"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <create-user :form="elementToUpdate" @user_created="fetchUsersList" @closedialog="handleClose"></create-user>
      </el-dialog>

    <el-col class="m-t-10">

      <el-table
        v-loading="listLoading"
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
        @pagination="fetchUsersList" />
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
        elementToUpdate: null,
        usersListPage: {
          page: 0,
          per_page: 15,
          total: 0
        },
        dialogStatus: '',
        titleDialog: 'Create User', // Un default y se redefine según la acción
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
          deleteUser(userListData[index].id).then(response => {
            this.fetchUsersList()
          })
        })
      },
      openDialog() {
        this.titleDialog = 'Create User'
        this.elementToUpdate = {}
        this.dialogVisible = true
      },
      handleClose() {
        if (this.elementToUpdate.name) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              this.dialogVisible = false
              this.elementToUpdate = {}
            })
        } else {
          this.dialogVisible = false
          this.elementToUpdate = {}
        }
      },
      fetchUsersList() {
        this.listLoading = true
        const params = Object.assign(this.usersListPage, this.search)

        usersList(params).then(response => {
          this.usersListData = response.data.data
          this.usersListPage = response.data.meta
          this.usersListPage.page = response.data.meta.current_page
          this.listLoading = false
        })
      },
      resetFilter() {
        this.search = {}
        this.fetchUsersList()
      },
      handleUpdate(index, userListData) {
        this.elementToUpdate = userListData[index]
        this.titleDialog = 'Edit User'
        this.dialogVisible = true
      },
      handleCurrentChange(val) {
        this.usersListPage.page = val
        this.fetchUsersList()
      }
    },
    created() {
      this.fetchUsersList()
    }
  }
</script>
<style lang="scss" scoped>

</style>
