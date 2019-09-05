<template>
    <el-select
      v-model="selectedTag"
      filterable
      remote
      :remote-method="getSearchTags"
      :loading="loading"
      @change="syncTagsEvent"
      placeholder="No filter">
        <el-option
                v-for="tag in tags"
                :key="tag.value"
                :label="tag.label"
                :value="tag.value">
        </el-option>
    </el-select>
</template>
<script>
  import { Select } from 'element-ui'
  import { fetchCreatedTags } from '../../api/general'
  export default {
    name: 'TagsSelect',
    props: {
        value: {
          type: String
        }
    },
    components: {
      'el-select': Select
    },
    data() {
      return {
        selectedTag: null,
        tags: [],
        loading: false
      }
    },
    methods: {
      getTags() {
        this.loading = false
        fetchCreatedTags().then((response) => {
          this.tags = response.data.data.map((tag) => {
            return {
              label: tag.name.en,
              value: tag.slug.en
            }
          })
        }).finally(() => {
          this.loading = false
        })
      },
      syncTagsEvent() {
        this.$emit('input',
          this.selectedTag
        )
      },
      getSearchTags(search) {
        this.loading = true
        fetchCreatedTags({ name: search }).then((response) => {
          this.tags = response.data.data.map((tag) => {
            return {
              label: tag.name.en,
              value: tag.slug.en
            }
          })
        }).finally(() => {
          this.loading = false
        })
      }
    },
    mounted() {
      this.getTags()
    }
  }
</script>
