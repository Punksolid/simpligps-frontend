<template>
  <el-form-item>
    <el-col>
      <span>Min Speed: </span>
      <el-input-number v-model="form.params.min_speed" size="mini" :min="0" :max="250"/>
      <span> Km/h</span>
    </el-col>
    <el-col>
      <span>Max Speed: </span>
      <el-input-number v-model="form.params.max_speed" size="mini" :min="1" :max="250"/>
      <span> Km/h</span>
    </el-col>
  </el-form-item>
</template>
<script>
  export default {
    name: 'SpeedControlType',
    props: [
      'form'
    ],
    mounted() {
      this.form.params.min_speed = 0
      this.form.params.max_speed = 1
    }
  }
</script>
