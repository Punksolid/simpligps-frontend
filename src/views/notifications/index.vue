<template>
    <el-row class="panel p-10 p-t-0">
        <el-row type="flex" justify="space-between">
            <el-button
                    type="primary"
                    class="m-10 m-l-0"
                    @click="dialogVisible = true"
                    icon="fas fa-bell p-r-10"
            >Create notification
            </el-button>
        </el-row>

        <el-dialog
                title="Create Notification"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose"
        >
            <CreateNotification @created="getNotifications()" @closedialog="dialogVisible = false"></CreateNotification>
        </el-dialog>

        <el-col>
            <el-table v-loading="loading" :data="notifications_list" stripe style="width: 100%">
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
                <el-table-column prop="active" label="Actions">
                    <template slot-scope="scope">
                        <el-tag type="primary">{{ scope.row.active ? 'Active':'Inactive' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Operations" width="150" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="danger"
                                @click="deleteNotification(scope.$index, scope.row)"
                                icon="fas fa-trash"
                        >Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col class="m-t-5 t-center">
            <pagination v-show="total>0" :total="total" :page.sync="paginationQuery.page"
                        :limit.sync="paginationQuery.limit" @pagination="getNotifications"/>
        </el-col>
    </el-row>
</template>

<script>
    import CreateNotification from '@/views/notifications/create.vue'
    import {destroyNotification} from '../../api/general'
    import {fetchNotificationTriggers} from '../../api/notifications'
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
                notifications_list: [],
                dialogVisible: false,
                centerDialogVisible: false,
                loading: false,
                total: 0,
                paginationQuery: {
                    current_page: 1,
                    limit: 20
                }
            }
        },
        methods: {
            getNotifications() {
                this.dialogVisible = false
                this.loading = true
                // getWialonNotifications().then(response => {
                //   this.notifications_list = response.data.data
                //   this.loading = false
                // })
                fetchNotificationTriggers(this.paginationQuery).then(response => {
                    this.notifications_list = response.data.data
                    this.total = response.data.meta.total
                    this.loading = false
                })
            },
            handleClose(done) {
                this.$confirm('Are you sure to close? Not saved data will be lost!')
                    .then(_ => {
                        done()
                    })
                    .catch(_ => {
                    })
            },
            deleteNotification(index, row) {
                this.loading = true
                destroyNotification(row.id)
                    .then(response => {
                        this.getNotifications()
                    })
                    .catch(response => {
                        console.log(response.data)
                        this.loading = false
                    })
                // this.deleteNotification()
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
