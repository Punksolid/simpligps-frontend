<template>
  <el-collapse v-model="active" accordion>

    <el-collapse-item name="1">
      <template slot="title">
        <span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x"></i>
        <i class="fas fa-plus fa-stack-1x fa-inverse"></i></span>
        Create new role
      </template>

      <el-form class="m-t-30">
        <el-form-item>
          <el-input v-model="newRole" placeholder="Role name" style="width: 80%;" class="p-b-10"></el-input>
          <el-button type="primary" @click="onSubmit" :disabled="(this.newRole.trim() === '')">Create</el-button>
        </el-form-item>
      </el-form>
    </el-collapse-item>

    <el-collapse-item name="2">
      <template slot="title">
        <span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x"></i>
        <i class="fas fa-check fa-stack-1x fa-inverse"></i></span>
        Assign permissions to Roles
      </template>

      <el-col class="bg-gray-light p-10 bd-9">
        <h3 class="m-t-5">1. SELECT ROLE</h3>
        <el-select v-model="rolesList" placeholder="Select role to assign permissions" style="width: 50%">
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.name"
            :value="role.id"
            border>
          </el-option>
        </el-select>
      </el-col>

      <el-col class="m-t-5 bg-gray-light p-10 bd-9">
        <span></span>
        <h3 class="m-t-5">2. ASSIGN PERMISSIONS: </h3>
        <el-checkbox-group v-model="permissionsGroup" class="p-r-10 p-b-10">
          <el-checkbox v-for="permission in permissions" :key="permission.name" :label="permission.name" border></el-checkbox>
        </el-checkbox-group>
        <el-button type="primary" @click="RolePermissions" :loading="this.Loading" :disabled="(rolesList === '')">ASSIGN PERMISSIONS</el-button>
      </el-col>
    </el-collapse-item>

    <el-collapse-item name="3">
      <template slot="title">
        <span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x"></i>
        <i class="fas fa-search fa-stack-1x fa-inverse"></i></span>
        View Role Permissions
      </template>

      <el-select v-model="viewRole" @change="fetchRolePermissions" placeholder="Select role to view permissions" style="width: 50%" class="m-t-10">
        <el-option
          v-for="role in roles"
          :key="role.id"
          :label="role.name"
          :value="role.id"
          border>
        </el-option>
      </el-select>

      <el-col class="m-t-10 m-b-10">
          <p v-if="viewRolePermissions.length > 1"><b>Current permissions:</b></p>
          <el-button v-if="(viewRole > 0) & (viewRolePermissions.length <= 0)" type="warning" plain @click="viewRole = ''">No active permissions for this role.</el-button>
        <el-tag
          v-for="permission in viewRolePermissions"
          :key="permission.key"
          type="success"
          class="m-b-5 m-r-5"
        >
          {{ permission.name }}
        </el-tag>
      </el-col>

    </el-collapse-item>

  </el-collapse>
</template>

<script>
  import { getRoles, createRole, setRolePermissions } from '@/api/permissions'
  import { Message } from 'element-ui'

  export default {
    name: 'CreateRoles',
    props: ['roles', 'permissions'],
    data() {
      return {
        active: '1',
        Loading: false,
        newRole: '',
        rolesList: [],
        permissionsGroup: [],
        viewRole: '',
        viewRolePermissions: []
      }
    },
    methods: {
      onSubmit() {
        this.Loading = true
        createRole(this.newRole).then(response => {
          this.Loading = false
          Message({
            message: 'New role: ' + response.data.name + ' created succesfully',
            type: 'success',
            duration: 10 * 1000
          })
          this.newRole = ''
          this.$emit('new_role')
        })
      },
      RolePermissions() {
        this.Loading = true
        setRolePermissions(this.rolesList, this.permissionsGroup).then(response => {
          Message({
            message: 'Permissions assigned to: ' + response.data.name + ' succesfully',
            type: 'success',
            duration: 10 * 1000
          })
          this.rolesList = ''
          this.permissionsGroup = ''
          this.Loading = false
        })
      },
      fetchRolePermissions() {
        this.Loading = true
        getRoles(this.viewRole).then(response => {
          this.viewRolePermissions = response.data.permissions
          this.Loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
