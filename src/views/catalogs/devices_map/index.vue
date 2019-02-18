<template>
  <el-row class="panel p-10">
    <el-row class="searchBar">
      <el-col>
        <h3 class="m-t-0"> Marker for Device: PTS03 </h3>
      </el-col>
    </el-row>
    <el-col>
      <GmapMap
        :center="{lat:24.791999, lng:-107.404263}"
        :zoom="12"
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
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: 'DevicesMap',
      data() {
          return {
        markers: [
          { position: { lat: 24.791999, lng: -107.404263 }}
          ]
        }
      }
    }
</script>

<style scoped>

</style>
