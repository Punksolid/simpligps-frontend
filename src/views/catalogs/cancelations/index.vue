<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="openDialog" icon="fas fa-clipboard-check p-r-10">New Reason</el-button>
      </el-col>
      <el-col :xl="20" :sm="20" :xs="24">
        <!-- Right Side for Search Options -->
      </el-col>
    </el-row>

    <CreateReason :form="reasonData" :title="titleDialog" :dialogvisible="dialogVisible" @created="fetchReasons" @closedialog="closeDialog"/>

    <el-row>
      <el-col>
        <el-table
          :data="reasonsList"
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
        :current-page.sync="reasonsListPage.current_page"
        :page-size="reasonsListPage.per_page"
        :total="reasonsListPage.total"
        @current-change="handleCurrentChange"
        @pagination="fetchReasons" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateReason from './create'
  import { reasonsList, deleteReason } from '@/api/reasons'

  export default {
    name: 'CanselationReasons',
    components: {
      CreateReason
    },
    data() {
      return {
        dialogVisible: false,
        listLoading: false,
        titleDialog: 'New Reason',
        reasonData: {},
        reasonsList: [],
        reasonsListPage: {}
      }
    },
    methods: {
      fetchReasons() {
        this.dialogVisible = false
        this.listLoading = true
        reasonsList(this.reasonsListPage).then(response => {
          this.reasonsList = response.data.data
          this.reasonsListPage = response.data.meta
          this.reasonsListPage.page = response.data.meta.current_page
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      openDialog() {
        this.reasonData = {}
        this.titleDialog = 'New Canselation Reason'
        this.listLoading = true
        this.dialogVisible = true
      },
      closeDialog() {
        this.listLoading = false
        this.dialogVisible = false
      },
      handleUpdate(index, row) {
        this.listLoading = true
        this.reasonData = row
        this.titleDialog = 'Edit Canselation Reason'
        this.dialogVisible = true
      },
      deleteRow(index, reasonData) {
        this.listLoading = true
        this.$confirm('This will permanently delete Reason: ' + reasonData.name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteReason(reasonData.id).then(resp => {
            this.$message.error('Reason: ' + resp.data.data.name + ' deleted.')
            this.fetchReasons()
          }).catch(() => {
            this.listLoading = false
          })
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.reasonsListPage.page = val
        this.fetchReasons()
      }
    },
    created() {
      this.fetchReasons()
    }
  }
</script>

<style scoped>

</style>
