<template>
  <el-row class="panel p-10">

    <el-row class="searchBar m-b-10">
      <el-col>
        <el-button type="primary" @click="openDialog" icon="fas fa-truck p-r-10">New Carrier</el-button>
      </el-col>
    </el-row>

    <CreateCarrier :form="formData" :title="titleDialog" :dialogvisible="dialogVisible" @closedialog="closeDialog" @created="getCarriersList"/>

  <el-col>
    <el-table
      :data="carriersList"
      stripe
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column
        prop="carrier_name"
        label="Carrier Name"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="contact_name"
        label="Contact Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="E-mail">
      </el-table-column>
      <el-table-column
        label="Operations"
        fixed="right"
        width="130">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleUpdate(scope.row)"
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
      :current-page.sync="carriersListPage.current_page"
      :page-size="carriersListPage.per_page"
      :total="carriersListPage.total"
      @current-change="handleCurrentChange"
      @pagination="getCarriersList" />
  </el-col>

  </el-row>
</template>

<script>
  import CreateCarrier from './create.vue'
  import { fetchCarriers, deleteCarrier } from '@/api/carriers'

  export default {
    name: 'CarrierList',
    components: {
      CreateCarrier
    },
    data() {
      return {
        carriersList: [],
        carriersListPage: {},
        formData: {},
        listLoading: false,
        titleDialog: 'Create Carrier',
        dialogVisible: false
      }
    },
    methods: {
      getCarriersList() {
        this.formData = {}
        this.dialogVisible = false
        this.listLoading = true
        fetchCarriers(this.carriersListPage).then(response => {
          this.carriersList = response.data.data
          this.carriersListPage = response.data.meta
          this.carriersListPage.page = response.data.meta.current_page
          this.listLoading = false
        })
      },
      handleUpdate(carrierData) {
        this.formData = carrierData
        this.titleDialog = 'Edit Carrier'
        this.listLoading = true
        this.dialogVisible = true
      },
      deleteRow(index, carrierData) {
        this.$confirm('This will permanently delete the carrier: ' + carrierData.carrier_name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          type: 'warning'
        }).then(() => {
          deleteCarrier(carrierData.id).then(resp => {
            this.getCarriersList()
            this.$message({
              type: 'success',
              message: 'Delete carrier completed'
            })
          }).catch(resp => {
            this.$message({
              type: 'info',
              message: 'Carrier not deleted'
            })
          })
        })
      },
      openDialog() {
        this.formData = {}
        this.titleDialog = 'New Carrier'
        this.listLoading = true
        this.dialogVisible = true
      },
      closeDialog() {
        this.listLoading = false
        this.dialogVisible = false
      },
      handleCurrentChange(val) {
        this.carriersListPage.page = val
        this.getCarriersList()
      }
    },
    created() {
      this.getCarriersList()
    }
  }

</script>

<style scoped>

</style>
