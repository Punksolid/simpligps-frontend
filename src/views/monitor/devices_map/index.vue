<template>
  <el-row class="panel p-10">
    <el-row>
      <el-col class="panel-header">
        <h3 class="m-t-5"><i class="fas fa-map-marker-alt"></i><b>Select Units to Add Markers:</b></h3>
      </el-col>
      <el-col class="dis-flex  m-b-20">
        <el-select v-model="unitsToAdd" placeholder="Select Unit to ADD" class="m-r-5" style="width: 95%">
          <template slot-scope="scope">
            <el-option v-for="(unit, index) in unitsList" :value="index" :label="unit.name" :key="unit.id">
            </el-option>
          </template>
        </el-select>
        <el-button type="primary" @click="addMarker(unitsToAdd)" icon="fas fa-plus" class="p-t-5"></el-button>
      </el-col>
    </el-row>

      <GmapMap
        :center="{lat:24.791999, lng:-107.404263}"
        :zoom="13"
        map-type-id="roadmap"
        style="width: 100%; height: 400px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>

  </el-row>
</template>

<script>
  import { getUnits } from '@/api/units'

    export default {
      name: 'DevicesMap',
      data: function() {
        return {
          Loading: false,
          unitsToAdd: [],
          unitsList: '',
          markers: [
            { position: { lat: 24.791999, lng: -107.404263 }}
          ]
        }
      },
      methods: {
        fetchUnitsList() {
          this.Loading = true
          getUnits(this.unitsList).then(response => {
            this.unitsList = response.data.data
            this.Loading = false
          })
        },
        addMarker(unit) {
          console.log(unit)
          if (this.unitsToAdd) {
            this.markers.push({
              position: {
                lat: this.unitsList[unit].position.lat,
                lng: this.unitsList[unit].position.lon
              }
            })
            this.place = null
          }
        }
      },
        created() {
          this.fetchUnitsList()
        }
      }
</script>

