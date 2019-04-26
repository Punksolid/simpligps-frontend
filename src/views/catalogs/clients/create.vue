<template>
  <el-dialog
    :title="title"
    :visible="dialogvisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="130px">
      <el-form-item label="Company Name" prop="company_name">
        <el-input v-model="form.company_name" clearable/>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" clearable/>
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model="form.address" clearable/>
      </el-form-item>
      <el-form-item label="City" prop="city">
        <el-input v-model="form.city" clearable/>
      </el-form-item>
      <el-form-item label="State" prop="state">
        <el-input v-model="form.state" clearable/>
      </el-form-item>
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="form.phone" type="tel" clearable/>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" type="email" clearable/>
      </el-form-item>
      <el-form-item label="Contact">
        <el-select v-model="form.contact" placeholder="Select a contact">
          <el-option
            v-for="contact in contacts"
            :key="contact.id"
            :label="contact.name"
            :value="contact.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Status" prop="status">
        <el-switch v-model="form.status"/>
      </el-form-item>
      <el-form-item label="Email Frecuency" prop="email_frecuency">
        <el-radio-group v-model="form.email_frequency" size="medium">
          <el-radio-button label="0">Off</el-radio-button>
          <el-radio-button label="1">Individual</el-radio-button>
          <el-radio-button label="2">Grouped</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-row>
        <el-col class="t-center">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="onSubmit">{{ this.form.id == null ? 'Create':'Update' }}</el-button>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>
</template>

<script>
  import { createClient, updateClient } from '@/api/clients'
  import { getContacts } from '../../../api/contacts'

  export default {
    name: 'CreateClient',
    props: [
      'title',
      'form',
      'dialogvisible'
    ],
    data() {
      return {
        contacts: [],
        dialogVisible: false,
        loading: false
      }
    },
    methods: {
      onSubmit() {
        if (this.form.id) {
          this.loading = true
          updateClient(this.form.id, this.form).then(response => {
            this.$message({
              message: 'Client: ' + response.data.data.company_name + ' updated.',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('closedialog')
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = true
          createClient(this.form).then(response => {
            this.$message({
              message: 'Client: ' + response.data.data.company_name + ' created.',
              type: 'success',
              duration: 10 * 1000
            })
            this.loading = false
            this.$emit('created')
          }).catch(() => {
            this.loading = false
          })
        }
      },
      handleClose() {
        if (this.form.company_name) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              this.$emit('closedialog')
            }).catch(() => {
          })
        } else {
          this.$emit('closedialog')
        }
      },
      fetchContacts(params) {
        getContacts(params).then(response => {
          this.contacts = response.data.data
        })
      }
    },
    created() {
      this.fetchContacts({ 'all': 1 })
    }
  }
</script>

<style lang="scss" scoped>

</style>
