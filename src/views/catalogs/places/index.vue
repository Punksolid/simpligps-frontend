<template>
  <el-row class="panel p-10">

    <el-row class="searchBar">
      <el-col :span="4" class="m-b-5">
        <el-button type="primary" @click="openDialog()" icon="fas fa-map-marker-alt p-r-10">New Place</el-button>
      </el-col>
    </el-row>

    <NewPlace :title="titleDialog" :form="placeData" @created="fetchPlaces" :dialog_visible="dialogVisible" @closedialog="dialogVisible = false"></NewPlace>

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
          label="Operations"
          fixed="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, placesList)"
              icon="fas fa-edit"/>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, placesList)"
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
        @pagination="fetchPlaces" />
    </el-col>

  </el-row>
</template>

<script>
  import { getPlaces, deletePlace } from '@/api/places'
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
        fetchPlaces(params) {
          this.dialogVisible = false
          this.listLoading = true
          getPlaces(this.placesListPage).then(response => {
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
          this.placeData = {}
          this.dialogVisible = true
        },
        handleClose(done) {
          this.$confirm('Are you sure to close? Not saved data will be lost!')
            .then(_ => {
              done()
            })
            .catch(_ => {

            })
        },
        handleUpdate(index, placesList) {
          this.placeData = placesList[index]
          this.titleDialog = 'Edit Place'
          this.dialogVisible = true
        },
        deleteRow(index, placeData) {
          this.$confirm('This will permanently delete place: ' + placeData[index].name + ' are you sure to Continue?', 'Warning', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn-danger',
            center: true,
            type: 'warning'
          }).then(() => {
            deletePlace(placeData[index].id).then(resp => {
              this.$message('Place: ' + resp.data.data.name + ' deleted.')
              }).catch(resp => {
                this.$message.error(resp.message)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Delete canceled'
            })
          })
        },
        handleCurrentChange(val) {
          this.placesListPage.page = val
          this.fetchPlaces()
        },
        handleSizeChange(val) {
          this.placesListPage.per_page = val
          this.fetchPlaces()
        }
      },
      created() {
        this.fetchPlaces()
      }
    }
</script>

<style scoped>

</style>
