<template>
<el-row :gutter="10" class="panel p-10">
 <el-col>
   <el-table
     v-loading="dataLoading"
     :data="LogsData"
     style="width: 100%">
     <el-table-column
       prop="id"
       label="ID"
       width="60">
     </el-table-column>
     <el-table-column
       prop="description"
       label="Description"
       width="180">
     </el-table-column>
     <el-table-column
       prop="message"
       label="Message"
       min-width="200">
     </el-table-column>
   </el-table>
 </el-col>

  <el-col class="m-t-5 t-center">
    <el-pagination
      class="dis-inline-b"
      layout="total, prev, pager, next, jumper"
      :current-page.sync="PaginationData.current_page"
      :page-size="PaginationData.per_page"
      :total="PaginationData.total"
      @current-change="handleCurrentChange"
      @pagination="fetchUsersLog" />
  </el-col>
</el-row>
</template>

<script>
  import { getUserLogs } from '../../api/users'

  export default {
      name: 'Logs',
      data() {
        return {
          dataLoading: false,
          LogsData: null,
          PaginationData: {}
        }
      },
      methods: {
        fetchUsersLog() {
          this.dataLoading = true
          const params = Object.assign(this.PaginationData, this.search)

          getUserLogs(params).then(response => {
            this.LogsData = response.data.data
            this.PaginationData = response.data.meta
            this.PaginationData.page = response.data.meta.current_page
            this.dataLoading = false
          })
        },
        handleCurrentChange(val) {
          this.PaginationData.page = val
          this.fetchUsersLog()
        }
      },
      created() {
        this.fetchUsersLog()
      }
    }
</script>

<style scoped>

</style>
