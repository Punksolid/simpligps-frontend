<template>
  <el-row class="panel">

    <el-col class="panel-content">

          <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="WIALON ACCESS KEY" name="1">
            <el-form v-loading="loading" :model="accessKey" >
              <el-form-item style="width: 100%">
                <el-input type="text" v-model="accessKey.wialon_key" :disabled="!editable" placeholder="Wialon Key">
                  <template slot="prepend">Wialon Key:</template>
                  <template slot="append">
                    <el-checkbox v-model="accessKey.import" :disabled="!editable" class="m-0">Import</el-checkbox>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="editable" type="primary" @click="onSubmit">Update Key</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-col>

  </el-row>

</template>

<script>
  import { getSettings, updateAccessKey } from '../../api/settings'

  export default {
    name: 'Settings',
    data() {
      return {
        loading: false,
        activeName: '1',
        accessKey: {
          wialon_key: '',
          import: false
        },
        editable: true
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        updateAccessKey(this.accessKey).then(response => {
          this.$message({
            message: response.data.data.message,
            type: 'success',
            duration: 10 * 1000
          })
          this.loading = false
        }).catch(() => {})
      },
      fillSettings() {
        getSettings().then(response => {
          this.accessKey.wialon_key = response.data.data.wialon_key
          if (this.accessKey.wialon_key.length > 1) {
            this.editable = false
          }
        }).catch(resp => {
          this.$message.error({
            message: resp.data.message
          })
        })
      }
    },
    created() {
      this.fillSettings()
    }
  }
</script>

<style lang="scss" scooped>
.wialonkey {
    display: flex;
  .dis-flex {
    width: 100%;
  .el-form-item__content {
    flex:1;
  }
 }
}
@media only screen and (max-width: 768px) {
  .wialonkey {
    flex-direction: column;

    .dis-flex {
      flex-direction: column;
    }

    .el-form-item__label {
      text-align: left;
    }
  }
}
</style>
