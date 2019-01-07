<template>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Phone">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Status">
    <el-switch v-model="form.active"></el-switch>
  </el-form-item>
  <el-form-item>
    <el-button type="danger" aria-label="close">Cancel</el-button>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    name: 'CreateOperator',
    data() {
      return {
        form: {
          name: '',
          phone: '',
          active: ''
        }
      }
    },

  }

</script>

<style scoped>

</style>
