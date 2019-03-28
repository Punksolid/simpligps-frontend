<template>
  <el-row class="panel p-10">
    <el-row class="searchBar m-b-10">
      <el-col>
        <el-button type="primary" @click="openDialog" icon="fas fa-user-plus"> Create Contacts</el-button>
      </el-col>
    </el-row>

    <el-dialog
      :title="titleDialog"
      :visible.sync="dialogVisible"
      width="30%">
            <CreateContact @closedialog="dialogVisible = false" :form="elementToUpdate" @created="fetchContactList"></CreateContact>
    </el-dialog>

    <el-col>
      <el-table
        :data="contactList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="company"
          label="Company"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="Phone"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="E-Mail">
        </el-table-column>
        <el-table-column
          label="Actions"
          fixed="right"
          width="135">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, contactList)"
              icon="fas fa-edit"/>
            <el-button
              size="mini"
              type="danger"
              @click="deleteRow(scope.$index, scope.row)"
              icon="fas fa-trash"/>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

  </el-row>
</template>

<script>
  import CreateContact from './create.vue'
  import { getContacts, deleteContact } from '@/api/contacts'

  export default {
    name: 'ContactsList',
    components: {
      CreateContact
    },
    data() {
      return {
        listLoading: false,
        contactList: [],
        titleDialog: 'Create Contact',
        elementToUpdate: {},
        dialogVisible: false
      }
    },
    methods: {
      fetchContactList() {
        this.dialogVisible = false
        this.listLoading = true
        getContacts().then(response => {
          this.contactList = response.data.data
          this.listLoading = false
        })
      },
      openDialog() {
        this.titleDialog = 'Create Contact'
        this.elementToUpdate = {}
        this.dialogVisible = true
      },
      handleUpdate(index, contactData) {
        this.elementToUpdate = contactData[index]
        this.titleDialog = 'Edit Contact'
        this.dialogVisible = true
      },
      deleteRow(index, contactData) {
        this.$confirm('This will permanently delete contact: ' + contactData.name + ' are you sure to Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonClass: 'btn-danger',
          center: true,
          type: 'warning'
        }).then(() => {
          deleteContact(contactData.id)
          this.fetchContactList()
          this.$message({
            type: 'success',
            message: 'Contact delete completed'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        })
      }
    },
    created() {
      this.fetchContactList()
    }
  }

</script>

<style scoped>

</style>
