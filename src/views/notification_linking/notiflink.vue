<template>
<div>

  <el-select v-model="value" placeholder="Accounts / Lines">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

<div style="margin-top: 10px">

    <div style="background-color: #fff">


<div style="padding: 10px">

<div style="margin-top: 3px">


 <el-checkbox v-model="checked3" label="Panic button" border></el-checkbox>
</div>

<div style="margin-top: 7px">
 <el-checkbox v-model="checked3" label="Jammer" border></el-checkbox>
</div>

<div style="margin-top: 7px">
 <el-checkbox v-model="checked3" label="Route deviation" border></el-checkbox>
</div>

<div style="margin-top: 7px">
 <el-checkbox v-model="checked3" label="Speeding" border></el-checkbox>
</div>

<div style="margin-top: 7px">
 <el-checkbox v-model="checked3" label="Temp out of range" border></el-checkbox>
</div>

<div style="margin-top: 30px">
    <el-button type="primary" @click="dialogVisible = true">+Add protocol</el-button>

</div>
<div style="margin-top: 30px">
    <el-table
      :data="NotifList"
      stripe
      border
      style="width: 80%">
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
       <el-table-column
        prop="company"
        label="Company"
        width="180">
      </el-table-column>
       <el-table-column
        prop="phone"
        label="Phone"
        width="180">
      </el-table-column>

      <el-table-column
        prop="email"
        label="E-mail"
        width="180">
        </el-table-column>
         <el-table-column
        prop="address"
        label="Time unattend"
        width="180">
        </el-table-column>
         <el-table-column
        prop="created_at"
        label="Action"
        width="180">
      </el-table-column>
    </el-table>
    <div style="margin-top: 30px">
    <el-button type="primary" @click="dialogVisible = true">Save</el-button>
        <el-button type="danger" @click="dialogVisible = true">Cancel</el-button>

</div>
</div>
</div>
</div>
</div>
</div>

</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Gomez Trucking'
        }, {
          value: 'Option2',
          label: 'Perez Trucking'
        }, {
          value: 'Option3',
          label: 'Sanchez Trucking'
        }, {
          value: 'Option4',
          label: 'Red Truck co.'
        }, {
          value: 'Option5',
          label: 'Fresh Fruits Co.'
          }, {
          value: 'Option6',
          label: 'Tecnocosas'
        }],

        value: '',
        dialogVisible: false
      }
    }
  }
</script>

