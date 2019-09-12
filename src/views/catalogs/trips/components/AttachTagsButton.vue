<template>
  <div>
    <TripTags :visible="visible"/>
    <el-button
      class="action-buttons"
      size="mini"
      @click="openDialog(scope.row)"
      icon="fas fa-hashtag">
    </el-button>
  </div>
</template>
<script>
  import { Button } from 'element-ui'
  import TripTags from './TagsDialog'

  export default {
    name: 'AttachTagsButton',
    props: {
      tags: []
    },
    data() {
      return {
        visible: false
      }
    },
    components: {
      TripTags,
      'el-button': Button
    },
    methods: {
      openDialog(row) {
        this.visible = true
      }
    }
  }
</script>
