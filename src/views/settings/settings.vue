<template>
  <el-row class="panel">

    <el-col class="panel-content">

          <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="WIALON ACCESS KEY" name="1">
            <el-form v-loading="loading" :model="accessKey" >
              <el-form-item style="width: 100%">
                <el-input type="text" v-model="accessKey.wialon_key" placeholder="Wialon Key">
                  <template slot="prepend">Wialon Key:</template>
                  <template slot="append">
                    <el-checkbox v-model="accessKey.import" class="m-0">Import</el-checkbox>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">Update Key</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-col>

  </el-row>

</template>

<script>
  import { getSettings, updateAccessKey } from '../../api/settings'
  import { Message } from 'element-ui'

  export default {
    name: 'Settings',
    data() {
      return {
        loading: false,
        activeName: '1',
        accessKey: {
          wialon_key: '',
          import: false
        }
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        updateAccessKey(this.accessKey).then(response => {
          Message({
            message: response.data.data.message,
            type: 'success',
            duration: 10 * 1000
          })
          this.loading = false
        })
      },
      fillSettings() {
        getSettings().then(response => {
          this.accessKey.wialon_key = response.data.data.wialon_key
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
