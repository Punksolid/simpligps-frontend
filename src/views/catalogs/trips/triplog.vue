<template>
  <el-dialog
    :title="'Trip log: ' + tripdata.id "
    :visible.sync="dialogvisible"
    width="80%"
    :before-close="handleClose">
    <el-table
      :data="tableMock"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="action"
        label="Action"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="Date">
      </el-table-column>
    </el-table>
    <el-col> <!-- Delete after success response -->
      <p><strong>Log response:</strong> {{ log }}</p>
    </el-col> <!-- Delete after success response -->
    <div slot="footer" class="text-center">
      <el-button type="primary" plain @click="handleClose">Close</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchTripLog } from '../../../api/trips'

  export default {
      name: 'TripLog',
      props: {
        tripdata: {
          type: Object,
          required: true
        },
        dialogvisible: {
          type: Boolean,
          required: true
        }
      },
    data() {
        return {
          log: [],
          tableMock: [
            { date: '2016-05-02', id: '2', action: 'Destination modified' },
            { date: '2019-04-01', id: '1', action: 'Trip created' }
            ]
        }
    },
      methods: {
        handleClose() {
            this.$emit('closedialog')
          }
      },
      created() {
        fetchTripLog(this.tripdata.id).then(resp => {
          this.log = resp.data.data
        }).catch(() => {})
        }
    }
</script>

<style scoped>

</style>
