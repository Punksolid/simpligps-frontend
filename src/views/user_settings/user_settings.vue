<template>
  <div style="background-color: #fff">

    <div style="padding: 30px">
      <el-collapse accordion>
      <el-collapse-item name="1">
        <template slot="title">Password<i class="header-icon el-icon-information"></i></template>
        <password></password>
      </el-collapse-item>
      <el-collapse-item title="Notification settings" name="2">
        <div>
          <span>Notification on-screen</span>
          <el-switch style="display: block"
                     v-model="value3"
                     active-text="On"
                     inactive-text="Off">
          </el-switch>
        </div>
        <div style="margin-top: 30px">
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
        </div>
      </el-collapse-item>
      <el-collapse-item title="Profile customization" name="3">
        <div>
          <span>Upload profile photo</span>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">Only jpg/png files less than 500kb</div>
          </el-upload>
        </div>
        <div>
          <el-button style="margin-top: 30px" type="primary">Save changes</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  </div>
</template>

<script>
  export default {
    methods: {
      open8() {
        this.$confirm('You have not saved changes, continue?', 'Warning', {
          confirmButtonText: 'Save',
          cancelButtonText: 'Delete',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Changes Saved'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Changes deleted'
          })

        })

      }
    }
  }
</script>

<script>
  import Password from './password'

  export default {
    components: { Password },
    methods: {
      open9() {
        this.$confirm('Are you sure you want save changes?', 'Save Changes', {
          confirmButtonText: 'Save',
          cancelButtonText: 'Cancel',
          type: 'info'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Changes Saved'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Changes not saved'
          });

        });

      }
    }
  }
</script>
