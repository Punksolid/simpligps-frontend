<template>
  <div>
    <el-button id="open-import" type="primary" @click="openDialog = true">Import Spreadsheet</el-button>
    <el-dialog
      title="Import an excel file"
      :visible.sync="openDialog"
      width="30%"
      center>
      <span>
<!--        <el-button id="download-layout" @click="downloadLayout()"><i class="el-icon-arrow-down"></i></el-button>-->
        <el-upload
          class="upload-demo"
          name="trips"
          :action="upload_url"
          :headers="headers"
          :on-error="errorResponse"
          :on-success="onSuccessUpload"
          multiple>
          <el-button size="small" type="primary">Click to upload</el-button>
          <div slot="tip" class="el-upload__tip">xlsx files less than 1.5MB</div>
        </el-upload>
      </span>
      <span v-if="errorsText">
          <el-alert
            title="No Trip Were Imported Some Errors Ocurred"
            type="error"
            show-icon>
            <slot>{{ errorsText }}</slot>
          </el-alert>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">Cancel</el-button>
        <el-button type="primary" @click="submitFile()">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { Button, Dialog } from 'element-ui'
  import { importTripsList } from '../../../../api/trips'
  import request from '@/utils/request'


  export default {
    name: 'TripImportButton',
    components: {
      'el-button': Button,
      'el-dialog': Dialog
    },
    data() {
      return {
        openDialog: false,
        upload_url: '',
        trips: '',
        headers: {
          'X-Tenant-Id': '',
          'Authorization': '',
          'X-Token': '',
          'Accept': 'application/json'
        },
        errorsText: ''
      }
    },
    methods: {
      downloadLayout() {
        // fetchDownloadTripLayout().then(response => {
        //
        // })
      },
      onSuccessUpload(response) {
        console.log(this.headers)

        this.$emit('close-success')
        this.$alert('Imported Succesfully')
        this.openDialog = false
      },
      errorResponse(errorResponse, file, fileList) {

        // this.errorResponse = errorResponse.slice(1,-1)
        // console.log(this.errorResponse)
        this.errorsText = errorResponse
        // console.log(this.errorsText)
        // this.errorsText = this.errorsText.errors.join(',')
      }
    },
    mounted() {
      this.upload_url = process.env.VUE_APP_BASE_API + 'v1/imports'
      this.headers = {
        'X-Tenant-id': this.$store.state.account.uuid,
        'Authorization': 'Bearer ' + this.$store.getters.token,
        'X-Token': this.$store.state.account.uuid,
        'Accept': 'application/json'
      }
    }
  }
</script>

<style scoped>

</style>
