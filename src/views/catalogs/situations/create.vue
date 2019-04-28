<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogvisible"
    width="40%"
    custom-class="newsituation"
    :before-close="handleClose">

    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item label="Name">
        <el-input v-model="form.name" placeholder="Name"/>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">{{form.id?'Update':'Create'}}</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import { createSituation, updateSituation } from '@/api/situations'

  export default {
    name: 'CreateSituation',
    props: [
      'title',
      'form',
      'dialogvisible'
    ],
    data() {
      return {
        loading: false
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        if (this.form.id) {
          updateSituation(this.form.id, this.form).then(response => {
            this.$message({
              message: 'Situation ID: ' + response.data.data.id + ' updated',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('created')
          }).catch(() => { this.loading = false })
        } else {
          createSituation(this.form).then(response => {
            this.$message({
              message: 'Situation: ' + response.data.data.name + ' created',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('created')
          }).catch(() => { this.loading = false })
        }
      },
      handleClose() {
        if (this.form.name) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              this.$emit('closedialog')
            }).catch(() => {
          })
        } else {
          this.$emit('closedialog')
        }
      }
    }
  }
</script>

<style lang="scss">
  .newsituation {
    .el-dialog__body {
      padding: 20px 20px 0px;
    }
  }
</style>
