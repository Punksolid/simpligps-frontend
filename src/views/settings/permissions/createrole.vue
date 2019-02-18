<template>
  <el-col>

    <el-col :xs="24" :sm="14" class="border-right p-20">
      <el-form>
        <el-form-item>
          <p>Create new role:</p>
          <el-input v-model="newRole"></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <el-form>
      <el-col :xs="24" :sm="10" class="p-20">
          <p>Active Roles:</p>
          <el-tag type="success" v-for="role in roles" :key="role.index" class="m-5">{{ role.name }}</el-tag>
      </el-col>

    </el-form>

    <el-col class="t-right p-t-10">
      <el-button type="primary" @click="onSubmit">Create Role</el-button>
    </el-col>
  </el-col>
</template>

<script>
  import { createRole } from '@/api/permissions'
  import { Message } from 'element-ui'

  export default {
    name: 'CreateRoles',
    props: ['roles'],
    data() {
      return {
        rolesListData: [],
        newRole: ''
      }
    },
    methods: {
      onSubmit() {
        this.listLoading = true
        createRole(this.newRole).then(response => {
          this.listLoading = false
          Message({
            message: 'New role: ' + response.data.name + ' created succesfully',
            type: 'success',
            duration: 10 * 1000
          })
          this.newRole = ''
          this.$emit('new_role')
        })
      }
    }
  }
</script>

<style scoped>

</style>
