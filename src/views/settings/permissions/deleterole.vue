<template>
  <el-form>
    <el-form-item label="Select a role to delete:">
      <el-select v-model="RoleToDelete" placeholder="Select role">
        <template slot-scope="scope">
        <el-option
          v-for="role in roles"
          :key="role.id"
          :label="role.name"
          :value="role.id">
        </el-option>
        </template>
      </el-select>
    </el-form-item>

    <el-col class="t-right">
      <el-button type="danger" @click="onSubmit">Delete Role</el-button>
    </el-col>

  </el-form>
</template>

<script>
  import { deleteRole } from '../../../api/permissions'

  export default {
    name: 'DeleteRole',
      props: ['roles'],
      data() {
          return {
            RoleToDelete: []
          }
      },
      methods: {
            onSubmit() {
              this.$confirm('This will permanently delete the role: are you sure to Continue?', 'Warning', {
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                confirmButtonClass: 'btn-danger',
                type: 'warning'
              }).then(() => {
                deleteRole(this.RoleToDelete).then(response => {
                console.log(response.data)
                })
                this.$message({
                  type: 'success',
                  message: 'Deleted Role succesfully'
                })
                this.$emit('deleted_role')
              })
          }
      }
    }
</script>

<style scoped>

</style>
