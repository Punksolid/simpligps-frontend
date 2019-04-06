<template>
  <el-dialog
    title="New Trip"
    :visible.sync="dialogvisible"
    width="40%"
    :before-close="handleClose()">

    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.rp" placeholder="RP"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.invoice" placeholder="Invoice"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.client" placeholder="Client"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.origin" placeholder="Origin"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.destination" placeholder="Destination"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.mon_type" placeholder="Mon Type"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.line" placeholder="Line"/>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.scheduled_load"
          type="datetime"
          placeholder="Select Load's date">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.scheduled_departure"
          type="datetime"
          placeholder="Select Depature's date">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.scheduled_arrival"
          type="datetime"
          placeholder="Select Arrival's Date">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.scheduled_unload"
          type="datetime"
          placeholder="Select Unload's date">
        </el-date-picker>
      </el-form-item>
    </el-form>

  <div slot="footer" class="dialog-footer text-center">
    <el-button @click="handleClose()">Cancel</el-button>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </div>

  </el-dialog>
</template>

<script>
  import { createTrip, updateTrip } from '@/api/trips'

  export default {
      name: 'CreateTrip',
      props: [
          'dialogvisible'
      ],
      data() {
        return {
          form: {
            rp: '',
            invoice: '',
            client: '',
            origin: '',
            mon_type: '',
            line: '',
            scheduled_load: '',
            scheduled_departure: '',
            scheduled_arrival: '',
            scheduled_unload: ''
          }
        }
      },
      methods: {
        onSubmit() {
          if (this.form.id) {
            updateTrip(this.form.id, this.form).then(response => {
              console.log(response)
              /* this.$message({
                message: 'User ' + response.data.data. + ' updated',
                type: 'success',
                duration: 10 * 1000
              }) */
              this.form = {}
              this.$emit('created')
            })
          } else {
            createTrip(this.form).then(response => {
              console.log(response)
              /* this.$message({
                message: 'Trip ' + response.data.data + ' created',
                type: 'success',
                duration: 10 * 1000
              }) */
              this.form = []
              this.$emit('created')
            })
          }
        },
        handleClose() {
         /* this.$emit('closeDialog') */
        }
      }
    }
</script>

<style scoped>

</style>
