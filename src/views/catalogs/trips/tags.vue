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
      v-model="tags"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Choose tags for your Trip"
      :loading="fetching"
      style="width: 100%">
      <el-option
        v-for="tag in CurrentTags"
        :key="tag.id"
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
  import { fetchCreatedTags } from '../../../api/general'

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
        }
      },
      data() {
        return {
          fetching: false,
          loading: false,
          tags: [],
          CurrentTags: []
        }
      },
      methods: {
      assignTag() {
        this.loading = true
        assignTripTags(this.data.id, this.tags).then(resp => {
          this.$emit('close')
          this.$message.success('Tags assigned to Trip: ' + this.data.id)
        }).catch(() => {
          this.$message.error('Error assigning tags, please try again.')
        }).finally(() => {
          this.loading = false
        })
      },
      getCreatedTags() {
        this.fetching = true
        fetchCreatedTags().then(resp => {
          this.CurrentTags = resp.data.data
        }).catch(() => {})
          .finally(() => {
            this.fetching = false
          })
      },
      handleClose() {
          this.$emit('close')
      }
    },
    created() {
        this.getCreatedTags()
    }
  }
</script>

<style lang="css" scoped>
  .el-dialog__body {
    padding: 10px 25px 30px;
  }
</style>
