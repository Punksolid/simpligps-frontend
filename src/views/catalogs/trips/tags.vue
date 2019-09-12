<template>
  <el-dialog
    title="Trip Tags"
    :visible="visible"
    width="30%"
    :center="true"
    :before-close="handleClose">
    <div class="t-center">
    <span class="t-center">Select or create tag(s) for Trip ID: {{ data.id }} </span>
    <el-select
      v-model="tagList.tags"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Choose tags for your Trip"
      style="width: 100%">
      <el-option
        v-for="tag in tags"
        :key="tag.index"
        :label="tag.name.en"
        :value="tag.name.en">
      </el-option>
    </el-select>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="assignTag">Assign Tags</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { assignTripTags } from '../../../api/trips'
  import { Dialog, Button, Select, Dropdown } from 'element-ui'

  export default {
      name: 'TripTags',
      props: {
        visible: {
          type: Boolean,
          required: true
        },
        data: {
          type: Object,
          required: true
        },
        tags: {
            type: Array,
            required: true
        }
      },
      components: {
        'el-dialog': Dialog,
        'el-button': Button,
        'el-select': Dropdown

      },
      data() {
        return {
          fetching: false,
          loading: false,
          tagList: {
              tags: []
          }
        }
      },
      methods: {
      assignTag() {
        this.loading = true
        assignTripTags(this.data.id, this.tagList).then(resp => {
          this.$emit('close')
          this.$message.success('Tags assigned to Trip: ' + this.data.id)
        }).catch(() => {
          // this.$message.error('Error assigning tags, please try again.')
        }).finally(() => {
          this.loading = false
        })
      },
      handleClose() {
          this.$emit('close')
      }
    }
  }
</script>

<style lang="css" scoped>
  .el-dialog__body {
    padding: 10px 25px 30px;
  }
</style>
