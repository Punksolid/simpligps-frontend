<template>
  <el-row>
    <el-col :span="24" class="panel">

        <div class="panel-content p-0">

          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="fas fa-user-check"></i> Assign</span>
              <AssignPermissions :roles="this.roles" :permissions="this.permissions"/>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="fas fa-folder-plus"></i> Create Role</span>
              <CreateRole :roles="this.roles" :permissions="this.permissions" @new_role="fetchRoleList"/>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="fas fa-folder-minus"></i> Delete Role</span>
              <DeleteRole :roles="this.roles" @deleted_role="fetchRoleList"/>
            </el-tab-pane>
          </el-tabs>

        </div>

    </el-col>
  </el-row>
</template>

<script>
  import AssignPermissions from '@/views/settings/permissions/assign'
  import CreateRole from '@/views/settings/permissions/createrole'
  import DeleteRole from '@/views/settings/permissions/deleterole'
  import { getRoles, getPermissions } from '@/api/permissions'

  export default {
    name: 'Permissions',
    components: {
      AssignPermissions,
      CreateRole,
      DeleteRole
    },
    data() {
      return {
        roles: '',
        permissions: []
      }
    },
    methods: {
      fetchRoleList() {
        this.listLoading = true
        getRoles('').then(response => {
          this.roles = response.data
          this.listLoading = false
        })
      },
      fetchPermissions() {
        getPermissions().then(response => {
          this.permissions = response.data.data
        })
      }
    },
    created() {
      this.fetchRoleList()
      this.fetchPermissions()
    }
  }
</script>

<style scoped>

</style>
