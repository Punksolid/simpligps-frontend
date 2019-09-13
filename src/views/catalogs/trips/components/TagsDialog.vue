<template>
  <el-dialog
    title="Trip Tags"
    :visible="visible"
    width="30%"
    :center="true"
    :before-close="handleClose">
    <div class="t-center">
      <span class="t-center">Select or create tag(s) for Trip ID: {{ tripId }} </span>
      <el-form>
      <el-select
        v-model="selectedTags"
        multiple
        filterable
        allow-create
        placeholder="Choose tags for your Trip"
        style="width: 100%">
        <el-option

          v-for="tag in all_tags"
          :key="tag.slug"
          :value="tag.slug"
          :label="tag.name">
        </el-option>
      </el-select>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="assignTag">Assign Tags</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { assignTripTags } from '../../../../api/trips'
  import { Dialog, Button, Select, Form, Option } from 'element-ui'
  import { fetchCreatedTags } from '../../../../api/general'

  export default {
    name: 'TagsDialog',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      tripId: {
        type: Number,
        required: true
      },
      tripTagsSelected: {
        type: Array,
        required: true
      }
    },
    components: {
      'el-dialog': Dialog,
      'el-button': Button,
      'el-select': Select,
      'el-form': Form,
      'el-option': Option
    },
    data() {
      return {
        fetching: false,
        loading: false,
        selectedTags: [],
        all_tags: [{}]
      }
    },
    methods: {
      assignTag() {
        this.loading = true
        assignTripTags(this.tripId, { tags: this.selectedTags }).then(resp => {
          this.$emit('close')
          this.$message.success('Tags assigned to Trip: ' + this.tripId)
        }).catch(() => {
          // this.$message.error('Error assigning tags, please try again.')
        }).finally(() => {
          this.loading = false
        })
      },
      handleClose() {
        this.$emit('close')
      },
      markAsSelected() {
        // console.log(tags)
        this.tripTagsSelected.forEach((element) => {
          this.all_tags.push({
            name: element.slug,
            slug: element.slug
          })
          this.selectedTags.push(element.slug)
        })
      },
      getTags() {
        this.fetching = true

        fetchCreatedTags().then(resp => {
          this.loading = true
          this.all_tags = resp.data.data.map(function(tag) {
            return {
              name: tag.name.en,
              slug: tag.slug.en
            }
          })
        }).finally(() => {
            this.loading = false
          })
      }
    },
    mounted() {
      this.getTags()
      this.markAsSelected()
    }
  }
</script>

<style lang="css" scoped>
  .el-dialog__body {
    padding: 10px 25px 30px;
  }
</style>
