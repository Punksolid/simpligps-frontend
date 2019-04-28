<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="openDialog" icon="fas fa-clipboard-check p-r-10">New Situation</el-button>
      </el-col>
      <el-col :xl="20" :sm="20" :xs="24">
        <!-- Right Side for Search Options -->
      </el-col>
    </el-row>

    <CreateSituation :form="situationData" :title="titleDialog" :dialogvisible="dialogVisible" @created="fetchSituations" @closedialog="closeDialog"></CreateSituation>

    <el-row>
      <el-col>
        <el-table
          :data="situationsList"
          v-loading="listLoading"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="50px">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            min-width="50px"
          >
          </el-table-column>
          <el-table-column
            label="Operations"
            fixed="right"
            width="130">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="fas fa-edit"
                @click="handleUpdate(scope.$index, scope.row)">
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="fas fa-trash"
                @click.native.prevent="deleteRow(scope.$index, scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-col class="m-t-5 t-center">
      <el-pagination
        class="dis-inline-b"
        layout="total, prev, pager, next, jumper"
        :current-page.sync="situationsListPage.current_page"
        :page-size="situationsListPage.per_page"
        :total="situationsListPage.total"
        @current-change="handleCurrentChange"
        @pagination="situationsList" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateSituation from './create'
  import { situationsList, deleteSituation } from '@/api/situations'

  export default {
    name: 'Situations',
    components: {
      CreateSituation
    },
    data() {
      return {
        dialogVisible: false,
        listLoading: false,
        titleDialog: 'New Situation',
        situationData: {},
        situationsList: [],
        situationsListPage: {}
      }
    },
    methods: {
      fetchSituations() {
        this.dialogVisible = false
        this.listLoading = true

        situationsList(this.situationsList).then(response => {
          this.situationsList = response.data.data
          this.situationsListPage = response.data.meta
          this.situationsListPage.page = response.data.meta.current_page
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      openDialog() {
        this.situationData = {}
        this.titleDialog = 'New Situation'
        this.listLoading = true
        this.dialogVisible = true
      },
      closeDialog() {
        this.listLoading = false
        this.dialogVisible = false
      },
      handleUpdate(index, row) {
        this.listLoading = true
        this.situationData = row
        this.titleDialog = 'Edit Situation'
        this.dialogVisible = true
      },
      deleteRow(index, situationData) {
        this.listLoading = true
        this.$confirm('This will permanently delete Situation: ' + situationData.name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteSituation(situationData.id).then(resp => {
            this.$message.error('Situation: ' + resp.data.data.name + ' deleted.')
            this.fetchSituations()
          }).catch(() => {
            this.listLoading = false
          })
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.situationsListPage.page = val
        this.fetchSituations()
      }
    },
    created() {
      this.fetchSituations()
    }
  }
</script>

<style scoped>

</style>
