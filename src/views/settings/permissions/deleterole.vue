<template>
  <el-row>
    <el-col :xs="24" :sm="14" class="border-right p-20">
      <el-form>
        <p><b>Select a role to delete:</b></p>
        <el-form-item class="float-md-left">
          <el-select v-model="RoleToDelete" placeholder="Select a role" style="width:70%" class="m-b-5">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.id">
            </el-option>
          </el-select>
          <el-button type="danger" @click="onSubmit" :disabled="(this.RoleToDelete == '')" :loading="this.Loading">Delete</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :xs="24" :sm="10" class="p-20 p-t-0">
      <p>Active Roles:</p>
      <el-tag type="success" v-for="role in roles" :key="role.index" class="m-l-5 m-b-5">{{ role.name }}</el-tag>
    </el-col>

  </el-row>
</template>

<script>
  import { deleteRole } from '../../../api/permissions'

  export default {
    name: 'DeleteRole',
      props: ['roles'],
      data() {
          return {
            Loading: false,
            RoleToDelete: ''
          }
      },
      methods: {
            onSubmit(done) {
              this.Loading = true
              this.$confirm('This will permanently delete the role: are you sure to Continue?', 'Warning', {
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                confirmButtonClass: 'btn-danger',
                type: 'warning'
              }).then(_ => {
                deleteRole(this.RoleToDelete).then(response => {
                  this.RoleToDelete = ''
                  this.$message({
                    type: 'success',
                    message: 'Deleted Role Succesfully'
                  })
                  this.$emit('deleted_role')
                  this.Loading = false
                })
              }).catch(_ => {
                this.Loading = false
              })
          }
      }
    }
</script>

<style scoped>

</style>
