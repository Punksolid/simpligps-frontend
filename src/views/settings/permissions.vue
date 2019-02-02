<template>
  <el-row :gutter="10">

    <el-col :span="24">
      <div class="panel bg-white">
        <div class="panel-header">
          <h3 class="m-5"><i class="el-icon-edit p-5"></i>Permissions</h3>
        </div>
        <div class="panel-content p-15">

        <el-form>
            <el-select v-model="emptyUserList" multiple placeholder="Select user" class="m-b-10">
              <el-option
                v-for="userl in usersListData"
                :key="userl.value"
                :label="userl.name"
                :value="userl.id">
              </el-option>
            </el-select>

          <el-form-item>
            <el-radio-group v-model="permissions" v-for="permission in permissions" :key="permission.name" class="p-10 p-l-0">
              <el-radio v-model="permission.name" :label="permission.name" border></el-radio>
            </el-radio-group>
          </el-form-item>

          </el-form>
        </div>

        <div class="panel-footer clearfix">
          <div class="pull-right">
            <button type="button" class="btn btn-white m-r-10">Cancel</button>
            <button type="button" class="btn bg-primary">Save</button>
          </div>
        </div>
      </div>
    </el-col>

    <!--<el-col :span="12">
      <div class="panel bg-white">
        <div class="panel-header">
          <h3 class="m-5"><i class="el-icon-edit p-5"></i><b>Other</b> Permissions</h3>
        </div>
        <div class="panel-content p-15">
          <div>
            <el-checkbox v-model="checked3" label="List Users" border></el-checkbox>
            <el-checkbox v-model="checked4" label="Add User" border></el-checkbox>
          </div>
        </div>
        <div class="panel-footer clearfix">
          <div class="pull-right">
            <button type="button" class="btn btn-white m-r-10">Cancel</button>
            <button type="button" class="btn bg-primary">Save</button>
          </div>
        </div>
      </div>
    </el-col>-->

  </el-row>
</template>

<script>
  import { usersList } from '@/api/users'
  import { getPermissions } from '../../api/general'

  export default {
    name: 'Permissions',
    data() {
      return {
        usersListData: [],
        emptyUserList: '',
        permissions: []
      }
    },
    methods: {
      fetchPermissions() {
        getPermissions().then(response => {
          this.permissions = response.data.data
        })
      },
      fetchUsersList() {
        this.listLoading = true
        usersList(this.usersListData).then(response => {
          this.usersListData = response.data.data
          this.listLoading = false
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
