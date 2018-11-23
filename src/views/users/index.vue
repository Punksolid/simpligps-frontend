<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create user</el-button>

    <el-dialog
  title="Create user"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
  <span>
    <create-user></create-user>
  </span>

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
      },
      open() {
        this.$alert('This is a message', 'Title', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      handleClose(done) {
        this.$confirm('Are you sure to close? Not saved data will be lost!')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    data() {
      return {
        tableData4: [{
          'name': 'Allah Akhbar',
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
          dialogVisible: false

      }
    }
  }
</script>
