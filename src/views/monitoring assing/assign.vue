<template>
<div>
  <el-select v-model="value" placeholder="Select Monitor">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

<div style="margin-top: 20px">
 <el-checkbox v-model="checked3" label="Role 1" border></el-checkbox>
</div>

<div style="margin-top: 20px">
 <el-checkbox v-model="checked3" label="Role 2" border></el-checkbox>
</div>

<div style="margin-top: 20px">
 <el-checkbox v-model="checked3" label="Role 3" border></el-checkbox>
</div>

<div style="margin-top: 30px">
    <el-button type="primary" @click="dialogVisible = true">Ok</el-button>
        <el-button type="danger" @click="dialogVisible = true">Cancel</el-button>

</div>
</div>
</template>



<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Monitor 1'
        }, {
          value: 'Option2',
          label: 'Monitor 2'
        }, {
          value: 'Option3',
          label: 'Monitor 3'
        }, {
          value: 'Option4',
          label: 'Monitor 4'
        }, {
          value: 'Option5',
          label: 'Monitor 5'
        }],
        value: '',
        dialogVisible: false
      }
    }
  }
</script>

