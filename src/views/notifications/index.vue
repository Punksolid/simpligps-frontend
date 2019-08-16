<template>
    <el-row class="panel p-10 p-t-0">
        <el-row type="flex" justify="space-between">
            <el-button
                    type="primary"
                    class="m-10 m-l-0"
                    @click="openDialog"
                    icon="fas fa-bell p-r-10"
            >Create notification
            </el-button>
        </el-row>

        <CreateNotification v-if="dialogVisible" :dialogvisible="dialogVisible" @created="getNotifications()" @closedialog="closeDialog"/>

        <el-col>
            <el-table v-loading="listLoading" :data="notifications_list" stripe style="width: 100%">
                <el-table-column prop="name" label="Name" width="180"></el-table-column>
                <el-table-column prop="control_type" label="Control Type" width="180"></el-table-column>
                <el-table-column prop="level" label="Level">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.level"
                                disable-transitions>{{scope.row.level}}
                        </el-tag>
                    </template>

                </el-table-column>
                <el-table-column prop="active" label="Status">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.active ? 'success':'info'">{{ scope.row.active ? 'Active':'Inactive' }}</el-tag>
                    </template>
                </el-table-column>
              <el-table-column prop="devices" label="Devices" min-width="150"></el-table-column>
                <el-table-column label="Operations" width="150" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="danger"
                                @click="deleteNotification(scope.$index, scope.row)"
                                icon="fas fa-trash"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col class="p-0">
            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="paginationQuery.page"
              :limit.sync="paginationQuery.limit"
              @pagination="getNotifications"/>
        </el-col>
    </el-row>
</template>

<script>
    import CreateNotification from '@/views/notifications/create.vue'
    import { destroyNotification } from '../../api/general'
    import { fetchNotificationTriggers } from '../../api/notifications'
    // import { Pagination } from 'element-ui'
    import Pagination from '@/components/Pagination/index.vue'
    // import Pagination from "../../components/Pagination/index.vue"; // Secondary package based on el-pagination

    export default {
        name: 'NotificationsList',
        components: {
            CreateNotification,
            Pagination
        },
        data() {
            return {
              listLoading: false,
              dialogVisible: false,
              notifications_list: [],
              centerDialogVisible: false,
              total: 0,
              paginationQuery: {
                  limit: 20
              }
            }
        },
        methods: {
          getNotifications() {
              this.dialogVisible = false
              this.listLoading = true
              fetchNotificationTriggers(this.paginationQuery).then(response => {
                  this.notifications_list = response.data.data
                  this.total = response.data.meta.total
              }).finally(() => {
                this.listLoading = false
              })
          },
          deleteNotification(index, row) {
            this.listLoading = true
            this.$confirm('This will permanently delete Notification named: ' + row.name + '. Continue?', 'Warning', {
              center: true,
              type: 'warning'
            }).then(() => {
              destroyNotification(row.id)
                .then(response => {
                  this.$message.error(response.data.message)
                  this.getNotifications()
                }).catch(_ => {
                  this.listLoading = false
                })
            }).catch(() => {
              this.listLoading = false
              this.$message({
                type: 'info',
                message: 'Delete canceled'
              })
            })
          },
          openDialog() {
            this.listLoading = true
            this.dialogVisible = true
          },
          closeDialog() {
            this.listLoading = false
            this.dialogVisible = false
          },
          pagination(val) {
              this.getNotifications()
          }
        },
        created() {
            this.getNotifications()
        }
    }
</script>

<style scoped>
    h1,
    h2 {
        text-align: center;
    }
</style>
