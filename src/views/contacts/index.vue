<template>
  <el-row class="panel p-10">
    <el-row class="searchBar m-b-10">
      <el-col>
        <el-button type="primary" @click="dialogVisible = true" icon="fas fa-user-plus"> Create Contacts</el-button>
      </el-col>
    </el-row>

    <el-dialog
      title="Create Contacts"
      :visible.sync="dialogVisible"
      width="30%">
            <CreateContacts @closedialog="dialogVisible = false" @created="fetchContactList"></CreateContacts>
    </el-dialog>

    <el-col>
      <el-table
        :data="operatorsList"
        stripe
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
          label="Actions"
          fixed="right"
          width="135">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="fas fa-edit"/>
            <el-button
              size="mini"
              type="danger"
              @click="buttonDeleteContact(scope.$index, scope.row)"
              icon="fas fa-trash"/>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

  </el-row>
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
        listLoading: false,
        operatorsList: [],
        dialogVisible: false
      }
    },
    methods: {
      fetchContactList() {
        this.dialogVisible = false
        this.listLoading = true
        getContacts().then(response => {
          this.operatorsList = response.data.data
          this.listLoading = false
        })
      },
      buttonDeleteContact(contact_id, row) {
        console.log(contact_id, row)
        deleteContact(contact_id)
      }
    },
    created() {
      this.fetchContactList()
    }
  }

</script>

<style scoped>

</style>
