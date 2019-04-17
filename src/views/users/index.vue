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

    <create-user :title="titleDialog" :form="elementToUpdate" :dialogvisible="dialogVisible" @created="fetchUsersList" @closedialog="closeDialog"></create-user>

    <el-col class="m-t-10">

      <el-table
        v-loading="listLoading"
        :data="usersListData"
        stripe>
        <el-table-column
          prop="name"
          label="Name"
          sortable
          min-width="280">
        </el-table-column>
        <el-table-column
          prop="lastname"
          label="Lastname"
          sortable
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          sortable
          min-width="300">
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
  import { deleteUser } from '../../api/users'

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
          per_page: 15,
          total: 0
        },
        dialogStatus: '',
        titleDialog: 'Create User',
        dialogVisible: false
      }
    },
    methods: {
      deleteRow(index, userListData) {
        console.log(index)
        this.listLoading = true
        this.$confirm('This will permanently delete the user: ' + userListData[index].name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteUser(userListData[index].id).then(response => {
            this.$message.error('User: ' + userListData[index].name + ' deleted.')
            this.fetchUsersList()
          }).catch(() => {
            this.listLoading = false
          })
        }).catch(() => {
          this.listLoading = false
        })
      },
      openDialog() {
        this.listLoading = true
        this.titleDialog = 'Create User'
        this.elementToUpdate = {}
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
        this.listLoading = false
      },
      fetchUsersList() {
        this.dialogVisible = false
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
