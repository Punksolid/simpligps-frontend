<template>
  <el-row class="bg-white">

    <el-col class="p-30">
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x"></i>
            <i class="fas fa-key fa-stack-1x fa-inverse"></i></span>Change Password
          </template>
          <el-col :span="10" :xs="24" class="p-10">
            <Password/>
          </el-col>
        </el-collapse-item>

        <el-collapse-item>
          <template slot="title">
            <span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x"></i>
            <i class="fas fa-list fa-stack-1x fa-inverse"></i></span>My permissions
          </template>
          <el-col class="p-10">
            Current permissions:
              <el-tag v-for="permission in permissions" :key="permission.name">{{ permission.name }}</el-tag>
          </el-col>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title"><span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x"></i>
            <i class="fas fa-comment-alt fa-stack-1x fa-inverse"></i></span>Notification settings</template>
          <el-row>
          <el-col class="m-10">
            <span>Notification on-screen</span>
            <el-switch
                style="display: block"
                v-model="value3"
                active-text="On"
                inactive-text="Off">
            </el-switch>
          </el-col>
          <el-col class="m-10">
            <span>Notifiaction alert sound</span>
            <el-switch
              style="display: block"
              v-model="value4"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Sound on"
              inactive-text="Sound off">
            </el-switch>
            <el-button style="margin-top: 30px" type="primary">Save changes</el-button>
          </el-col>
          </el-row>
        </el-collapse-item>

        <el-collapse-item name="3">
          <template slot="title"><span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x"></i>
            <i class="fas fa-tools fa-stack-1x fa-inverse"></i></span> Profile customization</template>
          <el-row>
            <el-col class="m-10">
              <!-- Content Here -->
              <el-button style="margin-top: 30px" type="primary">Save changes</el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script>
  import Password from '@/views/user_settings/password'
  import { getMyPermissions } from '@/api/me'

  export default {
    name: 'UserSettings',
    components: {
      Password
    },
    data() {
      return {
        form: {},
        permissions: [],
        myPermissions: [
          { name: 'list_user' },
          { name: 'edit_users' }
        ],
        value3: '',
        value4: ''
      }
    },
    methods: {
      fetchMyPermissions() {
        this.listLoading = true
        getMyPermissions(this.permissions).then(response => {
          this.permissions = response.data.data
          this.listLoading = false
        })
        console.log(this.permissions + ' Finished')
      },
      submitX() {
        this.$confirm('Are you sure you want save changes?', 'Save Changes', {
          confirmButtonText: 'Save',
          cancelButtonText: 'Cancel',
          type: 'info'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Changes Saved'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Changes not saved'
          })
        })
      }
    },
    created() {
      this.fetchMyPermissions()
    }
  }
</script>
<style>
</style>
