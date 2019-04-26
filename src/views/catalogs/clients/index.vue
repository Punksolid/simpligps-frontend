<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">

      <el-col class="m-b-5" :xl="4" :sm="4" :xs="24">
        <el-button type="primary" @click="openDialog" icon="fas fa-user-plus p-r-10">New Client</el-button>
      </el-col>

      <el-col :xl="20" :sm="20" :xs="24">
      </el-col>

    </el-row>

    <create-client :title="titleDialog" :form="formData" :dialogvisible="dialogVisible" @created="fetchClientsList" @closedialog="closeDialog"></create-client>

    <el-col class="m-t-10">

      <el-table
        v-loading="listLoading"
        :data="clientsListData"
        stripe>
        <el-table-column
          prop="company_name"
          label="Company Name"
          sortable
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          sortable
          min-width="280">
        </el-table-column>
        <el-table-column
          prop="address"
          label="Address"
          sortable
          min-width="300">
        </el-table-column>
        <el-table-column
          prop="city"
          label="City"
          sortable
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="state"
          label="State"
          sortable
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="Phone"
          sortable
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          sortable
          min-width="200">
        </el-table-column>
          <el-table-column
            prop="contact"
            label="Contact"
            sortable
            min-width="200">
          </el-table-column>
        <el-table-column
          label="Operations"
          fixed="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              icon="fas fa-edit">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
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
        :current-page.sync="clientsListPage.current_page"
        :page-size="clientsListPage.per_page"
        :total="clientsListPage.total"
        @current-change="handleCurrentChange"
        @pagination="fetchClientsList" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateClient from './create.vue'
  import { clientsList } from '@/api/clients'
  import { deleteClient } from '@/api/clients'

  export default {
    name: 'Clients',
    components: {
      CreateClient
    },
    data() {
      return {
        clientsListData: null,
        listLoading: true,
        formData: {},
        clientsListPage: {
          page: 0,
          per_page: 15,
          total: 0
        },
        dialogStatus: '',
        titleDialog: 'New Client',
        dialogVisible: false
      }
    },
    methods: {
      deleteRow(index, clientData) {
        this.listLoading = true
        this.$confirm('This will permanently delete the client: ' + clientData.company_name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteClient(clientData.id).then(response => {
            this.$message.error('Client: ' + clientData.company_name + ' deleted.')
            this.fetchClientsList()
          }).catch(() => {
            this.listLoading = false
          })
        }).catch(() => {
          this.listLoading = false
        })
      },
      openDialog() {
        this.listLoading = true
        this.titleDialog = 'New Client'
        this.formData = { status: 0 }
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
        this.listLoading = false
      },
      fetchClientsList() {
        this.dialogVisible = false
        this.listLoading = true
        const params = Object.assign(this.clientsListPage, this.search)

        clientsList(params).then(response => {
          this.clientsListData = response.data.data
          this.clientsListPage = response.data.meta
          this.clientsListPage.page = response.data.meta.current_page
          this.listLoading = false
        })
      },
      resetFilter() {
        this.search = {}
        this.fetchClientsList()
      },
      handleUpdate(index, clientData) {
        this.formData = clientData
        this.titleDialog = 'Edit Client'
        this.dialogVisible = true
      },
      handleCurrentChange(val) {
        this.clientsListPage.page = val
        this.fetchClientsList()
      }
    },
    created() {
      this.fetchClientsList()
    }
  }
</script>
<style lang="scss" scoped>

</style>
