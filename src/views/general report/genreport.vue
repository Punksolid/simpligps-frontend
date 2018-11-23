 <template>
   <div class="block">
    <span class="demonstration">Range</span>
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="Start date and time">
    </el-date-picker>
       <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="End date and time">
    </el-date-picker>

  <div style="margin-top: 30px">
    <span>Monitoring tipe</span>
    <div>
      <el-select v-model="value" placeholder="No filter">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>

  </el-select>
    </div>
  </div>

  <div style="margin-top: 30px">
    <span>Origin</span>
    <div>
      <el-select v-model="value" placeholder="No filter">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
  </div>

  <div style="margin-top: 30px">
    <span>Line</span>
    <div>
      <el-select v-model="value" placeholder="No filter">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
  </div>
<div style="margin-top: 30px">
    <el-button type="primary" @click="dialogVisible = true">General report</el-button>
        <el-button type="success" @click="dialogVisible = true">Download</el-button>

</div>
  </div>




 </template>


  <script>
  export default {
    data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: ''
      };
    }
  };
</script>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Cattle cages'
        }, {
          value: 'Option2',
          label: 'Cooled'
        }, {
          value: 'Option3',
          label: 'No filter'
        }, {
          value: 'Option4',
          label: 'None'
        }, {
          value: 'Option5',
          label: 'Ostia'
        }],
        value: ''
      }
    }
  }
</script>
