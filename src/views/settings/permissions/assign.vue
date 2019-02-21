<template>
  <el-col>
    <el-form>
      <el-col :xs="24" :sm="10" class="border-right p-20 p-t-0">
        <el-form-item class="m-b-0">
          <p><b>Select a User to assign Roles & Permissions</b></p>
          <el-select v-model="UserToUpdate" placeholder="Select User" class="m-b-10" style="width:95%">
            <el-option
              v-for="user in usersListData"
              :key="user.value"
              :label="user.name"
              :value="user.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <p class="">Assign Roles:</p>
          <el-select v-model="rolesGroup" placeholder="Select a Role" style="width:95%">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
              border>
            </el-option>
          </el-select>
        </el-form-item>

      </el-col>

      <el-col :xs="24" :sm="14" class="p-10">
        <el-form-item>
          <p class="t-center"><b>Assign Custom Permissions:</b></p>
          <el-checkbox-group v-model="permissionsGroup" class="t-center p-10">
            <el-checkbox v-for="permission in permissions" :key="permission.name" :label="permission.name" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-form>
    <el-col class="t-right p-t-10">
      <el-button type="primary" @click="onSubmit" :disabled="(UserToUpdate === '')" :loading="this.Loading">Save Permissions</el-button>
    </el-col>
  </el-col>
</template>

<script>
  import { updatePermissions, setRole } from '@/api/permissions'
  import { usersList } from '@/api/users'
  import { Message } from 'element-ui'

    export default {
      name: 'AssignPermissions',
      props: ['roles', 'permissions'],
      data() {
        return {
          Loading: false,
          usersListData: [],
          UserToUpdate: '',
          permissionsGroup: [],
          rolesGroup: []
        }
      },
      created() {
        this.fetchUsersList()
      },
      methods: {
        fetchUsersList() {
          this.Loading = true
          usersList(this.usersListData).then(response => {
            this.usersListData = response.data.data
            this.Loading = false
          })
        },
        onSubmit() {
          this.Loading = true
          if (this.rolesGroup) {
            setRole(this.rolesGroup, this.UserToUpdate).then(response => {
              this.rolesGroup = response.data.data
              Message({
                message: 'Role for User ID: ' + this.UserToUpdate + ' assigned',
                type: 'success',
                duration: 10 * 1000
              })
            })
          } if (this.permissionsGroup.length > 0) {
            updatePermissions(this.UserToUpdate, this.permissionsGroup).then(response => {
              this.permissions = []
              Message({
                message: 'Permissions for User ID: ' + this.UserToUpdate + ' updated',
                type: 'success',
                duration: 10 * 1000
              })
            })
          } else {
            this.Loading = false
            }
          }
        }
      }
</script>

<style scoped>

</style>
