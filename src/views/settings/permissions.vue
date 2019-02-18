<template>
  <el-row>
    <el-col :span="24" class="panel">

        <div class="panel-content p-0">

          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="fas fa-user-check"></i> Assign</span>
              <AssignPermissions :roles="this.roles"/>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="fas fa-folder-plus"></i> Create Role</span>
              <CreateRole :roles="this.roles" @new_role="fetchRoleList"/>
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
  import { getRoles } from '@/api/permissions'

  export default {
    name: 'Permissions',
    components: {
      AssignPermissions,
      CreateRole,
      DeleteRole
    },
    data() {
      return {
        roles: []
      }
    },
    methods: {
      fetchRoleList() {
        this.listLoading = true
        getRoles(this.roles).then(response => {
          this.roles = response.data
          this.listLoading = false
        })
      }
    },
    created() {
      this.fetchRoleList()
    }
  }
</script>

<style scoped>

</style>
