<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">

      <el-col class="m-b-5" :xl="4" :sm="4" :xs="24">
        <el-button type="primary" @click="openDialog" icon="fas fa-truck-loading p-r-10">New TrailerBox</el-button>
      </el-col>

    </el-row>

    <create-trailerbox
      v-if="dialogVisible"
      :title="titleDialog"
      :dialogvisible="dialogVisible"
      :form="elementToUpdate"
      @created="fetchTrailerboxList"
      @closedialog="closeDialog"/>

    <el-col class="m-t-10">

      <el-table
        v-loading="listLoading"
        :data="trailerboxListData"
        ref="TrailerboxTable"
        stripe>
        <el-table-column
          prop="plate"
          label="Plate"
          width="220">
        </el-table-column>
        <el-table-column
          prop="internal_number"
          label="Int. Number"
          sortable
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="carrier_name"
          label="Carrier"
          sortable
          min-width="100">
        </el-table-column>
        <el-table-column
          label="Operations"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, trailerboxListData)"
              icon="fas fa-edit">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, trailerboxListData)"
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
        :current-page.sync="trailerboxListPage.current_page"
        :page-size="trailerboxListPage.per_page"
        :total="trailerboxListPage.total"
        @current-change="handleCurrentChange"
        @pagination="fetchTrailerboxList" />
    </el-col>

  </el-row>
</template>

<script>
  import CreateTrailerbox from './create.vue'
  import { trailerboxList, deleteTrailerBox } from '@/api/trailerbox'

  export default {
    name: 'Trailerbox',
    components: {
      CreateTrailerbox
    },
    data() {
      return {
        expandRowKeys: [],
        trailerboxListData: [],
        trailerboxData: {},
        listLoading: false,
        elementToUpdate: null,
        trailerboxListPage: {
          page: 0,
          per_page: 15,
          total: 0
        },
        titleDialog: 'Create Trailerbox',
        dialogVisible: false
      }
    },
    methods: {
      deleteRow(index, trailerboxData) {
        this.listLoading = true
        this.$confirm('This will permanently delete the Trailerbox: ' + trailerboxData[index].plate + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteTrailerBox(trailerboxData[index].id).then(response => {
            this.$message('Trailerbox with plate: ' + trailerboxData[index].plate + ' deleted.')
            this.fetchTrailerboxList
          })
        })
      },
      openDialog() {
        this.titleDialog = 'Create Trailerbox'
        this.listLoading = true
        this.elementToUpdate = {}
        this.dialogVisible = true
      },
      closeDialog() {
        this.listLoading = false
        this.dialogVisible = false
      },
      fetchTrailerboxList() {
        this.dialogVisible = false
        this.listLoading = true

        trailerboxList(this.trailerboxListPage).then(response => {
          this.trailerboxListData = response.data.data
          this.trailerboxListPage = response.data.meta
          this.trailerboxListPage.page = response.data.meta.current_page
          this.listLoading = false
        })
      },
      handleUpdate(index, trailerboxData) {
        this.listLoading = true
        this.elementToUpdate = trailerboxData[index]
        this.titleDialog = 'Edit Trailerbox'
        this.dialogVisible = true
      },
      handleCurrentChange(val) {
        this.trailerboxListPage.page = val
        this.fetchTrailerboxList()
      }
    },
    created() {
      this.fetchTrailerboxList()
    }
  }
</script>
<style lang="scss" scoped>
  .trucktable {
    .panel {
      box-shadow: none;
    }
    h3 {
      font-weight: 600;
      margin: 3px 0px 10px;
    }
    .name {
      background: #e5e5e5;
      padding: 10px;
      border-radius: 5px;
    }
    p {
      margin: 3px 0px;
    }
  }
</style>
