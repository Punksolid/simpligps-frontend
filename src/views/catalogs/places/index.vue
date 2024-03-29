<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="openDialog()" icon="fas fa-map-marker-alt p-r-10">New Place</el-button>
      </el-col>
    </el-row>

    <NewPlace :title="titleDialog" :form="placeData" :dialogvisible="dialogVisible"  @created="getPlaces" @closedialog="closeDialog"/>

    <el-col>
      <el-table
        :data="placesList"
        stripe
        v-loading="listLoading"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name"
          min-width="180"
          sortable>
        </el-table-column>
        <el-table-column
          prop="person_in_charge"
          label="Person in Charge">
        </el-table-column>
        <el-table-column
          prop="address"
          label="Address">
        </el-table-column>
        <el-table-column
          prop="geofence_ref"
          label="Geofence Ref"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="high_risk"
          label="High Risk"
          width="110">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.high_risk ? 'success' : 'info' "
              disable-transitions>
              {{ scope.row.high_risk ? 'Active' : 'Inactive' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Operations"
          fixed="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              icon="fas fa-edit"/>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="danger"
              size="mini"
              icon="fas fa-trash"/>
          </template>
        </el-table-column>

      </el-table>
    </el-col>

    <el-col class="m-t-5 t-center">
      <el-pagination
        class="dis-inline-b"
        :current-page.sync="placesListPage.current_page"
        :total="placesListPage.total"
        :page-size="placesListPage.per_page"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        @pagination="getPlaces" />
    </el-col>

  </el-row>
</template>

<script>
  import { fetchPlaces, deletePlace } from '@/api/places'
  import NewPlace from '@/views/catalogs/places/create'

    export default {
      name: 'PlacesList',
      components: {
        NewPlace
      },
      data() {
        return {
          listLoading: false,
          placeData: {},
          placesList: [],
          placesListPage: {
            page: 0,
            from: 0,
            last_page: 0,
            per_page: 15,
            to: 0,
            total: 0
          },
          titleDialog: 'New Place',
          dialogVisible: false
        }
      },
      methods: {
        getPlaces(params) {
          this.dialogVisible = false
          this.listLoading = true
          fetchPlaces(this.placesListPage).then(response => {
            this.placesList = response.data.data
            this.placesListPage = response.data.meta
            this.placesListPage.page = response.data.meta.current_page
            this.listLoading = false
          }).catch(_ => {
            this.listLoading = false
          })
        },
        openDialog() {
          this.titleDialog = 'Create Place'
          this.placeData = { high_risk: false }
          this.listLoading = true
          this.dialogVisible = true
        },
        closeDialog() {
          this.listLoading = false
          this.dialogVisible = false
        },
        handleUpdate(index, rowData) {
          this.placeData = rowData
          this.titleDialog = 'Edit Place'
          this.listLoading = true
          this.dialogVisible = true
        },
        deleteRow(index, rowData) {
          this.listLoading = true
          this.$confirm('This will permanently delete place: ' + rowData.name + ' are you sure to Continue?', 'Warning', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn-danger',
            center: true,
            type: 'warning'
          }).then(() => {
            deletePlace(rowData.id).then(resp => {
              this.$message('Place: ' + resp.data.data.name + ' deleted.')
              this.getPlaces()
              }).catch(resp => {
                this.$message.error(resp.message)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Delete canceled'
            })
            this.listLoading = false
          })
        },
        handleCurrentChange(val) {
          this.placesListPage.page = val
          this.getPlaces()
        },
        handleSizeChange(val) {
          this.placesListPage.per_page = val
          this.getPlaces()
        }
      },
      created() {
        this.getPlaces()
      }
    }
</script>

<style scoped>

</style>
