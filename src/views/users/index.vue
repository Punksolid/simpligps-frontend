<template>
  <div>
    <el-button @click="showDialog = true" type="primary">Create User</el-button>
    <el-dialog
      title="Create User"
      :visible.sync="showDialog"
      width="30%">
      <create-user></create-user>
    </el-dialog>
    <el-table
      :data="tableData4"
      style="width: 100%"
      max-height="250">
      <el-table-column
        fixed
        prop="lastname"
        label="Lastname"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="400">
      </el-table-column>
      <el-table-column
        prop="username"
        label="City"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import CreateUser from './create.vue'

  export default {
    name: 'Users',
    components: {
      CreateUser
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1)
      }
    },
    data() {
      return {
        tableData4: [{
          'name': 'Alvah Aufderhar',
          'lastname': 'default',
          'email': 'commodijohann32@example.com',
          'username': 'defaultx'
        },
          {
            'name': 'Liliane Weimann',
            'lastname': 'default',
            'email': 'molestiaecrawford.kunde@example.org',
            'username': 'defaultx'
          }],
        showDialog: false
      }
    }
  }
</script>
