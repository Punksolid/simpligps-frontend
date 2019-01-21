<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create Contacts</el-button>

    <el-dialog
      title="Create Contacts"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
            <CreateContacts></CreateContacts>
      </span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @toparent="onSubmit()">Create</el-button>
      </span>

    </el-dialog>
    <div style="margin-top: 30px">

      <el-table
        :data="operatorsList"
        border
        style="width: 100%">
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
          label="E-Mail"
          width="180">
        </el-table-column>
        <el-table-column
          label="Operaciones"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="buttonDeleteContact(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import CreateContacts from './create.vue'
  import { getContacts, deleteContact } from '@/api/general'

  export default {
    name: 'ContactsList',
    components: {
      CreateContacts
    },
    data() {
      return {
        operatorsList: [],
        dialogVisible: false
      }
    },
    params: {
      return: {
        tableData4: []
      }
    },
    methods: {
      fetchContactList() {
        this.listLoading = true
        getContacts().then(response => {
          console.log (response.data.data)
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      },
      buttonDeleteContact(contact_id,row) {
        console.log(contact_id, row)
        deleteContact(contact_id)
      }
    },
    created() {
      this.fetchContactList()
    },
  }

</script>

<style scoped>

</style>
