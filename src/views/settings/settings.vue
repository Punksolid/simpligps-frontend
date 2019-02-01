<template>
  <el-row class="panel">

    <el-col class="panel-content">

          <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="WIALON ACCESS KEY" name="1">
            <el-form :model="formInline" class="wialonkey">
              <el-form-item label="Wialon Key" class="dis-flex">
                <el-input type="text" v-model="formInline.wialon_key" placeholder="Wialon Key" style="width: 100%"></el-input>
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
        activeName: '1',
        formInline: {
          wialon_key: ''
        }
      }
    },
    methods: {
      onSubmit() {
        updateAccessKey(this.formInline).then(response => {
          console.log(this.formInline)
          Message({
            message: response.data.data.message,
            type: 'success',
            duration: 10 * 1000
          })
        })
        console.log('submit!')
      },
      fillSettings() {
        getSettings().then(response => {
          this.formInline.wialon_key = response.data.data.wialon_key
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
