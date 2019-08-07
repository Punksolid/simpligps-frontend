<template>
  <el-row class="panel p-10">
    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="openDialog()" icon="fas fa-user-plus p-r-10">Create Operator</el-button>
      </el-col>
      <el-col :xl="20" :sm="20" :xs="24">
        <el-form class="dis-flex" v-model="search">
          <el-form-item>
            <el-input placeholder="Name" v-model="search.name" @keyup.enter.native="handleFilter"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Phone" v-model="search.phone" @keyup.enter.native="handleFilter">
              <el-button slot="append" icon="fas fa-search" @click="handleFilter"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip :content="'Operator Status'" placement="top">
              <el-switch
                v-model="search.active"
                active-color="#13ce66"
                inactive-color="#909399"
                active-value="true"
                inactive-value="false">
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button icon="fas fa-trash-alt" plain @click="fetchOperators"></el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <CreateOperator :title="titleDialog" :dialogvisible="dialogVisible" :form="elementToUpdate" @operatorcreated="fetchOperators" @closedialog="closeDialog()"></CreateOperator>

    <el-col>
      <el-table
      :data="operatorsList"
      stripe
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        sortable>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone"
        width="180">
      </el-table-column>
      <el-table-column
      prop="active"
      label="Status"
      width="120">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.active ? 'success' : 'info' "
          disable-transitions>
          {{ scope.row.active ? 'Active' : 'Inactive' }}
        </el-tag>
      </template>
      </el-table-column>
        <el-table-column
          label="Operations"
          fixed="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, operatorsList)"
              icon="fas fa-edit"/>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, operatorsList)"
              type="danger"
              size="mini"
              icon="fas fa-trash"/>
          </template>
        </el-table-column>

    </el-table>
  </el-col>

    <el-col class="m-t-5 t-center">
      <el-pagination
        class="dis-inline-b"
        :current-page.sync="operatorsListPage.current_page"
        :total="operatorsListPage.total"
        :page-size="operatorsListPage.per_page"
        @current-change="handleCurrentChange"
        @pagination="fetchOperators" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateOperator from '@/views/catalogs/operators/create'
  import { getOperators, deleteOperator } from '@/api/operators'

  export default {
    name: 'OperatorsList',
    components: {
      CreateOperator
    },
    data() {
      return {
        listLoading: false,
        search: {
          name: '',
          phone: ''
        },
        operatorsList: [],
        operatorsListPage: {
          page: 0,
          from: 0,
          last_page: 0,
          per_page: 15,
          to: 0,
          total: 0
        },
        titleDialog: 'Create Operator',
        elementToUpdate: {
          active: true
        },
        dialogVisible: false
      }
    },
    methods: {
      filterTag(value, row) {
        alert(value)
        return row.tag === value
      },
      handleFilter() {
        this.listLoading = true
        getOperators(this.search).then(response => {
          this.operatorsListPage = response.data.meta
          this.operatorsListPage.page = response.data.meta.current_page
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      },
      fetchOperators() {
        this.listLoading = true
        this.dialogVisible = false
        this.search = {}
        getOperators(this.operatorsListPage).then(response => {
          this.operatorsListPage = response.data.meta
          this.operatorsListPage.page = response.data.meta.current_page
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      },
      openDialog() {
        this.titleDialog = 'Create Operator'
        this.listLoading = true
        this.elementToUpdate = { active: true }
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
        this.listLoading = false
      },
      handleUpdate(index, operatorsList) {
        this.elementToUpdate = operatorsList[index]
        this.listLoading = true
        this.titleDialog = 'Edit Operator'
        this.dialogVisible = true
      },
      deleteRow(index, operatorData) {
        this.listLoading = true
        this.$confirm('This will permanently delete operator: ' + operatorData[index].name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          center: true,
          type: 'warning'
        }).then(() => {
          deleteOperator(operatorData[index].id).then(_ => {
            this.fetchOperators()
            this.$message.error('Operator deleted')
          }).catch(resp => {
            this.$message.error(resp.meta)
          })
          this.listLoading = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.operatorsListPage.page = val
        this.fetchOperators()
      }
      // fetchOperatorsList() {
      //   this.dialogVisible = false
      //   this.elementToUpdate = {}
      //   this.listLoading = true
      //   getOperators(this.operatorsListPage).then(response => {
      //     this.operatorsList = response.data.data
      //     this.listLoading = false
      //   })
      // }
    },
    created() {
      // this.fetchOperatorsList()
      this.fetchOperators()
      }
    }
</script>

<style scoped>

</style>
