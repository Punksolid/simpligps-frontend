<template>
  <el-col>
    <el-form>
      <el-col :xs="24" :sm="10" class="border-right p-20 p-t-0">
        <el-form-item class="m-b-0">
          <p>Select a User to assign Roles & Permissions</p>
          <el-select v-model="UserToUpdate" placeholder="Select user" class="m-b-10" style="width:90%">
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
          <el-checkbox-group v-model="rolesGroup" size="mini">
            <el-checkbox v-for="role in roles" :key="role.id" :label="role.name" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-col>

      <el-col :xs="24" :sm="14" class="p-10">
        <el-form-item>
          <p class="t-center"><b>Assign Permissions:</b></p>
          <el-checkbox-group v-model="permissions" class="t-center p-10">
            <el-checkbox v-for="permission in permissionsGroup" :key="permission.name" :label="permission.name" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-form>
    <el-col class="t-right p-t-10">
      <el-button type="primary" @click="onSubmit">Save Permissions</el-button>
    </el-col>
  </el-col>
</template>

<script>
  import { getPermissions, updatePermissions } from '@/api/permissions'
  import { usersList } from '@/api/users'
  import { Message } from 'element-ui'

    export default {
      name: 'AssignPermissions',
      props: [
        'roles'
      ],
      data() {
        return {
          usersListData: [],
          UserToUpdate: '',
          permissionsGroup: [],
          permissions: [],
          rolesGroup: []
        }
      },
      methods: {
        fetchPermissions() {
          getPermissions().then(response => {
            this.permissionsGroup = response.data.data
          })
        },
        fetchUsersList() {
          this.listLoading = true
          usersList(this.usersListData).then(response => {
            this.usersListData = response.data.data
            this.listLoading = false
          })
        },
        onSubmit() {
          this.listLoading = true
          updatePermissions(this.UserToUpdate, this.permissions).then(response => {
            this.permissions = response.data.data
            this.listLoading = false
            Message({
              message: 'Permissions for User ID: ' + this.UserToUpdate + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
          })
        }
      },
      created() {
        this.fetchUsersList()
        this.fetchPermissions()
      }
    }
</script>

<style scoped>

</style>
