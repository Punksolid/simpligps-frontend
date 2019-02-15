<template>
  <el-row class="panel p-10">

    <el-row class="searchBar m-b-10">
      <el-col>
        <el-button type="primary" @click="dialogVisible = true" icon="fas fa-truck p-r-10">Create Carrier</el-button>
      </el-col>
    </el-row>

    <el-dialog
      title="Create carrier"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="35%">
            <CreateCarrier @closedialog="dialogVisible = false"></CreateCarrier>
    </el-dialog>

  <el-col>
    <el-table
      :data="carriersList"
      stripe
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
    </el-table>
  </el-col>

  </el-row>
</template>

<script>
  import CreateCarrier from './create.vue'
  import { getCarriers } from '../../api/general'

  export default {
    name: 'CarrierList',
    components: {
      CreateCarrier
    },
    data() {
      return {
        carriersList: [],
        dialogVisible: false
      }
    },
    methods: {
      fetchCarriersList() {
        this.listLoading = true
        getCarriers(this.carriersListData).then(response => {
          this.carriersList = response.data.data
          this.listLoading = false
        })
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?').then(_ => {
          done()
        })
          .catch(_ => {})
      }
    },
    created() {
      this.fetchCarriersList()
    }
  }

</script>

<style scoped>

</style>
