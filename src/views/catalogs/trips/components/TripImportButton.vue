<template>
  <div class="import-files">
    <el-button id="open-import" type="primary" icon="fas fa-file-upload" @click="openDialog = true"> Import Spreadsheet</el-button>

    <el-dialog
      title="Import an excel file"
      :visible.sync="openDialog"
      width="35%"
      center>
      <div class="panel-body">
<!--        <el-button id="download-layout" @click="downloadLayout()"><i class="el-icon-arrow-down"></i></el-button>-->
        <el-upload
          class="upload"
          drag
          name="trips"
          :action="upload_url"
          :headers="headers"
          :on-error="errorResponse"
          :on-success="onSuccessUpload"
          accept=".xlsx,.xls"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop your files here or <em>click to upload</em></div>
          <div slot="tip" class="el-upload__tip">.xlsx files less than 1.5MB</div>
        </el-upload>

      <span v-if="errorsText">
          <el-alert
            title="No Trip Were Imported Some Errors Ocurred"
            type="error"
            show-icon>
            <slot>{{ errorsText }}</slot>
          </el-alert>
      </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">Cancel</el-button>
        <el-button type="primary" @click="submitFile()">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { Button, Dialog, Upload } from 'element-ui'

  export default {
    name: 'TripImportButton',
    components: {
      'el-button': Button,
      'el-dialog': Dialog,
      'el-upload': Upload
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

<style lang="scss">
  .import-files {
    .panel-body {
      * {
        text-align: center !important;
      }
    }
    .upload {
      .el-upload {
        display: flex !important;
        justify-content: center
      }
    }
  }
</style>
