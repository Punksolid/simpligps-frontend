<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create Contact</el-button>

    <el-dialog
      title="Create Contact"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
            <CreateOperator></CreateOperator>
      </span>
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">Cancel</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>-->
      <!--</span>-->
    </el-dialog>

    <el-table
      :data="contactsList"
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
        label="E-mail"
        width="180">
        </el-table-column>
         <el-table-column
        prop="address"
        label="Adress"
        width="180">
        </el-table-column>
         <el-table-column
        prop="created_at"
        label="Created at"
        width="180">
      </el-table-column>

            </el-table-column>

      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import CreateOperator from './create.vue'

  export default {
    name: 'OperatorsList',
    components: {
      CreateOperator
    },
    data() {
      return {
        contactsList: [{
            "name": "Dr. Tabitha Connelly DDS",
            "company": "Kerluke Group",
            "phone": "1-660-432-1055 x46628",
            "email": "hessel.selina@murphy.org",
            "address": "457 Little Rue\nKadehaven, NH 67106",
            "created_at": "2 weeks ago"
        },
        {
            "name": "Rosie Beier",
            "company": "Dooley PLC",
            "phone": "+1 (386) 587-7308",
            "email": "alphonso06@yahoo.com",
            "address": "46393 Deckow Views Apt. 033\nKamillechester, WV 53976",
            "created_at": "2 weeks ago"
        },
        {
            "name": "Giacomo Puccini",
            "company": "Sr. Pelo PLC",
            "phone": "+1 (386) 587-7308",
            "email": "giacomoxd@yahoo.com",
            "address": "46393 Deckow Views Apt. 033\nKamillechester, WV 53976",
            "created_at": "1 week ago"
        },
        {
            "name": "Arturo Chacón",
            "company": "Maggie's",
            "phone": "+1 (386) 587-7308",
            "email": "rooster@yahoo.com",
            "address": "Iron River Ranch 1-A\nGarrison, CO 53976",
            "created_at": "2 weeks ago"
        }],
        dialogVisible: false
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
