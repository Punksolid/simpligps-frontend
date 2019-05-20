<template>
  <el-form-item>
    <el-col>
      <span>Min Speed:</span>
      <el-input-number v-model="form.params.min_speed" label="Max:" size="mini" :min="1" :max="150">
      </el-input-number>
    </el-col>
    <el-col>
      <span>Max Speed:</span>
      <el-input-number v-model="form.params.max_speed" label="Min:" size="mini" :min="1" :max="150">
      </el-input-number>
    </el-col>
  </el-form-item>
</template>
<script>
  export default {
    name: 'SpeedControlType',
    props: [
      'form'
    ],
    created() {
      this.form.params.min_speed = 1
      this.form.params.max_speed = 1
    }
  }
</script>
