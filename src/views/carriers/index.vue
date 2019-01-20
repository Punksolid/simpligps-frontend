<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create Carrier</el-button>

    <el-dialog
      title="Create carrier"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
            <createCarrier></createCarrier>
      </span>
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">Cancel</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>-->
      <!--</span>-->

    </el-dialog>
<div style="margin-top: 30px">

    <el-table
      :data="carriersList"
      border
      style="width: 80%">
      <el-table-column
        prop="carrier_name"
        label="Carrier Name"
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
        label="e-Mail">
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
  import createCarrier from './create.vue'
  import { getCarriers } from '../../api/general'

  export default {
    name: 'CarrierList',
    components: {
      createCarrier
    },
    data() {
      return {
        carriersList: [],
        dialogVisible: false
      }
    },
    params: {
      return: {
        tableData4: []
      }
    },
    methods: {
      fetchCarriersList() {
        this.listLoading = true
        getCarriers(this.carriersListData).then(response => {
          console.log(response.data.data)
          this.carriersList = response.data.data
          this.listLoading = false
        })
      }
    },
    created() {
      this.fetchCarriersList()
    }
    }

</script>

<style scoped>

</style>
